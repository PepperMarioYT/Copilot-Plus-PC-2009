// designer.ts
import { BrowserWindow } from 'electron';

export function startDesignerMode() {
  console.log("Starting Designer mode...");
  
  const designerWindow = new BrowserWindow({
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
