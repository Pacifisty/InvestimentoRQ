'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { api } from '@/lib/api';

interface Project {
  id: string;
  title: string;
  description: string;
  targetAmount: number;
  raisedAmount: number;
  status: string;
  returnRate: number;
  returnType: string;
  deadline: string;
}

export default function ExplorarPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/projects')
      .then(setProjects)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const progress = (p: Project) => Math.min(100, Math.round((p.raisedAmount / p.targetAmount) * 100));

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-gray-500 text-lg">Carregando projetos...</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-indigo-700 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl font-bold">Explorar Projetos</h1>
          <p className="mt-2 text-indigo-200">Descubra oportunidades de investimento</p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-10">
        {projects.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-gray-400 text-xl">Nenhum projeto disponível no momento.</div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div key={project.id} className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-bold text-gray-800 flex-1">{project.title}</h3>
                    <span className="ml-2 px-2 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                      {project.status === 'active' ? 'Ativo' : 'Aprovado'}
                    </span>
                  </div>
                  <p className="text-gray-500 text-sm mb-4 line-clamp-2">{project.description}</p>
                  <div className="mb-3">
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>Captado</span>
                      <span className="font-semibold">{progress(project)}%</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div
                        className="bg-indigo-500 h-2 rounded-full transition-all"
                        style={{ width: `${progress(project)}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-xs text-gray-400 mt-1">
                      <span>R$ {Number(project.raisedAmount).toLocaleString('pt-BR')}</span>
                      <span>Meta: R$ {Number(project.targetAmount).toLocaleString('pt-BR')}</span>
                    </div>
                  </div>
                  {project.returnRate && (
                    <div className="text-sm text-indigo-600 font-semibold mb-4">
                      Retorno: {project.returnRate}% {project.returnType}
                    </div>
                  )}
                  <Link
                    href={`/projetos/${project.id}`}
                    className="w-full block text-center bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition"
                  >
                    Ver Detalhes
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
