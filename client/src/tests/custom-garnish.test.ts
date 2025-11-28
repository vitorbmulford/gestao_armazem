import { describe, it, expect } from 'vitest';
import { initialIngredients } from '@/data/initialData';

describe('Guarnições Customizadas e Margem de Segurança', () => {
  const baseConfig = [
    { ingredientId: 'arr', qtyRaw: 0.100 },
    { ingredientId: 'feij', qtyRaw: 0.060 },
    { ingredientId: 'oleo', qtyRaw: 0.010 },
    { ingredientId: 'sal', qtyRaw: 0.005 },
    { ingredientId: 'alho', qtyRaw: 0.002 },
    { ingredientId: 'cebola', qtyRaw: 0.015 },
    { ingredientId: 'temp', qtyRaw: 1 },
    { ingredientId: 'emb', qtyRaw: 1 }
  ];

  const fixedExpenses = [
    { id: 1, name: 'Aluguel', value: 2000 },
    { id: 2, name: 'Energia', value: 800 },
    { id: 3, name: 'Água', value: 300 },
    { id: 4, name: 'Gás', value: 400 },
    { id: 5, name: 'Internet', value: 100 },
    { id: 6, name: 'Salários', value: 6000 }
  ];

  const productionVolume = 100;
  const workDays = 24;
  const allocation = 100;
  const defaultSideWeight = 0.100;

  const getRecipeCostBreakdown = (recipe: any) => {
    const safetyMargin = recipe.safetyMargin !== undefined ? recipe.safetyMargin : 5;
    const marginMultiplier = 1 + (safetyMargin / 100);

    let componentsCost = 0;
    if (recipe.components && recipe.components.length > 0) {
      componentsCost = recipe.components.reduce((acc: number, comp: any) => {
        const ing = initialIngredients.find((i) => i.id === comp.id);
        return acc + (ing ? ing.price * comp.qty : 0);
      }, 0);
      componentsCost *= marginMultiplier;
    }

    let baseCost = 0;
    const hasRice = recipe.components ? recipe.components.some((c: any) => c.id === 'arr') : false;
    baseConfig.forEach(base => {
      if (hasRice && (base.ingredientId === 'arr' || base.ingredientId === 'feij')) return;
      const ing = initialIngredients.find(i => i.id === base.ingredientId);
      if (ing) baseCost += ing.price * base.qtyRaw;
    });
    baseCost *= marginMultiplier;

    let garnishCost = 0;
    if (recipe.garnishes && recipe.garnishes.length > 0) {
      garnishCost = recipe.garnishes.reduce((acc: number, garnish: any) => {
        const ing = initialIngredients.find(i => i.id === garnish.id);
        return acc + (ing ? ing.price * garnish.qty : 0);
      }, 0);
    } else if (recipe.category !== 'unicos') {
      const vegGeneric = initialIngredients.find(i => i.id === 'leg_div');
      if (vegGeneric) {
        garnishCost = vegGeneric.price * defaultSideWeight;
      }
    }
    garnishCost *= marginMultiplier;

    const totalFixed = fixedExpenses.reduce((acc, curr) => acc + curr.value, 0);
    const allocatedFixed = totalFixed * (allocation / 100);
    const dailyFixed = allocatedFixed / workDays;
    const unitFixedCost = dailyFixed / productionVolume;

    const packagingCost = 0.25;

    return {
      componentsCost,
      baseCost,
      garnishCost,
      packagingCost,
      fixedCost: unitFixedCost,
      total: componentsCost + baseCost + garnishCost + packagingCost + unitFixedCost
    };
  };

  describe('Margem de Segurança', () => {
    it('deve aplicar margem padrão de 5% quando não especificada', () => {
      const recipe = {
        id: 1,
        name: 'Teste',
        category: 'bovina',
        components: [{ id: 'carne', qty: 0.150 }],
        desc: ''
      };

      const breakdown = getRecipeCostBreakdown(recipe);
      
      // Calcular custo sem margem
      const carneIng = initialIngredients.find(i => i.id === 'carne');
      const costWithoutMargin = carneIng ? carneIng.price * 0.150 : 0;
      const costWithMargin = costWithoutMargin * 1.05;

      expect(breakdown.componentsCost).toBeCloseTo(costWithMargin, 2);
    });

    it('deve aplicar margem customizada quando especificada', () => {
      const recipe = {
        id: 1,
        name: 'Teste',
        category: 'bovina',
        components: [{ id: 'carne', qty: 0.150 }],
        desc: '',
        safetyMargin: 10 // 10%
      };

      const breakdown = getRecipeCostBreakdown(recipe);
      
      const carneIng = initialIngredients.find(i => i.id === 'carne');
      const costWithoutMargin = carneIng ? carneIng.price * 0.150 : 0;
      const costWithMargin = costWithoutMargin * 1.10; // 10%

      expect(breakdown.componentsCost).toBeCloseTo(costWithMargin, 2);
    });

    it('margem de 0% não deve alterar custos', () => {
      const recipe = {
        id: 1,
        name: 'Teste',
        category: 'bovina',
        components: [{ id: 'carne', qty: 0.150 }],
        desc: '',
        safetyMargin: 0
      };

      const breakdown = getRecipeCostBreakdown(recipe);
      
      const carneIng = initialIngredients.find(i => i.id === 'carne');
      const costWithoutMargin = carneIng ? carneIng.price * 0.150 : 0;

      expect(breakdown.componentsCost).toBeCloseTo(costWithoutMargin, 2);
    });

    it('margem deve ser aplicada em todos os componentes de custo', () => {
      const recipe = {
        id: 1,
        name: 'Teste',
        category: 'bovina',
        components: [{ id: 'carne', qty: 0.150 }],
        desc: '',
        safetyMargin: 10
      };

      const breakdownWith10 = getRecipeCostBreakdown(recipe);
      
      const recipeWith0 = { ...recipe, safetyMargin: 0 };
      const breakdownWith0 = getRecipeCostBreakdown(recipeWith0);

      // Componentes devem ser 10% maiores
      expect(breakdownWith10.componentsCost).toBeCloseTo(breakdownWith0.componentsCost * 1.10, 2);
      expect(breakdownWith10.baseCost).toBeCloseTo(breakdownWith0.baseCost * 1.10, 2);
      expect(breakdownWith10.garnishCost).toBeCloseTo(breakdownWith0.garnishCost * 1.10, 2);
    });
  });

  describe('Guarnições Customizadas', () => {
    it('deve usar guarnição padrão quando não especificada', () => {
      const recipe = {
        id: 1,
        name: 'Teste',
        category: 'bovina',
        components: [{ id: 'carne', qty: 0.150 }],
        desc: '',
        safetyMargin: 0
      };

      const breakdown = getRecipeCostBreakdown(recipe);
      
      const vegIng = initialIngredients.find(i => i.id === 'leg_div');
      const expectedGarnish = vegIng ? vegIng.price * defaultSideWeight : 0;

      expect(breakdown.garnishCost).toBeCloseTo(expectedGarnish, 2);
    });

    it('deve usar guarnições customizadas quando especificadas', () => {
      const recipe = {
        id: 1,
        name: 'Teste',
        category: 'bovina',
        components: [{ id: 'carne', qty: 0.150 }],
        desc: '',
        safetyMargin: 0,
        garnishes: [
          { id: 'batata', qty: 0.120 }, // Batata
          { id: 'cenoura', qty: 0.050 }  // Cenoura
        ]
      };

      const breakdown = getRecipeCostBreakdown(recipe);
      
      const batataIng = initialIngredients.find(i => i.id === 'batata');
      const cenouraIng = initialIngredients.find(i => i.id === 'cenoura');
      
      const expectedGarnish = 
        (batataIng ? batataIng.price * 0.120 : 0) +
        (cenouraIng ? cenouraIng.price * 0.050 : 0);

      expect(breakdown.garnishCost).toBeCloseTo(expectedGarnish, 2);
    });

    it('pratos únicos não devem ter guarnição padrão', () => {
      const recipe = {
        id: 1,
        name: 'Teste',
        category: 'unicos',
        components: [{ id: 'arr', qty: 0.200 }],
        desc: '',
        safetyMargin: 0
      };

      const breakdown = getRecipeCostBreakdown(recipe);
      expect(breakdown.garnishCost).toBe(0);
    });

    it('pratos únicos podem ter guarnições customizadas', () => {
      const recipe = {
        id: 1,
        name: 'Teste',
        category: 'unicos',
        components: [{ id: 'arr', qty: 0.200 }],
        desc: '',
        safetyMargin: 0,
        garnishes: [{ id: 'tomate', qty: 0.030 }]
      };

      const breakdown = getRecipeCostBreakdown(recipe);
      
      const tomateIng = initialIngredients.find(i => i.id === 'tomate');
      const expectedGarnish = tomateIng ? tomateIng.price * 0.030 : 0;

      expect(breakdown.garnishCost).toBeCloseTo(expectedGarnish, 2);
    });

    it('guarnições customizadas devem aceitar margem de segurança', () => {
      const recipe = {
        id: 1,
        name: 'Teste',
        category: 'bovina',
        components: [{ id: 'carne', qty: 0.150 }],
        desc: '',
        safetyMargin: 8,
        garnishes: [{ id: 'batata', qty: 0.100 }]
      };

      const breakdown = getRecipeCostBreakdown(recipe);
      
      const batataIng = initialIngredients.find(i => i.id === 'batata');
      const costWithoutMargin = batataIng ? batataIng.price * 0.100 : 0;
      const costWithMargin = costWithoutMargin * 1.08;

      expect(breakdown.garnishCost).toBeCloseTo(costWithMargin, 2);
    });
  });

  describe('Integração Completa', () => {
    it('receita com guarnições customizadas e margem deve calcular corretamente', () => {
      const recipe = {
        id: 1,
        name: 'Bife com Batata',
        category: 'bovina',
        components: [
          { id: 'carne', qty: 0.150 },
          { id: 'cebola', qty: 0.030 }
        ],
        desc: '',
        safetyMargin: 7,
        garnishes: [
          { id: 'batata', qty: 0.120 },
          { id: 'cenoura', qty: 0.040 }
        ]
      };

      const breakdown = getRecipeCostBreakdown(recipe);

      // Verificar que todos os componentes estão presentes
      expect(breakdown.componentsCost).toBeGreaterThan(0);
      expect(breakdown.baseCost).toBeGreaterThan(0);
      expect(breakdown.garnishCost).toBeGreaterThan(0);
      expect(breakdown.packagingCost).toBe(0.25);
      expect(breakdown.fixedCost).toBeGreaterThan(0);
      expect(breakdown.total).toBeGreaterThan(0);

      // Verificar que total é a soma
      const sum = 
        breakdown.componentsCost +
        breakdown.baseCost +
        breakdown.garnishCost +
        breakdown.packagingCost +
        breakdown.fixedCost;

      expect(breakdown.total).toBeCloseTo(sum, 2);
    });

    it('diferentes margens devem produzir custos diferentes', () => {
      const baseRecipe = {
        id: 1,
        name: 'Teste',
        category: 'bovina',
        components: [{ id: 'carne', qty: 0.150 }],
        desc: '',
        garnishes: [{ id: 'batata', qty: 0.100 }]
      };

      const recipe5 = { ...baseRecipe, safetyMargin: 5 };
      const recipe10 = { ...baseRecipe, safetyMargin: 10 };
      const recipe15 = { ...baseRecipe, safetyMargin: 15 };

      const breakdown5 = getRecipeCostBreakdown(recipe5);
      const breakdown10 = getRecipeCostBreakdown(recipe10);
      const breakdown15 = getRecipeCostBreakdown(recipe15);

      expect(breakdown10.total).toBeGreaterThan(breakdown5.total);
      expect(breakdown15.total).toBeGreaterThan(breakdown10.total);
    });
  });

  describe('Validações de Estrutura', () => {
    it('receita sem guarnições deve ter array vazio ou undefined', () => {
      const recipe1 = {
        id: 1,
        name: 'Teste',
        category: 'bovina',
        components: [{ id: 'carne', qty: 0.150 }],
        desc: ''
      };

      const recipe2 = {
        id: 2,
        name: 'Teste 2',
        category: 'bovina',
        components: [{ id: 'carne', qty: 0.150 }],
        desc: '',
        garnishes: []
      };

      const breakdown1 = getRecipeCostBreakdown(recipe1);
      const breakdown2 = getRecipeCostBreakdown(recipe2);

      // Ambos devem usar guarnição padrão
      expect(breakdown1.garnishCost).toBeCloseTo(breakdown2.garnishCost, 2);
    });

    it('margem undefined deve usar padrão de 5%', () => {
      const recipe = {
        id: 1,
        name: 'Teste',
        category: 'bovina',
        components: [{ id: 'carne', qty: 0.150 }],
        desc: ''
      };

      const breakdown = getRecipeCostBreakdown(recipe);
      
      const carneIng = initialIngredients.find(i => i.id === 'carne');
      const costWithoutMargin = carneIng ? carneIng.price * 0.150 : 0;
      const costWith5Percent = costWithoutMargin * 1.05;

      expect(breakdown.componentsCost).toBeCloseTo(costWith5Percent, 2);
    });
  });
});
