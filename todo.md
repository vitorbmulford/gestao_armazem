# Project TODO

## Fase 1: Estrutura Base
- [x] Configurar tema e design do sistema
- [x] Criar layout principal com navegação lateral
- [x] Configurar contextos para gerenciamento de estado

## Fase 2: Gestão de Ingredientes
- [x] Implementar lista de ingredientes inicial
- [x] Criar interface para adicionar/editar ingredientes
- [x] Implementar categorização de ingredientes
- [x] Adicionar funcionalidade de busca e filtros

## Fase 3: Gestão de Receitas
- [x] Implementar banco de receitas inicial
- [x] Criar interface para adicionar/editar receitas
- [x] Implementar componentes de receita com ingredientes
- [x] Adicionar categorização por tipo de proteína
- [x] Implementar cálculo automático de custo por receita

## Fase 4: Cardápio Semanal
- [x] Criar estrutura de semanas e dias
- [x] Implementar visualização de cardápio em tabela
- [x] Adicionar modo de edição de cardápio
- [x] Implementar importação de receitas para cardápio
- [x] Adicionar configuração de mix de vendas
- [x] Implementar cálculo de custo médio ponderado
- [x] Adicionar funcionalidade de impressão
- [x] Adicionar exportação para CSV/Excel

## Fase 5: Lista de Compras
- [x] Implementar geração automática de lista de compras
- [x] Adicionar cálculo de quantidades baseado no cardápio
- [x] Implementar agrupamento por categoria
- [x] Adicionar funcionalidade de marcar itens comprados
- [x] Implementar exportação da lista

## Fase 6: Fichas Técnicas
- [x] Criar visualização de fichas técnicas por receita
- [x] Implementar cálculo de rendimento
- [x] Adicionar informações nutricionais básicas
- [x] Implementar modo de impressão

## Fase 7: Configurações
- [x] Implementar gestão de despesas fixas
- [x] Adicionar configuração de volume de produção
- [x] Implementar configuração de preço de venda
- [x] Adicionar configuração de dias úteis
- [x] Implementar configuração de alocação de custos

## Fase 8: Backup e Persistência
- [x] Implementar salvamento em localStorage
- [x] Adicionar funcionalidade de exportar dados (JSON)
- [x] Adicionar funcionalidade de importar dados (JSON)
- [x] Implementar reset de dados

## Fase 9: Dicas e Ajuda
- [x] Criar seção de dicas operacionais
- [x] Adicionar guia de uso do sistema
- [x] Implementar tooltips informativos

## Fase 10: Testes e Ajustes
- [x] Testar todas as funcionalidades no navegador
- [x] Verificar responsividade mobile
- [x] Ajustar cálculos e fórmulas
- [x] Validar fluxos de trabalho

## Fase 11: Dashboard de Analytics com Gráficos
- [x] Instalar biblioteca Recharts para visualização de dados
- [x] Criar gráfico de evolução de custos por semana
- [x] Implementar ranking de receitas mais lucrativas
- [x] Adicionar gráfico de distribuição de custos por categoria
- [x] Criar gráfico de comparativo de margens
- [x] Implementar página de Analytics no sistema
- [x] Adicionar navegação para Analytics
- [x] Testar todos os gráficos e validar dados

## Bugs e Correções
- [x] Corrigir seletor de receitas no modo de edição do cardápio (mostrando apenas categorias ao invés de receitas individuais)

## Fase 12: Detalhamento de Custos por Receita
- [x] Adicionar breakdown de custos na página de Receitas
- [x] Mostrar custo de ingredientes da receita
- [x] Incluir custo da base (arroz + feijão)
- [x] Adicionar custo de guarnições
- [x] Incluir custo de embalagem
- [x] Mostrar custos fixos alocados por unidade
- [x] Implementar visualização expandida/colapsada
- [x] Melhorar Fichas Técnicas com todos os custos

## Fase 13: Guarnições Customizáveis e Margem de Segurança
- [x] Adicionar campo de guarnições customizáveis por receita
- [x] Permitir selecionar ingredientes específicos para guarnições (batata frita, farofa, macarrão, pastelzinho)
- [x] Adicionar campo de quantidade para cada guarnição
- [x] Implementar margem de segurança editável por receita (padrão 5%)
- [x] Atualizar cálculos de custo para considerar guarnições customizadas
- [x] Atualizar cálculos para aplicar margem de segurança
- [x] Adicionar interface de edição na página de Receitas
- [x] Migrar dados existentes para nova estrutura

## Fase 14: Templates de Guarnições
- [x] Criar interface GarnishTemplate no contexto
- [x] Implementar funções de CRUD para templates
- [x] Adicionar templates pré-configurados (Combo Batata Frita, Combo Farofa, etc)
- [x] Criar página de gerenciamento de templates
- [x] Adicionar seletor de templates na edição de receitas
- [x] Implementar botão "Aplicar Template" que preenche guarnições
- [x] Adicionar botão "Salvar como Template" no formulário de receitas
- [x] Persistir templates em localStorage

- [x] Corrigir custo de embalagem (mostrando R$ 0,25 fixo ao invés do preço real do ingrediente)

## Fase 15: Receitas de Guarnições
- [x] Adicionar categoria 'guarnicoes' ao tipo Recipe
- [x] Criar receitas de guarnições (Batata Frita, Farofa, Purê, Legumes, Vinagrete, Salada, etc)
- [x] Modificar estrutura de guarnições para usar recipeId ao invés de ingredientId
- [x] Atualizar seletor de guarnições para mostrar apenas receitas de guarnições
- [x] Atualizar templates para usar receitas de guarnições
- [x] Atualizar cálculos de custo para buscar custo da receita de guarnição
- [x] Migrar guarnições existentes para novo formato

## Fase 16: Índices Gerenciais (CMV e Markup)
- [x] Adicionar configurações de impostos (ICMS, PIS/COFINS, ISS)
- [x] Adicionar configuração de taxas de delivery e cartão
- [x] Implementar cálculo de CMV (Custo da Mercadoria Vendida) por receita
- [x] Implementar cálculo de Markup por receita
- [x] Implementar cálculo de Margem de Contribuição
- [x] Adicionar visualização de índices na página de Receitas
- [x] Criar card de índices no breakdown de custos
- [x] Adicionar seção de índices gerenciais no Analytics
- [x] Implementar alertas para receitas com CMV alto (>70%)
- [x] Testar e validar todos os cálculos

## Fase 17: Impressão de Cardápio para Clientes
- [x] Criar componente de visualização de impressão otimizado para A4
- [x] Incluir guarnições específicas de cada receita no cardápio impresso
- [x] Adicionar estilos CSS @media print para formatação A4
- [x] Implementar botão "Imprimir Cardápio" no Dashboard
- [x] Remover elementos de navegação e UI na impressão
- [x] Testar impressão em diferentes navegadores

## Fase 18: Acompanhamentos Configuráveis (Arroz, Feijão, etc)
- [x] Criar categoria 'acompanhamentos' para receitas
- [x] Criar receitas de acompanhamentos (Arroz Branco, Feijão Preto, Salada Padrão, Vinagrete)
- [x] Adicionar campo de acompanhamentos editáveis por receita
- [x] Permitir configurar quantidade de cada acompanhamento
- [x] Atualizar cálculos de custo para incluir acompanhamentos configuráveis
- [x] Criar interface de edição de acompanhamentos na página de Receitas
- [x] Substituir "base" fixa por acompanhamentos configuráveis
- [x] Migrar dados existentes para nova estrutura

## Ajustes Solicitados
- [x] Alterar unidade de acompanhamentos de "porções" para "kg" na interface

## Documentação
- [x] Criar README com instruções de instalação local
- [x] Criar guia de uso do sistema

## Build de Produção
- [x] Gerar build de produção (pnpm build)
- [x] Criar guia de uso dos arquivos HTML estáticos

## Progressive Web App (PWA)
- [x] Criar manifest.json com metadados do app
- [x] Gerar ícones em múltiplos tamanhos (192x192, 512x512)
- [x] Implementar service worker para cache offline
- [x] Registrar service worker no index.html
- [x] Testar instalação em mobile e desktop

## Build Standalone (Abertura Direta no Navegador)
- [x] Investigar problema de tela branca ao abrir index.html diretamente
- [x] Ajustar configuração do Vite para build standalone
- [x] Criar script de servidor local simples (Python/Node)
- [x] Testar abertura direta do HTML
- [x] Atualizar documentação com instruções corretas
