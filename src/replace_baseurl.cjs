const fs = require('fs');
const path = require('path');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        file = path.resolve(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(walk(file));
        } else {
            results.push(file);
        }
    });
    return results;
}

const files = walk('./frontend/src').filter(f => f.endsWith('.ts') || f.endsWith('.svelte'));
let changed = 0;
files.forEach(f => {
    let content = fs.readFileSync(f, 'utf8');
    const orig = content;
    // Replace env.PUBLIC_API_URL || '...' with '/api'
    content = content.replace(/env\.PUBLIC_API_URL\s*\|\|\s*'http:\/\/localhost:3000\/api'/g, "'/api'");
    
    if (orig !== content) {
        fs.writeFileSync(f, content, 'utf8');
        changed++;
        console.log('Updated', f);
    }
});
console.log('Total files changed:', changed);
