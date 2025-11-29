import { useState } from 'react';
import { useApp } from '../contexts/AppContext';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Plus, Trash2, Save, Edit3, X, Package } from 'lucide-react';
import { Ingredient } from '../contexts/AppContext';

export default function IngredientsView() {
  const { ingredients, addOrUpdateIngredient, deleteIngredient } = useApp();
  
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState<Ingredient>({
    id: '',
    name: '',
    price: 0,
    unit: 'kg',
    yield: 1,
    category: 'misc',
  });
  const [filter, setFilter] = useState<string>('all');
  const [search, setSearch] = useState('');

  const startEdit = (ingredient: Ingredient) => {
    setEditing(ingredient.id);
    setForm(ingredient);
  };

  const startNew = () => {
    setEditing('new');
    setForm({
      id: `ing_${Date.now()}`,
      name: '',
      price: 0,
      unit: 'kg',
      yield: 1,
      category: 'misc',
    });
  };

  const cancelEdit = () => {
    setEditing(null);
    setForm({
      id: '',
      name: '',
      price: 0,
      unit: 'kg',
      yield: 1,
      category: 'misc',
    });
  };

  const save = () => {
    if (!form.name || !form.id) return;
    addOrUpdateIngredient(form);
    cancelEdit();
  };

  const filteredIngredients = ingredients.filter((ing) => {
    const matchesCategory = filter === 'all' || ing.category === filter;
    const matchesSearch = ing.name.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const categories = [
    { id: 'all', label: 'Todos', icon: '📦' },
    { id: 'protein', label: 'Proteínas', icon: '🍖' },
    { id: 'grain', label: 'Cereais', icon: '🌾' },
    { id: 'veg', label: 'Legumes', icon: '🥬' },
    { id: 'fruit', label: 'Frutas', icon: '🍎' },
    { id: 'misc', label: 'Mercearia', icon: '🧂' },
    { id: 'ops', label: 'Operacional', icon: '⚙️' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <Package /> Lista de Insumos
        </h1>
        <Button onClick={startNew}>
          <Plus size={16} className="mr-1" /> Novo Ingrediente
        </Button>
      </div>

      {/* Filtros */}
      <Card className="p-4">
        <div className="flex gap-4 flex-wrap">
          <Input
            placeholder="Buscar ingrediente..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="max-w-xs"
          />
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat.id} value={cat.id}>
                  {cat.icon} {cat.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="text-sm text-gray-600 flex items-center">
            Total: <strong className="ml-1">{filteredIngredients.length}</strong> itens
          </div>
        </div>
      </Card>

      {/* Formulário de Edição */}
      {editing !== null && (
        <Card className="p-6 border-2 border-orange-500">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold">
              {editing === 'new' ? 'Novo Ingrediente' : 'Editar Ingrediente'}
            </h3>
            <Button variant="ghost" size="sm" onClick={cancelEdit}>
              <X size={16} />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="text-sm font-bold text-gray-700">Nome</label>
              <Input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Ex: Arroz Agulhinha"
              />
            </div>
            <div>
              <label className="text-sm font-bold text-gray-700">ID (único)</label>
              <Input
                value={form.id}
                onChange={(e) => setForm({ ...form, id: e.target.value })}
                placeholder="Ex: arr"
                disabled={editing !== 'new'}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="text-sm font-bold text-gray-700">Preço</label>
              <Input
                type="number"
                step="0.01"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: parseFloat(e.target.value) || 0 })}
                placeholder="0.00"
              />
            </div>
            <div>
              <label className="text-sm font-bold text-gray-700">Unidade</label>
              <Select value={form.unit} onValueChange={(v) => setForm({ ...form, unit: v })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="kg">kg</SelectItem>
                  <SelectItem value="L">L</SelectItem>
                  <SelectItem value="un">un</SelectItem>
                  <SelectItem value="mç">mç (maço)</SelectItem>
                  <SelectItem value="porção">porção</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-bold text-gray-700">Rendimento</label>
              <Input
                type="number"
                step="0.1"
                value={form.yield}
                onChange={(e) => setForm({ ...form, yield: parseFloat(e.target.value) || 1 })}
                placeholder="1.0"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="text-sm font-bold text-gray-700">Categoria</label>
            <Select
              value={form.category}
              onValueChange={(v) => setForm({ ...form, category: v as any })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="protein">🍖 Proteínas</SelectItem>
                <SelectItem value="grain">🌾 Cereais</SelectItem>
                <SelectItem value="veg">🥬 Legumes</SelectItem>
                <SelectItem value="fruit">🍎 Frutas</SelectItem>
                <SelectItem value="misc">🧂 Mercearia</SelectItem>
                <SelectItem value="ops">⚙️ Operacional</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-2">
            <Button onClick={save}>
              <Save size={16} className="mr-1" /> Salvar
            </Button>
            <Button variant="outline" onClick={cancelEdit}>
              Cancelar
            </Button>
          </div>
        </Card>
      )}

      {/* Tabela de Ingredientes */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="p-3 text-left font-bold">Ingrediente</th>
                <th className="p-3 text-left font-bold">Categoria</th>
                <th className="p-3 text-right font-bold">Preço</th>
                <th className="p-3 text-center font-bold">Unidade</th>
                <th className="p-3 text-center font-bold">Rendimento</th>
                <th className="p-3 text-center font-bold">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filteredIngredients.map((ing) => (
                <tr key={ing.id} className="hover:bg-gray-50">
                  <td className="p-3 font-medium">{ing.name}</td>
                  <td className="p-3">
                    <span className="inline-block px-2 py-1 bg-orange-100 text-orange-700 text-xs rounded">
                      {categories.find((c) => c.id === ing.category)?.label}
                    </span>
                  </td>
                  <td className="p-3 text-right font-bold text-green-600">
                    R$ {ing.price.toFixed(2)}
                  </td>
                  <td className="p-3 text-center text-gray-600">{ing.unit}</td>
                  <td className="p-3 text-center text-gray-600">{ing.yield.toFixed(2)}x</td>
                  <td className="p-3 text-center">
                    <div className="flex gap-1 justify-center">
                      <Button size="sm" variant="ghost" onClick={() => startEdit(ing)}>
                        <Edit3 size={14} />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => {
                          if (confirm(`Deseja excluir ${ing.name}?`)) {
                            deleteIngredient(ing.id);
                          }
                        }}
                      >
                        <Trash2 size={14} className="text-red-500" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {filteredIngredients.length === 0 && (
        <Card className="p-8 text-center text-gray-500">
          <p>Nenhum ingrediente encontrado.</p>
        </Card>
      )}
    </div>
  );
}
