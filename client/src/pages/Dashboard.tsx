import { useState } from 'react';
import { useApp } from '@/contexts/AppContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Download, Printer, Edit3, PieChart } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { PrintableMenu } from '@/components/PrintableMenu';

export default function DashboardView() {
  const {
    weeks,
    selectedWeek,
    setSelectedWeek,
    salesMix,
    setSalesMix,
    calculateDishCost,
    sellingPrice,
    productionVolume,
    updateDishName,
    updateDaySides,
    importRecipeToMenu,
    recipes,
  } = useApp();

  const [isEditing, setIsEditing] = useState(false);
  const [showPrintView, setShowPrintView] = useState(false);

  const currentWeekData = weeks.find((w) => w.id === selectedWeek) || weeks[0];

  // Calcular custo médio ponderado
  let totalWeightedCost = 0;
  let daysCount = 0;

  if (currentWeekData) {
    currentWeekData.days.forEach((d) => {
      const costOp1 = calculateDishCost(d.dishes[0]);
      const costOp2 = calculateDishCost(d.dishes[1]);
      const costOp3 = calculateDishCost(d.dishes[2]);

      const weightedDailyCost =
        (costOp1 * salesMix.op1) / 100 +
        (costOp2 * salesMix.op2) / 100 +
        (costOp3 * salesMix.op3) / 100;
      totalWeightedCost += weightedDailyCost;
      daysCount++;
    });
  }

  const avgCost = daysCount > 0 ? totalWeightedCost / daysCount : 0;
  const profitPerUnit = sellingPrice - avgCost;
  const monthlyProfit = profitPerUnit * productionVolume * 24;

  const handlePrint = () => {
    setShowPrintView(true);
    // Aguardar renderização e então imprimir
    setTimeout(() => {
      window.print();
      setShowPrintView(false);
    }, 100);
  };

  const downloadCSV = () => {
    if (!currentWeekData) return;

    let csv = 'Dia,Opção 1,Opção 2,Opção 3,Guarnições\n';
    currentWeekData.days.forEach((day) => {
      csv += `${day.name},${day.dishes[0].name},${day.dishes[1].name},${day.dishes[2].name},"${day.sides.join(' + ')}"\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `cardapio_${currentWeekData.title}.csv`;
    link.click();
  };

  return (
    <div className="space-y-6">
      {/* Cards de Métricas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 print:hidden">
        <Card className="p-6 border-l-4 border-blue-500">
          <div className="text-sm font-bold text-gray-500">Custo Médio Ponderado</div>
          <div className="text-3xl font-bold text-gray-800">R$ {avgCost.toFixed(2)}</div>
          <div className="text-xs text-gray-400">Baseado no mix de vendas</div>
        </Card>
        <Card className="p-6 border-l-4 border-green-500">
          <div className="text-sm font-bold text-gray-500">Lucro Médio / UN</div>
          <div className="text-3xl font-bold text-green-600">R$ {profitPerUnit.toFixed(2)}</div>
        </Card>
        <Card className="p-6 border-l-4 border-purple-500">
          <div className="text-sm font-bold text-gray-500">Lucro Mensal Est.</div>
          <div className="text-3xl font-bold text-purple-600">
            R$ {monthlyProfit.toLocaleString('pt-BR', { maximumFractionDigits: 0 })}
          </div>
        </Card>
      </div>

      {/* Mix de Vendas */}
      <Card className="p-4 print:hidden">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <PieChart className="text-orange-500" />
            <div>
              <h3 className="font-bold text-gray-700">Mix de Vendas Estimado</h3>
              <p className="text-xs text-gray-500">Defina a % de saída de cada opção.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex flex-col items-center">
              <span className="text-xs font-bold text-gray-500">Opção 1</span>
              <div className="flex items-center gap-1">
                <Input
                  type="number"
                  className="w-16 text-center"
                  value={salesMix.op1}
                  onChange={(e) => setSalesMix({ ...salesMix, op1: parseInt(e.target.value) || 0 })}
                />
                <span>%</span>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-xs font-bold text-gray-500">Opção 2</span>
              <div className="flex items-center gap-1">
                <Input
                  type="number"
                  className="w-16 text-center"
                  value={salesMix.op2}
                  onChange={(e) => setSalesMix({ ...salesMix, op2: parseInt(e.target.value) || 0 })}
                />
                <span>%</span>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-xs font-bold text-gray-500">Opção 3</span>
              <div className="flex items-center gap-1">
                <Input
                  type="number"
                  className="w-16 text-center"
                  value={salesMix.op3}
                  onChange={(e) => setSalesMix({ ...salesMix, op3: parseInt(e.target.value) || 0 })}
                />
                <span>%</span>
              </div>
            </div>
          </div>
          <div
            className={`text-sm font-bold ${
              salesMix.op1 + salesMix.op2 + salesMix.op3 !== 100 ? 'text-red-500' : 'text-green-600'
            }`}
          >
            Total: {salesMix.op1 + salesMix.op2 + salesMix.op3}%
          </div>
        </div>
      </Card>

      {/* Cardápio */}
      <Card className="p-6">
        <div className="flex justify-between mb-4 items-center print:hidden">
          <h2 className="text-xl font-bold flex gap-2 items-center">
            <Calendar /> Cardápio: {currentWeekData.title}
          </h2>
          <div className="flex gap-2">
            <Select value={selectedWeek.toString()} onValueChange={(v) => setSelectedWeek(parseInt(v))}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {weeks.map((w) => (
                  <SelectItem key={w.id} value={w.id.toString()}>
                    {w.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button onClick={downloadCSV} variant="default" size="sm">
              <Download size={14} className="mr-1" /> Excel
            </Button>
            <Button onClick={handlePrint} variant="outline" size="sm">
              <Printer size={14} className="mr-1" /> Imprimir
            </Button>
            <Button onClick={() => setIsEditing(!isEditing)} variant="outline" size="sm">
              <Edit3 size={14} className="mr-1" /> {isEditing ? 'Salvar' : 'Editar'}
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left border-collapse">
            <thead className="bg-gray-100 font-bold text-gray-600">
              <tr>
                <th className="p-3 border">Dia</th>
                <th className="p-3 border">Opção 1 ({salesMix.op1}%)</th>
                <th className="p-3 border">Opção 2 ({salesMix.op2}%)</th>
                <th className="p-3 border">Opção 3 ({salesMix.op3}%)</th>
                <th className="p-3 border">Guarnições</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {currentWeekData.days.map((day, dIdx) => (
                <tr key={dIdx} className="hover:bg-gray-50">
                  <td className="p-3 font-bold border">{day.name}</td>
                  {day.dishes.map((dish, dishIdx) => (
                    <td key={dishIdx} className="p-3 border align-top">
                      {isEditing ? (
                        <div className="flex flex-col gap-1">
                          <Select
                            onValueChange={(v) => importRecipeToMenu(selectedWeek, dIdx, dishIdx, parseInt(v))}
                          >
                            <SelectTrigger className="text-xs">
                              <SelectValue placeholder="Buscar Receita..." />
                            </SelectTrigger>
                            <SelectContent>
                              {['bovina', 'frango', 'peixe', 'porco', 'unicos'].map((cat) => {
                                const categoryRecipes = recipes.filter((r) => r.category === cat);
                                const categoryLabels: Record<string, string> = {
                                  bovina: '🥩 CARNE BOVINA',
                                  frango: '🍗 FRANGO',
                                  peixe: '🐟 PEIXE',
                                  porco: '🥓 PORCO',
                                  unicos: '🍲 PRATOS ÚNICOS',
                                };
                                return [
                                  <SelectItem key={`cat-${cat}`} value={`cat-${cat}`} disabled className="font-bold text-orange-600 bg-orange-50">
                                    {categoryLabels[cat]}
                                  </SelectItem>,
                                  ...categoryRecipes.map((r) => (
                                    <SelectItem key={r.id} value={r.id.toString()}>
                                      {r.name}
                                    </SelectItem>
                                  )),
                                ];
                              })}
                            </SelectContent>
                          </Select>
                          <Input
                            className="text-xs"
                            value={dish.name}
                            onChange={(e) => updateDishName(selectedWeek, dIdx, dishIdx, e.target.value)}
                          />
                        </div>
                      ) : (
                        <div>
                          <div className="font-medium">{dish.name}</div>
                          <div className="text-xs text-green-600 print:hidden">
                            R$ {calculateDishCost(dish).toFixed(2)}
                          </div>
                        </div>
                      )}
                    </td>
                  ))}
                  <td className="p-3 border text-xs text-gray-600">
                    {isEditing ? (
                      <Input
                        className="w-full text-xs"
                        value={day.sides.join('+')}
                        onChange={(e) => updateDaySides(selectedWeek, dIdx, e.target.value)}
                      />
                    ) : (
                      day.sides.join(' + ')
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Componente de Impressão (oculto até imprimir) */}
      {showPrintView && (
        <div className="fixed inset-0 bg-white z-50">
          <PrintableMenu week={currentWeekData} recipes={recipes} />
        </div>
      )}
    </div>
  );
}
