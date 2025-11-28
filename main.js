const { app, BrowserWindow } = require('electron');
const path = require('path');
const serve = require('serve-handler');
const http = require('http');

let mainWindow;

// Serve a pasta onde está seu site buildado
const server = http.createServer((request, response) => {
    return serve(request, response, { public: path.join(__dirname, 'dist/public') });
});

function createWindow() {
    // Inicia o servidor em uma porta aleatória livre (0)
    server.listen(0, () => {
        const port = server.address().port;

        // CRIA A JANELA SOMENTE APÓS O SERVIDOR INICIAR
        mainWindow = new BrowserWindow({
            width: 1280,
            height: 720,
            icon: path.join(__dirname, 'dist/public/icon-512.png'),
            autoHideMenuBar: true,
            webPreferences: {
                nodeIntegration: false,
                contextIsolation: true
            }
        });

        mainWindow.loadURL(`http://localhost:${port}`);

        // --- CORREÇÃO AQUI ---
        // O evento 'closed' deve ser definido AQUI DENTRO, logo após criar a janela
        mainWindow.on('closed', function () {
            mainWindow = null;
        });
    });
}

app.on('ready', createWindow);

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit();
});