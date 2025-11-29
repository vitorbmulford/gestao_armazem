import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '../../supabaseClient';

// --- TIPOS (Mantidos iguais) ---

export interface Ingredient {
  id: string;
  name: string;
  price: number;
  unit: string;
  yield: number;
  category: 'grain' | 'protein' | 'veg' | 'fruit' | 'misc' | 'ops';
}

export interface RecipeComponent {
  id?: string;
  recipeId?: number;
  qty: number;
}

export interface GarnishTemplate {
  id: number;
  name: string;
  description: string;
  garnishes: RecipeComponent[];
}

export interface Recipe {
  id: number;
  category: 'bovina' | 'frango' | 'peixe' | 'porco' | 'unicos' | 'guarnicoes' | 'acompanhamentos';
  name: string;
  components: RecipeComponent[];
  desc: string;
  ingredientId?: string;
  accompaniments?: RecipeComponent[];
  garnishes?: RecipeComponent[];
  safetyMargin?: number;
}

export interface Dish {
  name: string;
  recipeId?: number;
  mainIngredient?: string;
}

export interface Day {
  name: string;
  dishes: [Dish, Dish, Dish];
  sides: string[];
}

export interface Week {
  id: number;
  title: string;
  days: Day[];
}

export interface BaseConfig {
  ingredientId: string;
  qtyRaw: number;
}

export interface FixedExpense {
  id: number;
  name: string;
  value: number;
}

export interface SalesMix {
  op1: number;
  op2: number;
  op3: number;
}

export interface TaxConfig {
  icms: number;
  pisCofins: number;
  iss: number;
  deliveryFee: number;
  cardFee: number;
}

interface AppContextType {
  // Ingredientes
  ingredients: Ingredient[];
  setIngredients: (ingredients: Ingredient[]) => void;
  addOrUpdateIngredient: (ingredient: Ingredient) => void;
  deleteIngredient: (id: string) => void;

  // Receitas
  recipes: Recipe[];
  setRecipes: (recipes: Recipe[]) => void;
  addOrUpdateRecipe: (recipe: Partial<Recipe>) => void;
  deleteRecipe: (id: number) => void;

  // Semanas/Cardápio
  weeks: Week[];
  setWeeks: (weeks: Week[]) => void;
  selectedWeek: number;
  setSelectedWeek: (id: number) => void;
  updateDishName: (weekId: number, dayIdx: number, dishIdx: number, name: string) => void;
  updateDaySides: (weekId: number, dayIdx: number, sides: string) => void;
  importRecipeToMenu: (weekId: number, dayIdx: number, dishIdx: number, recipeId: number) => void;

  // Configurações
  baseConfig: BaseConfig[];
  setBaseConfig: (config: BaseConfig[]) => void;
  fixedExpenses: FixedExpense[];
  setFixedExpenses: (expenses: FixedExpense[]) => void;
  addFixedExpense: (expense: Omit<FixedExpense, 'id'>) => void;
  deleteFixedExpense: (id: number) => void;

  sellingPrice: number;
  setSellingPrice: (price: number) => void;
  productionVolume: number;
  setProductionVolume: (volume: number) => void;
  workDays: number;
  setWorkDays: (days: number) => void;
  allocation: number;
  setAllocation: (allocation: number) => void;

  salesMix: SalesMix;
  setSalesMix: (mix: SalesMix) => void;

  taxConfig: TaxConfig;
  setTaxConfig: (config: TaxConfig) => void;

  defaultProteinWeight: number;
  setDefaultProteinWeight: (weight: number) => void;
  defaultSideWeight: number;
  setDefaultSideWeight: (weight: number) => void;

  // Templates de Guarnições
  garnishTemplates: GarnishTemplate[];
  setGarnishTemplates: (templates: GarnishTemplate[]) => void;
  addOrUpdateGarnishTemplate: (template: Partial<GarnishTemplate>) => void;
  deleteGarnishTemplate: (id: number) => void;

  // Funções de cálculo
  getRecipeCost: (recipe: Recipe | undefined) => number;
  getRecipeCostBreakdown: (recipe: Recipe | undefined) => {
    componentsCost: number;
    baseCost: number;
    garnishCost: number;
    packagingCost: number;
    fixedCost: number;
    total: number;
  };
  calculateDishCost: (dish: Dish) => number;

  // Índices Gerenciais
  calculateCMV: (recipeCost: number) => number;
  calculateMarkup: (recipeCost: number) => number;
  calculateContributionMargin: (recipeCost: number) => number;
  calculateNetPrice: () => number;

  // Backup (Ainda útil para exportar JSON local se quiser)
  exportData: () => string;
  importData: (jsonData: string) => void;
  resetData: () => void;

  loading: boolean; // Novo estado para saber se está carregando do banco
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

// Dados padrão caso o banco esteja vazio
import { initialIngredients, initialRecipes, initialWeeks } from '../data/initialData';

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [loading, setLoading] = useState(true);

  // --- ESTADOS ---
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [weeks, setWeeks] = useState<Week[]>([]);
  const [garnishTemplates, setGarnishTemplates] = useState<GarnishTemplate[]>([]);

  const [selectedWeek, setSelectedWeek] = useState<number>(1);

  // Configurações
  const [baseConfig, setBaseConfig] = useState<BaseConfig[]>([]);
  const [fixedExpenses, setFixedExpenses] = useState<FixedExpense[]>([]);
  const [sellingPrice, setSellingPrice] = useState<number>(18.00);
  const [productionVolume, setProductionVolume] = useState<number>(100);
  const [workDays, setWorkDays] = useState<number>(24);
  const [allocation, setAllocation] = useState<number>(100);
  const [salesMix, setSalesMix] = useState<SalesMix>({ op1: 40, op2: 40, op3: 20 });
  const [taxConfig, setTaxConfig] = useState<TaxConfig>({ icms: 12.0, pisCofins: 3.65, iss: 0, deliveryFee: 0, cardFee: 3.5 });
  const [defaultProteinWeight, setDefaultProteinWeight] = useState<number>(0.150);
  const [defaultSideWeight, setDefaultSideWeight] = useState<number>(0.080);

  // --- CARREGAR DADOS DO SUPABASE AO INICIAR ---
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      // 1. Ingredientes
      const { data: ingData } = await supabase.from('ingredients').select('*');
      if (ingData && ingData.length > 0) setIngredients(ingData);
      else setIngredients(initialIngredients); // Fallback se banco vazio

      // 2. Receitas
      const { data: recData } = await supabase.from('recipes').select('*');
      if (recData && recData.length > 0) setRecipes(recData);
      else setRecipes(initialRecipes);

      // 3. Semanas
      const { data: weekData } = await supabase.from('weeks').select('*');
      if (weekData && weekData.length > 0) setWeeks(weekData);
      else setWeeks(initialWeeks);

      // 4. Templates
      const { data: tmplData } = await supabase.from('garnish_templates').select('*');
      if (tmplData && tmplData.length > 0) setGarnishTemplates(tmplData);

      // 5. Configurações Gerais (Tabela app_settings)
      const { data: settingsData } = await supabase.from('app_settings').select('*').eq('id', 1).single();

      if (settingsData) {
        if (settingsData.base_config) setBaseConfig(settingsData.base_config);
        if (settingsData.fixed_expenses) setFixedExpenses(settingsData.fixed_expenses);
        if (settingsData.selling_price) setSellingPrice(Number(settingsData.selling_price));
        if (settingsData.production_volume) setProductionVolume(Number(settingsData.production_volume));
        if (settingsData.work_days) setWorkDays(Number(settingsData.work_days));
        if (settingsData.allocation) setAllocation(Number(settingsData.allocation));
        if (settingsData.sales_mix) setSalesMix(settingsData.sales_mix);
        if (settingsData.tax_config) setTaxConfig(settingsData.tax_config);
        if (settingsData.default_protein_weight) setDefaultProteinWeight(Number(settingsData.default_protein_weight));
        if (settingsData.default_side_weight) setDefaultSideWeight(Number(settingsData.default_side_weight));
      } else {
        // Inicializa configs padrão se não existirem
        setBaseConfig([
          { ingredientId: 'arr', qtyRaw: 0.100 },
          { ingredientId: 'feij', qtyRaw: 0.060 },
          { ingredientId: 'oleo', qtyRaw: 0.010 },
          { ingredientId: 'sal', qtyRaw: 0.005 },
          { ingredientId: 'alho', qtyRaw: 0.002 },
          { ingredientId: 'cebola', qtyRaw: 0.015 },
          { ingredientId: 'temp', qtyRaw: 1 },
          { ingredientId: 'emb', qtyRaw: 1 }
        ]);
        // ... inicializar os outros estados de config ...
      }

    } catch (error) {
      console.error("Erro ao carregar dados do Supabase:", error);
    } finally {
      setLoading(false);
    }
  };

  // --- FUNÇÕES DE SALVAR (UPSERT) ---

  const addOrUpdateIngredient = async (ingredient: Ingredient) => {
    // Atualiza estado local (para UI ficar rápida)
    setIngredients(prev => {
      const exists = prev.find(i => i.id === ingredient.id);
      return exists ? prev.map(i => i.id === ingredient.id ? ingredient : i) : [...prev, ingredient];
    });
    // Salva no Supabase
    await supabase.from('ingredients').upsert(ingredient);
  };

  const deleteIngredient = async (id: string) => {
    setIngredients(prev => prev.filter(i => i.id !== id));
    await supabase.from('ingredients').delete().eq('id', id);
  };

  const addOrUpdateRecipe = async (recipe: Partial<Recipe>) => {
    let newRecipe = { ...recipe } as Recipe;

    // Lógica de ID
    if (!newRecipe.id) {
      const maxId = recipes.length > 0 ? Math.max(...recipes.map(r => r.id)) : 0;
      newRecipe.id = maxId + 1;
    }

    setRecipes(prev => {
      const exists = prev.find(r => r.id === newRecipe.id);
      return exists ? prev.map(r => r.id === newRecipe.id ? newRecipe : r) : [...prev, newRecipe];
    });

    // Supabase precisa dos campos exatos
    await supabase.from('recipes').upsert({
      id: newRecipe.id,
      category: newRecipe.category,
      name: newRecipe.name,
      desc: newRecipe.desc,
      ingredientId: newRecipe.ingredientId,
      components: newRecipe.components,
      accompaniments: newRecipe.accompaniments,
      garnishes: newRecipe.garnishes,
      safetyMargin: newRecipe.safetyMargin
    });
  };

  const deleteRecipe = async (id: number) => {
    setRecipes(prev => prev.filter(r => r.id !== id));
    await supabase.from('recipes').delete().eq('id', id);
  };

  const addOrUpdateGarnishTemplate = async (template: Partial<GarnishTemplate>) => {
    let newTemplate = { ...template } as GarnishTemplate;
    if (!newTemplate.id) {
      const maxId = garnishTemplates.length > 0 ? Math.max(...garnishTemplates.map(t => t.id)) : 0;
      newTemplate.id = maxId + 1;
    }

    setGarnishTemplates(prev => {
      const exists = prev.find(t => t.id === newTemplate.id);
      return exists ? prev.map(t => t.id === newTemplate.id ? newTemplate : t) : [...prev, newTemplate];
    });

    await supabase.from('garnish_templates').upsert({
      id: newTemplate.id,
      name: newTemplate.name,
      description: newTemplate.description,
      garnishes: newTemplate.garnishes
    });
  };

  const deleteGarnishTemplate = async (id: number) => {
    setGarnishTemplates(prev => prev.filter(t => t.id !== id));
    await supabase.from('garnish_templates').delete().eq('id', id);
  };

  // --- FUNÇÕES DE UPDATE COMPLEXAS (SEMANAS) ---
  // Nestes casos, salvamos a semana inteira no banco

  const updateWeeksStateAndSave = async (newWeeks: Week[]) => {
    setWeeks(newWeeks);
    // Salva todas as semanas modificadas (ou apenas a atual se otimizar, aqui salvamos todas por segurança)
    for (const week of newWeeks) {
      await supabase.from('weeks').upsert({
        id: week.id,
        title: week.title,
        days: week.days
      });
    }
  };

  const updateDishName = (weekId: number, dayIdx: number, dishIdx: number, name: string) => {
    const newWeeks = weeks.map(w =>
      w.id !== weekId ? w : {
        ...w,
        days: w.days.map((d, idx) =>
          idx !== dayIdx ? d : {
            ...d,
            dishes: d.dishes.map((dish, i) =>
              i !== dishIdx ? dish : { ...dish, name }
            ) as [Dish, Dish, Dish]
          }
        )
      }
    );
    updateWeeksStateAndSave(newWeeks);
  };

  const updateDaySides = (weekId: number, dayIdx: number, sides: string) => {
    const newWeeks = weeks.map(w =>
      w.id !== weekId ? w : {
        ...w,
        days: w.days.map((d, idx) =>
          idx !== dayIdx ? d : {
            ...d,
            sides: sides.split('+').map(s => s.trim()).filter(s => s)
          }
        )
      }
    );
    updateWeeksStateAndSave(newWeeks);
  };

  const importRecipeToMenu = (weekId: number, dayIdx: number, dishIdx: number, recipeId: number) => {
    const recipe = recipes.find(r => r.id === recipeId);
    if (recipe) {
      const newWeeks = weeks.map(w =>
        w.id !== weekId ? w : {
          ...w,
          days: w.days.map((d, idx) =>
            idx !== dayIdx ? d : {
              ...d,
              dishes: d.dishes.map((dish, i) =>
                i !== dishIdx ? dish : { name: recipe.name, recipeId: recipe.id }
              ) as [Dish, Dish, Dish]
            }
          )
        }
      );
      updateWeeksStateAndSave(newWeeks);
    }
  };

  // --- FUNÇÕES DE CONFIGURAÇÃO (Salvam na tabela app_settings) ---

  // Função auxiliar para atualizar settings no banco
  const updateSetting = async (column: string, value: any) => {
    await supabase.from('app_settings').update({ [column]: value }).eq('id', 1);
  };

  const updateFixedExpenses = (newExpenses: FixedExpense[]) => {
    setFixedExpenses(newExpenses);
    updateSetting('fixed_expenses', newExpenses);
  }

  const addFixedExpense = (expense: Omit<FixedExpense, 'id'>) => {
    const newId = Math.max(...fixedExpenses.map(e => e.id), 0) + 1;
    const newExpenses = [...fixedExpenses, { ...expense, id: newId }];
    updateFixedExpenses(newExpenses);
  };

  const deleteFixedExpense = (id: number) => {
    const newExpenses = fixedExpenses.filter(e => e.id !== id);
    updateFixedExpenses(newExpenses);
  };

  // Wrappers para setters que salvam no banco
  const handleSetSellingPrice = (val: number) => { setSellingPrice(val); updateSetting('selling_price', val); }
  const handleSetProductionVolume = (val: number) => { setProductionVolume(val); updateSetting('production_volume', val); }
  const handleSetWorkDays = (val: number) => { setWorkDays(val); updateSetting('work_days', val); }
  const handleSetAllocation = (val: number) => { setAllocation(val); updateSetting('allocation', val); }
  const handleSetSalesMix = (val: SalesMix) => { setSalesMix(val); updateSetting('sales_mix', val); }
  const handleSetTaxConfig = (val: TaxConfig) => { setTaxConfig(val); updateSetting('tax_config', val); }
  const handleSetBaseConfig = (val: BaseConfig[]) => { setBaseConfig(val); updateSetting('base_config', val); }

  // --- CÁLCULOS (Mantidos iguais) ---
  const getRecipeCostBreakdown = (recipe: Recipe | undefined) => {
    if (!recipe) return { componentsCost: 0, baseCost: 0, garnishCost: 0, packagingCost: 0, fixedCost: 0, total: 0 };

    const safetyMargin = recipe.safetyMargin !== undefined ? recipe.safetyMargin : 5;
    const marginMultiplier = 1 + (safetyMargin / 100);

    let componentsCost = 0;
    if (recipe.components && recipe.components.length > 0) {
      componentsCost = recipe.components.reduce((acc, comp) => {
        const ing = ingredients.find((i) => i.id === comp.id);
        return acc + (ing ? ing.price * comp.qty : 0);
      }, 0);
      componentsCost *= marginMultiplier;
    } else if (recipe.ingredientId) {
      const ing = ingredients.find((i) => i.id === recipe.ingredientId);
      if (ing) componentsCost += ing.price * defaultProteinWeight;
      const veg = ingredients.find((i) => i.id === 'leg_div');
      if (veg) componentsCost += veg.price * defaultSideWeight;
      componentsCost *= marginMultiplier;
    }

    let baseCost = 0;
    if (recipe.accompaniments && recipe.accompaniments.length > 0) {
      baseCost = recipe.accompaniments.reduce((acc, accompaniment) => {
        if (accompaniment.recipeId) {
          const accompanimentRecipe = recipes.find(r => r.id === accompaniment.recipeId);
          if (accompanimentRecipe) {
            const accompanimentComponentCost = accompanimentRecipe.components.reduce((sum, comp) => {
              const ing = ingredients.find(i => i.id === comp.id);
              return sum + (ing ? ing.price * comp.qty : 0);
            }, 0);
            return acc + accompanimentComponentCost * accompaniment.qty;
          }
        } else if (accompaniment.id) {
          const ing = ingredients.find(i => i.id === accompaniment.id);
          return acc + (ing ? ing.price * accompaniment.qty : 0);
        }
        return acc;
      }, 0);
    } else {
      const hasRice = recipe.components ? recipe.components.some(c => c.id === 'arr') : false;
      baseConfig.forEach(base => {
        if (hasRice && (base.ingredientId === 'arr' || base.ingredientId === 'feij')) return;
        const ing = ingredients.find(i => i.id === base.ingredientId);
        if (ing) baseCost += ing.price * base.qtyRaw;
      });
    }
    baseCost *= marginMultiplier;

    let garnishCost = 0;
    if (recipe.garnishes && recipe.garnishes.length > 0) {
      garnishCost = recipe.garnishes.reduce((acc, garnish) => {
        if (garnish.recipeId) {
          const garnishRecipe = recipes.find(r => r.id === garnish.recipeId);
          if (garnishRecipe) {
            const garnishComponentCost = garnishRecipe.components.reduce((sum, comp) => {
              const ing = ingredients.find(i => i.id === comp.id);
              return sum + (ing ? ing.price * comp.qty : 0);
            }, 0);
            return acc + garnishComponentCost * garnish.qty;
          }
        } else if (garnish.id) {
          const ing = ingredients.find(i => i.id === garnish.id);
          return acc + (ing ? ing.price * garnish.qty : 0);
        }
        return acc;
      }, 0);
    } else if (recipe.category !== 'unicos' && recipe.category !== 'guarnicoes') {
      const vegGeneric = ingredients.find(i => i.id === 'leg_div');
      if (vegGeneric) { garnishCost = vegGeneric.price * defaultSideWeight; }
    }
    garnishCost *= marginMultiplier;

    const totalFixed = fixedExpenses.reduce((acc, curr) => acc + curr.value, 0);
    const allocatedFixed = totalFixed * (allocation / 100);
    const dailyFixed = allocatedFixed / workDays;
    const unitFixedCost = dailyFixed / productionVolume;

    const packagingIngredient = ingredients.find(i => i.id === 'emb');
    const packagingCost = packagingIngredient ? packagingIngredient.price : 1.25;

    return {
      componentsCost,
      baseCost,
      garnishCost,
      packagingCost,
      fixedCost: unitFixedCost,
      total: componentsCost + baseCost + garnishCost + packagingCost + unitFixedCost
    };
  };

  const getRecipeCost = (recipe: Recipe | undefined): number => {
    return getRecipeCostBreakdown(recipe).total;
  };

  const calculateDishCost = (dish: Dish): number => {
    let recipe = recipes.find(r => r.id === dish.recipeId);
    if (!recipe && dish.mainIngredient) {
      recipe = {
        id: 0,
        category: 'bovina',
        name: dish.name,
        components: [],
        desc: '',
        ingredientId: dish.mainIngredient
      };
    }
    return getRecipeCost(recipe);
  };

  const calculateNetPrice = (): number => {
    const totalTaxRate = (taxConfig.icms + taxConfig.pisCofins + taxConfig.iss + taxConfig.deliveryFee + taxConfig.cardFee) / 100;
    return sellingPrice * (1 - totalTaxRate);
  };

  const calculateCMV = (recipeCost: number): number => {
    const netPrice = calculateNetPrice();
    return netPrice > 0 ? (recipeCost / netPrice) * 100 : 0;
  };

  const calculateMarkup = (recipeCost: number): number => {
    return recipeCost > 0 ? calculateNetPrice() / recipeCost : 0;
  };

  const calculateContributionMargin = (recipeCost: number): number => {
    return calculateNetPrice() - recipeCost;
  };

  // Backup (Exporta o JSON atual em memória)
  const exportData = (): string => {
    const data = { ingredients, recipes, weeks, baseConfig, fixedExpenses, sellingPrice, productionVolume, workDays, allocation, salesMix };
    return JSON.stringify(data, null, 2);
  };

  const importData = (jsonData: string) => {
    // Implementar importação para o banco se necessário, ou manter apenas local
    console.log("Importação massiva deve ser implementada com cuidado no banco");
  };

  const resetData = () => {
    // Cuidado: Isso limparia o banco
    console.log("Reset desabilitado para segurança do banco");
  };

  const value: AppContextType = {
    ingredients,
    setIngredients,
    addOrUpdateIngredient,
    deleteIngredient,
    recipes,
    setRecipes,
    addOrUpdateRecipe,
    deleteRecipe,
    garnishTemplates,
    setGarnishTemplates,
    addOrUpdateGarnishTemplate,
    deleteGarnishTemplate,
    weeks,
    setWeeks,
    selectedWeek,
    setSelectedWeek,
    updateDishName,
    updateDaySides,
    importRecipeToMenu,
    baseConfig,
    setBaseConfig: handleSetBaseConfig,
    fixedExpenses,
    setFixedExpenses: updateFixedExpenses,
    addFixedExpense,
    deleteFixedExpense,
    sellingPrice,
    setSellingPrice: handleSetSellingPrice,
    productionVolume,
    setProductionVolume: handleSetProductionVolume,
    workDays,
    setWorkDays: handleSetWorkDays,
    allocation,
    setAllocation: handleSetAllocation,
    salesMix,
    setSalesMix: handleSetSalesMix,
    taxConfig,
    setTaxConfig: handleSetTaxConfig,
    defaultProteinWeight,
    setDefaultProteinWeight,
    defaultSideWeight,
    setDefaultSideWeight,
    getRecipeCost,
    getRecipeCostBreakdown,
    calculateDishCost,
    calculateCMV,
    calculateMarkup,
    calculateContributionMargin,
    calculateNetPrice,
    exportData,
    importData,
    resetData,
    loading
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen gap-4">
        <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
        <p className="text-lg font-medium text-muted-foreground animate-fadeIn">
          Carregando sistema...
        </p>
      </div>
    );
  }


  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};