import { useState } from 'react';
import { useApp } from '../contexts/AppContext';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Plus, Trash2, Save, Edit3, X, Package } from 'lucide-react';
import { GarnishTemplate} from '../contexts/AppContext';

export default function GarnishTemplatesView() {
  const { garnishTemplates, ingredients, recipes, addOrUpdateGarnishTemplate, deleteGarnishTemplate } = useApp();
  
  const [editing, setEditing] = useState<number | null>(null);
  const [form, setForm] = useState<Partial<GarnishTemplate>>({
    name: '',
    description: '',
    garnishes: [],
  });

  const startEdit = (template: GarnishTemplate) => {
    setEditing(template.id);
    setForm(template);
  };

  const startNew = () => {
    setEditing(-1);
    setForm({ name: '', description: '', garnishes: [] });
  };

  const cancelEdit = () => {
    setEditing(null);
    setForm({ name: '', description: '', garnishes: [] });
  };

  const save = () => {
    if (!form.name || !form.garnishes || form.garnishes.length === 0) {
      alert('Preencha o nome e adicione pelo menos uma guarnição');
      return;
    }
    addOrUpdateGarnishTemplate(form);
    cancelEdit();
  };

  const addGarnish = () => {
    setForm({
      ...form,
      garnishes: [...(form.garnishes || []), { qty: 1 }],
    });
  };

  const updateGarnish = (idx: number, field: 'id' | 'recipeId' | 'qty', value: string | number | undefined) => {
    const newGarnishes = [...(form.garnishes || [])];
    if (field === 'qty') {
      newGarnishes[idx][field] = parseFloat(value as string) || 0;
    } else if (field === 'id') {
      newGarnishes[idx][field] = value as string | undefined;
    } else if (field === 'recipeId') {
      newGarnishes[idx][field] = value as number | undefined;
    }
    setForm({ ...form, garnishes: newGarnishes });
  };

  const removeGarnish = (idx: number) => {
    setForm({
      ...form,
      garnishes: form.garnishes?.filter((_, i) => i !== idx),
    });
  };

  const calculateTemplateCost = (template: GarnishTemplate) => {
    return template.garnishes.reduce((acc, garnish) => {
      const ing = ingredients.find(i => i.id === garnish.id);
      return acc + (ing ? ing.price * garnish.qty : 0);
    }, 0);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
            <Package className="text-orange-600" size={32} />
            Templates de Guarnições
          </h1>
          <p className="text-gray-600 mt-1">
            Crie e gerencie combinações de guarnições para reutilizar em diferentes receitas
          </p>
        </div>
        {editing === null && (
          <Button onClick={startNew} className="bg-orange-600 hover:bg-orange-700">
            <Plus size={16} className="mr-1" /> Novo Template
          </Button>
        )}
      </div>

      {/* Formulário de Edição */}
      {editing !== null && (
        <Card className="p-6 bg-orange-50 border-2 border-orange-300">
          <h2 className="text-xl font-bold mb-4 text-orange-800">
            {editing === -1 ? 'Novo Template' : 'Editar Template'}
          </h2>

          <div className="mb-4">
            <label className="text-sm font-bold text-gray-700">Nome do Template</label>
            <Input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Ex: Combo Batata Frita"
            />
          </div>

          <div className="mb-4">
            <label className="text-sm font-bold text-gray-700">Descrição</label>
            <Input
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="Breve descrição do combo"
            />
          </div>

          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-bold text-gray-700">Guarnições</label>
              <Button size="sm" variant="outline" onClick={addGarnish}>
                <Plus size={14} className="mr-1" /> Adicionar Guarnição
              </Button>
            </div>

            <div className="space-y-2">
              {form.garnishes && form.garnishes.length > 0 ? (
                form.garnishes.map((garnish, idx) => (
                  <div key={idx} className="flex gap-2 items-center">
                    <Select
                      value={garnish.recipeId?.toString() || garnish.id || ''}
                      onValueChange={(v) => {
                        if (v.startsWith('r-')) {
                          const recipeId = parseInt(v.substring(2));
                          updateGarnish(idx, 'recipeId', recipeId);
                          updateGarnish(idx, 'id', undefined);
                        } else {
                          updateGarnish(idx, 'id', v);
                          updateGarnish(idx, 'recipeId', undefined);
                        }
                      }}
                    >
                      <SelectTrigger className="flex-1">
                        <SelectValue placeholder="Selecione guarnição" />
                      </SelectTrigger>
                      <SelectContent>
                        <div className="px-2 py-1.5 text-xs font-semibold text-orange-600 bg-orange-50">
                          🍲 RECEITAS DE GUARNIÇÕES
                        </div>
                        {recipes
                          .filter(r => r.category === 'guarnicoes')
                          .map((recipe) => {
                            const cost = recipe.components.reduce((sum, comp) => {
                              const ing = ingredients.find(i => i.id === comp.id);
                              return sum + (ing ? ing.price * comp.qty : 0);
                            }, 0);
                            return (
                              <SelectItem key={`r-${recipe.id}`} value={`r-${recipe.id}`}>
                                {recipe.name} (R$ {cost.toFixed(2)})
                              </SelectItem>
                            );
                          })}
                        <div className="px-2 py-1.5 text-xs font-semibold text-gray-600 bg-gray-50 mt-1">
                          🥬 INGREDIENTES INDIVIDUAIS
                        </div>
                        {ingredients
                          .filter(i => i.category === 'veg' || i.category === 'grain')
                          .map((ing) => (
                            <SelectItem key={ing.id} value={ing.id}>
                              {ing.name} (R$ {ing.price.toFixed(2)}/{ing.unit})
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                    <Input
                      type="number"
                      step="0.001"
                      value={garnish.qty}
                      onChange={(e) => updateGarnish(idx, 'qty', e.target.value)}
                      placeholder="Qtd"
                      className="w-24"
                    />
                    <span className="text-sm text-gray-500">kg/un</span>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => removeGarnish(idx)}
                    >
                      <Trash2 size={14} className="text-red-500" />
                    </Button>
                  </div>
                ))
              ) : (
                <p className="text-xs text-gray-500 italic">
                  Nenhuma guarnição adicionada. Clique em "Adicionar Guarnição" para começar.
                </p>
              )}
            </div>
          </div>

          <div className="flex gap-2">
            <Button onClick={save} className="bg-orange-600 hover:bg-orange-700">
              <Save size={16} className="mr-1" /> Salvar Template
            </Button>
            <Button variant="outline" onClick={cancelEdit}>
              <X size={16} className="mr-1" /> Cancelar
            </Button>
          </div>
        </Card>
      )}

      {/* Lista de Templates */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {garnishTemplates.map((template) => {
          const cost = calculateTemplateCost(template);

          return (
            <Card key={template.id} className="p-4 hover:shadow-lg transition-shadow">
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <h3 className="font-bold text-lg text-gray-800">{template.name}</h3>
                  <p className="text-xs text-gray-500">{template.description}</p>
                </div>
                <div className="flex gap-1">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => startEdit(template)}
                  >
                    <Edit3 size={14} className="text-blue-600" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => {
                      if (confirm(`Deseja excluir o template "${template.name}"?`)) {
                        deleteGarnishTemplate(template.id);
                      }
                    }}
                  >
                    <Trash2 size={14} className="text-red-500" />
                  </Button>
                </div>
              </div>

              <div className="space-y-1 mb-3">
                {template.garnishes.map((garnish, idx) => {
                  const ing = ingredients.find(i => i.id === garnish.id);
                  return (
                    <div key={idx} className="flex justify-between text-xs">
                      <span className="text-gray-700">
                        • {ing?.name || 'Desconhecido'}
                      </span>
                      <span className="text-gray-500">
                        {(garnish.qty * 1000).toFixed(0)}g
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="pt-3 border-t border-gray-200">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-bold text-gray-700">Custo Total:</span>
                  <span className="text-lg font-bold text-orange-600">
                    R$ {cost.toFixed(2)}
                  </span>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {garnishTemplates.length === 0 && editing === null && (
        <Card className="p-12 text-center">
          <Package className="mx-auto text-gray-300 mb-4" size={64} />
          <h3 className="text-xl font-bold text-gray-600 mb-2">
            Nenhum template criado
          </h3>
          <p className="text-gray-500 mb-4">
            Crie templates de guarnições para reutilizar em diferentes receitas
          </p>
          <Button onClick={startNew} className="bg-orange-600 hover:bg-orange-700">
            <Plus size={16} className="mr-1" /> Criar Primeiro Template
          </Button>
        </Card>
      )}
    </div>
  );
}
