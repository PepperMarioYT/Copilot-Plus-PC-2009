// main.ts
import { app, BrowserWindow } from 'electron';
import { startCopilotMode } from './copilot';
import { startCoCreatorMode } from './cocreator';
import { startDesignerMode } from './designer';
import { startRecallMode } from './recall';

function createMainWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  });

  mainWindow.loadFile('index.html'); // Main landing page or dashboard of your app

  mainWindow.on('closed', () => {
    app.quit();
  });
}

app.whenReady().then(() => {
  createMainWindow();

  // If you have specific logic for launching each mode, you can add it here.
  const mode = process.argv[2];  // You could pass the mode from the command line arguments

  if (mode === 'copilot') {
    startCopilotMode();
  } else if (mode === 'cocreator') {
    startCoCreatorMode();
  } else if (mode === 'designer') {
    startDesignerMode();
  } else if (mode === 'recall') {
    startRecallMode();
  }
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
