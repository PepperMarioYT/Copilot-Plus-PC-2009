// copilot.ts
import { BrowserWindow } from 'electron';

export function startCopilotMode() {
  console.log("Starting Copilot mode...");
  
  // Open a window for Copilot mode
  const copilotWindow = new BrowserWindow({
    width: 1024,
    height: 768,
    webPreferences: {
      nodeIntegration: true
    }
  });
  
  copilotWindow.loadURL('https://copilot.microsoft.com'); // You can replace with your actual HTML file or URL
  
  copilotWindow.on('closed', () => {
    console.log('Copilot mode window closed');
  });
}
