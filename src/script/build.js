import { readdir, readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import {dirname, join} from 'path';
import { minify } from 'minify';
import stylus from 'stylus';

const Capitalise = ([first, ...other]) => first.toUpperCase() + other.join('');

const __dirname = dirname(fileURLToPath(import.meta.url));
const getFilePath = (dir = '') => join(__dirname, `../components/${dir}`);

readdir(getFilePath(), (err, files) => {
    if (err) {
        console.log('readdir:::', err);
        return;
    }
    const fileNameList = files.filter(dir => !dir.includes('.'));
    fileNameList.forEach(async (dir) => {
        let css = '';
        let styl = readFileSync(getFilePath(`${dir}/style.styl`), 'utf-8');
        // stylus ==> css
        stylus(styl, { filename: `${dir}.css` }).render((err, cssStr) => {
            if (err) throw err;
            css = cssStr;
        })
        css = minify.css(css);
        let html = readFileSync(getFilePath(`${dir}/index.html`), 'utf-8');
        html = await minify.html(html);
        const js = readFileSync(getFilePath(`${dir}/${dir}.js`), 'utf-8');
        let fileBuilder = js.replace('<!--<style></style>-->', `<style>${css}</style>`)
            .replace('<!--<html></html>-->', html);
        fileBuilder = await minify.js(fileBuilder);
        writeFileSync(getFilePath(`${dir}/index.js`), fileBuilder);
    });
    const exportBuilder = fileNameList.map(dir => `export { default as DC${Capitalise(dir)} } from './${dir}/index.js';\n`).join('');
    writeFileSync(getFilePath(`index.js`), exportBuilder);
});

