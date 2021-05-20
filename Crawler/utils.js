const fs = require('fs-extra');
const path = require('path');
const _ = require('lodash');
const qs = require('qs');
const cheerio = require('cheerio');
const axiosBase = require('axios');
const { ID, COOKIE, LIMIT, COMMENT } = require('./config.js');

const { YEAR_RANGE } = require('./config.js');

function MAKE_TIME() {
    return Array.from(new Array(YEAR_RANGE[1] + 1).keys())
        .slice(YEAR_RANGE[0])
        .reduce((pre, y) => {
            return pre.concat([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(m => ({ y, m })));
        }, []);
}

function READ_TIME_TOTAL(f) {
    const html = fs.readFileSync(f, 'utf-8');
    const $ = cheerio.load(html);
    const total = $('input')[0] ? $('input')[0].attribs.value : 0;
    return total;
}

function READ_HTML_LENGTH(f) {
    const html = fs.readFileSync(f, 'utf-8');
    // const $ = cheerio.load(html);
    // const length = $('section').length;
    const arr = html.match(/<section /gm) || [];
    return arr.length;
}

/**
 * @name: contrastExcludeMs
 * @description: 对比下载的页面和本地的页面区别，排除url中为了防缓存所导致的时间戳影响文件对比 时间戳有 ms 和 s 两种
 * @param {*} a
 * @param {*} b
 * @return {*}
 */
function contrastExcludeMs(a, b) {
    const reg = new RegExp(/16(\d{11}|\d{8})/gm);
    const at = a.replace(reg, '');
    const bt = b.replace(reg, '');
    return at === bt;
}

const axiosTimeLine = axiosBase.create({
    headers: {
        'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/82.0.4075.0 Safari/537.36',
        'cookie': COOKIE,
        'accept':
            'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
        'accept-language': 'zh-CN,zh;q=0.9',
        'cache-control': 'no-cache',
        'pragma': 'no-cache',
        'upgrade-insecure-requests': '1',
    },
});

function getTimeLine(begin = 0, year, month) {
    const url = `http://www.renren.com/timelinefeedretrieve.do?ownerid=${ID}&render=0&begin=${begin}&limit=${LIMIT}&year=${year}&month=${month}&isAdmin=false`;
    // console.log('url', url);
    return axiosTimeLine.get(url).then(({ data }) => {
        return data ? data.trim() : '';
    });
}

const axiosComment = axiosBase.create({
    headers: {
        'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/82.0.4075.0 Safari/537.36',
        'cookie': COOKIE,
        'accept': '*/*',
        'accept-language': 'zh-CN,zh;q=0.9',
        'cache-control': 'no-cache',
        'content-type': 'application/x-www-form-urlencoded',
        'pragma': 'no-cache',
        'x-requested-with': 'XMLHttpRequest',
        'Referer': 'http://status.renren.com/ajaxproxy.htm',
        'X-Requested-With': 'XMLHttpRequest',
        'referrer': 'http://status.renren.com/ajaxproxy.htm',
    },
    responseType: 'json',
});

// http://status.renren.com/feedcommentretrieve.do
function getComment(doingId, t) {
    const url = `http://status.renren.com/feedcommentretrieve.do`;
    return axiosComment
        .post(
            url,
            qs.stringify({
                doingId,
                owner: ID,
                source: doingId,
                t,
                requestToken: COMMENT.requestToken,
                _rtk: COMMENT._rtk,
            }),
        )
        .then(({ data }) => {
            if (!_.isObject(data)) console.warn('评论不是 object', `${doingId}_${t}`, data, data);
            if (data.code != 0) {
                console.warn('评论返回错误', `${doingId}_${t}`, data);
                return '';
            }
            return _.isObject(data) ? data : '';
        });
}

/**
 * @name:
 * @description: 从 html 中解析出 comment id[]
 * @param {*} f
 * @return {*}
 */
function getCommentJsonByFile(f) {
    const html = fs.readFileSync(f, 'utf-8');
    const $ = cheerio.load(html);
    const cs = $('section div[id^=reply-params-]');
    const json = Array.from(cs)
        .map(c => {
            const t = $(c).text();
            try {
                const obj = JSON.parse(t);
                return obj;
            } catch (error) {
                console.warn('无法解码 json', f);
                return undefined;
            }
        })
        .filter(v => v);
    return json;
}

module.exports = {
    MAKE_TIME,
    READ_TIME_TOTAL,
    READ_HTML_LENGTH,
    contrastExcludeMs,
    getTimeLine,
    getComment,
    getCommentJsonByFile,
};
