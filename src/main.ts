import { app, BrowserWindow } from 'electron';
import path from 'path';
import { startCopilotMode } from './copilot';
import { startCoCreatorMode } from './cocreator';
import { startDesignerMode } from './designer';
import { startRecallUI } from './recallui'; // Assuming you've created startRecallBackground function
import './recallbg';
import { initRecallBackground } from './recallbg';

// Function to create the main window
function createMainWindow(): BrowserWindow {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'), // Ensure preload script is used for better security
      nodeIntegration: false, // Recommended to keep this false for security
      contextIsolation: true, // Enable context isolation for better security
    }
  });

  // Load the HTML file for the main window (use path.join for cross-platform compatibility)
  mainWindow.loadFile(path.join(__dirname, 'index.html'));

  mainWindow.on('closed', () => {
    app.quit(); // Quit the app when the main window is closed
  });

  return mainWindow;
}

// Function to initialize the app with the appropriate mode based on command-line arguments
function initializeApp() {
  const mode = process.argv[2];  // Mode is passed as a command-line argument
  const type = process.argv[3];  // Type is passed as a command-line argument

  // Use a switch case for better readability when handling different modes
  switch (mode) {
    case 'copilot':
      startCopilotMode();
      break;
    case 'cocreator':
      startCoCreatorMode();
      break;
    case 'designer':
      startDesignerMode();
      break;
    case 'recall':
      if (type === 'background') {
        initRecallBackground(); // Starts recall in background mode
      } else if (type === 'gui') {
        startRecallUI(); // Starts recall in UI mode
      } else {
        console.error('Invalid --type argument for recall. Must be "gui" or "background".');
      }
      break;
    default:
      console.log('No valid mode specified. Launching default landing page.');
  }
}

// Handle the application life cycle
app.whenReady().then(() => {
  try {
    // Create the main window
    const mainWindow = createMainWindow();

    // Initialize the app with the specified mode
    initializeApp();

    // For macOS, the app stays open after the window is closed
    app.on('window-all-closed', () => {
      if (process.platform !== 'darwin') {
        app.quit(); // Quit the app if not macOS
      }
    });

  } catch (error) {
    console.error('Error during app initialization:', error);
    app.quit(); // Quit the app if an error occurs
  }
});

// Ensure app quits on all windows closed (even on macOS)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
