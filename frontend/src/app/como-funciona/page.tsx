export default function ComoFuncionaPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-indigo-700 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl font-bold">Como Funciona</h1>
          <p className="mt-2 text-indigo-200">Entenda o processo de investimento na InvestimentoRQ</p>
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="space-y-8">
          {[
            {
              step: 1, title: 'Cadastro', color: 'bg-indigo-500',
              desc: 'Crie sua conta gratuita como investidor ou empreendedor. O processo leva menos de 2 minutos.',
            },
            {
              step: 2, title: 'Exploração', color: 'bg-blue-500',
              desc: 'Navegue pelos projetos disponíveis, veja detalhes, modelo de negócio, time e projeções financeiras.',
            },
            {
              step: 3, title: 'Análise', color: 'bg-indigo-600',
              desc: 'Avalie os riscos e oportunidades de cada projeto. Todos os projetos passam por revisão administrativa.',
            },
            {
              step: 4, title: 'Investimento', color: 'bg-blue-600',
              desc: 'Decida o valor a investir. Nossa simulação garante transparência total sobre o retorno esperado.',
            },
            {
              step: 5, title: 'Acompanhamento', color: 'bg-indigo-700',
              desc: 'Acompanhe seus investimentos em tempo real através do dashboard personalizado.',
            },
          ].map((item) => (
            <div key={item.step} className="bg-white rounded-2xl p-8 shadow-sm flex gap-6">
              <div className={`${item.color} text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold shrink-0`}>
                {item.step}
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{item.title}</h3>
                <p className="text-gray-500">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-indigo-50 rounded-2xl p-8 border border-indigo-100">
          <h2 className="text-2xl font-bold text-indigo-700 mb-4">Para Empreendedores</h2>
          <ol className="list-decimal list-inside space-y-3 text-gray-600">
            <li>Cadastre-se como empreendedor</li>
            <li>Submeta seu projeto com todas as informações necessárias</li>
            <li>Aguarde a aprovação da nossa equipe administrativa</li>
            <li>Uma vez aprovado, seu projeto fica visível para investidores</li>
            <li>Acompanhe as captações no seu dashboard</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
