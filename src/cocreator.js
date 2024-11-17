"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startCoCreatorMode = startCoCreatorMode;
// cocreator.ts
const electron_1 = require("electron");
function startCoCreatorMode() {
    console.log("Starting CoCreator mode...");
    const coCreatorWindow = new electron_1.BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            nodeIntegration: true
        }
    });
    coCreatorWindow.loadURL('https://www.artbreeder.com/create/collage '); // Replace with the appropriate URL or file
    coCreatorWindow.on('closed', () => {
        console.log('CoCreator mode window closed');
    });
}
