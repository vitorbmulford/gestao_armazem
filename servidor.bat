@echo off
REM Servidor HTTP Simples para Sistema de Gestão de Cozinha Comercial
REM Este script inicia um servidor web local para executar o sistema no Windows

echo ============================================================
echo Sistema de Gestao de Cozinha Comercial
echo ============================================================
echo.

REM Verifica se a pasta dist/public existe
if not exist "dist\public" (
    echo [ERRO] Pasta 'dist\public' nao encontrada!
    echo        Certifique-se de estar na pasta raiz do projeto.
    echo.
    pause
    exit /b 1
)

echo [INFO] Iniciando servidor local...
echo.

REM Tenta usar Python 3
where python >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    echo [OK] Python encontrado
    echo [INFO] Iniciando servidor na porta 8000...
    echo.
    cd dist\public
    echo ============================================================
    echo Servidor iniciado com sucesso!
    echo ============================================================
    echo URL: http://localhost:8000
    echo.
    echo Pressione Ctrl+C para parar o servidor
    echo ============================================================
    echo.
    start http://localhost:8000
    python -m http.server 8000
    goto :end
)

REM Tenta usar Node.js
where node >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    echo [OK] Node.js encontrado
    echo [INFO] Instalando http-server...
    call npm install -g http-server
    echo [INFO] Iniciando servidor na porta 8000...
    echo.
    cd dist\public
    echo ============================================================
    echo Servidor iniciado com sucesso!
    echo ============================================================
    echo URL: http://localhost:8000
    echo.
    echo Pressione Ctrl+C para parar o servidor
    echo ============================================================
    echo.
    start http://localhost:8000
    http-server -p 8000
    goto :end
)

REM Se nenhum foi encontrado
echo [ERRO] Python ou Node.js nao encontrados!
echo.
echo Por favor, instale uma das opcoes:
echo   - Python 3: https://www.python.org/downloads/
echo   - Node.js: https://nodejs.org/
echo.
pause
exit /b 1

:end
