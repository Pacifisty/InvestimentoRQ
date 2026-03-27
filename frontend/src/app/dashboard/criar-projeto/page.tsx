'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';
import { useAuth } from '@/contexts/AuthContext';

interface FormState {
  title: string;
  description: string;
  problem: string;
  solution: string;
  revenueModel: string;
  targetAmount: string;
  deadline: string;
  returnType: string;
  returnRate: string;
  risks: string;
  teamInfo: string;
}

export default function CriarProjetoPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [form, setForm] = useState<FormState>({
    title: '', description: '', problem: '', solution: '', revenueModel: '',
    targetAmount: '', deadline: '', returnType: '', returnRate: '', risks: '', teamInfo: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (loading) return;
    if (!user) { router.push('/login'); return; }
    if (user.role !== 'entrepreneur' && user.role !== 'admin') { router.push('/dashboard'); return; }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, loading]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      await api.post('/projects', {
        ...form,
        targetAmount: Number(form.targetAmount),
        returnRate: form.returnRate ? Number(form.returnRate) : undefined,
      });
      router.push('/dashboard/empreendedor');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Erro ao criar projeto');
    } finally {
      setSubmitting(false);
    }
  };

  interface FieldProps {
    label: string;
    name: keyof FormState;
    type?: string;
    textarea?: boolean;
    required?: boolean;
  }

  const Field = ({ label, name, type = 'text', textarea = false, required = false }: FieldProps) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}{required && <span className="text-red-500 ml-1">*</span>}</label>
      {textarea ? (
        <textarea name={name} value={form[name]} onChange={handleChange} required={required} rows={3}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
      ) : (
        <input type={type} name={name} value={form[name]} onChange={handleChange} required={required}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-indigo-700 text-white py-12">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-3xl font-bold">Criar Novo Projeto</h1>
          <p className="mt-1 text-indigo-200">Preencha todas as informações do seu projeto</p>
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-4 py-10">
        <div className="bg-white rounded-2xl p-8 shadow-sm">
          {error && <div className="mb-6 p-3 bg-red-50 text-red-700 rounded-lg text-sm">{error}</div>}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="md:col-span-2"><Field label="Título do Projeto" name="title" required /></div>
              <div className="md:col-span-2"><Field label="Descrição" name="description" textarea required /></div>
              <div className="md:col-span-2"><Field label="Problema que Resolve" name="problem" textarea required /></div>
              <div className="md:col-span-2"><Field label="Solução Proposta" name="solution" textarea required /></div>
              <div className="md:col-span-2"><Field label="Modelo de Receita" name="revenueModel" textarea required /></div>
              <Field label="Meta de Captação (R$)" name="targetAmount" type="number" required />
              <Field label="Prazo" name="deadline" />
              <Field label="Tipo de Retorno" name="returnType" />
              <Field label="Taxa de Retorno (%)" name="returnRate" type="number" />
              <div className="md:col-span-2"><Field label="Riscos" name="risks" textarea /></div>
              <div className="md:col-span-2"><Field label="Informações do Time" name="teamInfo" textarea /></div>
            </div>
            <div className="flex gap-4">
              <button type="button" onClick={() => router.back()} className="px-6 py-2.5 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition">
                Cancelar
              </button>
              <button type="submit" disabled={submitting} className="flex-1 bg-indigo-600 text-white py-2.5 rounded-lg font-bold hover:bg-indigo-700 transition disabled:opacity-50">
                {submitting ? 'Criando...' : 'Criar Projeto'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
