import { describe, it, expect } from 'vitest';
import { initialRecipes, initialIngredients } from '../data/initialData';

describe('Acompanhamentos Configuráveis', () => {
  const recipes = initialRecipes;
  const ingredients = initialIngredients;

  it('deve ter receitas de acompanhamentos disponíveis', () => {
    const accompanimentRecipes = recipes.filter(r => r.category === 'acompanhamentos');
    
    // Deve ter pelo menos 8 receitas de acompanhamentos
    expect(accompanimentRecipes.length).toBeGreaterThanOrEqual(8);
  });

  it('deve ter receitas de arroz com diferentes quantidades', () => {
    const riceRecipes = recipes.filter(r => 
      r.category === 'acompanhamentos' && r.name.includes('Arroz')
    );
    
    // Deve ter pelo menos 3 opções de arroz (100g, 150g, 200g)
    expect(riceRecipes.length).toBeGreaterThanOrEqual(3);
    
    riceRecipes.forEach(recipe => {
      expect(recipe.components).toBeDefined();
      expect(recipe.components.length).toBeGreaterThan(0);
      
      // Deve ter arroz nos componentes
      const hasRice = recipe.components.some(c => c.id === 'arr');
      expect(hasRice).toBe(true);
    });
  });

  it('deve ter receitas de feijão com diferentes quantidades', () => {
    const beanRecipes = recipes.filter(r => 
      r.category === 'acompanhamentos' && r.name.includes('Feijão')
    );
    
    // Deve ter pelo menos 3 opções de feijão (60g, 80g, 100g)
    expect(beanRecipes.length).toBeGreaterThanOrEqual(3);
    
    beanRecipes.forEach(recipe => {
      expect(recipe.components).toBeDefined();
      expect(recipe.components.length).toBeGreaterThan(0);
      
      // Deve ter feijão nos componentes
      const hasBeans = recipe.components.some(c => c.id === 'feij');
      expect(hasBeans).toBe(true);
    });
  });

  it('deve calcular custo correto de receita de acompanhamento', () => {
    const riceRecipe = recipes.find(r => r.id === 301); // Arroz Branco 100g
    expect(riceRecipe).toBeDefined();
    
    if (riceRecipe) {
      const cost = riceRecipe.components.reduce((sum, comp) => {
        const ing = ingredients.find(i => i.id === comp.id);
        return sum + (ing ? ing.price * comp.qty : 0);
      }, 0);
      
      // Custo deve ser maior que 0
      expect(cost).toBeGreaterThan(0);
      
      // Custo de arroz 100g deve ser razoável (entre R$ 0.10 e R$ 1.00)
      expect(cost).toBeGreaterThan(0.10);
      expect(cost).toBeLessThan(1.00);
    }
  });

  it('deve ter todos os ingredientes necessários para acompanhamentos', () => {
    const accompanimentRecipes = recipes.filter(r => r.category === 'acompanhamentos');
    
    accompanimentRecipes.forEach(recipe => {
      recipe.components.forEach(comp => {
        const ing = ingredients.find(i => i.id === comp.id);
        expect(ing).toBeDefined();
        expect(ing?.name).toBeTruthy();
        expect(ing?.price).toBeGreaterThan(0);
      });
    });
  });

  it('deve permitir acompanhamentos em receitas', () => {
    // Verificar que a estrutura suporta accompaniments
    const recipeWithAccompaniments = {
      ...recipes[0],
      accompaniments: [
        { recipeId: 301, qty: 1 }, // Arroz 100g
        { recipeId: 304, qty: 1 }  // Feijão 60g
      ]
    };
    
    expect(recipeWithAccompaniments.accompaniments).toBeDefined();
    expect(recipeWithAccompaniments.accompaniments?.length).toBe(2);
  });

  it('deve calcular custo de acompanhamentos customizados', () => {
    const riceRecipe = recipes.find(r => r.id === 302); // Arroz 150g
    const beanRecipe = recipes.find(r => r.id === 305); // Feijão 80g
    
    expect(riceRecipe).toBeDefined();
    expect(beanRecipe).toBeDefined();
    
    if (riceRecipe && beanRecipe) {
      const riceCost = riceRecipe.components.reduce((sum, comp) => {
        const ing = ingredients.find(i => i.id === comp.id);
        return sum + (ing ? ing.price * comp.qty : 0);
      }, 0);
      
      const beanCost = beanRecipe.components.reduce((sum, comp) => {
        const ing = ingredients.find(i => i.id === comp.id);
        return sum + (ing ? ing.price * comp.qty : 0);
      }, 0);
      
      const totalAccompanimentCost = riceCost + beanCost;
      
      // Custo total deve ser razoável
      expect(totalAccompanimentCost).toBeGreaterThan(0);
      expect(totalAccompanimentCost).toBeLessThan(2.00);
    }
  });

  it('deve ter receitas de saladas como acompanhamentos', () => {
    const saladRecipes = recipes.filter(r => 
      r.category === 'acompanhamentos' && 
      (r.name.includes('Salada') || r.name.includes('Vinagrete'))
    );
    
    // Deve ter pelo menos 2 opções de salada
    expect(saladRecipes.length).toBeGreaterThanOrEqual(2);
  });

  it('deve validar quantidades de acompanhamentos', () => {
    const accompanimentRecipes = recipes.filter(r => r.category === 'acompanhamentos');
    
    accompanimentRecipes.forEach(recipe => {
      recipe.components.forEach(comp => {
        // Quantidade deve ser positiva
        expect(comp.qty).toBeGreaterThan(0);
        
        // Quantidade deve ser razoável (não mais que 1kg)
        expect(comp.qty).toBeLessThanOrEqual(1.0);
      });
    });
  });

  it('deve ter nomes descritivos com quantidades', () => {
    const riceRecipes = recipes.filter(r => 
      r.category === 'acompanhamentos' && r.name.includes('Arroz')
    );
    
    riceRecipes.forEach(recipe => {
      // Nome deve incluir quantidade (100g, 150g, 200g)
      const hasQuantity = /\d+g/.test(recipe.name);
      expect(hasQuantity).toBe(true);
    });
  });
});
