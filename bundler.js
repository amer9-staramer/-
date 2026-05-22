
const fs = require('fs');
const path = require('path');

function getFileData(filePath) {
  const fullPath = path.join(__dirname, 'src', filePath);
  if (!fs.existsSync(fullPath)) return null;
  const content = fs.readFileSync(fullPath, 'utf8');
  // Strip export statements and turn into simple JS objects
  return content
    .replace(/export /g, '')
    .replace(/import .* from .*/g, '')
    .replace(/interface .* \{[\s\S]*?\}/g, '')
    .replace(/type .* = .*/g, '');
}

const dataFiles = [
  'data/zikrs.ts',
  'data/hadiths.ts',
  'data/translations.ts',
  'data/namesOfAllah.ts',
  'data/hajj.ts',
  'data/hub.ts',
  'data/marriage.ts',
  'data/intimacy.ts',
  'data/patience.ts',
  'data/love.ts',
  'data/quran.ts',
  'data/youthGuidance.ts'
];

let bundledData = '';
dataFiles.forEach(file => {
  const data = getFileData(file);
  if (data) bundledData += `// --- FROM ${file} ---\n${data}\n\n`;
});

// Components (We'll just mock them for now or try to simplify them if they are too big)
// Actually we need the REAL App.tsx

const appContent = getFileData('App.tsx');
// Remove imports from App.tsx
const cleanedApp = appContent
  .replace(/import .* from .*/g, '')
  .replace(/export /g, '');

const htmlTemplate = `
<!DOCTYPE html>
<html lang="ku" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Islamic App</title>
    <script src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://unpkg.com/lucide@latest"></script>
    <script src="https://unpkg.com/framer-motion@10.16.4/dist/framer-motion.js"></script>
    <script src="https://unpkg.com/react-markdown@8.0.7/react-markdown.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/adhan@4.4.1/dist/Adhan.min.js"></script>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    <style>
        body { font-family: 'Plus Jakarta Sans', sans-serif; }
        .quran-font { font-family: 'Amiri', serif; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #10b981; border-radius: 10px; }
        .dark { background-color: #020617; color: #f8fafc; }
    </style>
    <script>
        tailwind.config = {
            darkMode: 'class',
            theme: {
                extend: {
                    colors: {
                        brand: {
                            emerald: '#10b981',
                            gold: '#fbbf24',
                            cream: '#f8fafc'
                        }
                    }
                }
            }
        }
    </script>
</head>
<body>
    <div id="root"></div>

    <script type="text/babel">
        const { useState, useEffect, useMemo, useCallback } = React;
        const { motion, AnimatePresence } = FramerMotion;
        
        // Mock Lucide icons
        const icons = {
            Sun: (props) => <i data-lucide="sun" {...props}></i>,
            Moon: (props) => <i data-lucide="moon" {...props}></i>,
            // ... add all needed icons or use a proxy
        };

        // Data injection
        ${bundledData}

        // App logic
        ${cleanedApp}

        const container = document.getElementById('root');
        const root = ReactDOM.createRoot(container);
        root.render(<App />);
        
        // Initialize lucide
        setTimeout(() => lucide.createIcons(), 100);
    </script>
</body>
</html>
`;

fs.writeFileSync('complete_app.html', htmlTemplate);
console.log('File complete_app.html generated.');
