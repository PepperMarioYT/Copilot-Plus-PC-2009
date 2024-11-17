import { app, BrowserWindow } from 'electron';
import path from 'path';
import { startCopilotMode } from './copilot';
import { startCoCreatorMode } from './cocreator';
import { startDesignerMode } from './designer';
import { startRecallUI } from './recallui';
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

  // Remove the menu bar
  mainWindow.setMenu(null);

  // Load the HTML file for the main window
  mainWindow.loadFile(path.join(__dirname, '..', 'public', '/index.html'));

  mainWindow.on('closed', () => {
    app.quit(); // Quit the app when the main window is closed
  });

  return mainWindow;
}

// Function to initialize the app based on command-line arguments
function initializeApp() {
  const mode = process.argv[2];  // Mode is passed as the second argument
  const type = process.argv[3]; // Type is passed as the third argument

  if (!mode) {
    // If no mode is specified, create the main window
    console.log('No arguments provided. Launching default window.');
    createMainWindow();
    return;
  }

  // Handle the specified mode
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
        initRecallBackground(); // Start recall in background mode
      } else if (type === 'gui') {
        startRecallUI(); // Start recall in GUI mode
      } else {
        console.error('Invalid --type argument for recall. Must be "gui" or "background".');
      }
      break;
    default:
      console.error(`Invalid mode: ${mode}`);
  }
}

// Handle the application life cycle
app.whenReady().then(() => {
  try {
    // Initialize the app based on command-line arguments
    initializeApp();

    // For macOS, keep the app open when all windows are closed
    app.on('window-all-closed', () => {
      if (process.platform !== 'darwin') {
        app.quit(); // Quit the app on other platforms
      }
    });

  } catch (error) {
    console.error('Error during app initialization:', error);
    app.quit(); // Quit the app if an error occurs
  }
});

// Ensure the app quits when all windows are closed
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
