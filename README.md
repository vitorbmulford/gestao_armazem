# Sistema de Gestão de Cozinha Comercial

Sistema completo e profissional para gestão de marmitaria, desenvolvido com React 19 + Tailwind CSS 4. Oferece controle total sobre ingredientes, receitas, cardápios, custos, impostos e análises gerenciais.

## 📋 Funcionalidades Principais

O sistema oferece gerenciamento completo de ingredientes com mais de 100 itens pré-cadastrados, incluindo preços, rendimentos e categorização por tipo. O banco de receitas contém mais de 75 opções categorizadas por proteína (bovina, frango, peixe, porco, únicos), com cálculo automático de custos considerando todos os componentes.

O planejamento de cardápio semanal permite configurar três opções diárias com mix de vendas personalizável, gerando automaticamente lista de compras agrupada por categoria. O sistema calcula custos médios ponderados, margens de lucro e projeções mensais com precisão.

As guarnições e acompanhamentos são totalmente customizáveis por receita, permitindo criar templates reutilizáveis para agilizar cadastros. O sistema suporta receitas completas de guarnições (batata frita, farofa, purê) e acompanhamentos (arroz, feijão, saladas) com quantidades editáveis.

O módulo de análise financeira inclui cálculo de CMV (Custo da Mercadoria Vendida), Markup, Margem de Contribuição e Preço Líquido, considerando impostos configuráveis (ICMS, PIS/COFINS, ISS) e taxas de delivery e cartão. O dashboard de analytics apresenta gráficos de evolução de custos, ranking de receitas mais lucrativas e distribuição de custos por categoria.

As fichas técnicas detalham cada receita com breakdown completo de custos (ingredientes, base, guarnições, embalagem, custos fixos alocados), rendimento e informações nutricionais básicas. O sistema permite impressão de cardápio semanal em formato A4 otimizado para distribuição aos clientes.

Todos os dados são persistidos automaticamente em localStorage com funcionalidades de exportação e importação em JSON para backup e sincronização entre dispositivos.

## 🚀 Instalação Local

### Requisitos do Sistema

O sistema requer Node.js versão 22.13.0 ou superior instalado no computador. Para verificar se o Node.js está instalado, abra o terminal ou prompt de comando e execute `node --version`. Caso não esteja instalado, faça o download em [nodejs.org](https://nodejs.org/).

### Passos de Instalação

Primeiro, faça o download do código completo do sistema através do painel de gerenciamento (ícone "Code" → "Download All Files") ou solicite o arquivo ZIP ao desenvolvedor. Extraia o arquivo ZIP para uma pasta de sua preferência, como `C:\gestao-cozinha` no Windows ou `~/gestao-cozinha` no Mac/Linux.

Abra o terminal ou prompt de comando na pasta extraída. No Windows, você pode clicar com botão direito na pasta e selecionar "Abrir no Terminal". No Mac/Linux, navegue até a pasta usando o comando `cd`.

Execute o comando de instalação de dependências. O sistema utiliza pnpm como gerenciador de pacotes, mas também funciona com npm:

```bash
# Usando pnpm (recomendado)
pnpm install

# OU usando npm
npm install
```

A instalação pode levar alguns minutos dependendo da velocidade da internet, pois irá baixar todas as bibliotecas necessárias (React, Tailwind, Recharts, etc).

### Iniciando o Sistema

Após a instalação completa, inicie o servidor de desenvolvimento com o comando:

```bash
# Usando pnpm
pnpm dev

# OU usando npm
npm run dev
```

O sistema iniciará e exibirá uma mensagem similar a:

```
VITE v5.x.x  ready in XXX ms

➜  Local:   http://localhost:3000/
➜  Network: http://192.168.x.x:3000/
```

Abra seu navegador (Chrome, Firefox, Edge ou Safari) e acesse `http://localhost:3000`. O sistema estará rodando completamente no seu computador, sem necessidade de internet.

### Uso Sem Internet

Após a primeira instalação, o sistema funciona completamente offline. Os dados ficam salvos no navegador (localStorage), portanto certifique-se de usar sempre o mesmo navegador para manter seus dados.

Para fazer backup dos dados, acesse **Configurações → Exportar Dados** e salve o arquivo JSON em local seguro (pen drive, nuvem, etc). Para restaurar, use **Configurações → Importar Dados**.

## 📊 Estrutura do Projeto

O projeto está organizado em uma estrutura clara e modular. A pasta `client/` contém todo o código da aplicação frontend, incluindo páginas (`client/src/pages/`), componentes reutilizáveis (`client/src/components/`), contextos de estado (`client/src/contexts/`) e dados iniciais (`client/src/data/`).

Os arquivos de configuração incluem `package.json` com dependências e scripts, `vite.config.ts` para configuração do bundler, `tailwind.config.ts` para personalização de estilos e `tsconfig.json` para configuração do TypeScript.

## 🔧 Comandos Disponíveis

O sistema oferece diversos comandos npm para diferentes finalidades:

```bash
# Iniciar servidor de desenvolvimento
pnpm dev

# Executar testes unitários
pnpm test

# Executar testes em modo watch
pnpm test:watch

# Compilar para produção
pnpm build

# Visualizar build de produção
pnpm preview
```

## 💾 Gerenciamento de Dados

Os dados do sistema são armazenados localmente no navegador usando localStorage. Cada módulo possui sua própria chave de armazenamento: `ingredients` para ingredientes, `recipes` para receitas, `weeks` para cardápios semanais, `garnishTemplates` para templates de guarnições, `config` para configurações gerais e `taxConfig` para impostos e taxas.

Para fazer backup completo, use a funcionalidade de exportação que gera um arquivo JSON contendo todos os dados do sistema. Este arquivo pode ser importado posteriormente para restaurar o estado completo da aplicação.

## 🎨 Personalização

O sistema utiliza Tailwind CSS 4 com tema customizável. As cores principais podem ser ajustadas no arquivo `client/src/index.css` na seção `@theme`. O logo da aplicação é controlado pela constante `APP_LOGO` em `client/src/const.ts`.

Para alterar informações de contato no cardápio impresso, edite o arquivo `client/src/components/PrintableMenu.tsx` nas linhas do rodapé (telefone, horário, formas de pagamento).

## 🧪 Testes

O sistema inclui 153 testes unitários abrangentes que validam todas as funcionalidades principais: carregamento de dados, cálculos de custos, breakdown detalhado, guarnições customizadas, templates, receitas de guarnições e acompanhamentos, CMV e Markup, e funcionalidade de impressão.

Para executar os testes, use o comando `pnpm test`. Todos os testes devem passar antes de fazer modificações significativas no código.

## 📱 Acesso Multiplataforma

Embora o sistema rode localmente, você pode acessá-lo de outros dispositivos na mesma rede Wi-Fi usando o endereço de rede exibido ao iniciar (ex: `http://192.168.1.100:3000`). Isso permite que tablets ou smartphones na mesma rede acessem o sistema rodando no computador principal.

## 🆘 Solução de Problemas

Se o sistema não iniciar, verifique se a porta 3000 está disponível. Caso esteja em uso, o Vite automaticamente tentará usar a próxima porta disponível (3001, 3002, etc). Se encontrar erros de dependências, tente remover a pasta `node_modules` e o arquivo `pnpm-lock.yaml` (ou `package-lock.json`), depois execute `pnpm install` novamente.

Se os dados não estiverem salvando, verifique se o navegador permite localStorage. Alguns modos de navegação anônima bloqueiam essa funcionalidade. Para melhor experiência, use o navegador em modo normal.

## 📄 Licença

Sistema desenvolvido para uso comercial em marmitarias e cozinhas profissionais. Todos os direitos reservados.

## 🤝 Suporte

Para dúvidas, sugestões ou reportar problemas, entre em contato através do painel de gerenciamento ou consulte a documentação completa no arquivo `GUIA_DE_USO.md`.

---

**Desenvolvido com ❤️ usando React 19, Tailwind CSS 4 e TypeScript**
