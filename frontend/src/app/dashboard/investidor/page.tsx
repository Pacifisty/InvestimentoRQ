'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { api } from '@/lib/api';
import { useAuth } from '@/contexts/AuthContext';

interface Investment {
  id: string;
  amount: number;
  status: string;
  createdAt: string;
  project: {
    id: string;
    title: string;
    status: string;
    returnRate: number;
    returnType: string;
  };
}

export default function InvestidorDashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [investments, setInvestments] = useState<Investment[]>([]);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (loading) return;
    if (!user) { router.push('/login'); return; }
    if (user.role !== 'investor') { router.push('/dashboard'); return; }
    api.get('/investments/my')
      .then(setInvestments)
      .catch(console.error)
      .finally(() => setFetching(false));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, loading]);

  const total = investments.reduce((s, i) => s + Number(i.amount), 0);

  if (loading || fetching) return <div className="min-h-screen flex items-center justify-center"><div className="text-gray-500">Carregando...</div></div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-indigo-700 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl font-bold">Dashboard do Investidor</h1>
          <p className="mt-1 text-indigo-200">Olá, {user?.name}!</p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="text-sm text-gray-500 mb-1">Total Investido</div>
            <div className="text-3xl font-bold text-indigo-600">R$ {total.toLocaleString('pt-BR')}</div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="text-sm text-gray-500 mb-1">Investimentos</div>
            <div className="text-3xl font-bold text-gray-800">{investments.length}</div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="text-sm text-gray-500 mb-1">Projetos</div>
            <div className="text-3xl font-bold text-gray-800">{new Set(investments.map(i => i.project?.id)).size}</div>
          </div>
        </div>

        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">Meus Investimentos</h2>
          <Link href="/explorar" className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition text-sm">
            Explorar Projetos
          </Link>
        </div>

        {investments.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center shadow-sm">
            <p className="text-gray-400 mb-4">Você ainda não tem investimentos.</p>
            <Link href="/explorar" className="text-indigo-600 font-semibold hover:underline">Explorar Projetos</Link>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left px-6 py-3 text-sm font-semibold text-gray-500">Projeto</th>
                  <th className="text-left px-6 py-3 text-sm font-semibold text-gray-500">Valor</th>
                  <th className="text-left px-6 py-3 text-sm font-semibold text-gray-500">Retorno</th>
                  <th className="text-left px-6 py-3 text-sm font-semibold text-gray-500">Status</th>
                  <th className="text-left px-6 py-3 text-sm font-semibold text-gray-500">Data</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {investments.map((inv) => (
                  <tr key={inv.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <Link href={`/projetos/${inv.project?.id}`} className="font-semibold text-indigo-600 hover:underline">
                        {inv.project?.title || 'Projeto'}
                      </Link>
                    </td>
                    <td className="px-6 py-4 font-semibold">R$ {Number(inv.amount).toLocaleString('pt-BR')}</td>
                    <td className="px-6 py-4 text-green-600">{inv.project?.returnRate ? `${inv.project.returnRate}%` : '-'}</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                        {inv.status === 'confirmed' ? 'Confirmado' : 'Pendente'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-500 text-sm">{new Date(inv.createdAt).toLocaleDateString('pt-BR')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
