import { useState } from 'react';
import { useApp } from '../contexts/AppContext';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Plus, Trash2, Save, Edit3, X, ChevronDown, ChevronUp } from 'lucide-react';
import { Recipe, RecipeComponent } from '../contexts/AppContext';
import React from 'react';

export default function RecipesView() {
  const { recipes, ingredients, garnishTemplates, addOrUpdateRecipe, deleteRecipe, addOrUpdateGarnishTemplate, getRecipeCost, getRecipeCostBreakdown, calculateCMV, calculateMarkup, calculateContributionMargin, calculateNetPrice } = useApp();
  
  const [editing, setEditing] = useState<number | null>(null);
  const [form, setForm] = useState<Partial<Recipe>>({
    name: '',
    category: 'bovina',
    components: [],
    desc: '',
  });
  const [filter, setFilter] = useState<string>('all');
  const [search, setSearch] = useState('');
  const [expandedRecipe, setExpandedRecipe] = useState<number | null>(null);

  const startEdit = (recipe: Recipe) => {
    setEditing(recipe.id);
    setForm(recipe);
  };

  const cancelEdit = () => {
    setEditing(null);
    setForm({ name: '', category: 'bovina', components: [], desc: '' });
  };

  const save = () => {
    if (!form.name) return;
    addOrUpdateRecipe(form);
    cancelEdit();
  };

  const addComponent = () => {
    setForm({
      ...form,
      components: [...(form.components || []), { id: '', qty: 0 }],
    });
  };

  const updateComponent = (idx: number, field: 'id' | 'qty', value: string | number) => {
    const newComponents = [...(form.components || [])];
    if (field === 'qty') {
      newComponents[idx][field] = parseFloat(value as string) || 0;
    } else {
      newComponents[idx][field] = value as string;
    }
    setForm({ ...form, components: newComponents });
  };

  const removeComponent = (idx: number) => {
    setForm({
      ...form,
      components: form.components?.filter((_, i) => i !== idx),
    });
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

  // Funções para manipular acompanhamentos
  const addAccompaniment = () => {
    setForm({
      ...form,
      accompaniments: [...(form.accompaniments || []), { qty: 1 }],
    });
  };

  const updateAccompaniment = (idx: number, field: 'id' | 'recipeId' | 'qty', value: string | number | undefined) => {
    const newAccompaniments = [...(form.accompaniments || [])];
    if (field === 'qty') {
      newAccompaniments[idx][field] = parseFloat(value as string) || 0;
    } else if (field === 'id') {
      newAccompaniments[idx][field] = value as string | undefined;
    } else if (field === 'recipeId') {
      newAccompaniments[idx][field] = value as number | undefined;
    }
    setForm({ ...form, accompaniments: newAccompaniments });
  };

  const removeAccompaniment = (idx: number) => {
    setForm({
      ...form,
      accompaniments: form.accompaniments?.filter((_, i) => i !== idx),
    });
  };

  const filteredRecipes = recipes.filter((r) => {
    const matchesCategory = filter === 'all' || r.category === filter;
    const matchesSearch = r.name.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const categories = [
    { id: 'all', label: 'Todas' },
    { id: 'bovina', label: 'Carne Bovina' },
    { id: 'frango', label: 'Frango' },
    { id: 'peixe', label: 'Peixe' },
    { id: 'porco', label: 'Porco' },
    { id: 'unicos', label: 'Pratos Únicos' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Banco de Receitas</h1>
        <Button onClick={() => setEditing(-1)}>
          <Plus size={16} className="mr-1" /> Nova Receita
        </Button>
      </div>

      {/* Filtros */}
      <Card className="p-4">
        <div className="flex gap-4 flex-wrap">
          <Input
            placeholder="Buscar receita..."
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
                  {cat.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </Card>

      {/* Formulário de Edição */}
      {editing !== null && (
        <Card className="p-6 border-2 border-orange-500">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold">
              {editing === -1 ? 'Nova Receita' : 'Editar Receita'}
            </h3>
            <Button variant="ghost" size="sm" onClick={cancelEdit}>
              <X size={16} />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="text-sm font-bold text-gray-700">Nome da Receita</label>
              <Input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Ex: Strogonoff de Carne"
              />
            </div>
            <div>
              <label className="text-sm font-bold text-gray-700">Categoria</label>
              <Select
                value={form.category}
                onValueChange={(v) => setForm({ ...form, category: v as any })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bovina">Carne Bovina</SelectItem>
                  <SelectItem value="frango">Frango</SelectItem>
                  <SelectItem value="peixe">Peixe</SelectItem>
                  <SelectItem value="porco">Porco</SelectItem>
                  <SelectItem value="unicos">Pratos Únicos</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="mb-4">
            <label className="text-sm font-bold text-gray-700">Descrição</label>
            <Input
              value={form.desc}
              onChange={(e) => setForm({ ...form, desc: e.target.value })}
              placeholder="Breve descrição"
            />
          </div>

          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-bold text-gray-700">Componentes</label>
              <Button size="sm" variant="outline" onClick={addComponent}>
                <Plus size={14} className="mr-1" /> Adicionar Ingrediente
              </Button>
            </div>

            <div className="space-y-2">
              {form.components?.map((comp, idx) => (
                <div key={idx} className="flex gap-2 items-center">
                  <Select
                    value={comp.id}
                    onValueChange={(v) => updateComponent(idx, 'id', v)}
                  >
                    <SelectTrigger className="flex-1">
                      <SelectValue placeholder="Selecione ingrediente" />
                    </SelectTrigger>
                    <SelectContent>
                      {ingredients.map((ing) => (
                        <SelectItem key={ing.id} value={ing.id}>
                          {ing.name} (R$ {ing.price.toFixed(2)}/{ing.unit})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Input
                    type="number"
                    step="0.001"
                    value={comp.qty}
                    onChange={(e) => updateComponent(idx, 'qty', e.target.value)}
                    placeholder="Qtd"
                    className="w-24"
                  />
                  <span className="text-sm text-gray-500">kg/un</span>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => removeComponent(idx)}
                  >
                    <Trash2 size={14} className="text-red-500" />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Acompanhamentos (Arroz, Feijão, etc) */}
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-bold text-gray-700">
                🍚 Acompanhamentos (Arroz, Feijão, Saladas)
                <span className="text-xs text-gray-500 ml-2">(Opcional - substitui base padrão)</span>
              </label>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={addAccompaniment}>
                  <Plus size={14} className="mr-1" /> Adicionar Acompanhamento
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              {form.accompaniments && form.accompaniments.length > 0 ? (
                form.accompaniments.map((accompaniment, idx) => (
                  <div key={idx} className="flex gap-2 items-center">
                    <Select
                      value={accompaniment.recipeId?.toString() || accompaniment.id || ''}
                      onValueChange={(v) => {
                        // Se começar com 'r-', é uma receita
                        if (v.startsWith('r-')) {
                          const recipeId = parseInt(v.substring(2));
                          updateAccompaniment(idx, 'recipeId', recipeId);
                          updateAccompaniment(idx, 'id', undefined);
                        } else {
                          // É um ingrediente
                          updateAccompaniment(idx, 'id', v);
                          updateAccompaniment(idx, 'recipeId', undefined);
                        }
                      }}
                    >
                      <SelectTrigger className="flex-1">
                        <SelectValue placeholder="Selecione acompanhamento" />
                      </SelectTrigger>
                      <SelectContent>
                        <div className="px-2 py-1.5 text-xs font-semibold text-blue-600 bg-blue-50">
                          🍚 RECEITAS DE ACOMPANHAMENTOS
                        </div>
                        {recipes
                          .filter(r => r.category === 'acompanhamentos')
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
                          🌾 INGREDIENTES INDIVIDUAIS
                        </div>
                        {ingredients
                          .filter(i => i.category === 'grain' || i.category === 'veg')
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
                      value={accompaniment.qty}
                      onChange={(e) => updateAccompaniment(idx, 'qty', e.target.value)}
                      placeholder="Qtd"
                      className="w-24"
                    />
                    <span className="text-sm text-gray-500">kg</span>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => removeAccompaniment(idx)}
                    >
                      <Trash2 size={14} className="text-red-500" />
                    </Button>
                  </div>
                ))
              ) : (
                <p className="text-xs text-gray-500 italic">
                  Nenhum acompanhamento customizado. Será usada a base padrão (arroz, feijão, etc).
                </p>
              )}
            </div>
          </div>

          {/* Guarnições Customizadas */}
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-bold text-gray-700">
                Guarnições Customizadas
                <span className="text-xs text-gray-500 ml-2">(Opcional - ex: batata frita, farofa, macarrão)</span>
              </label>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={addGarnish}>
                  <Plus size={14} className="mr-1" /> Adicionar Guarnição
                </Button>
              </div>
            </div>
            
            {/* Seletor de Templates */}
            <div className="mb-3 p-3 bg-blue-50 rounded border border-blue-200">
              <label className="text-xs font-bold text-blue-800 mb-2 block">
                📦 Aplicar Template de Guarnições
              </label>
              <div className="flex gap-2">
                <Select
                  value=""
                  onValueChange={(templateId) => {
                    const template = garnishTemplates.find(t => t.id === parseInt(templateId));
                    if (template) {
                      setForm({ ...form, garnishes: [...template.garnishes] });
                    }
                  }}
                >
                  <SelectTrigger className="flex-1 bg-white">
                    <SelectValue placeholder="Selecione um template..." />
                  </SelectTrigger>
                  <SelectContent>
                    {garnishTemplates.map((template) => (
                      <SelectItem key={template.id} value={template.id.toString()}>
                        {template.name} - {template.description}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {form.garnishes && form.garnishes.length > 0 && (
                  <Button
                    size="sm"
                    variant="outline"
                    className="bg-green-50 border-green-300 text-green-700 hover:bg-green-100"
                    onClick={() => {
                      const templateName = prompt('Nome do template:', `Template ${form.name}`);
                      if (templateName) {
                        const description = prompt('Descrição:', 'Guarnições customizadas');
                        addOrUpdateGarnishTemplate({
                          name: templateName,
                          description: description || '',
                          garnishes: form.garnishes || []
                        });
                        alert('Template salvo com sucesso!');
                      }
                    }}
                  >
                    💾 Salvar como Template
                  </Button>
                )}
              </div>
            </div>

            <div className="space-y-2">
              {form.garnishes && form.garnishes.length > 0 ? (
                form.garnishes.map((garnish, idx) => (
                  <div key={idx} className="flex gap-2 items-center">
                    <Select
                      value={garnish.recipeId?.toString() || garnish.id || ''}
                      onValueChange={(v) => {
                        // Se começar com 'r-', é uma receita
                        if (v.startsWith('r-')) {
                          const recipeId = parseInt(v.substring(2));
                          updateGarnish(idx, 'recipeId', recipeId);
                          updateGarnish(idx, 'id', undefined);
                        } else {
                          // É um ingrediente
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
                  Nenhuma guarnição customizada. Será usado o padrão (100g de legumes diversos).
                </p>
              )}
            </div>
          </div>

          {/* Margem de Segurança */}
          <div className="mb-4">
            <label className="text-sm font-bold text-gray-700">
              Margem de Segurança (%)
              <span className="text-xs text-gray-500 ml-2">(Padrão: 5%)</span>
            </label>
            <Input
              type="number"
              step="0.1"
              min="0"
              max="100"
              value={form.safetyMargin !== undefined ? form.safetyMargin : 5}
              onChange={(e) => setForm({ ...form, safetyMargin: parseFloat(e.target.value) || 0 })}
              placeholder="5"
              className="w-32"
            />
            <p className="text-xs text-gray-500 mt-1">
              Margem aplicada sobre ingredientes, base e guarnições para cobrir perdas e variações.
            </p>
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

      {/* Lista de Receitas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredRecipes.map((recipe) => {
          const breakdown = getRecipeCostBreakdown(recipe);
          const isExpanded = expandedRecipe === recipe.id;

          return (
            <Card key={recipe.id} className="p-4 hover:shadow-lg transition-shadow">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-bold text-gray-800">{recipe.name}</h3>
                  <p className="text-xs text-gray-500">{recipe.desc}</p>
                  <span className="inline-block mt-1 px-2 py-1 bg-orange-100 text-orange-700 text-xs rounded">
                    {recipe.category}
                  </span>
                </div>
                <div className="flex gap-1">
                  <Button size="sm" variant="ghost" onClick={() => startEdit(recipe)}>
                    <Edit3 size={14} />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => {
                      if (confirm('Deseja excluir esta receita?')) {
                        deleteRecipe(recipe.id);
                      }
                    }}
                  >
                    <Trash2 size={14} className="text-red-500" />
                  </Button>
                </div>
              </div>

              {/* Custo Total */}
              <div className="mt-3 pt-3 border-t">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-bold text-gray-600">Custo Total:</span>
                  <span className="text-lg font-bold text-green-600">
                    R$ {breakdown.total.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Breakdown de Custos */}
              <div className="mt-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setExpandedRecipe(isExpanded ? null : recipe.id)}
                  className="w-full text-xs"
                >
                  {isExpanded ? (
                    <>
                      <ChevronUp size={14} className="mr-1" /> Ocultar Detalhes
                    </>
                  ) : (
                    <>
                      <ChevronDown size={14} className="mr-1" /> Ver Detalhamento
                    </>
                  )}
                </Button>

                {isExpanded && (
                  <div className="mt-3 space-y-2 text-xs bg-gray-50 p-3 rounded">
                    {/* Margem de Segurança */}
                    {recipe.safetyMargin !== undefined && recipe.safetyMargin !== 5 && (
                      <div className="mb-2 pb-2 border-b border-orange-200 bg-orange-50 p-2 rounded">
                        <div className="flex justify-between items-center">
                          <span className="text-orange-700 font-bold">⚠️ Margem de Segurança:</span>
                          <span className="font-bold text-orange-700">{recipe.safetyMargin}%</span>
                        </div>
                      </div>
                    )}
                    
                    <div className="flex justify-between">
                      <span className="text-gray-600">🍖 Ingredientes da Receita:</span>
                      <span className="font-bold">R$ {breakdown.componentsCost.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">🌾 Base (Arroz, Feijão, etc):</span>
                      <span className="font-bold">R$ {breakdown.baseCost.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">🥬 Guarnições:</span>
                      <span className="font-bold">R$ {breakdown.garnishCost.toFixed(2)}</span>
                    </div>
                    {recipe.garnishes && recipe.garnishes.length > 0 && (
                      <div className="ml-4 text-xs text-gray-500">
                        {recipe.garnishes.map((g, idx) => {
                          const ing = ingredients.find(i => i.id === g.id);
                          return (
                            <div key={idx}>
                              • {ing?.name}: {(g.qty * 1000).toFixed(0)}g
                            </div>
                          );
                        })}
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-gray-600">📦 Embalagem:</span>
                      <span className="font-bold">R$ {breakdown.packagingCost.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">⚙️ Custos Fixos Alocados:</span>
                      <span className="font-bold">R$ {breakdown.fixedCost.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-gray-300">
                      <span className="font-bold text-gray-800">TOTAL:</span>
                      <span className="font-bold text-green-600">R$ {breakdown.total.toFixed(2)}</span>
                    </div>
                    
                    {/* Índices Gerenciais */}
                    <div className="mt-4 pt-4 border-t-2 border-blue-200 bg-blue-50 -mx-3 -mb-3 px-3 py-3 rounded-b-lg">
                      <h4 className="font-bold text-blue-800 mb-3 text-sm">📊 Índices Gerenciais</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-blue-700">Preço Líquido (após impostos):</span>
                          <span className="font-bold text-blue-900">R$ {calculateNetPrice().toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-blue-700">CMV (Custo / Preço Líquido):</span>
                          <span className={`font-bold ${calculateCMV(breakdown.total) > 70 ? 'text-red-600' : calculateCMV(breakdown.total) > 50 ? 'text-yellow-600' : 'text-green-600'}`}>
                            {calculateCMV(breakdown.total).toFixed(1)}%
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-blue-700">Markup (Preço / Custo):</span>
                          <span className="font-bold text-blue-900">{calculateMarkup(breakdown.total).toFixed(2)}x</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-blue-700">Margem de Contribuição:</span>
                          <span className={`font-bold ${calculateContributionMargin(breakdown.total) < 0 ? 'text-red-600' : 'text-green-600'}`}>
                            R$ {calculateContributionMargin(breakdown.total).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Ingredientes */}
              {!isExpanded && (
                <div className="mt-3 pt-3 border-t">
                  <div className="text-sm text-gray-600 mb-2">
                    <strong>Ingredientes:</strong>
                  </div>
                  <ul className="text-xs text-gray-600 space-y-1">
                    {recipe.components.slice(0, 3).map((comp, idx) => {
                      const ing = ingredients.find((i) => i.id === comp.id);
                      return (
                        <li key={idx}>
                          • {ing?.name}: {(comp.qty * 1000).toFixed(0)}g
                        </li>
                      );
                    })}
                    {recipe.components.length > 3 && (
                      <li className="text-gray-400">+ {recipe.components.length - 3} mais...</li>
                    )}
                  </ul>
                </div>
              )}
            </Card>
          );
        })}
      </div>

      {filteredRecipes.length === 0 && (
        <Card className="p-8 text-center text-gray-500">
          <p>Nenhuma receita encontrada.</p>
        </Card>
      )}
    </div>
  );
}
