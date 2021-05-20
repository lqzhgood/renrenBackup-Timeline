const fs = require('fs-extra');
const path = require('path');
const axios = require('axios');
const { tmp404, target } = require(path.join(__dirname, './config.js'));

function is404file(f) {
    const txt = fs.readFileSync(f, 'utf-8');
    return txt.includes(tmp404);
}

function getFiles(p = target, res = []) {
    const files = fs.readdirSync(p);
    files.forEach(f => {
        const df = path.join(p, f);
        if (fs.statSync(df).isDirectory()) {
            getFiles(df, res);
        } else {
            if (is404file(df)) res.push(df);
        }
    });
    return res;
}
async function down(f) {
    const dir = path.relative(target, f).split(path.sep);
    dir[0] = dir[0].replace(/_/g, '.');
    const name = dir.slice(-1)[0];

    const url = 'http://' + dir.join('/');
    console.log(url);
    const writer = fs.createWriteStream(name);
    const response = await axios({
        url,
        method: 'GET',
        responseType: 'stream',
    });
    response.data.pipe(writer);
    return new Promise((resolve, reject) => {
        writer.on('finish', () => {
            resolve(name);
        });
        writer.on('error', reject);
    });
}

module.exports = {
    is404file,
    down,
    getFiles,
};
