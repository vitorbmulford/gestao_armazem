import { useState, useMemo } from 'react';
import { useApp } from '@/contexts/AppContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { ShoppingCart, Download, Printer } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface ShoppingItem {
  ingredientId: string;
  name: string;
  totalQty: number;
  unit: string;
  price: number;
  totalCost: number;
  category: string;
  checked: boolean;
}

export default function ShoppingView() {
  const {
    weeks,
    selectedWeek,
    setSelectedWeek,
    ingredients,
    recipes,
    baseConfig,
    productionVolume,
  } = useApp();

  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  const currentWeekData = weeks.find((w) => w.id === selectedWeek) || weeks[0];

  // Calcular lista de compras
  const shoppingList = useMemo(() => {
    const itemsMap: Record<string, ShoppingItem> = {};

    if (!currentWeekData) return [];

    // Para cada dia da semana
    currentWeekData.days.forEach((day) => {
      // Para cada prato do dia
      day.dishes.forEach((dish) => {
        const recipe = recipes.find((r) => r.id === dish.recipeId);
        if (recipe && recipe.components) {
          recipe.components.forEach((comp) => {
            const ing = ingredients.find((i) => i.id === comp.id);
            if (ing) {
              if (!itemsMap[ing.id]) {
                itemsMap[ing.id] = {
                  ingredientId: ing.id,
                  name: ing.name,
                  totalQty: 0,
                  unit: ing.unit,
                  price: ing.price,
                  totalCost: 0,
                  category: ing.category,
                  checked: checkedItems[ing.id] || false,
                };
              }
              // Quantidade bruta necessária (considerando volume de produção)
              const qtyNeeded = comp.qty * productionVolume;
              itemsMap[ing.id].totalQty += qtyNeeded;
            }
          });
        }
      });
    });

    // Adicionar base (arroz, feijão, etc) para cada dia
    const daysCount = currentWeekData.days.length;
    baseConfig.forEach((base) => {
      const ing = ingredients.find((i) => i.id === base.ingredientId);
      if (ing) {
        if (!itemsMap[ing.id]) {
          itemsMap[ing.id] = {
            ingredientId: ing.id,
            name: ing.name,
            totalQty: 0,
            unit: ing.unit,
            price: ing.price,
            totalCost: 0,
            category: ing.category,
            checked: checkedItems[ing.id] || false,
          };
        }
        itemsMap[ing.id].totalQty += base.qtyRaw * productionVolume * daysCount;
      }
    });

    // Calcular custo total
    Object.values(itemsMap).forEach((item) => {
      item.totalCost = item.totalQty * item.price;
    });

    return Object.values(itemsMap).sort((a, b) => a.name.localeCompare(b.name));
  }, [currentWeekData, recipes, ingredients, baseConfig, productionVolume, checkedItems]);

  const toggleCheck = (ingredientId: string) => {
    setCheckedItems((prev) => ({
      ...prev,
      [ingredientId]: !prev[ingredientId],
    }));
  };

  const totalCost = shoppingList.reduce((acc, item) => acc + item.totalCost, 0);

  const downloadCSV = () => {
    let csv = 'Ingrediente,Quantidade,Unidade,Preço Unit.,Total,Categoria\n';
    shoppingList.forEach((item) => {
      csv += `${item.name},${item.totalQty.toFixed(3)},${item.unit},${item.price.toFixed(2)},${item.totalCost.toFixed(2)},${item.category}\n`;
    });
    csv += `\nTOTAL,,,${totalCost.toFixed(2)}\n`;

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `lista_compras_${currentWeekData.title}.csv`;
    link.click();
  };

  const handlePrint = () => {
    window.print();
  };

  // Agrupar por categoria
  const groupedByCategory = shoppingList.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, ShoppingItem[]>);

  const categoryLabels: Record<string, string> = {
    protein: '🍖 Proteínas',
    grain: '🌾 Cereais',
    veg: '🥬 Legumes',
    fruit: '🍎 Frutas',
    misc: '🧂 Mercearia',
    ops: '⚙️ Operacional',
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <ShoppingCart /> Lista de Compras
        </h1>
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
        </div>
      </div>

      {/* Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 print:hidden">
        <Card className="p-6 border-l-4 border-blue-500">
          <div className="text-sm font-bold text-gray-500">Total de Itens</div>
          <div className="text-3xl font-bold text-gray-800">{shoppingList.length}</div>
        </Card>
        <Card className="p-6 border-l-4 border-green-500">
          <div className="text-sm font-bold text-gray-500">Custo Total</div>
          <div className="text-3xl font-bold text-green-600">R$ {totalCost.toFixed(2)}</div>
        </Card>
        <Card className="p-6 border-l-4 border-purple-500">
          <div className="text-sm font-bold text-gray-500">Volume de Produção</div>
          <div className="text-3xl font-bold text-purple-600">{productionVolume} un/dia</div>
        </Card>
      </div>

      {/* Lista Agrupada por Categoria */}
      <div className="space-y-4">
        {Object.entries(groupedByCategory).map(([category, items]) => (
          <Card key={category} className="overflow-hidden">
            <div className="bg-linear-to-r from-orange-500 to-amber-500 text-white p-3 font-bold">
              {categoryLabels[category] || category}
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-100 border-b">
                  <tr>
                    <th className="p-3 text-left w-12 print:hidden">✓</th>
                    <th className="p-3 text-left font-bold">Ingrediente</th>
                    <th className="p-3 text-right font-bold">Quantidade</th>
                    <th className="p-3 text-center font-bold">Unidade</th>
                    <th className="p-3 text-right font-bold">Preço Unit.</th>
                    <th className="p-3 text-right font-bold">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {items.map((item) => (
                    <tr
                      key={item.ingredientId}
                      className={`hover:bg-gray-50 ${item.checked ? 'bg-green-50' : ''}`}
                    >
                      <td className="p-3 print:hidden">
                        <Checkbox
                          checked={item.checked}
                          onCheckedChange={() => toggleCheck(item.ingredientId)}
                        />
                      </td>
                      <td className={`p-3 font-medium ${item.checked ? 'line-through text-gray-400' : ''}`}>
                        {item.name}
                      </td>
                      <td className="p-3 text-right font-bold">
                        {item.totalQty.toFixed(3)}
                      </td>
                      <td className="p-3 text-center text-gray-600">{item.unit}</td>
                      <td className="p-3 text-right text-gray-600">
                        R$ {item.price.toFixed(2)}
                      </td>
                      <td className="p-3 text-right font-bold text-green-600">
                        R$ {item.totalCost.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        ))}
      </div>

      {/* Total Geral */}
      <Card className="p-6 bg-linear-to-r from-green-50 to-emerald-50 border-2 border-green-500">
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold text-gray-700">TOTAL GERAL</span>
          <span className="text-3xl font-bold text-green-600">R$ {totalCost.toFixed(2)}</span>
        </div>
      </Card>
    </div>
  );
}
