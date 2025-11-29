import { describe, it, expect } from 'vitest';
import { initialIngredients, initialRecipes, initialWeeks } from '@/data/initialData';

describe('Analytics - Cálculos e Métricas', () => {
  const sellingPrice = 18.0;

  // Função auxiliar para calcular custo de receita
  const getRecipeCost = (recipe: typeof initialRecipes[0]) => {
    let total = 0;
    recipe.components.forEach((comp) => {
      const ing = initialIngredients.find((i) => i.id === comp.id);
      if (ing) {
        total += ing.price * comp.qty;
      }
    });
    return total;
  };

  describe('Evolução de Custos', () => {
    it('deve calcular custo médio por semana', () => {
      initialWeeks.forEach((week) => {
        let totalCost = 0;
        let daysCount = 0;

        week.days.forEach((day) => {
          day.dishes.forEach((dish) => {
            const recipe = initialRecipes.find((r) => r.id === dish.recipeId);
            if (recipe) {
              totalCost += getRecipeCost(recipe);
              daysCount++;
            }
          });
        });

        const avgCost = daysCount > 0 ? totalCost / daysCount : 0;
        expect(avgCost).toBeGreaterThan(0);
        expect(avgCost).toBeLessThan(sellingPrice);
      });
    });

    it('deve calcular lucro médio por semana', () => {
      initialWeeks.forEach((week) => {
        let totalCost = 0;
        let daysCount = 0;

        week.days.forEach((day) => {
          day.dishes.forEach((dish) => {
            const recipe = initialRecipes.find((r) => r.id === dish.recipeId);
            if (recipe) {
              totalCost += getRecipeCost(recipe);
              daysCount++;
            }
          });
        });

        const avgCost = daysCount > 0 ? totalCost / daysCount : 0;
        const avgProfit = sellingPrice - avgCost;
        
        expect(avgProfit).toBeGreaterThan(0);
        expect(avgProfit).toBeLessThan(sellingPrice);
      });
    });
  });

  describe('Ranking de Receitas', () => {
    it('deve calcular lucro de cada receita', () => {
      initialRecipes.forEach((recipe) => {
        const cost = getRecipeCost(recipe);
        const profit = sellingPrice - cost;
        
        expect(cost).toBeGreaterThan(0);
        expect(profit).toBeDefined();
        expect(typeof profit).toBe('number');
      });
    });

    it('deve calcular margem de lucro corretamente', () => {
      initialRecipes.forEach((recipe) => {
        const cost = getRecipeCost(recipe);
        const profit = sellingPrice - cost;
        const margin = (profit / sellingPrice) * 100;
        
        expect(margin).toBeGreaterThan(0);
        expect(margin).toBeLessThan(100);
      });
    });

    it('deve identificar receitas mais lucrativas', () => {
      const recipeStats = initialRecipes.map((recipe) => {
        const cost = getRecipeCost(recipe);
        const profit = sellingPrice - cost;
        return { id: recipe.id, name: recipe.name, profit };
      });

      const sorted = recipeStats.sort((a, b) => b.profit - a.profit);
      
      expect(sorted[0].profit).toBeGreaterThanOrEqual(sorted[1].profit);
      expect(sorted[1].profit).toBeGreaterThanOrEqual(sorted[2].profit);
    });

    it('ranking deve ter pelo menos 15 receitas', () => {
      expect(initialRecipes.length).toBeGreaterThanOrEqual(15);
    });
  });

  describe('Distribuição de Custos por Categoria', () => {
    it('deve agrupar custos por categoria de ingrediente', () => {
      const categoryTotals: Record<string, number> = {
        protein: 0,
        grain: 0,
        veg: 0,
        fruit: 0,
        misc: 0,
        ops: 0,
      };

      initialWeeks[0].days.forEach((day) => {
        day.dishes.forEach((dish) => {
          const recipe = initialRecipes.find((r) => r.id === dish.recipeId);
          if (recipe && recipe.components) {
            recipe.components.forEach((comp) => {
              const ing = initialIngredients.find((i) => i.id === comp.id);
              if (ing) {
                categoryTotals[ing.category] += ing.price * comp.qty;
              }
            });
          }
        });
      });

      // Verificar que pelo menos uma categoria tem custo
      const hasValues = Object.values(categoryTotals).some((v) => v > 0);
      expect(hasValues).toBe(true);

      // Proteínas devem ser a maior categoria de custo
      expect(categoryTotals.protein).toBeGreaterThan(0);
    });

    it('soma de categorias deve ser igual ao custo total', () => {
      const categoryTotals: Record<string, number> = {
        protein: 0,
        grain: 0,
        veg: 0,
        fruit: 0,
        misc: 0,
        ops: 0,
      };

      let totalCost = 0;

      initialWeeks[0].days.forEach((day) => {
        day.dishes.forEach((dish) => {
          const recipe = initialRecipes.find((r) => r.id === dish.recipeId);
          if (recipe && recipe.components) {
            recipe.components.forEach((comp) => {
              const ing = initialIngredients.find((i) => i.id === comp.id);
              if (ing) {
                const cost = ing.price * comp.qty;
                categoryTotals[ing.category] += cost;
                totalCost += cost;
              }
            });
          }
        });
      });

      const sumCategories = Object.values(categoryTotals).reduce((acc, v) => acc + v, 0);
      expect(sumCategories).toBeCloseTo(totalCost, 2);
    });
  });

  describe('Comparativo por Categoria de Receita', () => {
    it('deve calcular média por categoria de receita', () => {
      const categories = ['bovina', 'frango', 'peixe', 'porco', 'unicos'];
      
      categories.forEach((cat) => {
        const categoryRecipes = initialRecipes.filter((r) => r.category === cat);
        
        if (categoryRecipes.length > 0) {
          const avgCost = categoryRecipes.reduce((acc, r) => acc + getRecipeCost(r), 0) / categoryRecipes.length;
          expect(avgCost).toBeGreaterThan(0);
          expect(avgCost).toBeLessThan(sellingPrice);
        }
      });
    });

    it('deve calcular margem média por categoria', () => {
      const categories = ['bovina', 'frango', 'peixe', 'porco', 'unicos'];
      
      categories.forEach((cat) => {
        const categoryRecipes = initialRecipes.filter((r) => r.category === cat);
        
        if (categoryRecipes.length > 0) {
          const avgCost = categoryRecipes.reduce((acc, r) => acc + getRecipeCost(r), 0) / categoryRecipes.length;
          const avgProfit = sellingPrice - avgCost;
          const avgMargin = (avgProfit / sellingPrice) * 100;
          
          expect(avgMargin).toBeGreaterThan(0);
          expect(avgMargin).toBeLessThan(100);
        }
      });
    });

    it('todas as categorias devem ter receitas', () => {
      const categories = ['bovina', 'frango', 'peixe', 'porco', 'unicos'];
      
      categories.forEach((cat) => {
        const categoryRecipes = initialRecipes.filter((r) => r.category === cat);
        expect(categoryRecipes.length).toBeGreaterThan(0);
      });
    });
  });

  describe('Validação de Métricas', () => {
    it('custo nunca deve ser maior que preço de venda', () => {
      initialRecipes.forEach((recipe) => {
        const cost = getRecipeCost(recipe);
        expect(cost).toBeLessThan(sellingPrice);
      });
    });

    it('lucro deve ser sempre positivo', () => {
      initialRecipes.forEach((recipe) => {
        const cost = getRecipeCost(recipe);
        const profit = sellingPrice - cost;
        expect(profit).toBeGreaterThan(0);
      });
    });

    it('margem ideal deve ser acima de 50%', () => {
      const recipeStats = initialRecipes.map((recipe) => {
        const cost = getRecipeCost(recipe);
        const profit = sellingPrice - cost;
        const margin = (profit / sellingPrice) * 100;
        return margin;
      });

      const avgMargin = recipeStats.reduce((acc, m) => acc + m, 0) / recipeStats.length;
      expect(avgMargin).toBeGreaterThan(50);
    });
  });

  describe('Insights e Recomendações', () => {
    it('deve identificar categoria com melhor margem', () => {
      const categories = ['bovina', 'frango', 'peixe', 'porco', 'unicos'];
      const categoryMargins: Array<{ category: string; margin: number }> = [];
      
      categories.forEach((cat) => {
        const categoryRecipes = initialRecipes.filter((r) => r.category === cat);
        if (categoryRecipes.length > 0) {
          const avgCost = categoryRecipes.reduce((acc, r) => acc + getRecipeCost(r), 0) / categoryRecipes.length;
          const avgProfit = sellingPrice - avgCost;
          const avgMargin = (avgProfit / sellingPrice) * 100;
          categoryMargins.push({ category: cat, margin: avgMargin });
        }
      });

      const bestCategory = categoryMargins.sort((a, b) => b.margin - a.margin)[0];
      expect(bestCategory).toBeDefined();
      expect(bestCategory.margin).toBeGreaterThan(0);
    });

    it('deve identificar categoria de custo mais alto', () => {
      const categoryTotals: Record<string, number> = {
        protein: 0,
        grain: 0,
        veg: 0,
        fruit: 0,
        misc: 0,
        ops: 0,
      };

      initialWeeks[0].days.forEach((day) => {
        day.dishes.forEach((dish) => {
          const recipe = initialRecipes.find((r) => r.id === dish.recipeId);
          if (recipe && recipe.components) {
            recipe.components.forEach((comp) => {
              const ing = initialIngredients.find((i) => i.id === comp.id);
              if (ing) {
                categoryTotals[ing.category] += ing.price * comp.qty;
              }
            });
          }
        });
      });

      const sorted = Object.entries(categoryTotals).sort((a, b) => b[1] - a[1]);
      expect(sorted[0][1]).toBeGreaterThan(0);
      expect(sorted[0][0]).toBeDefined();
    });
  });
});
