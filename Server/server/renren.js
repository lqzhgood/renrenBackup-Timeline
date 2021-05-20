const fs = require('fs-extra');
const path = require('path');
const _ = require('lodash');
const { getTimeLine, getComment } = require('../../Crawler/utils.js');
const { DIR_CACHE_IN_PAGE, DIR_EMPTY_PROXY } = require('../config.js');
const { OUT_DIR_TIME_LINE, OUT_DIR_COMMENTS, OUT_DIR_MERGER, COMMENT, ID } = require('../../Crawler/config.js');
const { FIX_COMMENT } = require('../../Crawler/utils-common.js');

const EMPTY_PROXY = [];
const CACHE_IN_PAGE = [];

// http://www.renren.com/timelinefeedretrieve.do -> http://127.0.0.1:3000/timelinefeedretrieve.do
exports.timeLine = async function (req, res) {
    //  http://www.renren.com/timelinefeedretrieve.do?ownerid=id&render=0&begin=0&limit=30&year=2012&month=11&isAdmin=false
    const { begin, year, month } = req.query;

    const file = path.join(OUT_DIR_TIME_LINE, `/${year}/${month}/${begin}.html`);
    if (!fs.existsSync(file)) {
        const d = await getProxy(begin, year, month);
        res.send(d);
        return;
    }

    const data = fs.readFileSync(file, 'utf-8');
    if (!data) {
        const d = await getProxy(begin, year, month);
        res.send(d);
        return;
    }

    CACHE_IN_PAGE.push({ year, month, begin });
    fs.writeFileSync(DIR_CACHE_IN_PAGE, JSON.stringify(CACHE_IN_PAGE, null, 4));
    res.send(data);
};

exports.timelineMerger = function (req, res) {
    const { begin, year, month } = req.query;
    const file = path.join(OUT_DIR_MERGER, `/${year}/${month}/${begin}.html`);
    if (!fs.existsSync(file)) {
        console.warn('没有找到文件', file);
        throw new Error('没有找到文件');
    }
    const data = fs.readFileSync(file, 'utf-8');
    if (!data) {
        console.warn('空白文件', file);
        throw new Error('空白文件');
    }
    res.send(data);
};

async function getProxy(begin, year, month) {
    const data = await getTimeLine(begin, year, month);
    if (data) {
        const file = path.join(OUT_DIR_TIME_LINE, `/${year}/${month}/${begin}.html`);
        fs.writeFileSync(file, data);
        console.warn(`${file} 写入了新文件`);
    } else {
        console.warn(`${year}/${month}/${begin} 无文件,proxy为空`);
        EMPTY_PROXY.push({ year, month, begin });
        fs.writeFileSync(DIR_EMPTY_PROXY, JSON.stringify(EMPTY_PROXY, null, 4));
    }

    return data;
}

// 源码 参见 public/profile-v7.js/Crawler/utils-common.js
//  http://status.renren.com/feedcommentretrieve.do
exports.comment = async function (req, res) {
    const { doingId, owner, source, t, requestToken, _rtk } = req.body;
    // doingId == source
    // owner == config.ID.

    if (requestToken !== COMMENT.requestToken && _rtk !== COMMENT._rtk) {
        console.error('comment 代理的人与配置不符');
        res.send('comment 代理的人与配置不符');
        return;
    }

    // 如果有本地就直接拿本地
    const file = path.join(OUT_DIR_COMMENTS, `${doingId}_${t}.json`);
    const oData = fs.readJsonSync(file, { throws: false });
    if (oData) {
        oData.forEach(v => FIX_COMMENT(v));
        res.send(oData);
        return;
    }

    console.log('找到了没有的评论', doingId, t);

    // 本地没有就反代, 并写入文件 不管返回是否为空
    // 空的再用 Crawler 去重试
    // 防止 getComment 一直卡住  先置为空 好让 Crawler 抓到
    if (!fs.existsSync(file)) fs.writeFileSync(file, '');
    const data = await getComment(doingId, t);
    if (!data) console.warn(`评论为空 ${doingId} ${t}`);
    if (data) fs.writeFileSync(file, JSON.stringify(data, null, 4));
    res.send(data);
    return;
};
