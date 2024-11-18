import { BrowserWindow } from 'electron';
import path from 'path';

export function startCoCreatorMode() {
  console.log("Starting CoCreator mode...");
  
  const coCreatorWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true
    },
    icon: path.join(__dirname, '..', 'icons', 'cocreator.png')  // Path to the icon
  });

  coCreatorWindow.loadURL('https://www.artbreeder.com/create/collage'); // Replace with the appropriate URL or file

  coCreatorWindow.on('closed', () => {
    console.log('CoCreator mode window closed');
  });
}
