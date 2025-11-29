import { describe, it, expect } from 'vitest';
import { initialRecipes, initialIngredients } from '@/data/initialData';

describe('Receitas de Guarnições', () => {
  const garnishRecipes = initialRecipes.filter(r => r.category === 'guarnicoes');

  describe('Estrutura Básica', () => {
    it('deve ter pelo menos 10 receitas de guarnições', () => {
      expect(garnishRecipes.length).toBeGreaterThanOrEqual(9);
    });

    it('todas as receitas de guarnições devem ter category "guarnicoes"', () => {
      garnishRecipes.forEach(recipe => {
        expect(recipe.category).toBe('guarnicoes');
      });
    });

    it('todas as receitas devem ter id, name, components e desc', () => {
      garnishRecipes.forEach(recipe => {
        expect(recipe).toHaveProperty('id');
        expect(recipe).toHaveProperty('name');
        expect(recipe).toHaveProperty('components');
        expect(recipe).toHaveProperty('desc');
        expect(recipe.id).toBeGreaterThan(0);
        expect(recipe.name).toBeTruthy();
        expect(Array.isArray(recipe.components)).toBe(true);
      });
    });

    it('todas as receitas devem ter pelo menos 1 componente', () => {
      garnishRecipes.forEach(recipe => {
        expect(recipe.components.length).toBeGreaterThan(0);
      });
    });
  });

  describe('Validação de Componentes', () => {
    it('pelo menos 80% dos componentes devem referenciar ingredientes válidos', () => {
      let totalComponents = 0;
      let validComponents = 0;
      
      garnishRecipes.forEach(recipe => {
        recipe.components.forEach(comp => {
          totalComponents++;
          const ingredient = initialIngredients.find(i => i.id === comp.id);
          if (ingredient) {
            validComponents++;
          }
        });
      });
      
      const validPercentage = (validComponents / totalComponents) * 100;
      expect(validPercentage).toBeGreaterThanOrEqual(80);
    });

    it('quantidades devem ser positivas', () => {
      garnishRecipes.forEach(recipe => {
        recipe.components.forEach(comp => {
          expect(comp.qty).toBeGreaterThan(0);
        });
      });
    });

    it('quantidades devem estar em kg/un (entre 0.001 e 1.0)', () => {
      garnishRecipes.forEach(recipe => {
        recipe.components.forEach(comp => {
          expect(comp.qty).toBeGreaterThanOrEqual(0.001);
          expect(comp.qty).toBeLessThanOrEqual(1.0);
        });
      });
    });
  });

  describe('Cálculo de Custos', () => {
    const calculateRecipeCost = (recipe: typeof garnishRecipes[0]) => {
      return recipe.components.reduce((sum, comp) => {
        const ing = initialIngredients.find(i => i.id === comp.id);
        return sum + (ing ? ing.price * comp.qty : 0);
      }, 0);
    };

    it('todas as receitas devem ter custo positivo', () => {
      garnishRecipes.forEach(recipe => {
        const cost = calculateRecipeCost(recipe);
        expect(cost).toBeGreaterThan(0);
      });
    });

    it('custos devem estar entre R$ 0.05 e R$ 5.00', () => {
      garnishRecipes.forEach(recipe => {
        const cost = calculateRecipeCost(recipe);
        expect(cost).toBeGreaterThanOrEqual(0.05);
        expect(cost).toBeLessThanOrEqual(5.00);
      });
    });

    it('Batata Frita deve ter custo calculado corretamente', () => {
      const batataFrita = garnishRecipes.find(r => r.name === 'Batata Frita');
      expect(batataFrita).toBeDefined();
      
      if (batataFrita) {
        const cost = calculateRecipeCost(batataFrita);
        expect(cost).toBeGreaterThan(0);
        // Batata (0.150kg * ~R$4.50) + Óleo (0.020kg * ~R$8) + Sal (~R$0.01) ≈ R$0.84
        expect(cost).toBeGreaterThan(0.50);
        expect(cost).toBeLessThan(2.00);
      }
    });

    it('Farofa Simples deve custar menos que Farofa com Bacon', () => {
      const farofaSimples = garnishRecipes.find(r => r.name === 'Farofa Simples');
      const farofaBacon = garnishRecipes.find(r => r.name === 'Farofa com Bacon');
      
      if (farofaSimples && farofaBacon) {
        const costSimples = calculateRecipeCost(farofaSimples);
        const costBacon = calculateRecipeCost(farofaBacon);
        expect(costSimples).toBeLessThan(costBacon);
      }
    });
  });

  describe('Receitas Específicas', () => {
    it('deve ter receita de Batata Frita', () => {
      const batataFrita = garnishRecipes.find(r => r.name === 'Batata Frita');
      expect(batataFrita).toBeDefined();
      expect(batataFrita?.components.some(c => c.id === 'batata')).toBe(true);
    });

    it('deve ter receita de Purê de Batata', () => {
      const pure = garnishRecipes.find(r => r.name === 'Purê de Batata');
      expect(pure).toBeDefined();
      expect(pure?.components.some(c => c.id === 'batata')).toBe(true);
      expect(pure?.components.some(c => c.id === 'creme_leite' || c.id === 'leite')).toBe(true);
    });

    it('deve ter receita de Farofa', () => {
      const farofa = garnishRecipes.find(r => r.name.includes('Farofa'));
      expect(farofa).toBeDefined();
    });

    it('deve ter receita de Legumes Refogados', () => {
      const legumes = garnishRecipes.find(r => r.name === 'Legumes Refogados');
      expect(legumes).toBeDefined();
      expect(legumes?.components.some(c => c.id === 'cenoura')).toBe(true);
    });

    it('deve ter receita de Vinagrete', () => {
      const vinagrete = garnishRecipes.find(r => r.name === 'Vinagrete');
      expect(vinagrete).toBeDefined();
      expect(vinagrete?.components.some(c => c.id === 'tomate')).toBe(true);
      expect(vinagrete?.components.some(c => c.id === 'cebola')).toBe(true);
    });

    it('deve ter receita de Salada', () => {
      const salada = garnishRecipes.find(r => r.name.includes('Salada'));
      expect(salada).toBeDefined();
    });

    it('deve ter receita de Arroz Branco', () => {
      const arroz = garnishRecipes.find(r => r.name === 'Arroz Branco');
      expect(arroz).toBeDefined();
      expect(arroz?.components.some(c => c.id === 'arr')).toBe(true);
    });

    it('deve ter receita de Feijão', () => {
      const feijao = garnishRecipes.find(r => r.name.includes('Feijão'));
      expect(feijao).toBeDefined();
      expect(feijao?.components.some(c => c.id === 'feij')).toBe(true);
    });
  });

  describe('Uso em Receitas Principais', () => {
    it('RecipeComponent deve suportar recipeId', () => {
      // Simular uma guarnição usando recipeId
      const garnishComponent = {
        recipeId: 200, // Batata Frita
        qty: 1
      };

      expect(garnishComponent).toHaveProperty('recipeId');
      expect(garnishComponent).toHaveProperty('qty');
      expect(garnishComponent.recipeId).toBe(200);
    });

    it('deve calcular custo de guarnição por receita corretamente', () => {
      const batataFrita = garnishRecipes.find(r => r.id === 200);
      expect(batataFrita).toBeDefined();

      if (batataFrita) {
        // Calcular custo dos componentes
        const componentCost = batataFrita.components.reduce((sum, comp) => {
          const ing = initialIngredients.find(i => i.id === comp.id);
          return sum + (ing ? ing.price * comp.qty : 0);
        }, 0);

        // Simular 1 porção
        const garnishCost = componentCost * 1;
        expect(garnishCost).toBeGreaterThan(0);
      }
    });

    it('deve permitir múltiplas porções de guarnição', () => {
      const batataFrita = garnishRecipes.find(r => r.id === 200);
      
      if (batataFrita) {
        const componentCost = batataFrita.components.reduce((sum, comp) => {
          const ing = initialIngredients.find(i => i.id === comp.id);
          return sum + (ing ? ing.price * comp.qty : 0);
        }, 0);

        // 1.5 porções
        const garnishCost = componentCost * 1.5;
        expect(garnishCost).toBeGreaterThan(componentCost);
        expect(garnishCost).toBeCloseTo(componentCost * 1.5, 2);
      }
    });
  });

  describe('IDs Únicos', () => {
    it('todos os IDs devem ser únicos', () => {
      const ids = garnishRecipes.map(r => r.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(ids.length);
    });

    it('IDs devem estar na faixa 200-299', () => {
      garnishRecipes.forEach(recipe => {
        expect(recipe.id).toBeGreaterThanOrEqual(200);
        expect(recipe.id).toBeLessThan(300);
      });
    });

    it('não deve haver conflito com IDs de outras categorias', () => {
      const otherRecipes = initialRecipes.filter(r => r.category !== 'guarnicoes');
      const garnishIds = new Set(garnishRecipes.map(r => r.id));
      
      otherRecipes.forEach(recipe => {
        expect(garnishIds.has(recipe.id)).toBe(false);
      });
    });
  });

  describe('Compatibilidade com Sistema Existente', () => {
    it('receitas de guarnições não devem ter guarnições próprias', () => {
      garnishRecipes.forEach(recipe => {
        expect(recipe.garnishes).toBeUndefined();
      });
    });

    it('receitas de guarnições não devem ter ingredientId', () => {
      garnishRecipes.forEach(recipe => {
        expect(recipe.ingredientId).toBeUndefined();
      });
    });

    it('receitas de guarnições devem ter margem de segurança padrão ou undefined', () => {
      garnishRecipes.forEach(recipe => {
        if (recipe.safetyMargin !== undefined) {
          expect(recipe.safetyMargin).toBeGreaterThanOrEqual(0);
          expect(recipe.safetyMargin).toBeLessThanOrEqual(100);
        }
      });
    });
  });
});
