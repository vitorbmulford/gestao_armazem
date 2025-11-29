import { expect, afterEach } from "vitest";
import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";

// Cleanup após cada teste
afterEach(() => {
  cleanup();
});

// Mock do localStorage
const localStorageMock = {
  getItem: (key: string) => {
    return null;
  },
  setItem: (key: string, value: string) => {
    // noop
  },
  removeItem: (key: string) => {
    // noop
  },
  clear: () => {
    // noop
  },
};

global.localStorage = localStorageMock as Storage;

// Mock do fetch para testes PWA
global.fetch = async (input: RequestInfo | URL) => {
  const url =
    typeof input === "string"
      ? input
      : input instanceof URL
        ? input.href
        : input.url;

  if (url.includes("/manifest.json")) {
    return new Response(
      JSON.stringify({
        name: "Sistema de Gestão de Cozinha Comercial",
        short_name: "Gestão Cozinha",
        description:
          "Sistema profissional para gestão de marmitaria com controle de custos, cardápio, receitas e análise financeira",
        start_url: "/",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#f97316",
        orientation: "any",
        icons: [
          {
            src: "/icon-192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any maskable",
          },
          {
            src: "/icon-512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
        categories: ["business", "productivity", "food"],
        shortcuts: [
          {
            name: "Cardápio",
            short_name: "Cardápio",
            description: "Ver cardápio semanal",
            url: "/",
            icons: [{ src: "/icon-192.png", sizes: "192x192" }],
          },
          {
            name: "Receitas",
            short_name: "Receitas",
            description: "Gerenciar receitas",
            url: "/?page=receitas",
            icons: [{ src: "/icon-192.png", sizes: "192x192" }],
          },
          {
            name: "Analytics",
            short_name: "Analytics",
            description: "Ver análises e gráficos",
            url: "/?page=analytics",
            icons: [{ src: "/icon-192.png", sizes: "192x192" }],
          },
        ],
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  if (url.includes("/sw.js")) {
    return new Response(
      `
      const CACHE_VERSION = 'v1.0.0';
      const CACHE_NAME = \`gestao-cozinha-\${CACHE_VERSION}\`;
      const STATIC_ASSETS = ['/', '/index.html', '/manifest.json', '/icon-192.png', '/icon-512.png'];
      self.addEventListener('install', (event) => {});
      self.addEventListener('activate', (event) => {});
      self.addEventListener('fetch', (event) => {});
    `,
      {
        status: 200,
        headers: { "Content-Type": "application/javascript" },
      }
    );
  }

  if (url.includes("/icon-192.png")) {
    // Mock de blob pequeno para ícone 192x192
    const blob = new Blob(["fake-image-data-192"], { type: "image/png" });
    return new Response(blob, {
      status: 200,
      headers: { "Content-Type": "image/png" },
    });
  }

  if (url.includes("/icon-512.png")) {
    // Mock de blob maior para ícone 512x512
    const blob = new Blob(["fake-image-data-512-much-larger-content-here"], {
      type: "image/png",
    });
    return new Response(blob, {
      status: 200,
      headers: { "Content-Type": "image/png" },
    });
  }

  return new Response("Not found", { status: 404 });
};
