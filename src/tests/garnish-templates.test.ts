import { describe, it, expect } from 'vitest';

describe('Sistema de Templates de Guarnições', () => {
  // Mock de dados
  const mockIngredients = [
    { id: 'batata', name: 'Batata', price: 4.50, unit: 'kg', category: 'Legumes', yield: 0.85 },
    { id: 'tomate', name: 'Tomate', price: 6.00, unit: 'kg', category: 'Legumes', yield: 0.90 },
    { id: 'cebola', name: 'Cebola', price: 3.50, unit: 'kg', category: 'Legumes', yield: 0.80 },
    { id: 'cenoura', name: 'Cenoura', price: 4.00, unit: 'kg', category: 'Legumes', yield: 0.85 },
    { id: 'alface', name: 'Alface', price: 8.00, unit: 'kg', category: 'Legumes', yield: 0.95 },
  ];

  const mockTemplates = [
    {
      id: 1,
      name: 'Combo Batata Frita',
      description: 'Batata frita com vinagrete',
      garnishes: [
        { id: 'batata', qty: 0.120 },
        { id: 'tomate', qty: 0.030 },
        { id: 'cebola', qty: 0.020 }
      ]
    },
    {
      id: 2,
      name: 'Combo Farofa',
      description: 'Farofa com legumes',
      garnishes: [
        { id: 'cenoura', qty: 0.050 },
        { id: 'cebola', qty: 0.030 }
      ]
    },
    {
      id: 3,
      name: 'Combo Completo',
      description: 'Batata + Salada + Vinagrete',
      garnishes: [
        { id: 'batata', qty: 0.080 },
        { id: 'tomate', qty: 0.040 },
        { id: 'alface', qty: 0.030 },
        { id: 'cebola', qty: 0.020 }
      ]
    }
  ];

  describe('Estrutura de Templates', () => {
    it('deve ter estrutura correta com id, name, description e garnishes', () => {
      mockTemplates.forEach(template => {
        expect(template).toHaveProperty('id');
        expect(template).toHaveProperty('name');
        expect(template).toHaveProperty('description');
        expect(template).toHaveProperty('garnishes');
        expect(Array.isArray(template.garnishes)).toBe(true);
      });
    });

    it('deve ter pelo menos 3 templates pré-configurados', () => {
      expect(mockTemplates.length).toBeGreaterThanOrEqual(3);
    });

    it('cada guarnição deve ter id e qty', () => {
      mockTemplates.forEach(template => {
        template.garnishes.forEach(garnish => {
          expect(garnish).toHaveProperty('id');
          expect(garnish).toHaveProperty('qty');
          expect(typeof garnish.id).toBe('string');
          expect(typeof garnish.qty).toBe('number');
        });
      });
    });
  });

  describe('Validação de Guarnições', () => {
    it('todas as guarnições devem referenciar ingredientes válidos', () => {
      mockTemplates.forEach(template => {
        template.garnishes.forEach(garnish => {
          const ingredient = mockIngredients.find(i => i.id === garnish.id);
          expect(ingredient).toBeDefined();
        });
      });
    });

    it('quantidades devem ser positivas', () => {
      mockTemplates.forEach(template => {
        template.garnishes.forEach(garnish => {
          expect(garnish.qty).toBeGreaterThan(0);
        });
      });
    });

    it('quantidades devem estar em kg (entre 0.001 e 1.0)', () => {
      mockTemplates.forEach(template => {
        template.garnishes.forEach(garnish => {
          expect(garnish.qty).toBeGreaterThanOrEqual(0.001);
          expect(garnish.qty).toBeLessThanOrEqual(1.0);
        });
      });
    });
  });

  describe('Cálculo de Custo de Templates', () => {
    const calculateTemplateCost = (template: typeof mockTemplates[0]) => {
      return template.garnishes.reduce((acc, garnish) => {
        const ing = mockIngredients.find(i => i.id === garnish.id);
        return acc + (ing ? ing.price * garnish.qty : 0);
      }, 0);
    };

    it('deve calcular custo correto do Combo Batata Frita', () => {
      const template = mockTemplates[0]; // Combo Batata Frita
      const cost = calculateTemplateCost(template);
      
      // batata: 4.50 * 0.120 = 0.54
      // tomate: 6.00 * 0.030 = 0.18
      // cebola: 3.50 * 0.020 = 0.07
      // Total: 0.79
      expect(cost).toBeCloseTo(0.79, 2);
    });

    it('deve calcular custo correto do Combo Farofa', () => {
      const template = mockTemplates[1]; // Combo Farofa
      const cost = calculateTemplateCost(template);
      
      // cenoura: 4.00 * 0.050 = 0.20
      // cebola: 3.50 * 0.030 = 0.105
      // Total: 0.305
      expect(cost).toBeCloseTo(0.305, 2);
    });

    it('deve calcular custo correto do Combo Completo', () => {
      const template = mockTemplates[2]; // Combo Completo
      const cost = calculateTemplateCost(template);
      
      // batata: 4.50 * 0.080 = 0.36
      // tomate: 6.00 * 0.040 = 0.24
      // alface: 8.00 * 0.030 = 0.24
      // cebola: 3.50 * 0.020 = 0.07
      // Total: 0.91
      expect(cost).toBeCloseTo(0.91, 2);
    });

    it('todos os templates devem ter custo positivo', () => {
      mockTemplates.forEach(template => {
        const cost = calculateTemplateCost(template);
        expect(cost).toBeGreaterThan(0);
      });
    });
  });

  describe('Aplicação de Templates em Receitas', () => {
    it('deve copiar guarnições do template para receita', () => {
      const template = mockTemplates[0];
      const recipeGarnishes = [...template.garnishes];
      
      expect(recipeGarnishes).toHaveLength(template.garnishes.length);
      expect(recipeGarnishes).toEqual(template.garnishes);
    });

    it('deve permitir modificar guarnições após aplicar template', () => {
      const template = mockTemplates[0];
      // Deep copy para evitar mutar o template original
      const recipeGarnishes = template.garnishes.map(g => ({ ...g }));
      
      // Modificar quantidade
      recipeGarnishes[0].qty = 0.150;
      
      // Template original não deve ser afetado
      expect(template.garnishes[0].qty).toBe(0.120);
      expect(recipeGarnishes[0].qty).toBe(0.150);
    });
  });

  describe('Criação de Novos Templates', () => {
    it('deve permitir criar template a partir de guarnições de receita', () => {
      const recipeGarnishes = [
        { id: 'batata', qty: 0.100 },
        { id: 'cenoura', qty: 0.060 }
      ];

      const newTemplate = {
        id: 4,
        name: 'Meu Template',
        description: 'Template personalizado',
        garnishes: [...recipeGarnishes]
      };

      expect(newTemplate).toHaveProperty('id');
      expect(newTemplate).toHaveProperty('name');
      expect(newTemplate).toHaveProperty('description');
      expect(newTemplate.garnishes).toEqual(recipeGarnishes);
    });

    it('deve gerar ID único para novo template', () => {
      const existingIds = mockTemplates.map(t => t.id);
      const newId = Math.max(...existingIds) + 1;
      
      expect(newId).toBe(4);
      expect(existingIds).not.toContain(newId);
    });
  });

  describe('Gerenciamento de Templates', () => {
    it('deve permitir adicionar novo template', () => {
      const templates = [...mockTemplates];
      const newTemplate = {
        id: 4,
        name: 'Novo Combo',
        description: 'Descrição',
        garnishes: [{ id: 'batata', qty: 0.100 }]
      };

      templates.push(newTemplate);
      
      expect(templates).toHaveLength(4);
      expect(templates[3]).toEqual(newTemplate);
    });

    it('deve permitir atualizar template existente', () => {
      const templates = [...mockTemplates];
      const updatedTemplate = {
        ...templates[0],
        name: 'Combo Batata Frita Premium',
        garnishes: [
          { id: 'batata', qty: 0.150 },
          { id: 'tomate', qty: 0.040 }
        ]
      };

      templates[0] = updatedTemplate;
      
      expect(templates[0].name).toBe('Combo Batata Frita Premium');
      expect(templates[0].garnishes).toHaveLength(2);
    });

    it('deve permitir deletar template', () => {
      const templates = [...mockTemplates];
      const filteredTemplates = templates.filter(t => t.id !== 2);
      
      expect(filteredTemplates).toHaveLength(2);
      expect(filteredTemplates.find(t => t.id === 2)).toBeUndefined();
    });
  });

  describe('Persistência de Templates', () => {
    it('deve serializar templates para JSON', () => {
      const json = JSON.stringify(mockTemplates);
      expect(json).toBeTruthy();
      expect(typeof json).toBe('string');
    });

    it('deve deserializar templates de JSON', () => {
      const json = JSON.stringify(mockTemplates);
      const parsed = JSON.parse(json);
      
      expect(parsed).toEqual(mockTemplates);
      expect(Array.isArray(parsed)).toBe(true);
    });
  });
});
