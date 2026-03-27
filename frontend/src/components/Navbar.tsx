'use client';

import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <nav className="bg-indigo-700 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link href="/" className="text-xl font-bold tracking-tight">
            InvestimentoRQ
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/explorar" className="hover:text-indigo-200 transition">Explorar</Link>
            <Link href="/como-funciona" className="hover:text-indigo-200 transition">Como Funciona</Link>
            {user ? (
              <>
                <Link href="/dashboard" className="hover:text-indigo-200 transition">Dashboard</Link>
                <button onClick={handleLogout} className="bg-white text-indigo-700 px-4 py-1.5 rounded-lg font-semibold hover:bg-indigo-50 transition">
                  Sair
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="hover:text-indigo-200 transition">Entrar</Link>
                <Link href="/cadastro" className="bg-white text-indigo-700 px-4 py-1.5 rounded-lg font-semibold hover:bg-indigo-50 transition">
                  Cadastrar
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
