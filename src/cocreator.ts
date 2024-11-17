// cocreator.ts
import { BrowserWindow } from 'electron';

export function startCoCreatorMode() {
  console.log("Starting CoCreator mode...");
  
  const coCreatorWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true
    }
  });

  coCreatorWindow.loadURL('https://www.artbreeder.com/create/collage'); // Replace with the appropriate URL or file

  coCreatorWindow.on('closed', () => {
    console.log('CoCreator mode window closed');
  });
}