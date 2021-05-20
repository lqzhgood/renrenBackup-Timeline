const fs = require('fs-extra');
const path = require('path');
const cliProgress = require('cli-progress');

const { MAKE_TIME, getTimeLine, contrastExcludeMs } = require('./utils.js');
const { OUT_DIR_TIME_LINE, LIMIT } = require('./config.js');

const BAR = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);

const list = MAKE_TIME();

const dirs = list.map(t => {
    return {
        ...t,
        p: path.join(OUT_DIR_TIME_LINE, `${t.y}/${t.m}/`),
    };
});
const arr = [];

// 读取所有文件
dirs.forEach(d => {
    const { y, m, p } = d;
    const files = fs
        .readdirSync(p)
        .sort((a, b) => {
            const { name: na } = path.parse(a);
            const { name: nb } = path.parse(b);
            return na - nb;
        })
        .map(f => ({
            f: path.join(p, f),
            begin: path.basename(f, '.html'),
        }))
        .forEach(({ f, begin }, i, fileArr) => {
            const data = fs.readFileSync(f, 'utf-8').trim();
            if (!data) {
                // if (i != fileArr.length - 1 && i != fileArr.length - 2) console.log(y, m, begin, '|', data);
                arr.push({
                    y,
                    m,
                    begin,
                });
            }
        });
});

(async () => {
    BAR.start(arr.length, 0);
    for (let i = 0; i < arr.length; i++) {
        const t = arr[i];
        await down(t.begin, t.y, t.m);
        BAR.increment();
    }
    console.log('\n ok', arr.length);
})();

async function down(begin, y, m) {
    const data = await getTimeLine(begin, y, m);
    const dir = path.join(OUT_DIR_TIME_LINE, `${y}/${m}/`);
    const file = path.join(dir, `${begin}.html`);
    fs.mkdirpSync(dir);
    // 检查老文件和新文件是否一样
    if (fs.existsSync(file)) {
        const oData = fs.readFileSync(file, 'utf-8').trim();
        if (oData && data && !contrastExcludeMs(oData, data)) {
            console.log('线上线下内容不同', file);
            fs.copyFileSync(file, file + '_old');
        }
    }
    fs.writeFileSync(file, data);
    // console.log(y, m, begin, data.slice(0, 40));
    return data;
}
