import { useMemo } from 'react';
import { useApp } from '../contexts/AppContext';
import { Card } from '../components/ui/card';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, DollarSign, Award, PieChart as PieChartIcon } from 'lucide-react';

export default function AnalyticsView() {
  const {
    weeks,
    recipes,
    ingredients,
    getRecipeCost,
    sellingPrice,
    calculateCMV,
    calculateMarkup,
    calculateNetPrice,
    taxConfig,
  } = useApp();

  // Calcular evolução de custos por semana
  const costEvolution = useMemo(() => {
    return weeks.map((week) => {
      let totalCost = 0;
      let daysCount = 0;

      week.days.forEach((day) => {
        day.dishes.forEach((dish) => {
          const recipe = recipes.find((r) => r.id === dish.recipeId);
          if (recipe) {
            totalCost += getRecipeCost(recipe);
            daysCount++;
          }
        });
      });

      const avgCost = daysCount > 0 ? totalCost / daysCount : 0;

      return {
        name: week.title,
        custo: parseFloat(avgCost.toFixed(2)),
        lucro: parseFloat((sellingPrice - avgCost).toFixed(2)),
      };
    });
  }, [weeks, recipes, getRecipeCost, sellingPrice]);

  // Ranking de receitas mais lucrativas
  const recipeProfitability = useMemo(() => {
    const recipeStats = recipes.map((recipe) => {
      const cost = getRecipeCost(recipe);
      const profit = sellingPrice - cost;
      const margin = ((profit / sellingPrice) * 100);

      return {
        id: recipe.id,
        name: recipe.name,
        category: recipe.category,
        cost: parseFloat(cost.toFixed(2)),
        profit: parseFloat(profit.toFixed(2)),
        margin: parseFloat(margin.toFixed(1)),
      };
    });

    return recipeStats
      .sort((a, b) => b.profit - a.profit)
      .slice(0, 15);
  }, [recipes, getRecipeCost, sellingPrice]);

  // Distribuição de custos por categoria de ingrediente
  const costByCategory = useMemo(() => {
    const categoryTotals: Record<string, number> = {
      protein: 0,
      grain: 0,
      veg: 0,
      fruit: 0,
      misc: 0,
      ops: 0,
    };

    weeks.forEach((week) => {
      week.days.forEach((day) => {
        day.dishes.forEach((dish) => {
          const recipe = recipes.find((r) => r.id === dish.recipeId);
          if (recipe && recipe.components) {
            recipe.components.forEach((comp) => {
              const ing = ingredients.find((i) => i.id === comp.id);
              if (ing) {
                categoryTotals[ing.category] += ing.price * comp.qty;
              }
            });
          }
        });
      });
    });

    const categoryLabels: Record<string, string> = {
      protein: 'Proteínas',
      grain: 'Cereais',
      veg: 'Legumes',
      fruit: 'Frutas',
      misc: 'Mercearia',
      ops: 'Operacional',
    };

    const COLORS = ['#ef4444', '#f59e0b', '#10b981', '#ec4899', '#f97316', '#6b7280'];

    return Object.entries(categoryTotals)
      .map(([key, value], index) => ({
        name: categoryLabels[key],
        value: parseFloat(value.toFixed(2)),
        color: COLORS[index],
      }))
      .filter((item) => item.value > 0)
      .sort((a, b) => b.value - a.value);
  }, [weeks, recipes, ingredients]);

  // Comparativo de categorias de receitas
  const categoryComparison = useMemo(() => {
    const categories = ['bovina', 'frango', 'peixe', 'porco', 'unicos'];
    const categoryLabels: Record<string, string> = {
      bovina: 'Bovina',
      frango: 'Frango',
      peixe: 'Peixe',
      porco: 'Porco',
      unicos: 'Únicos',
    };

    return categories.map((cat) => {
      const categoryRecipes = recipes.filter((r) => r.category === cat);
      const avgCost = categoryRecipes.reduce((acc, r) => acc + getRecipeCost(r), 0) / (categoryRecipes.length || 1);
      const avgProfit = sellingPrice - avgCost;
      const avgMargin = ((avgProfit / sellingPrice) * 100);

      return {
        name: categoryLabels[cat],
        custo: parseFloat(avgCost.toFixed(2)),
        lucro: parseFloat(avgProfit.toFixed(2)),
        margem: parseFloat(avgMargin.toFixed(1)),
        quantidade: categoryRecipes.length,
      };
    });
  }, [recipes, getRecipeCost, sellingPrice]);

  const totalCostDistribution = costByCategory.reduce((acc, item) => acc + item.value, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <TrendingUp className="text-blue-600" size={32} />
        <h1 className="text-2xl font-bold text-gray-800">Analytics & Relatórios</h1>
      </div>

      {/* Cards de Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4 border-l-4 border-blue-500">
          <div className="text-xs font-bold text-gray-500">Total de Receitas</div>
          <div className="text-2xl font-bold text-gray-800">{recipes.length}</div>
        </Card>
        <Card className="p-4 border-l-4 border-green-500">
          <div className="text-xs font-bold text-gray-500">Receita Mais Lucrativa</div>
          <div className="text-lg font-bold text-green-600 truncate">
            {recipeProfitability[0]?.name || '-'}
          </div>
          <div className="text-xs text-gray-500">
            R$ {recipeProfitability[0]?.profit.toFixed(2)} lucro
          </div>
        </Card>
        <Card className="p-4 border-l-4 border-orange-500">
          <div className="text-xs font-bold text-gray-500">Margem Média</div>
          <div className="text-2xl font-bold text-orange-600">
            {((recipeProfitability.reduce((acc, r) => acc + r.margin, 0) / recipeProfitability.length) || 0).toFixed(1)}%
          </div>
        </Card>
        <Card className="p-4 border-l-4 border-purple-500">
          <div className="text-xs font-bold text-gray-500">Semanas Planejadas</div>
          <div className="text-2xl font-bold text-purple-600">{weeks.length}</div>
        </Card>
      </div>

      {/* Índices Gerenciais */}
      <Card className="p-6 bg-linear-to-r from-blue-50 to-cyan-50 border-2 border-blue-200">
        <h3 className="text-xl font-bold text-blue-900 mb-4 flex items-center gap-2">
          <DollarSign /> Índices Gerenciais
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-xs font-bold text-gray-500 mb-1">Preço de Venda</div>
            <div className="text-2xl font-bold text-gray-800">R$ {sellingPrice.toFixed(2)}</div>
            <div className="text-xs text-gray-500 mt-1">Valor bruto</div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-xs font-bold text-gray-500 mb-1">Preço Líquido</div>
            <div className="text-2xl font-bold text-blue-600">R$ {calculateNetPrice().toFixed(2)}</div>
            <div className="text-xs text-gray-500 mt-1">Após impostos ({(taxConfig.icms + taxConfig.pisCofins + taxConfig.iss + taxConfig.deliveryFee + taxConfig.cardFee).toFixed(1)}%)</div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-xs font-bold text-gray-500 mb-1">CMV Médio</div>
            <div className={`text-2xl font-bold ${(() => {
              const avgCost = recipeProfitability.reduce((acc, r) => acc + r.cost, 0) / recipeProfitability.length;
              const cmv = calculateCMV(avgCost);
              return cmv > 70 ? 'text-red-600' : cmv > 50 ? 'text-yellow-600' : 'text-green-600';
            })()}`}>
              {(() => {
                const avgCost = recipeProfitability.reduce((acc, r) => acc + r.cost, 0) / recipeProfitability.length;
                return calculateCMV(avgCost).toFixed(1);
              })()}%
            </div>
            <div className="text-xs text-gray-500 mt-1">Ideal: abaixo de 50%</div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-xs font-bold text-gray-500 mb-1">Markup Médio</div>
            <div className="text-2xl font-bold text-purple-600">
              {(() => {
                const avgCost = recipeProfitability.reduce((acc, r) => acc + r.cost, 0) / recipeProfitability.length;
                return calculateMarkup(avgCost).toFixed(2);
              })()}x
            </div>
            <div className="text-xs text-gray-500 mt-1">Preço / Custo</div>
          </div>
        </div>
        
        <div className="mt-4 p-4 bg-white rounded-lg">
          <h4 className="font-bold text-gray-800 mb-2 text-sm">Breakdown de Impostos e Taxas</h4>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 text-sm">
            <div>
              <div className="text-gray-600">ICMS:</div>
              <div className="font-bold text-gray-800">{taxConfig.icms.toFixed(2)}%</div>
            </div>
            <div>
              <div className="text-gray-600">PIS/COFINS:</div>
              <div className="font-bold text-gray-800">{taxConfig.pisCofins.toFixed(2)}%</div>
            </div>
            <div>
              <div className="text-gray-600">ISS:</div>
              <div className="font-bold text-gray-800">{taxConfig.iss.toFixed(2)}%</div>
            </div>
            <div>
              <div className="text-gray-600">Delivery:</div>
              <div className="font-bold text-gray-800">{taxConfig.deliveryFee.toFixed(2)}%</div>
            </div>
            <div>
              <div className="text-gray-600">Cartão:</div>
              <div className="font-bold text-gray-800">{taxConfig.cardFee.toFixed(2)}%</div>
            </div>
          </div>
        </div>
      </Card>

      {/* Evolução de Custos */}
      <Card className="p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
          <TrendingUp size={20} className="text-blue-600" />
          Evolução de Custos e Lucro por Semana
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={costEvolution}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip formatter={(value) => `R$ ${value}`} />
            <Legend />
            <Line type="monotone" dataKey="custo" stroke="#ef4444" strokeWidth={2} name="Custo Médio" />
            <Line type="monotone" dataKey="lucro" stroke="#10b981" strokeWidth={2} name="Lucro Médio" />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Distribuição de Custos por Categoria */}
        <Card className="p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <PieChartIcon size={20} className="text-orange-600" />
            Distribuição de Custos por Categoria
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={costByCategory}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {costByCategory.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `R$ ${value}`} />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2">
            {costByCategory.map((item, idx) => (
              <div key={idx} className="flex justify-between items-center text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded" style={{ backgroundColor: item.color }}></div>
                  <span className="font-medium">{item.name}</span>
                </div>
                <div className="flex gap-4">
                  <span className="text-gray-600">R$ {item.value.toFixed(2)}</span>
                  <span className="text-gray-500">
                    {((item.value / totalCostDistribution) * 100).toFixed(1)}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Comparativo por Categoria de Receita */}
        <Card className="p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <DollarSign size={20} className="text-green-600" />
            Comparativo por Tipo de Proteína
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={categoryComparison}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="custo" fill="#ef4444" name="Custo Médio" />
              <Bar dataKey="lucro" fill="#10b981" name="Lucro Médio" />
            </BarChart>
          </ResponsiveContainer>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-2 text-left">Categoria</th>
                  <th className="p-2 text-right">Qtd</th>
                  <th className="p-2 text-right">Margem</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {categoryComparison.map((cat, idx) => (
                  <tr key={idx}>
                    <td className="p-2 font-medium">{cat.name}</td>
                    <td className="p-2 text-right">{cat.quantidade}</td>
                    <td className="p-2 text-right font-bold text-green-600">{cat.margem}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      {/* Ranking de Receitas Mais Lucrativas */}
      <Card className="p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
          <Award size={20} className="text-yellow-600" />
          Top 15 Receitas Mais Lucrativas
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left">Posição</th>
                <th className="p-3 text-left">Receita</th>
                <th className="p-3 text-left">Categoria</th>
                <th className="p-3 text-right">Custo</th>
                <th className="p-3 text-right">Lucro</th>
                <th className="p-3 text-right">Margem</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {recipeProfitability.map((recipe, idx) => (
                <tr key={recipe.id} className="hover:bg-gray-50">
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      {idx < 3 && (
                        <Award
                          size={16}
                          className={
                            idx === 0
                              ? 'text-yellow-500'
                              : idx === 1
                              ? 'text-gray-400'
                              : 'text-orange-600'
                          }
                        />
                      )}
                      <span className="font-bold">{idx + 1}º</span>
                    </div>
                  </td>
                  <td className="p-3 font-medium">{recipe.name}</td>
                  <td className="p-3">
                    <span className="inline-block px-2 py-1 bg-orange-100 text-orange-700 text-xs rounded">
                      {recipe.category}
                    </span>
                  </td>
                  <td className="p-3 text-right text-red-600 font-medium">
                    R$ {recipe.cost.toFixed(2)}
                  </td>
                  <td className="p-3 text-right text-green-600 font-bold">
                    R$ {recipe.profit.toFixed(2)}
                  </td>
                  <td className="p-3 text-right">
                    <span
                      className={`font-bold ${
                        recipe.margin >= 70
                          ? 'text-green-600'
                          : recipe.margin >= 60
                          ? 'text-yellow-600'
                          : 'text-red-600'
                      }`}
                    >
                      {recipe.margin}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Insights */}
      <Card className="p-6 bg-linear-to-r from-blue-50 to-indigo-50">
        <h3 className="text-lg font-bold text-gray-800 mb-4">💡 Insights e Recomendações</h3>
        <div className="space-y-3 text-sm text-gray-700">
          <p>
            <strong>Melhor categoria:</strong>{' '}
            {categoryComparison.sort((a, b) => b.margem - a.margem)[0]?.name} com margem média de{' '}
            {categoryComparison.sort((a, b) => b.margem - a.margem)[0]?.margem}%
          </p>
          <p>
            <strong>Maior custo:</strong> {costByCategory[0]?.name} representa{' '}
            {((costByCategory[0]?.value / totalCostDistribution) * 100).toFixed(1)}% dos custos totais
          </p>
          <p>
            <strong>Recomendação:</strong> Priorize receitas com margem acima de 65% e considere revisar
            receitas com margem abaixo de 55% para melhorar a rentabilidade.
          </p>
        </div>
      </Card>
    </div>
  );
}
