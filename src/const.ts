// ==========================================
// PARTE 1: Coisas que vieram do antigo Shared
// ==========================================
export const COOKIE_NAME = "app_session_id";
export const ONE_YEAR_MS = 1000 * 60 * 60 * 24 * 365;

// ==========================================
// PARTE 2: Coisas que o src precisa (Título, etc)
// ==========================================
export const APP_TITLE = import.meta.env.VITE_APP_TITLE || "Gestão Cozinha";
export const APP_LOGO = "https://placehold.co/128x128/f97316/ffffff?text=GC";

// ==========================================
// PARTE 3: Lógica de Login (Mantida para compatibilidade)
// ==========================================
export const getLoginUrl = () => {
  // Se as variáveis de ambiente não existirem, retorna apenas a home
  const oauthPortalUrl = import.meta.env.VITE_OAUTH_PORTAL_URL;
  const appId = import.meta.env.VITE_APP_ID;

  if (!oauthPortalUrl || !appId) {
    return window.location.origin;
  }

  const redirectUri = `${window.location.origin}/api/oauth/callback`;
  const state = btoa(redirectUri);

  try {
    const url = new URL(`${oauthPortalUrl}/app-auth`);
    url.searchParams.set("appId", appId);
    url.searchParams.set("redirectUri", redirectUri);
    url.searchParams.set("state", state);
    url.searchParams.set("type", "signIn");
    return url.toString();
  } catch (e) {
    return "#";
  }
};
