import { BrowserWindow } from 'electron';
import path from 'path';

export function startCopilotMode() {
  console.log("Starting Copilot mode...");
  
  const copilotWindow = new BrowserWindow({
    width: 1024,
    height: 768,
    webPreferences: {
      nodeIntegration: true
    },
    icon: path.join(__dirname, '..', 'icons', 'copilot.png')  // Path to the icon
  });
  
  copilotWindow.loadURL('https://copilot.microsoft.com'); // You can replace with your actual HTML file or URL
  
  copilotWindow.on('closed', () => {
    console.log('Copilot mode window closed');
  });
}
