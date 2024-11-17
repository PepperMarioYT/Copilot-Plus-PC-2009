"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getScreenshotGallery = getScreenshotGallery;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const os_1 = __importDefault(require("os"));
function getScreenshotGallery() {
    const recallDir = path_1.default.join(os_1.default.homedir(), 'AppData', 'Local', 'CopilotPC2009', 'Recall');
    // Check if the directory exists
    if (!fs_1.default.existsSync(recallDir)) {
        console.error('Recall directory does not exist!');
        return [];
    }
    const files = fs_1.default.readdirSync(recallDir);
    const screenshotFiles = files
        .filter(file => file.endsWith('.png')) // Only get PNG files
        .map(file => path_1.default.join(recallDir, file)); // Return full path
    return screenshotFiles;
}
