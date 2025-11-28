import { describe, it, expect } from 'vitest';
import { initialIngredients, initialRecipes, initialWeeks } from '@/data/initialData';

describe('Sistema de Gestão de Cozinha', () => {
  describe('Dados Iniciais', () => {
    it('deve ter ingredientes carregados', () => {
      expect(initialIngredients).toBeDefined();
      expect(initialIngredients.length).toBeGreaterThan(0);
      expect(initialIngredients.length).toBeGreaterThanOrEqual(75);
    });

    it('deve ter receitas carregadas', () => {
      expect(initialRecipes).toBeDefined();
      expect(initialRecipes.length).toBeGreaterThan(0);
      expect(initialRecipes.length).toBeGreaterThanOrEqual(75);
    });

    it('deve ter semanas de cardápio carregadas', () => {
      expect(initialWeeks).toBeDefined();
      expect(initialWeeks.length).toBeGreaterThan(0);
      expect(initialWeeks.length).toBeGreaterThanOrEqual(5);
    });

    it('todos os ingredientes devem ter estrutura válida', () => {
      initialIngredients.forEach((ing) => {
        expect(ing.id).toBeDefined();
        expect(ing.name).toBeDefined();
        expect(ing.price).toBeGreaterThanOrEqual(0);
        expect(ing.unit).toBeDefined();
        expect(ing.yield).toBeGreaterThan(0);
        expect(ing.category).toBeDefined();
      });
    });

    it('todas as receitas devem ter estrutura válida', () => {
      initialRecipes.forEach((recipe) => {
        expect(recipe.id).toBeDefined();
        expect(recipe.name).toBeDefined();
        expect(recipe.category).toBeDefined();
        expect(recipe.components).toBeDefined();
        expect(Array.isArray(recipe.components)).toBe(true);
      });
    });

    it('todas as semanas devem ter 5 dias', () => {
      initialWeeks.forEach((week) => {
        expect(week.days).toBeDefined();
        expect(week.days.length).toBe(5);
      });
    });

    it('cada dia deve ter 3 opções de prato', () => {
      initialWeeks.forEach((week) => {
        week.days.forEach((day) => {
          expect(day.dishes).toBeDefined();
          expect(day.dishes.length).toBe(3);
        });
      });
    });
  });

  describe('Categorias de Ingredientes', () => {
    it('deve ter ingredientes de todas as categorias', () => {
      const categories = ['protein', 'grain', 'veg', 'fruit', 'misc', 'ops'];
      categories.forEach((cat) => {
        const hasCategory = initialIngredients.some((ing) => ing.category === cat);
        expect(hasCategory).toBe(true);
      });
    });

    it('deve ter proteínas suficientes', () => {
      const proteins = initialIngredients.filter((ing) => ing.category === 'protein');
      expect(proteins.length).toBeGreaterThan(20);
    });

    it('deve ter cereais básicos', () => {
      const grains = initialIngredients.filter((ing) => ing.category === 'grain');
      expect(grains.length).toBeGreaterThan(5);
      
      // Verificar arroz e feijão
      const hasRice = grains.some((g) => g.id === 'arr');
      const hasBeans = grains.some((g) => g.id === 'feij');
      expect(hasRice).toBe(true);
      expect(hasBeans).toBe(true);
    });
  });

  describe('Categorias de Receitas', () => {
    it('deve ter receitas de todas as categorias', () => {
      const categories = ['bovina', 'frango', 'peixe', 'porco', 'unicos'];
      categories.forEach((cat) => {
        const hasCategory = initialRecipes.some((r) => r.category === cat);
        expect(hasCategory).toBe(true);
      });
    });

    it('deve ter receitas bovinas', () => {
      const bovina = initialRecipes.filter((r) => r.category === 'bovina');
      expect(bovina.length).toBeGreaterThan(10);
    });

    it('deve ter receitas de frango', () => {
      const frango = initialRecipes.filter((r) => r.category === 'frango');
      expect(frango.length).toBeGreaterThan(10);
    });
  });

  describe('Validação de Componentes', () => {
    it('pelo menos 95% dos componentes de receitas devem referenciar ingredientes válidos', () => {
      const ingredientIds = new Set(initialIngredients.map((ing) => ing.id));
      let totalComponents = 0;
      let validComponents = 0;
      
      initialRecipes.forEach((recipe) => {
        recipe.components.forEach((comp) => {
          totalComponents++;
          if (comp.id && ingredientIds.has(comp.id)) {
            validComponents++;
          }
        });
      });
      
      const validPercentage = (validComponents / totalComponents) * 100;
      expect(validPercentage).toBeGreaterThanOrEqual(95);
    });

    it('componentes devem ter quantidades válidas', () => {
      initialRecipes.forEach((recipe) => {
        recipe.components.forEach((comp) => {
          expect(comp.qty).toBeGreaterThan(0);
          expect(comp.qty).toBeLessThan(5); // Quantidades razoáveis (algumas receitas usam ovos em unidades)
        });
      });
    });
  });

  describe('Cálculos de Custo', () => {
    it('deve calcular custo de ingrediente corretamente', () => {
      const arroz = initialIngredients.find((ing) => ing.id === 'arr');
      expect(arroz).toBeDefined();
      if (arroz) {
        const custoParaReceita = arroz.price * 0.1; // 100g
        expect(custoParaReceita).toBeGreaterThan(0);
        expect(custoParaReceita).toBe(0.55); // R$ 5.50 * 0.1kg
      }
    });

    it('deve calcular custo de receita simples', () => {
      const recipe = initialRecipes.find((r) => r.id === 1); // Carne de Panela
      expect(recipe).toBeDefined();
      
      if (recipe) {
        let totalCost = 0;
        recipe.components.forEach((comp) => {
          const ing = initialIngredients.find((i) => i.id === comp.id);
          if (ing) {
            totalCost += ing.price * comp.qty;
          }
        });
        
        expect(totalCost).toBeGreaterThan(0);
        // Carne de Panela: acem (0.15kg * 29.90) + batata (0.05kg * 5.50) + cenoura (0.05kg * 4.90)
        const expectedCost = (0.15 * 29.90) + (0.05 * 5.50) + (0.05 * 4.90);
        expect(totalCost).toBeCloseTo(expectedCost, 2);
      }
    });
  });

  describe('Estrutura de Cardápio', () => {
    it('cardápio deve ter semanas nomeadas', () => {
      initialWeeks.forEach((week) => {
        expect(week.title).toBeDefined();
        expect(week.title.length).toBeGreaterThan(0);
      });
    });

    it('dias da semana devem ter nomes', () => {
      const expectedDays = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta'];
      initialWeeks.forEach((week) => {
        week.days.forEach((day, idx) => {
          expect(day.name).toBe(expectedDays[idx]);
        });
      });
    });

    it('pratos devem ter nomes', () => {
      initialWeeks.forEach((week) => {
        week.days.forEach((day) => {
          day.dishes.forEach((dish) => {
            expect(dish.name).toBeDefined();
            expect(dish.name.length).toBeGreaterThan(0);
          });
        });
      });
    });

    it('dias devem ter guarnições', () => {
      initialWeeks.forEach((week) => {
        week.days.forEach((day) => {
          expect(day.sides).toBeDefined();
          expect(Array.isArray(day.sides)).toBe(true);
          expect(day.sides.length).toBeGreaterThan(0);
        });
      });
    });
  });

  describe('Validação de Preços', () => {
    it('todos os preços devem ser números positivos', () => {
      initialIngredients.forEach((ing) => {
        expect(typeof ing.price).toBe('number');
        expect(ing.price).toBeGreaterThanOrEqual(0);
      });
    });

    it('rendimentos devem ser válidos', () => {
      initialIngredients.forEach((ing) => {
        expect(typeof ing.yield).toBe('number');
        expect(ing.yield).toBeGreaterThan(0);
        expect(ing.yield).toBeLessThanOrEqual(3); // Rendimento máximo razoável
      });
    });
  });

  describe('Integridade de Dados', () => {
    it('não deve haver IDs duplicados em ingredientes', () => {
      const ids = initialIngredients.map((ing) => ing.id);
      const uniqueIds = new Set(ids);
      expect(ids.length).toBe(uniqueIds.size);
    });

    it('não deve haver IDs duplicados em receitas', () => {
      const ids = initialRecipes.map((r) => r.id);
      const uniqueIds = new Set(ids);
      expect(ids.length).toBe(uniqueIds.size);
    });

    it('não deve haver IDs duplicados em semanas', () => {
      const ids = initialWeeks.map((w) => w.id);
      const uniqueIds = new Set(ids);
      expect(ids.length).toBe(uniqueIds.size);
    });
  });
});
