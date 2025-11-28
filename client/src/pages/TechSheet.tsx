import { useState } from 'react';
import { useApp } from '@/contexts/AppContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ClipboardList, Printer } from 'lucide-react';

export default function TechSheetView() {
  const { recipes, ingredients, getRecipeCost, getRecipeCostBreakdown } = useApp();
  const [selectedRecipeId, setSelectedRecipeId] = useState<number | null>(null);
  const [search, setSearch] = useState('');

  const selectedRecipe = recipes.find((r) => r.id === selectedRecipeId);

  const filteredRecipes = recipes.filter((r) =>
    r.name.toLowerCase().includes(search.toLowerCase())
  );

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <ClipboardList /> Fichas Técnicas
        </h1>
        {selectedRecipe && (
          <Button onClick={handlePrint} variant="outline" size="sm">
            <Printer size={14} className="mr-1" /> Imprimir
          </Button>
        )}
      </div>

      {/* Seletor de Receita */}
      <Card className="p-4 print:hidden">
        <div className="flex gap-4">
          <Input
            placeholder="Buscar receita..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="max-w-xs"
          />
          <Select
            value={selectedRecipeId?.toString() || ''}
            onValueChange={(v) => setSelectedRecipeId(parseInt(v))}
          >
            <SelectTrigger className="w-96">
              <SelectValue placeholder="Selecione uma receita" />
            </SelectTrigger>
            <SelectContent>
              {filteredRecipes.map((r) => (
                <SelectItem key={r.id} value={r.id.toString()}>
                  {r.name} ({r.category})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </Card>

      {/* Ficha Técnica */}
      {selectedRecipe ? (
        <Card className="p-8">
          <div className="border-b-2 border-gray-300 pb-4 mb-6">
            <h2 className="text-3xl font-bold text-gray-800">{selectedRecipe.name}</h2>
            <p className="text-gray-600 mt-1">{selectedRecipe.desc}</p>
            <div className="mt-2">
              <span className="inline-block px-3 py-1 bg-orange-100 text-orange-700 text-sm rounded-full font-semibold">
                {selectedRecipe.category.toUpperCase()}
              </span>
            </div>
          </div>

          {/* Informações Gerais */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="text-sm text-gray-600">Rendimento</div>
              <div className="text-2xl font-bold text-blue-600">1 porção</div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="text-sm text-gray-600">Custo Unitário</div>
              <div className="text-2xl font-bold text-green-600">
                R$ {getRecipeCost(selectedRecipe).toFixed(2)}
              </div>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="text-sm text-gray-600">Ingredientes</div>
              <div className="text-2xl font-bold text-purple-600">
                {selectedRecipe.components.length}
              </div>
            </div>
          </div>

          {/* Breakdown de Custos */}
          <div className="mb-6">
            <h3 className="text-xl font-bold text-gray-800 mb-3 border-b pb-2">
              Detalhamento de Custos
            </h3>
            {(() => {
              const breakdown = getRecipeCostBreakdown(selectedRecipe);
              return (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-orange-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-600 mb-1">🍖 Ingredientes da Receita</div>
                    <div className="text-2xl font-bold text-orange-600">
                      R$ {breakdown.componentsCost.toFixed(2)}
                    </div>
                  </div>
                  <div className="bg-amber-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-600 mb-1">🌾 Base (Arroz, Feijão, etc)</div>
                    <div className="text-2xl font-bold text-amber-600">
                      R$ {breakdown.baseCost.toFixed(2)}
                    </div>
                  </div>
                  <div className="bg-emerald-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-600 mb-1">🥬 Guarnições</div>
                    <div className="text-2xl font-bold text-emerald-600">
                      R$ {breakdown.garnishCost.toFixed(2)}
                    </div>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-600 mb-1">📦 Embalagem</div>
                    <div className="text-2xl font-bold text-blue-600">
                      R$ {breakdown.packagingCost.toFixed(2)}
                    </div>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-600 mb-1">⚙️ Custos Fixos Alocados</div>
                    <div className="text-2xl font-bold text-slate-600">
                      R$ {breakdown.fixedCost.toFixed(2)}
                    </div>
                  </div>
                  <div className="bg-green-100 p-4 rounded-lg border-2 border-green-500">
                    <div className="text-sm text-gray-700 mb-1 font-bold">CUSTO TOTAL</div>
                    <div className="text-3xl font-bold text-green-600">
                      R$ {breakdown.total.toFixed(2)}
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>

          {/* Ingredientes */}
          <div className="mb-6">
            <h3 className="text-xl font-bold text-gray-800 mb-3 border-b pb-2">
              Ingredientes
            </h3>
            <table className="w-full text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3 text-left font-bold">Ingrediente</th>
                  <th className="p-3 text-right font-bold">Quantidade Bruta</th>
                  <th className="p-3 text-right font-bold">Rendimento</th>
                  <th className="p-3 text-right font-bold">Qtd Líquida</th>
                  <th className="p-3 text-right font-bold">Preço Unit.</th>
                  <th className="p-3 text-right font-bold">Custo</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {selectedRecipe.components.map((comp, idx) => {
                  const ing = ingredients.find((i) => i.id === comp.id);
                  if (!ing) return null;
                  
                  const qtyBruta = comp.qty;
                  const qtyLiquida = qtyBruta * ing.yield;
                  const cost = qtyBruta * ing.price;

                  return (
                    <tr key={idx} className="hover:bg-gray-50">
                      <td className="p-3 font-medium">{ing.name}</td>
                      <td className="p-3 text-right">
                        {(qtyBruta * 1000).toFixed(0)}g
                      </td>
                      <td className="p-3 text-right text-gray-600">
                        {(ing.yield * 100).toFixed(0)}%
                      </td>
                      <td className="p-3 text-right font-bold">
                        {(qtyLiquida * 1000).toFixed(0)}g
                      </td>
                      <td className="p-3 text-right text-gray-600">
                        R$ {ing.price.toFixed(2)}/{ing.unit}
                      </td>
                      <td className="p-3 text-right font-bold text-green-600">
                        R$ {cost.toFixed(2)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot className="bg-gray-100 font-bold">
                <tr>
                  <td colSpan={5} className="p-3 text-right">
                    TOTAL (Componentes):
                  </td>
                  <td className="p-3 text-right text-green-600">
                    R${' '}
                    {selectedRecipe.components
                      .reduce((acc, comp) => {
                        const ing = ingredients.find((i) => i.id === comp.id);
                        return acc + (ing ? comp.qty * ing.price : 0);
                      }, 0)
                      .toFixed(2)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* Modo de Preparo */}
          <div className="mb-6">
            <h3 className="text-xl font-bold text-gray-800 mb-3 border-b pb-2">
              Modo de Preparo
            </h3>
            <div className="bg-amber-50 p-4 rounded-lg">
              <p className="text-gray-700">
                <strong>Nota:</strong> Esta é uma ficha técnica de custos. O modo de preparo
                detalhado deve ser documentado separadamente conforme os padrões da cozinha.
              </p>
              <p className="text-gray-600 mt-2 text-sm">
                Descrição básica: {selectedRecipe.desc}
              </p>
            </div>
          </div>

          {/* Observações */}
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-3 border-b pb-2">
              Observações
            </h3>
            <div className="space-y-2 text-sm text-gray-700">
              <p>• Todos os valores são calculados para 1 porção individual</p>
              <p>• O rendimento considera a perda no preparo (limpeza, cocção, etc.)</p>
              <p>• Custos incluem base (arroz, feijão, temperos) e embalagem</p>
              <p>• Preços podem variar conforme fornecedor e sazonalidade</p>
            </div>
          </div>
        </Card>
      ) : (
        <Card className="p-12 text-center text-gray-500">
          <ClipboardList size={64} className="mx-auto mb-4 text-gray-300" />
          <p className="text-lg">Selecione uma receita para visualizar a ficha técnica</p>
        </Card>
      )}
    </div>
  );
}
