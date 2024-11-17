"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startDesignerMode = startDesignerMode;
// designer.ts
const electron_1 = require("electron");
function startDesignerMode() {
    console.log("Starting Designer mode...");
    const designerWindow = new electron_1.BrowserWindow({
        width: 1280,
        height: 900,
        webPreferences: {
            nodeIntegration: true
        }
    });
    designerWindow.loadURL('https://example.com/designer'); // Customize based on your need
    designerWindow.on('closed', () => {
        console.log('Designer mode window closed');
    });
}
