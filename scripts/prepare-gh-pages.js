const fs = require('node:fs');
const path = require('node:path');

const outputDir = path.resolve(__dirname, '..', 'dist');
const indexFile = path.join(outputDir, 'index.html');

if (!fs.existsSync(indexFile)) {
  throw new Error('Expo web export did not create dist/index.html');
}

// GitHub Pages does not provide SPA route rewrites. A matching 404 page lets
// Expo Router boot on direct visits to nested routes such as /quiz.
fs.copyFileSync(indexFile, path.join(outputDir, '404.html'));
fs.writeFileSync(path.join(outputDir, '.nojekyll'), '');
console.log('GitHub Pages files prepared in dist/.');
