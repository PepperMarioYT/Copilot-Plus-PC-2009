    import fs from 'fs';
    import path from 'path';
    import os from 'os';

    export function getScreenshotGallery() {
    const recallDir = path.join(os.homedir(), 'AppData', 'Local', 'CopilotPC2009', 'Recall');

    // Check if the directory exists
    if (!fs.existsSync(recallDir)) {
        console.error('Recall directory does not exist!');
        return [];
    }
    
    const files = fs.readdirSync(recallDir);
    const screenshotFiles = files
        .filter(file => file.endsWith('.png')) // Only get PNG files
        .map(file => path.join(recallDir, file)); // Return full path

    return screenshotFiles;
    }
