# Guia de Instalação PWA - Sistema de Gestão de Cozinha Comercial

## O que é PWA?

**Progressive Web App (PWA)** é uma tecnologia que permite instalar aplicações web como se fossem aplicativos nativos em celulares, tablets e desktops. O sistema agora pode ser instalado e usado offline!

## Benefícios do PWA

✅ **Instalação como App Nativo**: Ícone na tela inicial do celular/desktop  
✅ **Funcionamento Offline**: Acesse o sistema mesmo sem internet  
✅ **Atualizações Automáticas**: Sempre na versão mais recente  
✅ **Performance Melhorada**: Cache inteligente acelera carregamento  
✅ **Sem App Store**: Não precisa baixar de lojas de aplicativos  
✅ **Multiplataforma**: Funciona em Android, iOS, Windows, Mac, Linux  

---

## Como Instalar no Celular (Android)

### Google Chrome

1. Abra o sistema no navegador Chrome
2. Aguarde o banner "Adicionar à tela inicial" aparecer
3. Toque em **"Instalar"** ou **"Adicionar"**
4. Confirme a instalação
5. O ícone aparecerá na tela inicial do seu celular

**Instalação Manual:**
1. Toque no menu ⋮ (três pontos) no canto superior direito
2. Selecione **"Adicionar à tela inicial"** ou **"Instalar app"**
3. Confirme tocando em **"Adicionar"**

### Samsung Internet

1. Abra o sistema no Samsung Internet
2. Toque no menu ☰ (três linhas)
3. Selecione **"Adicionar página a"**
4. Escolha **"Tela inicial"**
5. Confirme a instalação

---

## Como Instalar no iPhone/iPad (iOS)

### Safari

1. Abra o sistema no navegador Safari
2. Toque no ícone de **Compartilhar** 📤 (na barra inferior)
3. Role para baixo e toque em **"Adicionar à Tela de Início"**
4. Edite o nome se desejar
5. Toque em **"Adicionar"** no canto superior direito
6. O ícone aparecerá na tela inicial

**Nota:** No iOS, o PWA funciona melhor no Safari. Outros navegadores têm limitações.

---

## Como Instalar no Desktop (Windows/Mac/Linux)

### Google Chrome / Microsoft Edge

1. Abra o sistema no navegador
2. Clique no ícone de **instalação** ⊕ na barra de endereço (à direita)
3. Ou clique no menu ⋮ → **"Instalar Gestão Cozinha..."**
4. Confirme clicando em **"Instalar"**
5. O app será aberto em janela própria
6. Um atalho será criado na área de trabalho e menu iniciar

### Firefox

1. Abra o sistema no Firefox
2. Clique no ícone de **instalação** na barra de endereço
3. Ou acesse o menu ☰ → **"Instalar este site como um app"**
4. Confirme a instalação

---

## Como Usar Offline

Após a instalação, o sistema funciona offline automaticamente:

1. **Primeira visita**: Todos os arquivos são baixados e salvos no cache
2. **Visitas seguintes**: Sistema carrega instantaneamente do cache
3. **Sem internet**: Continua funcionando normalmente
4. **Dados salvos**: Tudo é salvo no localStorage do navegador

### O que funciona offline?

✅ Visualizar cardápios  
✅ Editar receitas  
✅ Calcular custos  
✅ Gerar listas de compras  
✅ Ver analytics e gráficos  
✅ Imprimir cardápios e fichas técnicas  
✅ Todas as funcionalidades do sistema  

### Limitações offline

❌ Não é possível acessar recursos externos (se houver)  
❌ Atualizações do sistema requerem conexão na primeira vez  

---

## Atualizações Automáticas

O sistema verifica atualizações automaticamente:

- **A cada 60 segundos** quando está aberto
- **Ao abrir o app** após estar fechado
- **Ao voltar online** se estava offline

Quando uma atualização estiver disponível:
1. O sistema baixa a nova versão em segundo plano
2. Uma mensagem aparece no console do navegador
3. Recarregue a página para aplicar a atualização

---

## Verificar se o PWA está Instalado

### Android
- Procure o ícone **"Gestão Cozinha"** na tela inicial
- Verifique na gaveta de aplicativos

### iOS
- Procure o ícone na tela inicial
- O app abre em tela cheia, sem barra do Safari

### Desktop
- Procure o atalho na área de trabalho
- Verifique no menu Iniciar (Windows) ou Launchpad (Mac)
- O app abre em janela própria, sem barra de navegador

---

## Desinstalar o PWA

### Android
1. Pressione e segure o ícone do app
2. Toque em **"Desinstalar"** ou arraste para "Remover"

### iOS
1. Pressione e segure o ícone
2. Toque em **"Remover App"**
3. Confirme em **"Excluir App"**

### Desktop (Chrome/Edge)
1. Abra o app instalado
2. Clique no menu ⋮ (três pontos)
3. Selecione **"Desinstalar Gestão Cozinha..."**
4. Confirme a desinstalação

---

## Atalhos Rápidos

Após instalado, o PWA oferece atalhos para acesso rápido:

📋 **Cardápio** - Ver cardápio semanal  
📖 **Receitas** - Gerenciar receitas  
📊 **Analytics** - Ver análises e gráficos  

**Como usar:**
- **Android**: Pressione e segure o ícone do app
- **Desktop**: Clique com botão direito no ícone

---

## Solução de Problemas

### O botão de instalação não aparece

- Certifique-se de estar usando HTTPS (ou localhost em desenvolvimento)
- Verifique se está usando um navegador compatível
- Limpe o cache do navegador e recarregue a página
- Aguarde alguns segundos após carregar a página

### O app não funciona offline

- Abra o app pelo menos uma vez com internet
- Aguarde o download completo dos arquivos
- Verifique se o Service Worker está registrado (Console do navegador)

### Como limpar o cache

**Chrome/Edge:**
1. Abra as Ferramentas do Desenvolvedor (F12)
2. Vá em **Application** → **Storage**
3. Clique em **"Clear site data"**

**Safari iOS:**
1. Configurações → Safari
2. Limpar Histórico e Dados de Sites

### Verificar Service Worker

1. Abra as Ferramentas do Desenvolvedor (F12)
2. Vá em **Application** → **Service Workers**
3. Verifique se há um Service Worker ativo
4. Versão atual: **v1.0.0**

---

## Arquivos PWA no Sistema

O PWA é composto pelos seguintes arquivos:

```
client/public/
├── manifest.json       # Metadados do app (nome, ícones, cores)
├── sw.js              # Service Worker (cache e offline)
├── icon-192.png       # Ícone 192x192 pixels
└── icon-512.png       # Ícone 512x512 pixels
```

### manifest.json
Contém informações sobre o app:
- Nome completo e nome curto
- Descrição
- Ícones em múltiplos tamanhos
- Cor do tema (#f97316 - laranja)
- Modo de exibição (standalone)
- Atalhos rápidos

### sw.js (Service Worker)
Responsável por:
- Cachear arquivos estáticos
- Permitir funcionamento offline
- Atualizar cache automaticamente
- Estratégia: Network First com fallback para Cache

---

## Tecnologias Utilizadas

- **Manifest.json**: Metadados PWA (W3C)
- **Service Worker**: Cache e offline (API moderna)
- **Cache API**: Armazenamento de assets
- **Fetch API**: Requisições de rede
- **LocalStorage**: Persistência de dados

---

## Compatibilidade de Navegadores

| Navegador | Desktop | Mobile | Suporte PWA |
|-----------|---------|--------|-------------|
| Chrome | ✅ | ✅ | Completo |
| Edge | ✅ | ✅ | Completo |
| Firefox | ✅ | ✅ | Completo |
| Safari | ✅ | ⚠️ | Parcial (iOS) |
| Samsung Internet | - | ✅ | Completo |
| Opera | ✅ | ✅ | Completo |

⚠️ **Safari iOS**: Suporte limitado, mas funcional. Use "Adicionar à Tela de Início".

---

## Suporte e Ajuda

Se tiver problemas com a instalação ou uso do PWA:

1. Verifique se está usando um navegador compatível
2. Certifique-se de que o site está em HTTPS
3. Limpe o cache e tente novamente
4. Consulte a documentação do navegador específico
5. Entre em contato com o suporte técnico

---

## Recursos Adicionais

- [MDN - Progressive Web Apps](https://developer.mozilla.org/pt-BR/docs/Web/Progressive_web_apps)
- [Google - PWA Checklist](https://web.dev/pwa-checklist/)
- [Can I Use - Service Workers](https://caniuse.com/serviceworkers)

---

**Versão do PWA:** 1.0.0  
**Última atualização:** Novembro 2024  
**Sistema:** Gestão de Cozinha Comercial
