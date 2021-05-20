const { getComment } = require('./utils.js');
const fs = require('fs-extra');
const path = require('path');
const _ = require('lodash');
const cliProgress = require('cli-progress');

const { OUT_DIR_COMMENTS, OUT_DIR_TIME_LINE } = require('./config.js');
const { MAKE_TIME, getCommentJsonByFile } = require('./utils.js');

const BAR = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);

(async () => {
    // 从 html 里面找到 commit id 并生成 commit 空文件
    const tList = MAKE_TIME();
    for (let i = 0; i < tList.length; i++) {
        const t = tList[i];
        const dir = path.join(OUT_DIR_TIME_LINE, `${t.y}/${t.m}/`);
        const files = fs.readdirSync(dir);
        files
            .map(f => getCommentJsonByFile(path.join(dir, f)))
            .flat()
            .forEach(o => {
                const { cid: doingId, typeNum } = o;
                const file = path.join(OUT_DIR_COMMENTS, `${doingId}_${typeNum}.json`);
                if (!fs.existsSync(file)) fs.writeFileSync(file, '');
            });
    }

    // 根据 commit 文件 ajax获取内容填充 json
    const list = fs.readdirSync(OUT_DIR_COMMENTS).map(f => {
        // `${doingId}_${t}.json`
        const [doingId, t] = path.basename(f, '.json').split('_');
        return { doingId, t };
    });

    // 1 by 1
    // for (let i = 0; i < list.length; i++) {
    //     const { doingId, t } = list[i];
    //     await makeComment(doingId, t);
    //     // console.log(`${i + 1} / ${list.length}`);
    // }

    const total = list.length;
    BAR.start(total, 0);

    // 每次 n 个并行
    while (list.length > 0) {
        const part = list.splice(0, 10);
        await Promise.all(part.map(l => makeComment(l.doingId, l.t)));
        BAR.update(total - list.length);
    }
    console.log('ok');
})();

async function makeComment(doingId, t) {
    const file = path.join(OUT_DIR_COMMENTS, `${doingId}_${t}.json`);
    let oData = fs.readJsonSync(file, { throws: false });

    // if (Array.isArray(_.get(oData, 'replyList')) && _.get(oData, 'replyList').length > 0) {
    //     // 本地文件有内容 跳过
    //     return;
    // }

    const data = await getComment(doingId, t);

    if (oData && _.isObject(oData) && _.isObject(data) && !_.isEqual(oData.replyList, data.replyList)) {
        console.log('线上线下不一致', file);
        console.log('oData', oData);
        console.log('data', data);
        fs.copyFileSync(file, file + '.old');
    }

    if (data) {
        // if (data.replyList.length == 0) console.warn(`评论列表为空 ${file}`);
        fs.writeFileSync(file, JSON.stringify(data, null, 4));
    } else {
        console.warn(`无法获取评论, ${file}`);
    }
}
