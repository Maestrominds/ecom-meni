import fs from 'fs';
let f = fs.readFileSync('c:/Users/acer/Documents/projects/meni/frontend/src/routes/+page.svelte', 'utf8');
f = f.replace(/<button class="btn btn-cart"> Add To Cart<\/button>\s*<\/div>\s*<\/div>/g, '<button class="btn btn-cart" onclick={(e) => { e.preventDefault(); e.stopPropagation(); }}> Add To Cart</button>\n          </div>\n        </a>');
fs.writeFileSync('c:/Users/acer/Documents/projects/meni/frontend/src/routes/+page.svelte', f);
