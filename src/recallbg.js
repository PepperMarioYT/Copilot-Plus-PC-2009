"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initRecallBackground = initRecallBackground;
const electron_1 = require("electron");
const screenshot_desktop_1 = __importDefault(require("screenshot-desktop"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
const os_1 = __importDefault(require("os"));
const child_process_1 = require("child_process");
// Define the directory for storing screenshots
const getRecallDirectory = () => {
    const userDataPath = path_1.default.join(os_1.default.homedir(), 'AppData', 'Local', 'CopilotPC2009', 'Recall');
    fs_extra_1.default.ensureDirSync(userDataPath); // Ensure the directory exists
    return userDataPath;
};
let screenshotInterval = null;
// Function to take a screenshot
function takeScreenshot() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const recallDir = getRecallDirectory();
            const timestamp = new Date().toISOString().replace(/[:.]/g, '-'); // Safe filename
            const screenshotPath = path_1.default.join(recallDir, `screenshot-${timestamp}.png`);
            // Capture the screenshot and save it
            const img = yield (0, screenshot_desktop_1.default)({ format: 'png' });
            yield fs_extra_1.default.writeFile(screenshotPath, img);
            console.log(`Screenshot saved at: ${screenshotPath}`);
            return screenshotPath; // Return path for confirmation
        }
        catch (error) {
            console.error("Error taking screenshot:", error);
            throw error;
        }
    });
}
// Start or stop the screenshot capture
function toggleScreenshotCapture(enabled) {
    if (enabled && !screenshotInterval) {
        // Start taking screenshots every 5 seconds
        screenshotInterval = setInterval(takeScreenshot, 60000); // Every 5 seconds
        console.log("Screenshot capture enabled");
    }
    else if (!enabled && screenshotInterval) {
        // Stop the screenshot capture
        clearInterval(screenshotInterval);
        screenshotInterval = null;
        console.log("Screenshot capture disabled");
    }
}
// Function to launch Copilot+ PC 2009 with Recall mode enabled
function launchWithRecall() {
    const appPath = path_1.default.join('C:', 'Program Files', 'Copilot+ PC 2009', 'launcher.exe'); // Correct program directory
    const args = '--mode=recall --type=background';
    (0, child_process_1.exec)(`"${appPath}" ${args}`, (error, stdout, stderr) => {
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
function initRecallBackground() {
    console.log("Initializing Recall background...");
    // IPC Listener to toggle screenshot capture
    electron_1.ipcMain.handle('recall:toggle-screenshot', (event, enabled) => {
        toggleScreenshotCapture(enabled);
        if (enabled) {
            // Enable Recall, make Copilot+ start with Windows
            launchWithRecall();
        }
    });
}
