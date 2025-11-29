import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import { Session } from "@supabase/supabase-js";

import { Toaster } from "sonner";
import { TooltipProvider } from "../../gestao-cozinha/src/components/ui/tooltip";
import NotFound from "../../gestao-cozinha/src/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { AppProvider } from "./contexts/AppContext";
import Home from "./pages/Home";
import { Login } from "./components/login";
import React from 'react';

// ---------------------- ROUTER ----------------------
function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/404" component={NotFound} />

      {/* Fallback final */}
      <Route component={NotFound} />
    </Switch>
  );
}

// ---------------------- APP ----------------------
export default function App() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verifica sessão atual
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    // Escuta alterações de login/logout
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        Carregando...
      </div>
    );
  }

  // Sem sessão → Login
  if (!session) {
    return <Login />;
  }

  // Com sessão → Aplicação normal
  return (
    <ErrorBoundary>
      <AppProvider>
        <ThemeProvider defaultTheme="light">
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </ThemeProvider>
      </AppProvider>
    </ErrorBoundary>
  );
}
