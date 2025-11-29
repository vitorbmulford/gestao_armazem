import { useState } from 'react';
import { useApp } from '../contexts/AppContext';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Settings as SettingsIcon, DollarSign, TrendingUp, Calendar, Plus, Trash2, Download, Upload, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '../../supabaseClient';
import { initialIngredients, initialRecipes, initialWeeks } from '../data/initialData';
import { Loader2, Database } from 'lucide-react';
import React from 'react';

export default function SettingsView() {
  const {
    sellingPrice,
    setSellingPrice,
    productionVolume,
    setProductionVolume,
    workDays,
    setWorkDays,
    allocation,
    setAllocation,
    fixedExpenses,
    addFixedExpense,
    deleteFixedExpense,
    taxConfig,
    setTaxConfig,
    exportData,
    importData,
    resetData,
  } = useApp();

  const [newExpenseName, setNewExpenseName] = useState('');
  const [newExpenseValue, setNewExpenseValue] = useState('');

  const handleAddExpense = () => {
    if (!newExpenseName || !newExpenseValue) {
      toast.error('Preencha nome e valor da despesa');
      return;
    }
    addFixedExpense({
      name: newExpenseName,
      value: parseFloat(newExpenseValue),
    });
    setNewExpenseName('');
    setNewExpenseValue('');
    toast.success('Despesa adicionada');
  };

  const handleExport = () => {
    const data = exportData();
    const blob = new Blob([data], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `backup_gestao_cozinha_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    toast.success('Backup exportado com sucesso');
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        importData(content);
        toast.success('Dados importados com sucesso');
        window.location.reload();
      } catch (error) {
        toast.error('Erro ao importar dados. Verifique o arquivo.');
      }
    };
    reader.readAsText(file);
  };

  const handleReset = () => {
    if (
      confirm(
        'ATENÇÃO: Isso irá apagar todos os dados e restaurar o sistema ao estado inicial. Deseja continuar?'
      )
    ) {
      resetData();
      toast.success('Sistema resetado');
      window.location.reload();
    }
  };

  const totalFixedExpenses = fixedExpenses.reduce((acc, exp) => acc + exp.value, 0);
  const [seeding, setSeeding] = useState(false);
  const [seedStatus, setSeedStatus] = useState('');

  const popularBancoDeDados = async () => {
    if (!confirm("ATENÇÃO: Isso vai sobrescrever os dados no Supabase com os dados iniciais. Tem certeza?")) return;

    setSeeding(true);
    setSeedStatus("Iniciando...");

    try {
      // 1. INGREDIENTES
      setSeedStatus("Enviando Ingredientes...");
      const { error: errIng } = await supabase.from('ingredients').upsert(initialIngredients);
      if (errIng) throw new Error(`Erro Ingredientes: ${errIng.message}`);

      // 2. RECEITAS
      setSeedStatus("Enviando Receitas...");
      // O Supabase aceita o array de objetos 'components' automaticamente como JSONB
      const { error: errRec } = await supabase.from('recipes').upsert(initialRecipes);
      if (errRec) throw new Error(`Erro Receitas: ${errRec.message}`);

      // 3. SEMANAS
      setSeedStatus("Enviando Semanas...");
      const { error: errWeek } = await supabase.from('weeks').upsert(initialWeeks);
      if (errWeek) throw new Error(`Erro Semanas: ${errWeek.message}`);

      // 4. TEMPLATES (Opcional, se você tiver a lista inicial deles)
      // await supabase.from('garnish_templates').upsert(initialTemplates);

      setSeedStatus("SUCESSO! Banco populado.");
      alert("Banco de dados populado com sucesso! Recarregue a página.");
      window.location.reload();

    } catch (error: any) {
      console.error(error);
      setSeedStatus(`ERRO: ${error.message}`);
      alert(`Falha ao popular: ${error.message}`);
    } finally {
      setSeeding(false);
    }
  };
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <SettingsIcon className="text-gray-600" size={32} />
        <h1 className="text-2xl font-bold text-gray-800">Configurações</h1>
      </div>
      {/* <div className="mt-8 p-6 bg-blue-50 border border-blue-200 rounded-lg">
        <h3 className="text-lg font-bold text-blue-800 flex items-center gap-2">
          <Database size={20} />
          Popular Banco (Primeiro Uso)
        </h3>
        <p className="text-sm text-blue-600 mb-4">
          Use este botão se o seu Supabase estiver vazio. Ele vai enviar todos os ingredientes,
          receitas e cardápios padrão para a nuvem.
        </p>

        <div className="flex items-center gap-4">
          <Button
            onClick={popularBancoDeDados}
            disabled={seeding}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            {seeding ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {seedStatus}
              </>
            ) : (
              "Enviar Dados Iniciais para Nuvem"
            )}
          </Button>
          {seedStatus && <span className="text-sm font-medium text-gray-600">{seedStatus}</span>}
        </div>
      </div> */}
      {/* Parâmetros Operacionais */}
      <Card className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <TrendingUp /> Parâmetros Operacionais
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-sm font-bold text-gray-700 mb-2 block">
              Preço de Venda (R$)
            </label>
            <Input
              type="number"
              step="0.01"
              value={sellingPrice}
              onChange={(e) => setSellingPrice(parseFloat(e.target.value) || 0)}
              className="text-lg font-bold"
            />
            <p className="text-xs text-gray-500 mt-1">Preço unitário de cada marmita</p>
          </div>

          <div>
            <label className="text-sm font-bold text-gray-700 mb-2 block">
              Volume de Produção (un/dia)
            </label>
            <Input
              type="number"
              value={productionVolume}
              onChange={(e) => setProductionVolume(parseInt(e.target.value) || 0)}
              className="text-lg font-bold"
            />
            <p className="text-xs text-gray-500 mt-1">Quantidade produzida por dia</p>
          </div>

          <div>
            <label className="text-sm font-bold text-gray-700 mb-2 block">
              Dias Úteis/Mês
            </label>
            <Input
              type="number"
              value={workDays}
              onChange={(e) => setWorkDays(parseInt(e.target.value) || 0)}
              className="text-lg font-bold"
            />
            <p className="text-xs text-gray-500 mt-1">Dias de operação no mês</p>
          </div>

          <div>
            <label className="text-sm font-bold text-gray-700 mb-2 block">
              Alocação de Custos Fixos (%)
            </label>
            <Input
              type="number"
              value={allocation}
              onChange={(e) => setAllocation(parseFloat(e.target.value) || 0)}
              className="text-lg font-bold"
            />
            <p className="text-xs text-gray-500 mt-1">% dos custos fixos alocados às marmitas</p>
          </div>
        </div>
      </Card>

      {/* Impostos e Taxas */}
      <Card className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <TrendingUp /> Impostos e Taxas
        </h3>

        <div className="mb-4 p-4 bg-amber-50 rounded-lg">
          <div className="flex justify-between items-center">
            <span className="font-bold text-gray-700">Total de Impostos e Taxas:</span>
            <span className="text-2xl font-bold text-amber-600">
              {(taxConfig.icms + taxConfig.pisCofins + taxConfig.iss + taxConfig.deliveryFee + taxConfig.cardFee).toFixed(2)}%
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-2">Percentual total deduzido do preço de venda</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">ICMS (%)</label>
            <Input
              type="number"
              step="0.01"
              value={taxConfig.icms}
              onChange={(e) => setTaxConfig({ ...taxConfig, icms: parseFloat(e.target.value) || 0 })}
            />
            <p className="text-xs text-gray-500 mt-1">Varia por estado (7-18%)</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">PIS/COFINS (%)</label>
            <Input
              type="number"
              step="0.01"
              value={taxConfig.pisCofins}
              onChange={(e) => setTaxConfig({ ...taxConfig, pisCofins: parseFloat(e.target.value) || 0 })}
            />
            <p className="text-xs text-gray-500 mt-1">Simples Nacional: ~3.65%</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">ISS (%)</label>
            <Input
              type="number"
              step="0.01"
              value={taxConfig.iss}
              onChange={(e) => setTaxConfig({ ...taxConfig, iss: parseFloat(e.target.value) || 0 })}
            />
            <p className="text-xs text-gray-500 mt-1">Se aplicável (2-5%)</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Taxa de Delivery (%)</label>
            <Input
              type="number"
              step="0.01"
              value={taxConfig.deliveryFee}
              onChange={(e) => setTaxConfig({ ...taxConfig, deliveryFee: parseFloat(e.target.value) || 0 })}
            />
            <p className="text-xs text-gray-500 mt-1">iFood, Rappi: 12-27%</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Taxa de Cartão (%)</label>
            <Input
              type="number"
              step="0.01"
              value={taxConfig.cardFee}
              onChange={(e) => setTaxConfig({ ...taxConfig, cardFee: parseFloat(e.target.value) || 0 })}
            />
            <p className="text-xs text-gray-500 mt-1">Débito: 1-2%, Crédito: 3-5%</p>
          </div>
        </div>
      </Card>

      {/* Despesas Fixas */}
      <Card className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <DollarSign /> Despesas Fixas Mensais
        </h3>

        <div className="mb-4 p-4 bg-blue-50 rounded-lg">
          <div className="flex justify-between items-center">
            <span className="font-bold text-gray-700">Total de Despesas Fixas:</span>
            <span className="text-2xl font-bold text-blue-600">
              R$ {totalFixedExpenses.toFixed(2)}
            </span>
          </div>
        </div>

        <div className="space-y-2 mb-4">
          {fixedExpenses.map((expense) => (
            <div
              key={expense.id}
              className="flex justify-between items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100"
            >
              <span className="font-medium text-gray-700">{expense.name}</span>
              <div className="flex items-center gap-3">
                <span className="font-bold text-green-600">R$ {expense.value.toFixed(2)}</span>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => {
                    if (confirm(`Deseja excluir ${expense.name}?`)) {
                      deleteFixedExpense(expense.id);
                      toast.success('Despesa excluída');
                    }
                  }}
                >
                  <Trash2 size={14} className="text-red-500" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-2">
          <Input
            placeholder="Nome da despesa"
            value={newExpenseName}
            onChange={(e) => setNewExpenseName(e.target.value)}
            className="flex-1"
          />
          <Input
            type="number"
            step="0.01"
            placeholder="Valor"
            value={newExpenseValue}
            onChange={(e) => setNewExpenseValue(e.target.value)}
            className="w-32"
          />
          <Button onClick={handleAddExpense}>
            <Plus size={16} className="mr-1" /> Adicionar
          </Button>
        </div>
      </Card>

      {/* Backup e Restauração */}
      <Card className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <Calendar /> Backup e Restauração
        </h3>

        <div className="space-y-4">
          <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <div className="flex items-start gap-2">
              <AlertCircle className="text-amber-600 shrink-0 mt-1" size={20} />
              <div className="text-sm text-gray-700">
                <p className="font-bold mb-1">Importante:</p>
                <p>
                  Faça backups regulares dos seus dados. O sistema salva automaticamente no
                  navegador, mas é recomendado exportar periodicamente para segurança.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button onClick={handleExport} variant="default" className="h-20">
              <div className="flex flex-col items-center gap-2">
                <Download size={24} />
                <span>Exportar Backup</span>
              </div>
            </Button>

            <Button variant="outline" className="h-20" asChild>
              <label className="cursor-pointer">
                <div className="flex flex-col items-center gap-2">
                  <Upload size={24} />
                  <span>Importar Backup</span>
                </div>
                <input
                  type="file"
                  accept=".json"
                  onChange={handleImport}
                  className="hidden"
                />
              </label>
            </Button>

            <Button
              onClick={handleReset}
              variant="destructive"
              className="h-20"
            >
              <div className="flex flex-col items-center gap-2">
                <Trash2 size={24} />
                <span>Resetar Sistema</span>
              </div>
            </Button>
          </div>
        </div>
      </Card>

      {/* Informações do Sistema */}
      <Card className="p-6 bg-linear-to-r from-gray-50 to-slate-50">
        <h3 className="text-xl font-bold text-gray-800 mb-4">ℹ️ Informações do Sistema</h3>
        <div className="text-sm text-gray-600 space-y-1">
          <p>
            <strong>Versão:</strong> 1.0.0
          </p>
          <p>
            <strong>Armazenamento:</strong> LocalStorage (navegador)
          </p>
          <p>
            <strong>Última atualização:</strong> {new Date().toLocaleDateString('pt-BR')}
          </p>
        </div>
      </Card>
      <button
        onClick={() => supabase.auth.signOut()}
        className="px-3 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded transition"
      >
        Sair
      </button>


    </div>
  );
}
