import { BrowserWindow, ipcRenderer } from 'electron';
import path from 'path';
import os from 'os';
import { exec } from 'child_process';
import { app } from 'electron';
import fs from 'fs';

// Function to initialize the Recall UI (photo viewer and settings)
export function startRecallUI() {
  console.log("Starting Recall UI...");

  const recallWindow = new BrowserWindow({
    width: 1024,
    height: 768,
    webPreferences: {
      preload: __dirname + '/preload.js', // Ensure this file is set up to handle IPC
      nodeIntegration: true,
      contextIsolation: false // Allow access to Node.js in the renderer process
    }
  });

  recallWindow.loadFile('recall.html'); // Load the Recall HTML UI file

  recallWindow.on('closed', () => {
    console.log("Recall UI window closed");
  });

  // Handle the "Toggle Screenshot" button
  recallWindow.webContents.once('did-finish-load', () => {
    recallWindow.webContents.send('recall:load-settings');
  });

  // Listen for a screenshot toggle request from the UI
  recallWindow.webContents.on('ipc-message', (event, channel, args) => {
    if (channel === 'recall:toggle-screenshot') {
      ipcRenderer.invoke('recall:toggle-screenshot', args);
    }
  });

  // Handle enabling/disabling the startup behavior for Recall mode
  recallWindow.webContents.once('did-finish-load', () => {
    recallWindow.webContents.send('recall:load-settings');
  });
  
  // Handle enable/disable start-up registration
  ipcRenderer.on('recall:enable-startup', (event, enabled) => {
    if (enabled) {
      enableStartup();
    } else {
      disableStartup();
    }
  });
}

// Function to enable Copilot+ PC 2009 to start with Windows (Recall mode)
function enableStartup() {
  const appPath = path.join('C:', 'Program Files', 'Copilot+ PC 2009', 'launcher.exe');  // Correct program directory
  const args = '--mode=recall --type=background';
  
  const regKey = `HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Run\\Copilot+ PC 2009 Recall`;
  exec(`reg add "${regKey}" /v "Copilot+ Recall" /t REG_SZ /d "\"${appPath}\" ${args}" /f`, (err, stdout, stderr) => {
    if (err) {
      console.error("Error adding startup registry:", err);
      return;
    }
    console.log("Added startup registry key for Copilot+ Recall");
  });
}

// Function to disable startup
function disableStartup() {
  const regKey = `HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Run\\Copilot+ PC 2009 Recall`;
  exec(`reg delete "${regKey}" /f`, (err, stdout, stderr) => {
    if (err) {
      console.error("Error deleting startup registry:", err);
      return;
    }
    console.log("Deleted startup registry key for Copilot+ Recall");
  });
}
