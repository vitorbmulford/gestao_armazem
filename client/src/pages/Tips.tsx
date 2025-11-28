import { Card } from '@/components/ui/card';
import { Lightbulb, TrendingUp, DollarSign, ShoppingCart, Calendar, Scale, Leaf } from 'lucide-react';

export default function TipsView() {
  const tips = [
    {
      icon: DollarSign,
      title: 'Controle de Custos',
      color: 'text-green-600',
      bg: 'bg-green-50',
      items: [
        'Mantenha os preços dos ingredientes sempre atualizados',
        'Monitore o custo médio ponderado semanalmente',
        'Busque manter a margem de lucro acima de 60% do preço de venda',
        'Negocie descontos com fornecedores para compras em volume',
        'Considere ingredientes sazonais para reduzir custos',
      ],
    },
    {
      icon: ShoppingCart,
      title: 'Compras Inteligentes',
      color: 'text-blue-600',
      bg: 'bg-blue-50',
      items: [
        'Faça compras semanais baseadas no cardápio planejado',
        'Evite desperdício comprando apenas o necessário',
        'Compare preços entre diferentes fornecedores',
        'Aproveite promoções para ingredientes não perecíveis',
        'Mantenha um estoque mínimo de segurança',
      ],
    },
    {
      icon: Calendar,
      title: 'Planejamento de Cardápio',
      color: 'text-purple-600',
      bg: 'bg-purple-50',
      items: [
        'Varie as proteínas ao longo da semana',
        'Alterne entre receitas mais e menos elaboradas',
        'Considere o mix de vendas real para ajustar o cardápio',
        'Planeje receitas que compartilhem ingredientes',
        'Teste novas receitas antes de incluir no cardápio regular',
      ],
    },
    {
      icon: Scale,
      title: 'Padronização',
      color: 'text-orange-600',
      bg: 'bg-orange-50',
      items: [
        'Use sempre as mesmas quantidades para manter qualidade',
        'Treine a equipe nas fichas técnicas',
        'Pese os ingredientes ao invés de usar medidas caseiras',
        'Documente qualquer alteração nas receitas',
        'Mantenha fotos de referência dos pratos finalizados',
      ],
    },
    {
      icon: Leaf,
      title: 'Redução de Desperdício',
      color: 'text-emerald-600',
      bg: 'bg-emerald-50',
      items: [
        'Aproveite cascas e talos em caldos e refogados',
        'Congele sobras de ingredientes preparados',
        'Use o método PEPS (Primeiro que Entra, Primeiro que Sai)',
        'Reaproveite proteínas em receitas de pratos únicos',
        'Monitore a validade dos produtos perecíveis diariamente',
      ],
    },
    {
      icon: TrendingUp,
      title: 'Crescimento do Negócio',
      color: 'text-pink-600',
      bg: 'bg-pink-50',
      items: [
        'Acompanhe as receitas mais vendidas e ajuste o mix',
        'Peça feedback dos clientes regularmente',
        'Invista em embalagens de qualidade',
        'Considere opções vegetarianas e fit',
        'Mantenha consistência na qualidade e pontualidade',
      ],
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Lightbulb className="text-yellow-500" size={32} />
        <h1 className="text-2xl font-bold text-gray-800">Dicas para Gestão</h1>
      </div>

      <Card className="p-6 bg-linear-to-r from-amber-50 to-orange-50 border-2 border-orange-200">
        <p className="text-gray-700 leading-relaxed">
          <strong>Bem-vindo ao sistema de gestão!</strong> Estas dicas foram compiladas com base nas
          melhores práticas do setor de alimentação comercial. Aplique-as gradualmente e adapte à
          realidade do seu negócio para obter os melhores resultados.
        </p>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {tips.map((tip, idx) => {
          const Icon = tip.icon;
          return (
            <Card key={idx} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className={`${tip.bg} p-4 border-b`}>
                <div className="flex items-center gap-3">
                  <Icon className={tip.color} size={24} />
                  <h3 className="text-lg font-bold text-gray-800">{tip.title}</h3>
                </div>
              </div>
              <div className="p-4">
                <ul className="space-y-2">
                  {tip.items.map((item, itemIdx) => (
                    <li key={itemIdx} className="flex gap-2 text-sm text-gray-700">
                      <span className={`${tip.color} font-bold shrink-0`}>•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Fórmulas Importantes */}
      <Card className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <Scale /> Fórmulas Importantes
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-bold text-blue-800 mb-2">Custo Médio Ponderado</h4>
            <code className="text-sm text-gray-700">
              CMP = (Custo Op1 × %Op1) + (Custo Op2 × %Op2) + (Custo Op3 × %Op3)
            </code>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <h4 className="font-bold text-green-800 mb-2">Margem de Lucro</h4>
            <code className="text-sm text-gray-700">
              Margem = ((Preço Venda - Custo) / Preço Venda) × 100
            </code>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <h4 className="font-bold text-purple-800 mb-2">Ponto de Equilíbrio</h4>
            <code className="text-sm text-gray-700">
              PE = Custos Fixos / (Preço Venda - Custo Variável)
            </code>
          </div>
          <div className="bg-orange-50 p-4 rounded-lg">
            <h4 className="font-bold text-orange-800 mb-2">Rendimento</h4>
            <code className="text-sm text-gray-700">
              Qtd Líquida = Qtd Bruta × Fator de Rendimento
            </code>
          </div>
        </div>
      </Card>

      {/* Indicadores de Referência */}
      <Card className="p-6 bg-linear-to-r from-green-50 to-emerald-50">
        <h3 className="text-xl font-bold text-gray-800 mb-4">📊 Indicadores de Referência</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <div className="font-bold text-gray-700">Custo de Alimentos</div>
            <div className="text-gray-600">Ideal: 25-35% do preço de venda</div>
          </div>
          <div>
            <div className="font-bold text-gray-700">Desperdício Aceitável</div>
            <div className="text-gray-600">Máximo: 3-5% do total</div>
          </div>
          <div>
            <div className="font-bold text-gray-700">Margem de Lucro</div>
            <div className="text-gray-600">Ideal: 60-70% do preço de venda</div>
          </div>
        </div>
      </Card>
    </div>
  );
}
