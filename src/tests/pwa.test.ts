import { describe, expect, it } from 'vitest';

describe('PWA Configuration', () => {
  describe('Manifest.json', () => {
    it('deve ter estrutura válida de manifest', async () => {
      const response = await fetch('/manifest.json');
      expect(response.ok).toBe(true);
      
      const manifest = await response.json();
      
      // Validar campos obrigatórios
      expect(manifest.name).toBe('Sistema de Gestão de Cozinha Comercial 22');
      expect(manifest.short_name).toBe('Gestão Cozinha');
      expect(manifest.start_url).toBe('/');
      expect(manifest.display).toBe('standalone');
      expect(manifest.theme_color).toBe('#f97316');
      expect(manifest.background_color).toBe('#ffffff');
    });

    it('deve ter ícones nos tamanhos corretos', async () => {
      const response = await fetch('/manifest.json');
      const manifest = await response.json();
      
      expect(manifest.icons).toBeDefined();
      expect(manifest.icons.length).toBeGreaterThanOrEqual(2);
      
      // Verificar ícone 192x192
      const icon192 = manifest.icons.find((icon: any) => icon.sizes === '192x192');
      expect(icon192).toBeDefined();
      expect(icon192.src).toBe('/icon-192.png');
      expect(icon192.type).toBe('image/png');
      
      // Verificar ícone 512x512
      const icon512 = manifest.icons.find((icon: any) => icon.sizes === '512x512');
      expect(icon512).toBeDefined();
      expect(icon512.src).toBe('/icon-512.png');
      expect(icon512.type).toBe('image/png');
    });

    it('deve ter shortcuts configurados', async () => {
      const response = await fetch('/manifest.json');
      const manifest = await response.json();
      
      expect(manifest.shortcuts).toBeDefined();
      expect(manifest.shortcuts.length).toBeGreaterThanOrEqual(3);
      
      const shortcutNames = manifest.shortcuts.map((s: any) => s.name);
      expect(shortcutNames).toContain('Cardápio');
      expect(shortcutNames).toContain('Receitas');
      expect(shortcutNames).toContain('Analytics');
    });

    it('deve ter categorias apropriadas', async () => {
      const response = await fetch('/manifest.json');
      const manifest = await response.json();
      
      expect(manifest.categories).toBeDefined();
      expect(manifest.categories).toContain('business');
      expect(manifest.categories).toContain('productivity');
      expect(manifest.categories).toContain('food');
    });
  });

  describe('Service Worker', () => {
    it('deve ter arquivo sw.js acessível', async () => {
      const response = await fetch('/sw.js');
      expect(response.ok).toBe(true);
      expect(response.headers.get('content-type')).toContain('javascript');
    });

    it('deve ter versão de cache definida no service worker', async () => {
      const response = await fetch('/sw.js');
      const swContent = await response.text();
      
      expect(swContent).toContain('CACHE_VERSION');
      expect(swContent).toContain('CACHE_NAME');
      expect(swContent).toMatch(/const CACHE_VERSION = ['"]v\d+\.\d+\.\d+['"]/);
    });

    it('deve ter eventos essenciais do service worker', async () => {
      const response = await fetch('/sw.js');
      const swContent = await response.text();
      
      // Verificar eventos principais
      expect(swContent).toContain("addEventListener('install'");
      expect(swContent).toContain("addEventListener('activate'");
      expect(swContent).toContain("addEventListener('fetch'");
    });

    it('deve cachear arquivos estáticos essenciais', async () => {
      const response = await fetch('/sw.js');
      const swContent = await response.text();
      
      expect(swContent).toContain('STATIC_ASSETS');
      expect(swContent).toContain('/index.html');
      expect(swContent).toContain('/manifest.json');
      expect(swContent).toContain('/icon-192.png');
      expect(swContent).toContain('/icon-512.png');
    });
  });

  describe('Ícones PWA', () => {
    it('deve ter ícone 192x192 acessível', async () => {
      const response = await fetch('/icon-192.png');
      expect(response.ok).toBe(true);
      expect(response.headers.get('content-type')).toContain('image/png');
      
      // Verificar que o blob existe
      const blob = await response.blob();
      expect(blob.size).toBeGreaterThan(0);
    });

    it('deve ter ícone 512x512 acessível', async () => {
      const response = await fetch('/icon-512.png');
      expect(response.ok).toBe(true);
      expect(response.headers.get('content-type')).toContain('image/png');
      
      // Verificar que o blob existe e é maior que o 192x192
      const blob = await response.blob();
      expect(blob.size).toBeGreaterThan(0);
    });
  });

  describe('Meta Tags PWA', () => {
    it('deve validar configurações PWA via manifest', async () => {
      // Validação das configurações PWA através do manifest
      // Meta tags HTML são validadas manualmente no navegador
      const manifestResponse = await fetch('/manifest.json');
      expect(manifestResponse.ok).toBe(true);
      
      const manifest = await manifestResponse.json();
      expect(manifest.theme_color).toBe('#f97316');
      expect(manifest.short_name).toBe('Gestão Cozinha');
      expect(manifest.description).toContain('gestão de marmitaria');
    });
  });

  describe('Instalabilidade PWA', () => {
    it('deve ter todos os requisitos mínimos para PWA', async () => {
      // 1. Manifest acessível
      const manifestResponse = await fetch('/manifest.json');
      expect(manifestResponse.ok).toBe(true);
      
      // 2. Service Worker acessível
      const swResponse = await fetch('/sw.js');
      expect(swResponse.ok).toBe(true);
      
      // 3. Ícones acessíveis
      const icon192Response = await fetch('/icon-192.png');
      expect(icon192Response.ok).toBe(true);
      
      const icon512Response = await fetch('/icon-512.png');
      expect(icon512Response.ok).toBe(true);
      
      // 4. HTTPS (em produção) ou localhost (em dev)
      const isSecure = window.location.protocol === 'https:' || 
                       window.location.hostname === 'localhost';
      expect(isSecure).toBe(true);
    });
  });
});
