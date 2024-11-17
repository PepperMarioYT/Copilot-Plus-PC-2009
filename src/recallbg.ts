import { ipcMain } from 'electron';
import screenshot from 'screenshot-desktop';
import fs from 'fs-extra';
import path from 'path';
import os from 'os';
import { exec } from 'child_process';
import { app } from 'electron';

// Define the directory for storing screenshots
const getRecallDirectory = (): string => {
  const userDataPath = path.join(os.homedir(), 'AppData', 'Local', 'CopilotPC2009', 'Recall');
  fs.ensureDirSync(userDataPath); // Ensure the directory exists
  return userDataPath;
};

let screenshotInterval: NodeJS.Timeout | null = null;

// Function to take a screenshot
async function takeScreenshot() {
  try {
    const recallDir = getRecallDirectory();
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-'); // Safe filename
    const screenshotPath = path.join(recallDir, `screenshot-${timestamp}.png`);

    // Capture the screenshot and save it
    const img = await screenshot({ format: 'png' });
    await fs.writeFile(screenshotPath, img);
    console.log(`Screenshot saved at: ${screenshotPath}`);

    return screenshotPath; // Return path for confirmation
  } catch (error) {
    console.error("Error taking screenshot:", error);
    throw error;
  }
}

// Start or stop the screenshot capture
function toggleScreenshotCapture(enabled: boolean) {
  if (enabled && !screenshotInterval) {
    // Start taking screenshots every 5 seconds
    screenshotInterval = setInterval(takeScreenshot, 60000); // Every 5 seconds
    console.log("Screenshot capture enabled");
  } else if (!enabled && screenshotInterval) {
    // Stop the screenshot capture
    clearInterval(screenshotInterval);
    screenshotInterval = null;
    console.log("Screenshot capture disabled");
  }
}

// Function to launch Copilot+ PC 2009 with Recall mode enabled
function launchWithRecall() {
  const appPath = path.join('C:', 'Program Files', 'Copilot+ PC 2009', 'launcher.exe'); // Correct program directory
  const args = '--mode=recall --type=background';

  exec(`"${appPath}" ${args}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error launching Copilot+: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`stderr: ${stderr}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
  });
}

// Initialize Recall background functionality
export function initRecallBackground() {
  console.log("Initializing Recall background...");

  // IPC Listener to toggle screenshot capture
  ipcMain.handle('recall:toggle-screenshot', (event, enabled: boolean) => {
    toggleScreenshotCapture(enabled);
    
    if (enabled) {
      // Enable Recall, make Copilot+ start with Windows
      launchWithRecall();
    }
  });
}
