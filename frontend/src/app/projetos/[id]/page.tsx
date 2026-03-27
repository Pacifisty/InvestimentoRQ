'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { api } from '@/lib/api';
import { useAuth } from '@/contexts/AuthContext';

interface Project {
  id: string;
  title: string;
  description: string;
  problem: string;
  solution: string;
  revenueModel: string;
  targetAmount: number;
  raisedAmount: number;
  status: string;
  returnRate: number;
  returnType: string;
  deadline: string;
  risks: string;
  teamInfo: string;
  createdAt: string;
}

export default function ProjectDetailPage() {
  const { id } = useParams();
  const { user } = useAuth();
  const router = useRouter();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [amount, setAmount] = useState('');
  const [investing, setInvesting] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    api.get(`/projects/${id}`)
      .then(setProject)
      .catch(() => router.push('/explorar'))
      .finally(() => setLoading(false));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleInvest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) { router.push('/login'); return; }
    setInvesting(true);
    try {
      await api.post('/investments', { projectId: id, amount: Number(amount) });
      setMessage('Investimento realizado com sucesso!');
      setAmount('');
      api.get(`/projects/${id}`).then(setProject);
    } catch (err: unknown) {
      setMessage(err instanceof Error ? err.message : 'Erro ao investir');
    } finally {
      setInvesting(false);
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="text-gray-500">Carregando...</div></div>;
  if (!project) return null;

  const progress = Math.min(100, Math.round((project.raisedAmount / project.targetAmount) * 100));

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-indigo-700 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl font-bold">{project.title}</h1>
          <p className="mt-2 text-indigo-200">{project.description}</p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-10 grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {([
            { title: 'Problema', content: project.problem },
            { title: 'Solução', content: project.solution },
            { title: 'Modelo de Receita', content: project.revenueModel },
            project.risks ? { title: 'Riscos', content: project.risks } : null,
            project.teamInfo ? { title: 'Time', content: project.teamInfo } : null,
          ] as Array<{ title: string; content: string } | null>).filter((item): item is { title: string; content: string } => item !== null).map((item) => (
            <div key={item.title} className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-lg font-bold text-gray-800 mb-3">{item.title}</h2>
              <p className="text-gray-600">{item.content}</p>
            </div>
          ))}
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h2 className="text-lg font-bold mb-4 text-gray-800">Captação</h2>
            <div className="mb-3">
              <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>Progresso</span>
                <span className="font-semibold">{progress}%</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-3">
                <div className="bg-indigo-500 h-3 rounded-full" style={{ width: `${progress}%` }} />
              </div>
            </div>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex justify-between">
                <span>Captado:</span>
                <span className="font-bold text-indigo-600">R$ {Number(project.raisedAmount).toLocaleString('pt-BR')}</span>
              </div>
              <div className="flex justify-between">
                <span>Meta:</span>
                <span className="font-semibold">R$ {Number(project.targetAmount).toLocaleString('pt-BR')}</span>
              </div>
              {project.returnRate && (
                <div className="flex justify-between">
                  <span>Retorno:</span>
                  <span className="font-semibold text-green-600">{project.returnRate}% {project.returnType}</span>
                </div>
              )}
              {project.deadline && (
                <div className="flex justify-between">
                  <span>Prazo:</span>
                  <span>{project.deadline}</span>
                </div>
              )}
            </div>
          </div>

          {user?.role === 'investor' && (
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-lg font-bold mb-4 text-gray-800">Investir</h2>
              {message && (
                <div className={`mb-4 p-3 rounded-lg text-sm ${message.includes('sucesso') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                  {message}
                </div>
              )}
              <form onSubmit={handleInvest} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Valor (R$)</label>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    min="1"
                    step="0.01"
                    required
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Ex: 1000"
                  />
                </div>
                <button
                  type="submit"
                  disabled={investing}
                  className="w-full bg-indigo-600 text-white py-2.5 rounded-lg font-bold hover:bg-indigo-700 transition disabled:opacity-50"
                >
                  {investing ? 'Processando...' : 'Investir Agora'}
                </button>
              </form>
            </div>
          )}

          {!user && (
            <div className="bg-indigo-50 rounded-2xl p-6 text-center border border-indigo-100">
              <p className="text-gray-600 mb-4">Faça login para investir neste projeto</p>
              <a href="/login" className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition">
                Entrar
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
