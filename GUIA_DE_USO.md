# Guia de Uso - Sistema de Gestão de Cozinha Comercial

Este guia apresenta todas as funcionalidades do sistema e como utilizá-las de forma eficiente para gerenciar sua marmitaria ou cozinha comercial.

## 🏠 Navegação Principal

O sistema possui navegação lateral fixa com acesso rápido a todos os módulos. O menu laranja à esquerda contém oito seções principais: Cardápio, Analytics, Receitas, Templates, Ingredientes, Compras, Fichas Técnicas, Dicas e Configurações. Cada seção é dedicada a uma funcionalidade específica do sistema.

## 📅 Cardápio Semanal

A tela de Cardápio é o coração do sistema, onde você planeja as refeições da semana e visualiza métricas financeiras em tempo real. No topo da página, três cards coloridos exibem o custo médio ponderado (cinza), lucro médio por unidade (verde) e lucro mensal estimado (roxo). Estes valores são calculados automaticamente com base no cardápio configurado e no mix de vendas.

Logo abaixo, você encontra a configuração do mix de vendas estimado, que define a proporção de saída de cada opção diária. Por padrão, o sistema considera 40% para Opção 1, 40% para Opção 2 e 20% para Opção 3. Estes percentuais podem ser ajustados clicando nos campos e digitando novos valores. O total deve sempre somar 100%.

A tabela principal apresenta o cardápio da semana com cinco dias (Segunda a Sexta) e três opções por dia. Cada célula mostra o nome da receita e seu custo individual em verde. A coluna Guarnições à direita lista os acompanhamentos de cada prato quando configurados.

### Editando o Cardápio

Para modificar o cardápio, clique no botão **Editar** no canto superior direito da tabela. O sistema entrará em modo de edição, permitindo clicar em qualquer célula para alterar a receita. Ao clicar, um seletor dropdown aparecerá mostrando todas as receitas disponíveis organizadas por categoria (Carne Bovina, Frango, Peixe, Porco, Únicos).

As receitas são exibidas com emojis identificadores: 🥩 para carne bovina, 🍗 para frango, 🐟 para peixe, 🐷 para porco e 🍽️ para pratos únicos. Selecione a receita desejada e o sistema atualizará automaticamente os custos e cálculos.

Após fazer todas as alterações, clique em **Salvar** para confirmar ou **Cancelar** para descartar as mudanças. O sistema recalcula imediatamente todas as métricas financeiras ao salvar.

### Selecionando Semanas

O sistema permite gerenciar múltiplas semanas de cardápio. Use o seletor de semanas no topo da tabela para alternar entre diferentes períodos. Você pode criar novas semanas ou editar semanas existentes de forma independente.

### Exportando e Imprimindo

O botão **Excel** permite exportar o cardápio atual para planilha, facilitando compartilhamento com fornecedores ou análise externa. O botão **Imprimir** gera uma versão otimizada para impressão em papel A4, ideal para distribuir aos clientes ou afixar na cozinha.

## 📊 Analytics

O módulo Analytics oferece análise visual completa dos dados financeiros e operacionais do negócio. A página inicia com quatro cards de resumo mostrando custo médio semanal, lucro médio por unidade, CMV (Custo da Mercadoria Vendida) médio e Markup médio. Estes indicadores fornecem visão rápida da saúde financeira do negócio.

Logo abaixo, uma seção dedicada apresenta o breakdown de impostos e taxas, detalhando ICMS, PIS/COFINS, ISS, taxa de delivery e taxa de cartão. Cada imposto mostra sua alíquota configurada e o impacto no preço final.

### Gráficos Disponíveis

O primeiro gráfico exibe a evolução de custos e lucro ao longo das semanas cadastradas. A linha azul representa o custo médio e a linha verde mostra o lucro médio. Este gráfico permite identificar tendências de aumento de custos ou redução de margens ao longo do tempo.

O gráfico de pizza apresenta a distribuição de custos por categoria, mostrando visualmente quanto cada tipo de ingrediente (carnes, grãos, vegetais, laticínios, etc) representa no custo total. Esta análise ajuda a identificar onde concentrar esforços de negociação com fornecedores.

O gráfico de barras compara os diferentes tipos de proteína (bovina, frango, peixe, porco) em termos de custo médio e margem de lucro. Barras azuis representam custos e barras verdes mostram margens, facilitando identificar quais proteínas são mais rentáveis.

### Ranking de Receitas

A seção de ranking lista as 15 receitas mais lucrativas do sistema, ordenadas por margem de lucro. As três primeiras posições recebem medalhas (🥇🥈🥉) e cada receita mostra seu custo, margem percentual e categoria. Este ranking orienta quais pratos priorizar no cardápio para maximizar lucratividade.

### Insights Automáticos

O sistema gera insights automáticos baseados nos dados, como "Receitas de Frango têm margem média de X%, Y% acima da média geral". Estes insights aparecem em cards destacados e ajudam a tomar decisões estratégicas.

## 🍲 Receitas

O módulo de Receitas gerencia todo o banco de pratos disponíveis. A tela apresenta cards organizados por categoria, cada um mostrando nome da receita, descrição, custo calculado e categoria (identificada por cor e emoji).

### Cadastrando Nova Receita

Clique no botão **+ Nova Receita** para abrir o formulário de cadastro. Preencha o nome da receita (ex: "Bife Acebolado"), selecione a categoria (bovina, frango, peixe, porco ou único) e adicione uma descrição breve.

Na seção de Componentes, adicione os ingredientes que compõem o prato principal. Clique em **+ Adicionar Ingrediente**, selecione o item no dropdown e informe a quantidade em kg. Por exemplo, para bife acebolado: coxão mole 0.150 kg, cebola 0.050 kg, óleo 0.010 kg.

A seção de Acompanhamentos permite configurar arroz, feijão e saladas que acompanham a marmita. Você pode selecionar receitas pré-configuradas de acompanhamentos (como "Arroz Branco 150g" ou "Feijão Preto 80g") ou adicionar ingredientes individuais. A quantidade é informada em kg.

A seção de Guarnições define os complementos específicos do prato, como batata frita, farofa ou purê. Similar aos acompanhamentos, você pode selecionar receitas completas de guarnições ou ingredientes individuais. Use o botão **Aplicar Template** para preencher rapidamente com combinações salvas.

O campo Margem de Segurança permite definir um percentual adicional (padrão 5%) para cobrir perdas e desperdícios. Este valor é aplicado sobre todos os componentes da receita no cálculo de custo final.

Após preencher todos os campos, clique em **Salvar** para cadastrar a receita. O sistema calculará automaticamente o custo total considerando ingredientes, acompanhamentos, guarnições, embalagem e custos fixos alocados.

### Visualizando Detalhamento de Custos

Cada card de receita possui um botão **Ver Detalhamento** que expande uma seção mostrando o breakdown completo de custos. Esta visualização apresenta seis categorias em cards coloridos:

O card **Ingredientes** (azul) mostra o custo dos componentes principais da receita com margem de segurança aplicada. O card **Base** (verde) apresenta o custo de arroz, feijão e temperos básicos quando aplicável. O card **Acompanhamentos** (amarelo) detalha o custo de arroz, feijão e saladas configurados.

O card **Guarnições** (laranja) exibe o custo das guarnições específicas do prato. O card **Embalagem** (roxo) mostra o custo da embalagem e tampa (valor fixo por unidade). O card **Custos Fixos** (vermelho) apresenta a alocação de despesas fixas (aluguel, energia, salários) por unidade vendida.

Abaixo dos cards de custo, uma seção de **Índices Gerenciais** apresenta quatro métricas financeiras importantes. O CMV (Custo da Mercadoria Vendida) mostra o percentual do custo sobre o preço líquido, com cores indicando performance (verde <50%, amarelo 50-70%, vermelho >70%).

O Markup exibe o multiplicador aplicado sobre o custo para chegar ao preço de venda. A Margem de Contribuição mostra o lucro após custos variáveis mas antes dos fixos. O Preço Líquido apresenta o valor que efetivamente entra no caixa após impostos e taxas.

### Editando e Excluindo Receitas

Para editar uma receita existente, clique no botão **Editar** no card da receita. O formulário abrirá pré-preenchido permitindo modificar qualquer campo. Para excluir, clique em **Excluir** e confirme a ação. Atenção: receitas em uso no cardápio não podem ser excluídas.

## 📦 Templates de Guarnições

O módulo Templates permite criar e gerenciar combinações reutilizáveis de guarnições. O sistema vem com quatro templates pré-configurados: Combo Batata Frita (batata frita 120g), Combo Farofa (farofa 100g + vinagrete 30g), Combo Legumes (legumes refogados 100g + salada 40g) e Combo Completo (batata 100g + farofa 80g + salada 40g).

### Criando Novo Template

Clique em **+ Novo Template** para abrir o formulário. Dê um nome descritivo ao template (ex: "Combo Executivo") e adicione as guarnições desejadas. Selecione receitas de guarnições no dropdown (batata frita, farofa, purê, etc) e informe as quantidades em kg.

Após salvar, o template ficará disponível para uso rápido ao editar receitas. Na seção de guarnições de qualquer receita, basta selecionar o template no dropdown e clicar em **Aplicar Template** para preencher automaticamente todas as guarnições configuradas.

### Salvando Template a Partir de Receita

Ao editar uma receita com guarnições já configuradas, você pode salvar essa combinação como template clicando em **Salvar como Template**. Digite um nome e o sistema criará um novo template com as guarnições atuais, permitindo reutilizar em outras receitas.

## 🥬 Ingredientes

O módulo Ingredientes gerencia o cadastro completo de insumos utilizados nas receitas. O sistema vem com mais de 100 ingredientes pré-cadastrados organizados por categoria: carnes, grãos, vegetais, laticínios, temperos, óleos e embalagens.

### Estrutura do Cadastro

Cada ingrediente possui nome, preço por unidade, unidade de medida (kg, L, mç para maço, un para unidade), rendimento (percentual aproveitável após limpeza) e categoria. Por exemplo, batata inglesa custa R$ 5,50 por kg com rendimento de 90% (10% de perda em cascas e partes não aproveitáveis).

### Adicionando Novo Ingrediente

Clique em **+ Novo Ingrediente** para abrir o formulário de cadastro. Preencha o nome (ex: "Azeite Extra Virgem"), selecione a categoria, informe o preço (ex: 45.00), escolha a unidade (L para litros) e defina o rendimento (1.0 para 100% se não houver perdas).

O sistema utiliza o rendimento nos cálculos de custo. Se uma receita usa 0.100 kg de batata (R$ 5,50/kg com 90% de rendimento), o custo real será calculado como 0.100 / 0.90 * 5.50, compensando a perda de 10%.

### Editando Preços

Para atualizar o preço de um ingrediente, clique em **Editar** no card correspondente, altere o valor e salve. O sistema recalculará automaticamente o custo de todas as receitas que utilizam aquele ingrediente, atualizando também os valores no cardápio e nas métricas gerais.

Esta funcionalidade é essencial para manter o sistema atualizado com variações de mercado. Recomenda-se revisar e atualizar preços semanalmente ou sempre que receber novos orçamentos de fornecedores.

## 🛒 Lista de Compras

O módulo Lista de Compras gera automaticamente a relação de ingredientes necessários para produzir o cardápio da semana selecionada. O sistema calcula as quantidades baseado no volume de produção configurado, mix de vendas e receitas do cardápio.

### Visualização da Lista

A lista apresenta todos os ingredientes agrupados por categoria (Carnes, Grãos, Vegetais, Laticínios, Temperos, Óleos, Embalagens). Cada item mostra a quantidade total necessária na unidade de medida correspondente (kg, L, mç, un) e o custo total estimado.

Por exemplo, se o cardápio da semana usa coxão mole em três receitas diferentes e o volume de produção é 120 marmitas por dia, o sistema soma todas as necessidades e apresenta: "Coxão Mole: 18.500 kg - R$ 555,00".

### Marcando Itens Comprados

Conforme você realiza as compras, marque os itens clicando na checkbox ao lado de cada ingrediente. Itens marcados ficam riscados, facilitando controle visual do que já foi adquirido. Este estado é salvo automaticamente, permitindo pausar e retomar as compras sem perder o progresso.

### Exportando a Lista

O botão **Exportar** permite salvar a lista em formato de planilha para compartilhar com fornecedores ou imprimir. A exportação inclui todos os ingredientes, quantidades e custos estimados, facilitando cotações e pedidos.

## 📋 Fichas Técnicas

O módulo Fichas Técnicas apresenta visualização detalhada de cada receita em formato profissional, ideal para uso na cozinha durante o preparo. Selecione uma receita no dropdown para visualizar sua ficha completa.

### Estrutura da Ficha

O cabeçalho exibe o nome da receita, categoria e descrição. A seção de Ingredientes lista todos os componentes com quantidades exatas em gramas ou mililitros, facilitando pesagem e medição durante o preparo.

A seção de Informações Técnicas apresenta rendimento (quantas porções a receita produz), tempo estimado de preparo e modo de preparo com instruções passo a passo. A seção de Informações Nutricionais Básicas estima calorias, proteínas, carboidratos e gorduras por porção.

### Breakdown de Custos

Similar à visualização em Receitas, a ficha técnica inclui seis cards coloridos detalhando cada categoria de custo: ingredientes, base, acompanhamentos, guarnições, embalagem e custos fixos. Cada card mostra o valor individual e o percentual que representa no custo total.

### Modo de Impressão

O botão **Imprimir** gera uma versão otimizada da ficha para impressão em papel A4. Esta versão remove elementos de navegação e ajusta o layout para melhor aproveitamento do espaço, permitindo criar um caderno de fichas técnicas para consulta na cozinha.

## 💡 Dicas

O módulo Dicas oferece orientações práticas para uso eficiente do sistema e gestão da cozinha comercial. As dicas são organizadas em categorias: Operacionais, Financeiras, Planejamento e Qualidade.

### Dicas Operacionais

Esta seção apresenta recomendações para rotina diária, como atualizar preços semanalmente, revisar lista de compras antes de fechar pedidos, marcar itens comprados em tempo real e exportar dados mensalmente para backup. Seguir estas práticas garante que o sistema sempre reflita a realidade do negócio.

### Dicas Financeiras

Aqui você encontra orientações sobre gestão de custos, como monitorar CMV (ideal abaixo de 50%), ajustar mix de vendas conforme aceitação dos clientes, negociar com fornecedores usando dados do sistema e revisar margem de segurança periodicamente. O sistema fornece todas as métricas necessárias para estas análises.

### Dicas de Planejamento

Esta categoria oferece sugestões para otimizar cardápios, como variar proteínas ao longo da semana, balancear receitas caras e baratas no mesmo dia, considerar sazonalidade de ingredientes e testar novas receitas antes de incluir no cardápio regular. O módulo Analytics ajuda a identificar padrões e oportunidades.

### Dicas de Qualidade

A seção final aborda controle de qualidade, incluindo padronização de receitas usando fichas técnicas, treinamento de equipe com base nas fichas, controle de temperatura e validade, e feedback de clientes para ajustes contínuos. A consistência é fundamental para fidelização de clientes.

## ⚙️ Configurações

O módulo Configurações centraliza todos os parâmetros operacionais e financeiros do sistema. A página é dividida em seções temáticas para facilitar navegação.

### Impostos e Taxas

Esta seção permite configurar todos os tributos e taxas que incidem sobre o preço de venda. O ICMS (Imposto sobre Circulação de Mercadorias) varia por estado, geralmente entre 7% e 18%. O sistema vem configurado com 12% por padrão.

PIS/COFINS são tributos federais que no regime Simples Nacional somam aproximadamente 3,65%. O ISS (Imposto Sobre Serviços) aplica-se quando há delivery ou serviço agregado, variando por município entre 2% e 5%.

A Taxa de Delivery representa o percentual cobrado por aplicativos de entrega (iFood, Rappi, etc), geralmente entre 15% e 30%. A Taxa de Cartão refere-se ao desconto das maquininhas de cartão de crédito, tipicamente entre 3% e 5%.

Todos estes percentuais são utilizados nos cálculos de CMV, Preço Líquido e Margem de Contribuição. Ajuste conforme sua realidade tributária e operacional para obter métricas precisas.

### Parâmetros Operacionais

O Volume de Produção define quantas marmitas você produz por dia. Este valor é fundamental para cálculos de lista de compras e projeções mensais. O Preço de Venda é o valor cobrado por marmita, usado para calcular margens e lucros.

Os Dias Úteis por Mês (padrão 24) determinam a base de cálculo para projeções mensais. A Alocação de Custos Fixos define como despesas fixas são distribuídas por unidade vendida.

### Despesas Fixas

Esta seção lista todos os custos mensais que não variam com o volume de produção: aluguel, energia elétrica, água, gás, salários, encargos trabalhistas, internet, telefone, contador e manutenção. Cada item pode ser editado clicando no ícone de lápis.

O sistema soma todas as despesas fixas e divide pelo volume mensal de produção (volume diário × dias úteis) para calcular o custo fixo por unidade. Este valor é incluído no breakdown de custos de cada receita, garantindo que todos os custos sejam considerados na precificação.

### Backup e Restauração

A seção final oferece três funcionalidades críticas de gerenciamento de dados. O botão **Exportar Dados** gera um arquivo JSON contendo todo o estado do sistema: ingredientes, receitas, cardápios, templates, configurações e impostos. Salve este arquivo periodicamente em local seguro.

O botão **Importar Dados** permite restaurar um backup anterior. Selecione o arquivo JSON e o sistema substituirá todos os dados atuais pelos dados do arquivo. Use com cuidado, pois esta ação é irreversível.

O botão **Reset de Dados** restaura o sistema ao estado inicial com dados de exemplo. Esta função é útil para recomeçar do zero ou para fins de treinamento. Sempre exporte seus dados antes de usar esta função.

## 🔄 Fluxo de Trabalho Recomendado

Para uso eficiente do sistema, recomenda-se seguir este fluxo semanal:

**Segunda-feira**: Revise e atualize preços de ingredientes com base em cotações de fornecedores. Acesse Ingredientes, edite os preços alterados e salve. O sistema recalculará automaticamente todos os custos.

**Terça-feira**: Planeje o cardápio da próxima semana. Acesse Cardápio, selecione a semana desejada, clique em Editar e monte o cardápio considerando variedade de proteínas, sazonalidade e lucratividade (consulte Analytics para identificar receitas mais rentáveis).

**Quarta-feira**: Gere e revise a lista de compras. Acesse Compras, verifique as quantidades calculadas, faça cotações com fornecedores e marque itens conforme realiza as compras.

**Quinta-feira**: Prepare fichas técnicas para receitas novas ou modificadas. Acesse Fichas Técnicas, selecione as receitas, imprima as fichas e distribua para a equipe de cozinha.

**Sexta-feira**: Analise métricas da semana. Acesse Analytics, revise gráficos de evolução, identifique tendências de custos e ajuste estratégias para a semana seguinte. Exporte dados para backup.

Este ciclo garante que o sistema esteja sempre atualizado e que você tenha visibilidade completa sobre custos, margens e lucratividade do negócio.

## 📈 Dicas Avançadas

Para usuários experientes, algumas funcionalidades avançadas podem otimizar ainda mais o uso do sistema:

**Análise de Sensibilidade**: Use o módulo Analytics para simular impactos de mudanças. Por exemplo, se o preço do frango aumentar 10%, quais receitas serão mais afetadas? Identifique no gráfico de distribuição de custos e considere substituições temporárias.

**Otimização de Mix**: Ajuste o mix de vendas baseado em dados reais de aceitação. Se a Opção 1 vende mais que o estimado, aumente seu percentual no mix. O sistema recalculará automaticamente custos médios e projeções.

**Templates Estratégicos**: Crie templates de guarnições para diferentes perfis de cliente (econômico, executivo, premium). Aplique o template apropriado em cada receita para padronizar ofertas e facilitar precificação diferenciada.

**Margem de Segurança Variável**: Ajuste a margem de segurança por receita conforme complexidade de preparo. Receitas simples podem usar 3%, enquanto pratos elaborados podem precisar de 8-10% para cobrir desperdícios maiores.

**Monitoramento de CMV**: Configure alertas mentais para receitas com CMV acima de 70%. Estes pratos estão no limite de viabilidade e podem gerar prejuízo se houver qualquer aumento de custo. Considere repricing ou substituição.

---

**Este guia cobre todas as funcionalidades principais do sistema. Para dúvidas específicas ou sugestões de melhorias, consulte o arquivo README.md ou entre em contato com o suporte.**
