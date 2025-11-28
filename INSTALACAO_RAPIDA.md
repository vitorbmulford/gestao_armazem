# 🚀 Instalação Rápida - Sistema de Gestão de Cozinha Comercial

Este guia permite instalar e executar o sistema em **menos de 2 minutos**.

---

## 📦 Conteúdo do Pacote

O arquivo `gestao-cozinha-completo.zip` contém:

✅ **Build de produção pronto** (pasta `dist/public/`)  
✅ **Scripts de servidor** (Python, Shell, Batch)  
✅ **Código-fonte completo** (React/TypeScript)  
✅ **Arquivos PWA** (manifest, service worker, ícones)  
✅ **Documentação completa** (5 guias)  

**Tamanho:** ~2.3 MB compactado

---

## ⚡ Método Recomendado: Servidor Local (MAIS FÁCIL)

**Este é o método mais simples e funciona em qualquer sistema operacional!**

### Windows

1. **Descompacte o arquivo ZIP**
2. **Dê duplo clique em `servidor.bat`**
3. O navegador abrirá automaticamente
4. **Pronto!** 🎉

### Linux / Mac

1. **Descompacte o arquivo ZIP**
   ```bash
   unzip gestao-cozinha-completo.zip
   cd gestao-cozinha
   ```

2. **Execute o script de servidor**
   ```bash
   ./servidor.sh
   ```
   Ou:
   ```bash
   python3 servidor.py
   ```

3. O navegador abrirá automaticamente em `http://localhost:8000`
4. **Pronto!** 🎉

### Requisitos

Você precisa ter **apenas UM** dos seguintes instalados:
- ✅ **Python 3** (recomendado) - [baixar aqui](https://www.python.org/downloads/)
- ✅ **Python 2** (funciona também)
- ✅ **Node.js** - [baixar aqui](https://nodejs.org/)
- ✅ **PHP** - [baixar aqui](https://www.php.net/downloads)

**Nota:** A maioria dos sistemas já vem com Python instalado!

---

## 🌐 Método Alternativo: Abrir HTML Diretamente

**⚠️ Funciona, mas com limitações do PWA**

### Passo a Passo

1. **Descompacte o arquivo ZIP**
2. **Navegue até a pasta:**
   ```
   gestao-cozinha/dist/public/
   ```
3. **Dê duplo clique em `index.html`**
4. O sistema abrirá no navegador

### ⚠️ Limitações deste método:
- PWA pode não funcionar corretamente (Service Worker bloqueado)
- Instalação como app nativo pode não estar disponível
- Alguns navegadores podem bloquear recursos por segurança

**💡 Recomendação:** Use o método do servidor local para melhor experiência!

---

## 📱 Instalar como PWA (App Nativo)

Após abrir o sistema com o **servidor local**:

### Android (Chrome)
1. Toque no menu ⋮ (três pontos)
2. Selecione **"Adicionar à tela inicial"** ou **"Instalar app"**
3. Confirme a instalação
4. O ícone aparecerá na tela inicial

### iOS (Safari)
1. Toque no ícone de Compartilhar 📤
2. Selecione **"Adicionar à Tela de Início"**
3. Confirme
4. O ícone aparecerá na tela inicial

### Desktop (Chrome/Edge/Firefox)
1. Clique no ícone ⊕ na barra de endereço
2. Ou menu ⋮ → **"Instalar Gestão Cozinha..."**
3. Confirme a instalação
4. Um atalho será criado na área de trabalho

📖 **Guia completo:** Veja `PWA_GUIA.md` para mais detalhes

---

## 🎯 Funcionalidades Principais

O sistema inclui:

✅ **Gestão de Ingredientes** (100+ pré-cadastrados)  
✅ **Gestão de Receitas** (75+ receitas categorizadas)  
✅ **Cardápio Semanal** (5 semanas pré-configuradas)  
✅ **Lista de Compras** (geração automática)  
✅ **Fichas Técnicas** (detalhamento completo)  
✅ **Analytics com Gráficos** (evolução de custos, ranking de receitas)  
✅ **Cálculos Automáticos** (CMV, Markup, Margem de Contribuição)  
✅ **Impressão de Cardápios** (formato A4 para clientes)  
✅ **Templates de Guarnições** (combos reutilizáveis)  
✅ **Acompanhamentos Configuráveis** (arroz, feijão, saladas)  
✅ **Backup/Restauração** (export/import JSON)  
✅ **PWA Instalável** (funciona offline)  

---

## 🛠️ Instalação para Desenvolvimento (Opcional)

**Para quem deseja editar o código ou contribuir com o projeto.**

### Pré-requisitos

- **Node.js** 18+ ([baixar aqui](https://nodejs.org/))
- **pnpm** (instalado automaticamente)

### Passo a Passo

1. **Descompacte o arquivo ZIP**
   ```bash
   unzip gestao-cozinha-completo.zip
   cd gestao-cozinha
   ```

2. **Instale as dependências**
   ```bash
   npm install -g pnpm
   pnpm install
   ```
   ⏱️ Tempo estimado: 2-3 minutos

3. **Inicie o servidor de desenvolvimento**
   ```bash
   pnpm dev
   ```

4. **Abra no navegador**
   ```
   http://localhost:3000
   ```

5. **Pronto! O sistema está rodando em modo desenvolvimento** 🎉

---

## 📂 Estrutura de Pastas

```
gestao-cozinha/
├── dist/                     # Build de produção (USE ESTA PASTA)
│   └── public/              # Arquivos HTML/CSS/JS prontos
│       ├── index.html       # ← Arquivo principal
│       ├── manifest.json    # Manifest PWA
│       ├── sw.js           # Service Worker
│       ├── icon-192.png    # Ícone PWA pequeno
│       ├── icon-512.png    # Ícone PWA grande
│       └── assets/         # CSS e JavaScript otimizados
├── servidor.py              # Script Python (Linux/Mac/Windows)
├── servidor.sh              # Script Shell (Linux/Mac)
├── servidor.bat             # Script Batch (Windows)
├── client/                  # Código-fonte React/TypeScript
├── README.md                # Documentação principal
├── GUIA_DE_USO.md          # Manual de funcionalidades
├── PWA_GUIA.md             # Guia de instalação PWA
├── COMO_USAR_HTML.md       # Guia de uso do build HTML
└── INSTALACAO_RAPIDA.md    # Este arquivo
```

---

## 🆘 Solução de Problemas

### O servidor não inicia

**Erro: "Porta 8000 já está em uso"**
- Feche outros servidores rodando
- Ou edite o script e mude a porta (ex: 8001, 8080)

**Erro: "Python/Node.js não encontrado"**
- Instale Python 3: https://www.python.org/downloads/
- Ou instale Node.js: https://nodejs.org/

### O sistema não carrega (tela branca)

- ✅ **Solução:** Use o servidor local (scripts `servidor.*`)
- ❌ **Não funciona bem:** Abrir `index.html` diretamente

### PWA não instala

- Certifique-se de estar usando o **servidor local** (não file://)
- Use navegadores compatíveis: Chrome, Edge, Firefox
- Limpe o cache do navegador (Ctrl+Shift+Delete)

### Dados não salvam

- Os dados são salvos no localStorage do navegador
- Não limpe os dados do site
- Use a função de Backup (exportar JSON) regularmente

---

## 💡 Dicas Importantes

1. **Use o servidor local** para melhor experiência (PWA funcional)
2. **Backup Regular:** Exporte seus dados em JSON regularmente
3. **Navegadores Recomendados:** Chrome, Edge, Firefox
4. **Modo Offline:** Após primeira visita, funciona sem internet
5. **Impressão:** Use Chrome para melhor qualidade

---

## 📖 Documentação Adicional

- **README.md** - Visão geral e instalação completa
- **GUIA_DE_USO.md** - Manual detalhado de todas as funcionalidades
- **PWA_GUIA.md** - Guia completo de instalação PWA
- **COMO_USAR_HTML.md** - Como usar o build HTML estático

---

## ⏱️ Tempo de Instalação

- **Servidor local (recomendado):** < 1 minuto
- **Abrir HTML direto:** < 30 segundos (com limitações)
- **Instalação desenvolvimento:** < 5 minutos

---

## 🎉 Pronto para Usar!

O sistema está **100% funcional** e pronto para uso profissional em marmitarias.

**Método mais rápido:**
1. Descompactar ZIP
2. Executar `servidor.bat` (Windows) ou `./servidor.sh` (Linux/Mac)
3. Sistema abre automaticamente no navegador

Boa gestão! 🍽️
