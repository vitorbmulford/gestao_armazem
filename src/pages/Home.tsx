import { useState } from 'react';
import Layout from '@/components/Layout';
import DashboardView from './Dashboard';
import RecipesView from './Recipes';
import IngredientsView from './Ingredients';
import ShoppingView from './Shopping';
import TechSheetView from './TechSheet';
import TipsView from './Tips';
import SettingsView from './Settings';
import Analytics from './Analytics';
import GarnishTemplates from './GarnishTemplates';

export default function Home() {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
      {activeTab === 'dashboard' && <DashboardView />}
      {activeTab === 'analytics' && <Analytics />}
      {activeTab === 'recipes' && <RecipesView />}
      {activeTab === 'templates' && <GarnishTemplates />}
      {activeTab === 'ingredients' && <IngredientsView />}
      {activeTab === 'shopping' && <ShoppingView />}
      {activeTab === 'techSheet' && <TechSheetView />}
      {activeTab === 'tips' && <TipsView />}
      {activeTab === 'settings' && <SettingsView />}
    </Layout>
  );
}
