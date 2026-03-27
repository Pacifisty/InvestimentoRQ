'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { api } from '@/lib/api';
import { useAuth } from '@/contexts/AuthContext';

interface Project {
  id: string;
  title: string;
  status: string;
  targetAmount: number;
  raisedAmount: number;
  createdAt: string;
}

const statusLabel: Record<string, string> = {
  pending: 'Pendente', approved: 'Aprovado', rejected: 'Rejeitado', active: 'Ativo', closed: 'Fechado',
};
const statusColor: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-700',
  approved: 'bg-blue-100 text-blue-700',
  rejected: 'bg-red-100 text-red-700',
  active: 'bg-green-100 text-green-700',
  closed: 'bg-gray-100 text-gray-700',
};

export default function EmpreendedorDashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (loading) return;
    if (!user) { router.push('/login'); return; }
    if (user.role !== 'entrepreneur') { router.push('/dashboard'); return; }
    api.get('/projects/my')
      .then(setProjects)
      .catch(console.error)
      .finally(() => setFetching(false));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, loading]);

  const totalRaised = projects.reduce((s, p) => s + Number(p.raisedAmount), 0);

  if (loading || fetching) return <div className="min-h-screen flex items-center justify-center"><div className="text-gray-500">Carregando...</div></div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-indigo-700 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Dashboard do Empreendedor</h1>
            <p className="mt-1 text-indigo-200">Olá, {user?.name}!</p>
          </div>
          <Link href="/dashboard/criar-projeto" className="bg-white text-indigo-700 px-5 py-2.5 rounded-xl font-bold hover:bg-indigo-50 transition">
            + Novo Projeto
          </Link>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="text-sm text-gray-500 mb-1">Total Captado</div>
            <div className="text-3xl font-bold text-indigo-600">R$ {totalRaised.toLocaleString('pt-BR')}</div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="text-sm text-gray-500 mb-1">Projetos</div>
            <div className="text-3xl font-bold text-gray-800">{projects.length}</div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="text-sm text-gray-500 mb-1">Projetos Ativos</div>
            <div className="text-3xl font-bold text-green-600">{projects.filter(p => p.status === 'active').length}</div>
          </div>
        </div>

        <h2 className="text-xl font-bold text-gray-800 mb-4">Meus Projetos</h2>
        {projects.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center shadow-sm">
            <p className="text-gray-400 mb-4">Você ainda não tem projetos.</p>
            <Link href="/dashboard/criar-projeto" className="text-indigo-600 font-semibold hover:underline">Criar Projeto</Link>
          </div>
        ) : (
          <div className="space-y-4">
            {projects.map((project) => (
              <div key={project.id} className="bg-white rounded-2xl p-6 shadow-sm flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-gray-800">{project.title}</h3>
                  <div className="text-sm text-gray-500 mt-1">
                    Captado: R$ {Number(project.raisedAmount).toLocaleString('pt-BR')} / Meta: R$ {Number(project.targetAmount).toLocaleString('pt-BR')}
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColor[project.status] || 'bg-gray-100 text-gray-700'}`}>
                    {statusLabel[project.status] || project.status}
                  </span>
                  <Link href={`/projetos/${project.id}`} className="text-indigo-600 text-sm font-semibold hover:underline">Ver</Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
