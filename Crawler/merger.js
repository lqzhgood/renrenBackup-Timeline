const fs = require('fs-extra');
const path = require('path');
const _ = require('lodash');
const cheerio = require('cheerio');
const cliProgress = require('cli-progress');

const BAR = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);

// const { getComment } = require('./utils.js');

// const cheerio = require('cheerio');

// (async () => {
//     // const data = await getComment(1094986745, 2);
//     // console.log('data', data);
// })();

// getCommentJSON('./0.html');

// setTimeout(() => {}, 100000);

const { packOneReplyHtml } = require('./utils-common.js');
const { OUT_DIR_COMMENTS, OUT_DIR_TIME_LINE, OUT_DIR_MERGER } = require('./config.js');
const { MAKE_TIME } = require('./utils.js');

const tList = MAKE_TIME();
BAR.start(tList.length, 0);
const COMMENT_LIST = [];

for (let i = 0; i < tList.length; i++) {
    const t = tList[i];
    const dir = path.join(OUT_DIR_TIME_LINE, `${t.y}/${t.m}/`);
    const files = fs.readdirSync(dir);
    files.forEach(f => {
        try {
            const html = getMergerTimeLineByHtml(path.join(dir, f));

            const oDir = path.join(OUT_DIR_MERGER, `${t.y}/${t.m}/`);
            fs.mkdirpSync(oDir);

            fs.writeFileSync(path.join(oDir, f), html);
        } catch (error) {
            console.log('error', error);
            console.log(path.join(dir, f));
            throw new Error();
        }
    });
    BAR.increment();
}

console.log(
    '\n本地评论数量与读取过的评论数量应该一致',
    fs.readdirSync(OUT_DIR_COMMENTS).length,
    _.uniq(COMMENT_LIST).length,
);
console.log('ok');

function getMergerTimeLineByHtml(f) {
    const html = fs.readFileSync(f, 'utf-8');
    const $ = cheerio.load(html);
    const $section = $('section');

    Array.from($section).forEach((s, i) => {
        // console.log('i', i, $(s).attr('id'));
        const $s = $(s);
        const $comWrap = $s.find('.feed-replies');
        // 新加好友等情况没有评论
        if ($comWrap.length == 0) return;
        // console.log('$comWrap.attr', $comWrap.attr('id'));

        // 获取并校验 fid
        const fid = $comWrap.attr('id').replace(/^feedbody-{0,1}/, '');
        if (!fid || !/^\d+$/g.test(fid)) {
            console.warn(`fid 校验错误 |${$comWrap.attr('id')}|`);
            console.log(fid);
            console.log(f);
            throw new Error('fid');
        }
        // 获取并校验 json
        const $jsonText = $s.find(`div[id^=reply-params-]`).text();
        let json;
        try {
            json = JSON.parse($jsonText);
        } catch (error) {
            console.warn('无法解码 json', i, f);
            console.log($jsonText);
            throw new Error('html json 解码错误');
        }

        const e = {
            params: json,
            fid,
        };
        const { cid: doingId, typeNum } = json;
        const ts = fs.readJsonSync(path.join(OUT_DIR_COMMENTS, `${doingId}_${typeNum}.json`));

        // // 通过 html 拿全部评论数量进行对比. html中不准确, 所以无法检测
        // const repliedText = $s.find('.legend .replied').text().trim();
        // if (!repliedText.includes('回复')) {
        //     console.log(`|${repliedText}|`);
        //     console.warn('回复统计字符异常', i, f);
        //     throw new Error();
        // }
        // const repliedTotal = repliedText.match(/\d+/) ? repliedText.match(/\d+/).toString() : 0;
        // if (repliedTotal > 0 && ts.replyList.length != repliedTotal) {
        //     console.warn('评论数量不符 s=', i, ts.replyList.length, repliedTotal);
        //     console.warn(f, `${doingId}_${typeNum}.json`);
        //     throw new Error();
        // }

        const comHTML = ts.replyList.map(t => packOneReplyHtml(e, t)).join('');
        COMMENT_LIST.push(`${doingId}_${typeNum}.json`);
        $comWrap.html(comHTML);
    });
    fixHtml($);
    return $('body').html();
}

function fixHtml($) {
    // 修复头像不显示
    Array.from($('[src]')).forEach(n => {
        const src = n.attribs.src;
        if (src.startsWith('http://head.xiaonei.com/photos/http://')) {
            n.attribs.src = src.replace('http://head.xiaonei.com/photos/http://', 'http://');
        }
        if (src.startsWith('http://img.xiaonei.com/photos/http://')) {
            n.attribs.src = src.replace('http://img.xiaonei.com/photos/http://', 'http://');
        }

        if (src.startsWith('http://musicparkbbs.renren.com/')) {
            const q = new URL(src);
            const origURL = q.searchParams.get('origURL');
            if (!origURL) throw new Error('http://musicparkbbs.renren.com/ 无原始链接');
            n.attribs.src = decodeURIComponent(origURL);
        }

        if (
            ['http://www.sinaimg.cn/ty/http/video.sina.com.cn', 'http://bdtj.tagtic.cn'].find(u =>
                n.attribs.src.startsWith(u),
            )
        ) {
            return;
        }

        if (n.attribs.src.match(/http+/gi) && n.attribs.src.match(/http+/gi).length > 1) {
            console.warn('可能存在 404 的代理连接', n.attribs.src);
            // throw new Error();
        }
    });
}

module.exports = {
    getMergerTimeLineByHtml,
};
