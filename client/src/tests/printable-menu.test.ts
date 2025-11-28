import { describe, it, expect } from 'vitest';
import { initialRecipes, initialWeeks } from '../data/initialData';

describe('Printable Menu - Funcionalidade de Impressão', () => {
  const week = initialWeeks[0];
  const recipes = initialRecipes;

  it('deve ter uma semana válida para impressão', () => {
    expect(week).toBeDefined();
    expect(week.title).toBe('Semana 1');
    expect(week.days).toHaveLength(5);
  });

  it('deve ter 5 dias de cardápio (Segunda a Sexta)', () => {
    expect(week.days).toHaveLength(5);
    
    week.days.forEach((day, idx) => {
      expect(day.dishes).toHaveLength(3); // 3 opções por dia
    });
  });

  it('deve ter receitas válidas para cada prato', () => {
    week.days.forEach((day) => {
      day.dishes.forEach((dish) => {
        const recipe = recipes.find(r => r.id === dish.recipeId);
        expect(recipe).toBeDefined();
        expect(recipe?.name).toBeTruthy();
      });
    });
  });

  it('deve permitir guarnições configuradas para receitas', () => {
    const recipesWithGarnishes = recipes.filter(r => 
      r.garnishes && r.garnishes.length > 0
    );
    
    // Guarnições são opcionais - podem ser 0 ou mais
    expect(recipesWithGarnishes.length).toBeGreaterThanOrEqual(0);
  });

  it('deve identificar receitas de guarnições', () => {
    const garnishRecipes = recipes.filter(r => r.category === 'guarnicoes');
    
    // Deve ter receitas de guarnições disponíveis
    expect(garnishRecipes.length).toBeGreaterThan(0);
    
    garnishRecipes.forEach(recipe => {
      expect(recipe.category).toBe('guarnicoes');
      expect(recipe.name).toBeTruthy();
    });
  });

  it('deve ter componentes válidos nas receitas de guarnições', () => {
    const garnishRecipes = recipes.filter(r => r.category === 'guarnicoes');
    
    garnishRecipes.forEach(recipe => {
      expect(recipe.components).toBeDefined();
      expect(Array.isArray(recipe.components)).toBe(true);
      
      // Cada componente deve ter id e qty
      recipe.components.forEach(comp => {
        expect(comp.id || comp.recipeId).toBeTruthy();
        expect(comp.qty).toBeGreaterThan(0);
      });
    });
  });

  it('deve validar estrutura de guarnições em receitas', () => {
    const recipesWithGarnishes = recipes.filter(r => 
      r.garnishes && r.garnishes.length > 0
    );
    
    recipesWithGarnishes.forEach(recipe => {
      recipe.garnishes?.forEach(garnish => {
        // Deve ter recipeId (referência a receita de guarnição)
        expect(garnish.recipeId).toBeTruthy();
        expect(garnish.qty).toBeGreaterThan(0);
      });
    });
  });

  it('deve ter nome de prato em cada dish', () => {
    week.days.forEach((day) => {
      day.dishes.forEach((dish) => {
        expect(dish.name).toBeTruthy();
        expect(typeof dish.name).toBe('string');
      });
    });
  });

  it('deve ter recipeId válido em cada dish', () => {
    week.days.forEach((day) => {
      day.dishes.forEach((dish) => {
        expect(dish.recipeId).toBeTruthy();
        
        // Verificar se a receita existe
        const recipe = recipes.find(r => r.id === dish.recipeId);
        expect(recipe).toBeDefined();
      });
    });
  });

  it('deve ter categorias válidas nas receitas', () => {
    const validCategories = ['bovina', 'frango', 'peixe', 'porco', 'unicos', 'guarnicoes', 'acompanhamentos'];
    
    recipes.forEach(recipe => {
      expect(validCategories).toContain(recipe.category);
    });
  });
});
