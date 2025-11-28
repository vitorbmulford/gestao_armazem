# Como Usar o Sistema em HTML Estático

Este guia explica como executar o sistema de gestão de cozinha comercial usando apenas os arquivos HTML gerados, sem necessidade de Node.js ou servidor de desenvolvimento.

## 📦 O Que Foi Gerado

O comando `pnpm build` criou uma pasta `dist/public/` contendo todos os arquivos necessários para rodar o sistema no navegador. Esta pasta contém três elementos principais:

O arquivo `index.html` é o ponto de entrada do sistema, com tamanho de aproximadamente 360 KB. Este arquivo HTML único contém toda a estrutura da aplicação já renderizada e otimizada para produção.

A pasta `assets/` armazena dois arquivos essenciais. O arquivo CSS (`index-*.css`) contém todos os estilos do sistema incluindo Tailwind CSS compilado, com aproximadamente 123 KB. O arquivo JavaScript (`index-*.js`) contém todo o código React compilado e otimizado, com aproximadamente 1.2 MB compactado para 321 KB com gzip.

Os nomes dos arquivos na pasta assets incluem hashes únicos (exemplo: `index-7LiVjNCw.css`) que mudam a cada build. Estes hashes garantem que o navegador sempre carregue a versão mais recente dos arquivos, evitando problemas de cache.

## 🚀 Como Executar

### Método 1: Abrir Diretamente no Navegador (Mais Simples)

Navegue até a pasta `dist/public/` no explorador de arquivos do seu sistema operacional. Localize o arquivo `index.html` e clique duas vezes nele. O sistema abrirá automaticamente no seu navegador padrão.

Alternativamente, você pode arrastar o arquivo `index.html` para dentro de uma janela do navegador já aberta. O sistema carregará imediatamente e estará pronto para uso.

**Importante**: Alguns navegadores podem bloquear certas funcionalidades quando arquivos são abertos diretamente (protocolo `file://`). Se encontrar problemas, use o Método 2 abaixo.

### Método 2: Usar Servidor HTTP Local (Recomendado)

Para melhor compatibilidade e performance, é recomendado servir os arquivos através de um servidor HTTP simples. Existem várias opções gratuitas e fáceis de usar.

#### Opção A: Python (Pré-instalado no Mac/Linux)

Abra o terminal ou prompt de comando, navegue até a pasta `dist/public/` e execute:

```bash
# Python 3
python3 -m http.server 8000

# OU Python 2
python -m SimpleHTTPServer 8000
```

Após iniciar o servidor, abra seu navegador e acesse `http://localhost:8000`. O sistema estará rodando completamente local.

#### Opção B: Node.js (Se já tiver instalado)

Se você tem Node.js instalado, pode usar o pacote `http-server`:

```bash
# Instalar http-server globalmente (apenas uma vez)
npm install -g http-server

# Navegar até dist/public
cd dist/public

# Iniciar servidor
http-server -p 8000
```

Acesse `http://localhost:8000` no navegador.

#### Opção C: Extensão do VS Code

Se você usa Visual Studio Code, instale a extensão "Live Server". Depois, clique com botão direito no arquivo `index.html` dentro do VS Code e selecione "Open with Live Server". O sistema abrirá automaticamente no navegador.

#### Opção D: Servidor Web (Apache, Nginx)

Para uso permanente ou compartilhamento em rede local, copie todo o conteúdo da pasta `dist/public/` para o diretório raiz do seu servidor web. Por exemplo, no Apache, copie para `/var/www/html/` no Linux ou `C:\xampp\htdocs\` no Windows com XAMPP.

Após copiar os arquivos, acesse através do endereço IP do servidor na rede local (exemplo: `http://192.168.1.100/`).

## 💾 Dados e Persistência

O sistema armazena todos os dados localmente no navegador usando localStorage. Isto significa que ingredientes, receitas, cardápios, templates e configurações ficam salvos no navegador que você está usando.

### Importante Sobre Dados

Os dados são específicos do navegador e do domínio/origem. Se você abrir o sistema de formas diferentes, terá dados separados em cada contexto. Por exemplo, abrir via `file://` cria um armazenamento diferente de abrir via `http://localhost:8000`.

Para manter consistência, sempre acesse o sistema da mesma forma. Se começou usando `http://localhost:8000`, continue usando este endereço. Trocar entre métodos de acesso resultará em dados aparentemente "perdidos" (na verdade estão em outro contexto de armazenamento).

### Backup e Restauração

Para fazer backup dos seus dados, acesse **Configurações → Exportar Dados** dentro do sistema. Isto gerará um arquivo JSON contendo todo o estado da aplicação. Salve este arquivo em local seguro (pen drive, nuvem, etc).

Para restaurar dados em outro computador ou navegador, abra o sistema, acesse **Configurações → Importar Dados** e selecione o arquivo JSON previamente exportado. Todos os dados serão restaurados instantaneamente.

## 📁 Compartilhando o Sistema

Para compartilhar o sistema com outras pessoas, você tem três opções principais.

### Compartilhamento por Arquivo

Copie toda a pasta `dist/public/` para um pen drive, disco externo ou compacte em arquivo ZIP. A outra pessoa deve extrair os arquivos e seguir os passos de execução descritos acima. Cada pessoa terá seus próprios dados independentes.

### Compartilhamento em Rede Local

Configure um servidor web (Apache, Nginx ou mesmo Python HTTP server) em um computador da rede. Copie os arquivos de `dist/public/` para o servidor. Outras pessoas na mesma rede podem acessar digitando o endereço IP do servidor no navegador (exemplo: `http://192.168.1.100:8000`).

Neste cenário, cada navegador ainda terá seus próprios dados locais. Para compartilhar dados entre usuários, use a funcionalidade de exportar/importar JSON.

### Hospedagem Online

Para acesso via internet de qualquer lugar, você pode hospedar os arquivos em serviços gratuitos como GitHub Pages, Netlify, Vercel ou Cloudflare Pages. Basta fazer upload da pasta `dist/public/` seguindo as instruções de cada plataforma.

Após hospedado, o sistema ficará acessível via URL pública (exemplo: `https://seu-sistema.netlify.app`). Qualquer pessoa com o link poderá acessar, mas cada uma terá seus próprios dados locais no navegador.

## 🔄 Atualizando o Sistema

Se você fizer alterações no código-fonte do sistema e quiser gerar uma nova versão HTML, siga estes passos:

Primeiro, certifique-se de que está na pasta do projeto e execute novamente o comando de build:

```bash
cd /home/ubuntu/gestao-cozinha
pnpm build
```

O processo levará alguns segundos e regerará todos os arquivos na pasta `dist/public/`. Os arquivos antigos serão substituídos pelos novos.

**Importante**: Antes de atualizar, faça backup dos seus dados usando a funcionalidade de exportação do sistema. Embora os dados fiquem no navegador (não nos arquivos HTML), é sempre prudente ter um backup antes de qualquer atualização.

Após o build, substitua os arquivos antigos pelos novos onde quer que estejam hospedados (servidor web, pen drive, etc). Se estiver usando servidor local, basta recarregar a página no navegador (F5 ou Ctrl+R).

## 🌐 Compatibilidade de Navegadores

O sistema foi desenvolvido com tecnologias modernas e funciona perfeitamente nos seguintes navegadores:

**Desktop**: Google Chrome 90+, Microsoft Edge 90+, Mozilla Firefox 88+, Safari 14+, Opera 76+.

**Mobile**: Chrome para Android, Safari para iOS 14+, Samsung Internet.

Navegadores muito antigos (Internet Explorer, versões antigas do Safari) não são suportados devido ao uso de recursos modernos do JavaScript e CSS.

## 📊 Tamanho e Performance

O sistema completo ocupa aproximadamente 1.7 MB em disco (HTML + CSS + JS). Quando servido com compressão gzip (ativada por padrão na maioria dos servidores), o tamanho de download cai para cerca de 450 KB.

O carregamento inicial leva entre 1 e 3 segundos dependendo da velocidade da conexão e do dispositivo. Após o primeiro carregamento, o navegador faz cache dos arquivos, tornando acessos subsequentes praticamente instantâneos.

O sistema funciona completamente offline após o primeiro carregamento. Todos os cálculos, gráficos e funcionalidades rodam localmente no navegador sem necessidade de conexão com internet.

## ⚠️ Limitações e Considerações

### Dados Não Compartilhados

Como os dados ficam salvos localmente em cada navegador, não há sincronização automática entre dispositivos ou usuários. Para compartilhar dados, use sempre a funcionalidade de exportar/importar JSON.

### Limpeza de Dados do Navegador

Se você limpar os dados de navegação (histórico, cookies, cache) do seu navegador, os dados do sistema também serão apagados. Sempre mantenha backups exportados em JSON para evitar perda de informações.

### Limitações do Protocolo file://

Quando arquivos são abertos diretamente no navegador (protocolo `file://`), algumas restrições de segurança podem afetar funcionalidades. Por exemplo, localStorage pode ter comportamento inconsistente em alguns navegadores. Por isso, recomenda-se sempre usar um servidor HTTP local (Método 2).

### Atualizações Manuais

Diferente de aplicações web tradicionais que atualizam automaticamente, a versão HTML estática requer atualização manual. Quando houver uma nova versão do sistema, você precisará gerar um novo build e substituir os arquivos antigos.

## 🆘 Solução de Problemas

### Sistema Não Carrega ou Tela Branca

Verifique se todos os arquivos da pasta `dist/public/` foram copiados corretamente, incluindo a pasta `assets/`. Abra o console do navegador (F12) e verifique se há erros. Tente usar um servidor HTTP local ao invés de abrir diretamente o arquivo.

### Dados Desapareceram

Provavelmente você está acessando o sistema de forma diferente da anterior (file:// vs http://localhost). Volte a acessar da mesma forma original. Se limpou dados do navegador, restaure do backup JSON.

### Gráficos Não Aparecem

Certifique-se de que está usando um navegador moderno e atualizado. Verifique se JavaScript está habilitado nas configurações do navegador. Tente limpar o cache e recarregar a página (Ctrl+Shift+R).

### Impressão Não Funciona

A funcionalidade de impressão depende da API de impressão do navegador. Certifique-se de que está usando um servidor HTTP (não file://). Alguns navegadores bloqueiam certas APIs quando arquivos são abertos localmente.

## 📞 Suporte

Para dúvidas adicionais ou problemas não cobertos neste guia, consulte os arquivos `README.md` e `GUIA_DE_USO.md` na pasta raiz do projeto. Estes documentos contêm informações detalhadas sobre todas as funcionalidades do sistema.

---

**Sistema pronto para uso! Basta abrir o arquivo `dist/public/index.html` no navegador e começar a gerenciar sua cozinha comercial.**
