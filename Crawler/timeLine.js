const fs = require('fs-extra');
const path = require('path');
const cliProgress = require('cli-progress');

const { LIMIT, OUT_DIR_TIME_LINE } = require('./config.js');
const { MAKE_TIME, contrastExcludeMs, getTimeLine } = require('./utils.js');
const BAR = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);

(async () => {
    const list = MAKE_TIME();
    // const list = [
    //     {
    //         y: 2013,
    //         m: 3,
    //     },
    // ];
    BAR.start(list.length, 0);
    for (let i = 0; i < list.length; i++) {
        const t = list[i];
        let step = 0;
        let empty = 0;
        while (true) {
            const data = await getTimeLine(step * LIMIT, t.y, t.m);
            const dir = path.join(OUT_DIR_TIME_LINE, `${t.y}/${t.m}/`);
            const file = path.join(dir, `${step * LIMIT}.html`);
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
            // console.log(t.y, t.m, step, step * LIMIT, data.slice(0, 40));
            if (data) {
                empty = 0;
                step++;
            } else {
                // 最后几次都为空则认定后续内容没有了
                empty++;
                if (empty >= 3) {
                    break;
                } else {
                    step++;
                }
            }
        }
        BAR.increment();
    }
    console.log('\n ok');
})();
