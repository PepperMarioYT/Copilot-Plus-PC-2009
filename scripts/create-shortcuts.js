const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

// Path to the installed app executable
const appPath = path.join(process.env.ProgramFiles, 'Copilot+ PC 2009', 'Launcher.exe');

// Paths to the Desktop and Start Menu
const desktopPath = path.join(process.env.HOME, 'Desktop', 'Designer.lnk');
const startMenuPath = path.join(process.env.APPDATA, 'Microsoft\\Windows\\Start Menu\\Programs', 'Copilot+ PC 2009\\Designer.lnk');

// Create a shortcut for Designer Mode
exec(`mkshortcut.exe "${desktopPath}" "${appPath}" --designer`, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error creating shortcut: ${stderr}`);
  } else {
    console.log('Shortcut created on Desktop');
  }
});

// Create a Start Menu shortcut
exec(`mkshortcut.exe "${startMenuPath}" "${appPath}" --start-menu`, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error creating Start Menu shortcut: ${stderr}`);
  } else {
    console.log('Shortcut created in Start Menu');
  }
});
