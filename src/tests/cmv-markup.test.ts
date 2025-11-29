import { describe, it, expect } from 'vitest';

describe('CMV e Markup - Índices Gerenciais', () => {
  // Simular configurações
  const sellingPrice = 18.00;
  const taxConfig = {
    icms: 12.0,
    pisCofins: 3.65,
    iss: 0,
    deliveryFee: 0,
    cardFee: 3.5
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

  it('deve calcular preço líquido corretamente', () => {
    const netPrice = calculateNetPrice();
    
    // Total de impostos: 12 + 3.65 + 0 + 0 + 3.5 = 19.15%
    // Preço líquido = 18.00 * (1 - 0.1915) = 18.00 * 0.8085 = 14.553
    expect(netPrice).toBeCloseTo(14.553, 2);
  });

  it('deve calcular CMV corretamente', () => {
    const recipeCost = 13.31;
    const cmv = calculateCMV(recipeCost);
    
    // CMV = (13.31 / 14.553) * 100 = 91.46%
    expect(cmv).toBeCloseTo(91.46, 1);
  });

  it('deve calcular Markup corretamente', () => {
    const recipeCost = 13.31;
    const markup = calculateMarkup(recipeCost);
    
    // Markup = 14.553 / 13.31 = 1.093
    expect(markup).toBeCloseTo(1.093, 2);
  });

  it('deve calcular Margem de Contribuição corretamente', () => {
    const recipeCost = 13.31;
    const margin = calculateContributionMargin(recipeCost);
    
    // Margem = 14.553 - 13.31 = 1.243
    expect(margin).toBeCloseTo(1.243, 2);
  });

  it('deve identificar CMV alto (acima de 70%)', () => {
    const recipeCost = 13.31;
    const cmv = calculateCMV(recipeCost);
    
    expect(cmv).toBeGreaterThan(70);
  });

  it('deve calcular CMV ideal (abaixo de 50%)', () => {
    const recipeCost = 7.00;
    const cmv = calculateCMV(recipeCost);
    
    // CMV = (7.00 / 14.553) * 100 = 48.1%
    expect(cmv).toBeLessThan(50);
    expect(cmv).toBeCloseTo(48.1, 1);
  });

  it('deve calcular Markup bom (acima de 2x)', () => {
    const recipeCost = 7.00;
    const markup = calculateMarkup(recipeCost);
    
    // Markup = 14.553 / 7.00 = 2.08
    expect(markup).toBeGreaterThan(2.0);
    expect(markup).toBeCloseTo(2.08, 2);
  });

  it('deve ter margem de contribuição positiva', () => {
    const recipeCost = 10.00;
    const margin = calculateContributionMargin(recipeCost);
    
    expect(margin).toBeGreaterThan(0);
  });

  it('deve ter margem de contribuição negativa quando custo > preço líquido', () => {
    const recipeCost = 16.00;
    const margin = calculateContributionMargin(recipeCost);
    
    expect(margin).toBeLessThan(0);
  });

  it('deve calcular total de impostos corretamente', () => {
    const totalTax = taxConfig.icms + taxConfig.pisCofins + taxConfig.iss + taxConfig.deliveryFee + taxConfig.cardFee;
    
    expect(totalTax).toBe(19.15);
  });

  it('deve validar que preço líquido é menor que preço bruto', () => {
    const netPrice = calculateNetPrice();
    
    expect(netPrice).toBeLessThan(sellingPrice);
  });

  it('deve calcular CMV de 0% quando custo é 0', () => {
    const cmv = calculateCMV(0);
    
    expect(cmv).toBe(0);
  });

  it('deve retornar 0 quando custo é 0 (divisão por zero)', () => {
    const markup = calculateMarkup(0);
    
    // A função retorna 0 quando recipeCost é 0 para evitar Infinity
    expect(markup).toBe(0);
  });
});
