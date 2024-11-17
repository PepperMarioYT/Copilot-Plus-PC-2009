"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// main.ts
const electron_1 = require("electron");
const copilot_1 = require("./copilot");
const cocreator_1 = require("./cocreator");
const designer_1 = require("./designer");
const recall_1 = require("./recall");
function createMainWindow() {
    const mainWindow = new electron_1.BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    });
    mainWindow.loadFile('index.html'); // Main landing page or dashboard of your app
    mainWindow.on('closed', () => {
        electron_1.app.quit();
    });
}
electron_1.app.whenReady().then(() => {
    createMainWindow();
    // If you have specific logic for launching each mode, you can add it here.
    const mode = process.argv[2]; // You could pass the mode from the command line arguments
    if (mode === 'copilot') {
        (0, copilot_1.startCopilotMode)();
    }
    else if (mode === 'cocreator') {
        (0, cocreator_1.startCoCreatorMode)();
    }
    else if (mode === 'designer') {
        (0, designer_1.startDesignerMode)();
    }
    else if (mode === 'recall') {
        (0, recall_1.startRecallMode)();
    }
});
electron_1.app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        electron_1.app.quit();
    }
});
