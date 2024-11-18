import { BrowserWindow } from 'electron';
import path from 'path';

export function startDesignerMode() {
  console.log("Starting Designer mode...");
  
  const designerWindow = new BrowserWindow({
    width: 1280,
    height: 900,
    webPreferences: {
      nodeIntegration: true
    },
    icon: path.join(__dirname, '..', 'icons', 'designer.png')  // Path to the icon
  });

  designerWindow.loadURL('https://designer.microsoft.com'); // Customize based on your need

  designerWindow.on('closed', () => {
    console.log('Designer mode window closed');
  });
}
