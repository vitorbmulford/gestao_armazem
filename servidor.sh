#!/bin/bash
# Servidor HTTP Simples para Sistema de Gestão de Cozinha Comercial
# Este script inicia um servidor web local para executar o sistema

PORT=8000
DIRECTORY="dist/public"

echo "============================================================"
echo "Sistema de Gestão de Cozinha Comercial"
echo "============================================================"
echo ""

# Verifica se a pasta dist/public existe
if [ ! -d "$DIRECTORY" ]; then
    echo "❌ Erro: Pasta '$DIRECTORY' não encontrada!"
    echo "   Certifique-se de estar na pasta raiz do projeto."
    echo "   Pasta atual: $(pwd)"
    exit 1
fi

echo "[INFO] Iniciando servidor local..."
echo ""

# Tenta usar Python 3
if command -v python3 &> /dev/null; then
    echo "✅ Python 3 encontrado"
    echo "[INFO] Iniciando servidor na porta $PORT..."
    echo ""
    cd "$DIRECTORY"
    echo "============================================================"
    echo "🚀 Servidor iniciado com sucesso!"
    echo "============================================================"
    echo "📍 URL: http://localhost:$PORT"
    echo "📂 Pasta: $(pwd)"
    echo ""
    echo "💡 Dicas:"
    echo "   - Pressione Ctrl+C para parar o servidor"
    echo "   - Acesse http://localhost:$PORT no navegador"
    echo "   - Você pode instalar como PWA após abrir"
    echo "============================================================"
    echo ""
    
    # Tenta abrir o navegador automaticamente
    if command -v xdg-open &> /dev/null; then
        xdg-open "http://localhost:$PORT" &> /dev/null &
    elif command -v open &> /dev/null; then
        open "http://localhost:$PORT" &> /dev/null &
    fi
    
    python3 -m http.server $PORT
    exit 0
fi

# Tenta usar Python 2
if command -v python &> /dev/null; then
    echo "✅ Python encontrado"
    echo "[INFO] Iniciando servidor na porta $PORT..."
    echo ""
    cd "$DIRECTORY"
    echo "============================================================"
    echo "🚀 Servidor iniciado com sucesso!"
    echo "============================================================"
    echo "📍 URL: http://localhost:$PORT"
    echo ""
    echo "Pressione Ctrl+C para parar o servidor"
    echo "============================================================"
    echo ""
    
    # Tenta abrir o navegador automaticamente
    if command -v xdg-open &> /dev/null; then
        xdg-open "http://localhost:$PORT" &> /dev/null &
    elif command -v open &> /dev/null; then
        open "http://localhost:$PORT" &> /dev/null &
    fi
    
    python -m SimpleHTTPServer $PORT
    exit 0
fi

# Tenta usar Node.js
if command -v node &> /dev/null; then
    echo "✅ Node.js encontrado"
    
    # Verifica se http-server está instalado
    if ! command -v http-server &> /dev/null; then
        echo "[INFO] Instalando http-server..."
        npm install -g http-server
    fi
    
    echo "[INFO] Iniciando servidor na porta $PORT..."
    echo ""
    cd "$DIRECTORY"
    echo "============================================================"
    echo "🚀 Servidor iniciado com sucesso!"
    echo "============================================================"
    echo "📍 URL: http://localhost:$PORT"
    echo ""
    echo "Pressione Ctrl+C para parar o servidor"
    echo "============================================================"
    echo ""
    
    # Tenta abrir o navegador automaticamente
    if command -v xdg-open &> /dev/null; then
        xdg-open "http://localhost:$PORT" &> /dev/null &
    elif command -v open &> /dev/null; then
        open "http://localhost:$PORT" &> /dev/null &
    fi
    
    http-server -p $PORT
    exit 0
fi

# Tenta usar PHP
if command -v php &> /dev/null; then
    echo "✅ PHP encontrado"
    echo "[INFO] Iniciando servidor na porta $PORT..."
    echo ""
    cd "$DIRECTORY"
    echo "============================================================"
    echo "🚀 Servidor iniciado com sucesso!"
    echo "============================================================"
    echo "📍 URL: http://localhost:$PORT"
    echo ""
    echo "Pressione Ctrl+C para parar o servidor"
    echo "============================================================"
    echo ""
    
    # Tenta abrir o navegador automaticamente
    if command -v xdg-open &> /dev/null; then
        xdg-open "http://localhost:$PORT" &> /dev/null &
    elif command -v open &> /dev/null; then
        open "http://localhost:$PORT" &> /dev/null &
    fi
    
    php -S localhost:$PORT
    exit 0
fi

# Se nenhum foi encontrado
echo "❌ Erro: Python, Node.js ou PHP não encontrados!"
echo ""
echo "Por favor, instale uma das opções:"
echo "  - Python 3: https://www.python.org/downloads/"
echo "  - Node.js: https://nodejs.org/"
echo "  - PHP: https://www.php.net/downloads"
echo ""
exit 1
