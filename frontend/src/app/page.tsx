import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-indigo-700 to-blue-600 text-white py-24">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-extrabold mb-6 leading-tight">
            Invista no Futuro.<br />Transforme Ideias em Realidade.
          </h1>
          <p className="text-xl mb-10 text-indigo-100 max-w-2xl mx-auto">
            Conectamos investidores a projetos inovadores e empreendedores que estão mudando o mundo.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/explorar" className="bg-white text-indigo-700 px-8 py-3 rounded-xl font-bold text-lg hover:bg-indigo-50 transition shadow-lg">
              Explorar Projetos
            </Link>
            <Link href="/cadastro" className="border-2 border-white text-white px-8 py-3 rounded-xl font-bold text-lg hover:bg-white/10 transition">
              Começar Agora
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white py-16 border-b">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {[
            { value: 'R$ 2M+', label: 'Captado em projetos' },
            { value: '50+', label: 'Projetos financiados' },
            { value: '500+', label: 'Investidores ativos' },
          ].map((stat) => (
            <div key={stat.label} className="p-6">
              <div className="text-4xl font-extrabold text-indigo-600 mb-2">{stat.value}</div>
              <div className="text-gray-600 text-lg">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Como Funciona</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: '1', title: 'Cadastre-se', desc: 'Crie sua conta como investidor ou empreendedor em minutos.' },
              { step: '2', title: 'Explore Projetos', desc: 'Descubra projetos inovadores com potencial de retorno.' },
              { step: '3', title: 'Invista', desc: 'Faça seu investimento de forma segura e acompanhe o progresso.' },
            ].map((item) => (
              <div key={item.step} className="bg-white rounded-2xl p-8 shadow-sm text-center">
                <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-800">{item.title}</h3>
                <p className="text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-indigo-600 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Pronto para começar?</h2>
          <p className="text-indigo-100 mb-8 text-lg">Junte-se a centenas de investidores e empreendedores.</p>
          <Link href="/cadastro" className="bg-white text-indigo-700 px-10 py-4 rounded-xl font-bold text-lg hover:bg-indigo-50 transition shadow-lg">
            Criar Conta Grátis
          </Link>
        </div>
      </section>
    </div>
  );
}
