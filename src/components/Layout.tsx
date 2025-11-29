import  { ReactNode } from 'react';
import { ChefHat, Calendar, BookOpen, Package, ShoppingCart, ClipboardList, Lightbulb, Settings, TrendingUp } from 'lucide-react';
import { APP_TITLE } from '../const.ts';

interface LayoutProps {
  children: ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const menuItems = [
  { id: 'dashboard', label: 'Cardápio', icon: Calendar },
  { id: 'analytics', label: 'Analytics', icon: TrendingUp },
  { id: 'recipes', label: 'Receitas', icon: BookOpen },
  { id: 'templates', label: 'Templates', icon: Package },
  { id: 'ingredients', label: 'Ingredientes', icon: Package },
  { id: 'shopping', label: 'Compras', icon: ShoppingCart },
  { id: 'techSheet', label: 'Fichas Técnicas', icon: ClipboardList },
  { id: 'tips', label: 'Dicas', icon: Lightbulb },
  { id: 'settings', label: 'Configurações', icon: Settings },
];

export default function Layout({ children, activeTab, setActiveTab }: LayoutProps) {
  return (
    <div className="min-h-screen bg-linear-to-br from-orange-50 via-white to-amber-50">
      <div className="flex h-screen">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-gray-200 shadow-lg flex flex-col">
          {/* Logo/Header */}
          <div className="p-6 border-b border-gray-200 bg-linear-to-r from-orange-500 to-amber-500">
            <div className="flex items-center gap-3 text-white">
              <ChefHat size={32} className="shrink-0" />
              <div>
                <h1 className="text-lg font-bold leading-tight">{APP_TITLE}</h1>
                <p className="text-xs text-orange-100">Gestão Profissional</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    isActive
                      ? 'bg-linear-to-r from-orange-500 to-amber-500 text-white shadow-md'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Icon size={20} className="shrink-0" />
                  <span className="font-medium text-sm">{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200 text-xs text-gray-500 text-center">
            <p>Sistema de Gestão</p>
            <p className="text-orange-600 font-semibold">Marmitaria Profissional</p>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="container mx-auto p-6 max-w-7xl">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
