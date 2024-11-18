import { BrowserWindow, ipcMain } from 'electron';
import path from 'path';

// Function to initialize the Recall UI (photo viewer and settings)
export function startRecallUI() {
  console.log("Starting Recall UI...");

  const recallWindow = new BrowserWindow({
    width: 1024,
    height: 768,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),  // Ensure this file is set up to handle IPC
      nodeIntegration: false, // Disable nodeIntegration for security
      contextIsolation: true, // Enable context isolation for better security
    },
    icon: path.join(__dirname, 'assets', 'recall-icon.png')  // Path to the icon
  });

  recallWindow.loadFile('recall.html'); // Load the Recall HTML UI file

  recallWindow.on('closed', () => {
    console.log("Recall UI window closed");
  });

  // Listen for a screenshot toggle request from the UI
  ipcMain.on('recall:toggle-screenshot', (event, args) => {
    console.log("Screenshot toggle request:", args);
    // Handle the screenshot functionality here
  });

  // Handle enabling/disabling the startup behavior for Recall mode
  ipcMain.on('recall:enable-startup', (event, enabled) => {
    if (enabled) {
      enableStartup();
    } else {
      disableStartup();
    }
  });
}

// Function to enable Copilot+ PC 2009 to start with Windows (Recall mode)
function enableStartup() {
  // Your startup registry code here
}

// Function to disable startup
function disableStartup() {
  // Your registry delete code here
}
