#!/usr/bin/env python3
"""
Servidor HTTP Simples para Sistema de Gestão de Cozinha Comercial

Este script inicia um servidor web local para executar o sistema.
Uso: python3 servidor.py
"""

import http.server
import socketserver
import os
import sys
import webbrowser
from pathlib import Path

# Configurações
PORT = 8000
DIRECTORY = "dist/public"

def main():
    # Verifica se a pasta dist/public existe
    if not os.path.exists(DIRECTORY):
        print(f"❌ Erro: Pasta '{DIRECTORY}' não encontrada!")
        print(f"   Certifique-se de estar na pasta raiz do projeto.")
        print(f"   Pasta atual: {os.getcwd()}")
        sys.exit(1)
    
    # Muda para o diretório dist/public
    os.chdir(DIRECTORY)
    
    # Cria o servidor
    Handler = http.server.SimpleHTTPRequestHandler
    
    # Tenta iniciar o servidor
    try:
        with socketserver.TCPServer(("", PORT), Handler) as httpd:
            url = f"http://localhost:{PORT}"
            print("=" * 60)
            print("🚀 Servidor iniciado com sucesso!")
            print("=" * 60)
            print(f"📍 URL: {url}")
            print(f"📂 Pasta: {os.getcwd()}")
            print(f"🌐 Acesse o sistema no navegador: {url}")
            print("=" * 60)
            print("💡 Dicas:")
            print("   - Pressione Ctrl+C para parar o servidor")
            print("   - O sistema funcionará enquanto este script estiver rodando")
            print("   - Você pode instalar como PWA após abrir no navegador")
            print("=" * 60)
            print()
            
            # Tenta abrir o navegador automaticamente
            try:
                print("🌐 Abrindo navegador...")
                webbrowser.open(url)
            except:
                print("⚠️  Não foi possível abrir o navegador automaticamente")
                print(f"   Abra manualmente: {url}")
            
            print()
            print("✅ Servidor rodando. Aguardando requisições...")
            print()
            
            # Mantém o servidor rodando
            httpd.serve_forever()
            
    except OSError as e:
        if e.errno == 48 or e.errno == 98:  # Address already in use
            print(f"❌ Erro: Porta {PORT} já está em uso!")
            print(f"   Tente fechar outros servidores ou use outra porta.")
            print(f"   Para usar outra porta, edite PORT = {PORT} no script.")
        else:
            print(f"❌ Erro ao iniciar servidor: {e}")
        sys.exit(1)
    except KeyboardInterrupt:
        print()
        print("=" * 60)
        print("🛑 Servidor encerrado pelo usuário")
        print("=" * 60)
        sys.exit(0)

if __name__ == "__main__":
    main()
