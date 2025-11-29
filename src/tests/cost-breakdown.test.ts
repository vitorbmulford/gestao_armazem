import { describe, it, expect } from 'vitest';
import { initialIngredients, initialRecipes } from '@/data/initialData';

describe('Cost Breakdown - Detalhamento de Custos', () => {
  // Simular configurações do contexto
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

  // Função de breakdown simulada
  const getRecipeCostBreakdown = (recipe: typeof initialRecipes[0]) => {
    let componentsCost = 0;
    if (recipe.components && recipe.components.length > 0) {
      componentsCost = recipe.components.reduce((acc, comp) => {
        const ing = initialIngredients.find((i) => i.id === comp.id);
        return acc + (ing ? ing.price * comp.qty : 0);
      }, 0);
    }

    let baseCost = 0;
    const hasRice = recipe.components ? recipe.components.some(c => c.id === 'arr') : false;
    baseConfig.forEach(base => {
      if (hasRice && (base.ingredientId === 'arr' || base.ingredientId === 'feij')) return;
      const ing = initialIngredients.find(i => i.id === base.ingredientId);
      if (ing) baseCost += ing.price * base.qtyRaw;
    });

    let garnishCost = 0;
    if (recipe.category !== 'unicos') {
      const vegGeneric = initialIngredients.find(i => i.id === 'leg_div');
      if (vegGeneric) {
        garnishCost = vegGeneric.price * defaultSideWeight;
      }
    }

    const totalFixed = fixedExpenses.reduce((acc, curr) => acc + curr.value, 0);
    const allocatedFixed = totalFixed * (allocation / 100);
    const dailyFixed = allocatedFixed / workDays;
    const unitFixedCost = dailyFixed / productionVolume;

    // Buscar preço real da embalagem do banco de dados
    const packagingIngredient = initialIngredients.find(i => i.id === 'emb');
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

  describe('Estrutura do Breakdown', () => {
    it('deve retornar objeto com todas as propriedades', () => {
      const recipe = initialRecipes[0];
      const breakdown = getRecipeCostBreakdown(recipe);

      expect(breakdown).toHaveProperty('componentsCost');
      expect(breakdown).toHaveProperty('baseCost');
      expect(breakdown).toHaveProperty('garnishCost');
      expect(breakdown).toHaveProperty('packagingCost');
      expect(breakdown).toHaveProperty('fixedCost');
      expect(breakdown).toHaveProperty('total');
    });

    it('todos os valores devem ser números', () => {
      const recipe = initialRecipes[0];
      const breakdown = getRecipeCostBreakdown(recipe);

      expect(typeof breakdown.componentsCost).toBe('number');
      expect(typeof breakdown.baseCost).toBe('number');
      expect(typeof breakdown.garnishCost).toBe('number');
      expect(typeof breakdown.packagingCost).toBe('number');
      expect(typeof breakdown.fixedCost).toBe('number');
      expect(typeof breakdown.total).toBe('number');
    });

    it('todos os valores devem ser não-negativos', () => {
      const recipe = initialRecipes[0];
      const breakdown = getRecipeCostBreakdown(recipe);

      expect(breakdown.componentsCost).toBeGreaterThanOrEqual(0);
      expect(breakdown.baseCost).toBeGreaterThanOrEqual(0);
      expect(breakdown.garnishCost).toBeGreaterThanOrEqual(0);
      expect(breakdown.packagingCost).toBeGreaterThanOrEqual(0);
      expect(breakdown.fixedCost).toBeGreaterThanOrEqual(0);
      expect(breakdown.total).toBeGreaterThanOrEqual(0);
    });
  });

  describe('Cálculo de Componentes', () => {
    it('componentsCost deve ser maior que zero para receitas com ingredientes', () => {
      const recipe = initialRecipes.find(r => r.components.length > 0);
      if (recipe) {
        const breakdown = getRecipeCostBreakdown(recipe);
        expect(breakdown.componentsCost).toBeGreaterThan(0);
      }
    });

    it('componentsCost deve somar corretamente os ingredientes', () => {
      const recipe = initialRecipes[0];
      const breakdown = getRecipeCostBreakdown(recipe);

      let expectedCost = 0;
      recipe.components.forEach(comp => {
        const ing = initialIngredients.find(i => i.id === comp.id);
        if (ing) {
          expectedCost += ing.price * comp.qty;
        }
      });

      expect(breakdown.componentsCost).toBeCloseTo(expectedCost, 2);
    });
  });

  describe('Cálculo de Base', () => {
    it('baseCost deve incluir arroz e feijão quando receita não tem arroz', () => {
      const recipe = initialRecipes.find(r => !r.components.some(c => c.id === 'arr'));
      if (recipe) {
        const breakdown = getRecipeCostBreakdown(recipe);
        expect(breakdown.baseCost).toBeGreaterThan(0);
      }
    });

    it('baseCost deve excluir arroz e feijão quando receita já tem arroz', () => {
      const recipe = initialRecipes.find(r => r.components.some(c => c.id === 'arr'));
      if (recipe) {
        const breakdown = getRecipeCostBreakdown(recipe);
        
        // Calcular base sem arroz e feijão
        let expectedBase = 0;
        baseConfig.forEach(base => {
          if (base.ingredientId !== 'arr' && base.ingredientId !== 'feij') {
            const ing = initialIngredients.find(i => i.id === base.ingredientId);
            if (ing) expectedBase += ing.price * base.qtyRaw;
          }
        });

        expect(breakdown.baseCost).toBeCloseTo(expectedBase, 2);
      }
    });
  });

  describe('Cálculo de Guarnições', () => {
    it('garnishCost deve ser zero para pratos únicos', () => {
      const recipe = initialRecipes.find(r => r.category === 'unicos');
      if (recipe) {
        const breakdown = getRecipeCostBreakdown(recipe);
        expect(breakdown.garnishCost).toBe(0);
      }
    });

    it('garnishCost deve ser maior que zero para receitas normais', () => {
      const recipe = initialRecipes.find(r => r.category !== 'unicos');
      if (recipe) {
        const breakdown = getRecipeCostBreakdown(recipe);
        expect(breakdown.garnishCost).toBeGreaterThan(0);
      }
    });
  });

  describe('Custo de Embalagem', () => {
    it('packagingCost deve usar preço do ingrediente embalagem (R$ 1.25)', () => {
      const embIngredient = initialIngredients.find(i => i.id === 'emb');
      expect(embIngredient).toBeDefined();
      expect(embIngredient?.price).toBe(1.25);
      
      initialRecipes.slice(0, 10).forEach(recipe => {
        const breakdown = getRecipeCostBreakdown(recipe);
        expect(breakdown.packagingCost).toBe(1.25);
      });
    });
  });

  describe('Custos Fixos', () => {
    it('fixedCost deve ser calculado corretamente', () => {
      const recipe = initialRecipes[0];
      const breakdown = getRecipeCostBreakdown(recipe);

      const totalFixed = fixedExpenses.reduce((acc, curr) => acc + curr.value, 0);
      const allocatedFixed = totalFixed * (allocation / 100);
      const dailyFixed = allocatedFixed / workDays;
      const expectedFixedCost = dailyFixed / productionVolume;

      expect(breakdown.fixedCost).toBeCloseTo(expectedFixedCost, 2);
    });

    it('fixedCost deve ser consistente entre receitas', () => {
      const breakdown1 = getRecipeCostBreakdown(initialRecipes[0]);
      const breakdown2 = getRecipeCostBreakdown(initialRecipes[1]);

      expect(breakdown1.fixedCost).toBe(breakdown2.fixedCost);
    });
  });

  describe('Total', () => {
    it('total deve ser a soma de todos os componentes', () => {
      const recipe = initialRecipes[0];
      const breakdown = getRecipeCostBreakdown(recipe);

      const expectedTotal = 
        breakdown.componentsCost +
        breakdown.baseCost +
        breakdown.garnishCost +
        breakdown.packagingCost +
        breakdown.fixedCost;

      expect(breakdown.total).toBeCloseTo(expectedTotal, 2);
    });

    it('total deve ser maior que cada componente individual', () => {
      const recipe = initialRecipes[0];
      const breakdown = getRecipeCostBreakdown(recipe);

      expect(breakdown.total).toBeGreaterThan(breakdown.componentsCost);
      expect(breakdown.total).toBeGreaterThan(breakdown.baseCost);
      expect(breakdown.total).toBeGreaterThan(breakdown.garnishCost);
      expect(breakdown.total).toBeGreaterThan(breakdown.packagingCost);
      expect(breakdown.total).toBeGreaterThan(breakdown.fixedCost);
    });
  });

  describe('Validação de Múltiplas Receitas', () => {
    it('todas as receitas devem ter breakdown válido', () => {
      initialRecipes.forEach(recipe => {
        const breakdown = getRecipeCostBreakdown(recipe);
        
        expect(breakdown.total).toBeGreaterThan(0);
        expect(breakdown.total).toBeLessThan(20); // Assumindo que nenhuma receita custa mais de R$ 20
      });
    });

    it('receitas da mesma categoria devem ter custos similares de base e fixos', () => {
      const bovinaRecipes = initialRecipes.filter(r => r.category === 'bovina').slice(0, 3);
      const breakdowns = bovinaRecipes.map(r => getRecipeCostBreakdown(r));

      // Base e fixos devem ser iguais
      expect(breakdowns[0].baseCost).toBeCloseTo(breakdowns[1].baseCost, 1);
      expect(breakdowns[0].fixedCost).toBe(breakdowns[1].fixedCost);
      expect(breakdowns[0].packagingCost).toBe(breakdowns[1].packagingCost);
    });
  });

  describe('Proporções de Custo', () => {
    it('componentsCost deve ser a maior parte do custo total', () => {
      const recipe = initialRecipes[0];
      const breakdown = getRecipeCostBreakdown(recipe);

      const componentPercentage = (breakdown.componentsCost / breakdown.total) * 100;
      expect(componentPercentage).toBeGreaterThan(30); // Pelo menos 30% do custo
    });

    it('fixedCost deve representar entre 15% e 50% do custo total', () => {
      const recipe = initialRecipes[0];
      const breakdown = getRecipeCostBreakdown(recipe);

      const fixedPercentage = (breakdown.fixedCost / breakdown.total) * 100;
      expect(fixedPercentage).toBeGreaterThan(15);
      expect(fixedPercentage).toBeLessThan(50);
    });
  });
});
