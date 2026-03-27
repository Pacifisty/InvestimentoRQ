'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;
    if (!user) { router.push('/login'); return; }
    if (user.role === 'investor') router.push('/dashboard/investidor');
    else if (user.role === 'entrepreneur') router.push('/dashboard/empreendedor');
    else if (user.role === 'admin') router.push('/dashboard/admin');
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, loading]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-gray-500">Redirecionando...</div>
    </div>
  );
}
