'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';
import { useAuth } from '@/contexts/AuthContext';

interface Project {
  id: string;
  title: string;
  description: string;
  status: string;
  targetAmount: number;
  createdAt: string;
  ownerId: string;
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

export default function AdminDashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [fetching, setFetching] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  useEffect(() => {
    if (loading) return;
    if (!user) { router.push('/login'); return; }
    if (user.role !== 'admin') { router.push('/dashboard'); return; }
    api.get('/projects/admin/all')
      .then(setProjects)
      .catch(console.error)
      .finally(() => setFetching(false));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, loading]);

  const handleApprove = async (id: string) => {
    setActionLoading(id + '_approve');
    try {
      const updated = await api.patch(`/projects/${id}/approve`);
      setProjects(ps => ps.map(p => p.id === id ? { ...p, status: updated.status } : p));
    } catch (err) { console.error(err); }
    setActionLoading(null);
  };

  const handleReject = async (id: string) => {
    setActionLoading(id + '_reject');
    try {
      const updated = await api.patch(`/projects/${id}/reject`);
      setProjects(ps => ps.map(p => p.id === id ? { ...p, status: updated.status } : p));
    } catch (err) { console.error(err); }
    setActionLoading(null);
  };

  const pending = projects.filter(p => p.status === 'pending');

  if (loading || fetching) return <div className="min-h-screen flex items-center justify-center"><div className="text-gray-500">Carregando...</div></div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-indigo-700 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl font-bold">Painel Administrativo</h1>
          <p className="mt-1 text-indigo-200">{pending.length} projeto(s) aguardando aprovação</p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="text-sm text-gray-500 mb-1">Total de Projetos</div>
            <div className="text-3xl font-bold text-gray-800">{projects.length}</div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="text-sm text-gray-500 mb-1">Pendentes</div>
            <div className="text-3xl font-bold text-yellow-600">{pending.length}</div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="text-sm text-gray-500 mb-1">Ativos</div>
            <div className="text-3xl font-bold text-green-600">{projects.filter(p => p.status === 'active').length}</div>
          </div>
        </div>

        <h2 className="text-xl font-bold text-gray-800 mb-4">Todos os Projetos</h2>
        {projects.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center shadow-sm">
            <p className="text-gray-400">Nenhum projeto cadastrado.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {projects.map((project) => (
              <div key={project.id} className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-bold text-gray-800">{project.title}</h3>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${statusColor[project.status] || 'bg-gray-100 text-gray-700'}`}>
                        {statusLabel[project.status] || project.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mb-2">{project.description}</p>
                    <div className="text-sm text-gray-400">
                      Meta: R$ {Number(project.targetAmount).toLocaleString('pt-BR')} · Criado em {new Date(project.createdAt).toLocaleDateString('pt-BR')}
                    </div>
                  </div>
                  {project.status === 'pending' && (
                    <div className="flex gap-2 ml-4">
                      <button
                        onClick={() => handleApprove(project.id)}
                        disabled={actionLoading === project.id + '_approve'}
                        className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-green-700 transition disabled:opacity-50"
                      >
                        {actionLoading === project.id + '_approve' ? '...' : 'Aprovar'}
                      </button>
                      <button
                        onClick={() => handleReject(project.id)}
                        disabled={actionLoading === project.id + '_reject'}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-red-600 transition disabled:opacity-50"
                      >
                        {actionLoading === project.id + '_reject' ? '...' : 'Rejeitar'}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
