import { readdir, readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import stylus from 'stylus';

const getFileName = (str) => str.split('.')[0];

const __dirname = dirname(fileURLToPath(import.meta.url));
const getFilePath = (dir = '') => join(__dirname, `../assets/${dir}`);

readdir(getFilePath(), (err, files) => {
    if (err) {
        console.log('readdir:::', err);
        return;
    }
    console.log(111,files);
    files.forEach(async (dir) => {
        const styl = readFileSync(getFilePath(dir), 'utf-8');
        const name = getFileName(dir);
        // stylus ==> css
        stylus(styl, { filename: `${name}.css` }).render((err, css) => {
            if (err) throw err;
            writeFileSync(getFilePath(`${name}.css`), css);
        });
    });
});

