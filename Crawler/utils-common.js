/* eslint-disable no-extra-parens */
/* eslint-disable no-unused-expressions */

const { ID, FIX_REPLYER_TINYURL } = require('./config.js');
// 全局函数
const XN = {
    page: {},
    user: {
        id: ID,
        name: '%E5%AD%94%E4%BB%A4%E7%91%9C%E2%9D%A4F%21sh',
    },
};

/**
 * @name:  commit api --> html
 * @description:  http://s.xnimg.cn/a90984/apps/profile2/combine/profile-v7.js
 * @param {*} e  这个只用到了
 *              e = {
 *                      这个和 HTML 中获得的 JSON 一致
 *                      params:{
 *                          type:'',
 *                          oid:'',
 *                          replyType:  //在html json 中没有查到,  感觉是新 api 标识符 只用在了一个地方 'newrestapi' == e.params.replyType , 可能不是必有的
 *                      }
 *                      fid:'' 从本条消息的  [data-fid] 中获取
 *                  }
 * @param {*} t ajax commit 中每一条
 * @return {*}
 */

function FIX_COMMENT(t) {
    // 头像 l
    const l = t.replyerHead || t.replyer_tinyurl || t.headUrl || t.authorHeadUrl;
    if (!l) {
        const find = FIX_REPLYER_TINYURL.find(v => v.ownerId == t.ownerId);
        if (find) {
            t.replyer_tinyurl = find.replyer_tinyurl;
        } else {
            console.log('t', t);
            throw new Error('无头像,未设置默认头像');
        }
    }
}

function packOneReplyHtml(e, t) {
    FIX_COMMENT(t);
    // console.log('packOneReplyHtml e', e);
    // console.log('packOneReplyHtml t', t);
    // console.log('e.params.replyType', e.params.replyType);
    var i = !1,
        n = typeof t.id != 'undefined' ? t.id : t.comment.id,
        o = t.vip_icon_url || t.vipIconUrl,
        a = o
            ? ' <a target="_blank" href="http://i.renren.com/icon"><img src="' +
              o +
              '" alt="vip" style="margin:2px 0;height: auto;" /></a> '
            : '',
        r = t.replyerId || t.ubid || t.author || t.authorId,
        s = t.replyerName || t.ubname || t.name || t.authorName,
        l = t.replyerHead || t.replyer_tinyurl || t.headUrl || t.authorHeadUrl,
        d = t.replyContent || t.src_content || t.body || t.content,
        c = t.replyTime || t.time || t.time,
        u = void 0 == t.wikiWords ? '' : ' data-wiki="' + t.wikiWords + '"',
        p = t.commentId,
        h = t.resourceId || t.entryId,
        m = t.resourceUserId,
        f = t.ownerId || t.entryOwnerId,
        g = t.isLiked,
        v = t.likeCount;
    if (t.comment) {
        var r = t.comment.authorId,
            s = t.comment.authorName,
            l = t.comment.authorHeadUrl,
            d = t.comment.content,
            c = t.comment.time,
            p = t.comment.commentId,
            h = t.comment.entryId,
            m = t.comment.resourceUserId,
            f = t.comment.entryOwnerId,
            o = t.comment.vipIconUrl,
            a = o
                ? ' <a target="_blank" href="http://i.renren.com/icon"><img src="' +
                  o +
                  '" alt="vip" style="margin:2px 0;height: auto;" /></a> '
                : '';
        t.comment.like &&
            ((g = t.comment.like.isLiked || t.comment.like.liked),
            (v = t.comment.like.likeCount || t.comment.like.count));
    }
    t.like && ((g = t.like.isLiked || t.like.liked), (v = t.like.likeCount || t.like.count));
    let y, w;
    t.comment;
    g == 0 || void 0 == g ? ((y = !1), (w = '赞')) : ((y = !0), (w = '')),
        (v == 0 || void 0 == v) && (v = ''),
        e.params.type == 'page' && typeof XN.page.data != 'undefined' && XN.page.data.isAdmin && (i = !0);
    let b =
            (typeof XN.page.data == 'undefined' && r != XN.user.id) ||
            (typeof XN.page.data != 'undefined' && !XN.page.data.isAdmin && r != XN.user.id) ||
            (typeof XN.page.data != 'undefined' && XN.page.data.isAdmin && r != XN.page.data.id),
        _ = r == XN.user.id || (e.params.oid == XN.user.id && e.params.type != 'share_edm') || i,
        k = b
            ? '<a data-fid="' +
              e.fid +
              '" data-uid="' +
              r +
              '" data-uname="' +
              s +
              '" data-rid="' +
              n +
              '" href="#nogo" onclick="return false;" class="reply">回复</a>'
            : '',
        N = _
            ? ' <a data-fid="' +
              e.fid +
              '" data-uid="' +
              r +
              '" data-uname="' +
              s +
              '" data-rid="' +
              n +
              '" href="#nogo" onclick="return false;" class="delet">删除</a>'
            : '';
    if (
        e.params.type == 'status' ||
        e.params.type == 'share' ||
        e.params.type == 'blog' ||
        e.params.type == 'album' ||
        e.params.type == 'photo'
    ) {
        let E =
                '<a class="ilike_comment" href="#nogo" comment-data="{\'stype\':\'' +
                e.params.type +
                "','cid':'" +
                p +
                "','rid':" +
                h +
                ",'uid':" +
                XN.user.id +
                ", 'oid':" +
                f +
                ", 'roid':" +
                m +
                ",'name':'" +
                encodeURIComponent(XN.user.name) +
                "',",
            x = " 'liked': " + y + '}" style="margin-left: 10px;">' + v + w + '</a>';
        switch (e.params.type) {
            case 'status':
                var I = "'url':'http://status.renren.com/getdoing.do?id=" + m + '&doingId=' + h + "',";
                break;
            case 'share':
                var I = "'url':'http://share.renren.com/share/" + m + '/' + h + "',";
                break;
            case 'blog':
                var I = "'url':'http://blog.renren.com/blog/" + m + '/' + h + "',";
                break;
            case 'photo':
                var I = "'url':'http://photo.renren.com/photo/" + m + '/photo-' + h + "',";
                break;
            case 'album':
                var I = "'url':'http://photo.renren.com/photo/" + m + '/album-' + h + "',";
        }
        var S = E + I + x;
    }
    if ((void 0 == g && (S = ''), e.params.replyType == 'newrestapi')) {
        let C = t.authorHeadUrl || t.comment.authorHeadUrl;
        l = C;
    }
    if ((l.indexOf('http://') == -1 && (l = 'http://hdn.xnimg.cn/photos/' + l), void 0 != t.vocal_url)) {
        let T = /^回复.+[:：](?!\/)/,
            L = /^回复.+[:：](?!\/)/.test(t.replyContent) ? t.replyContent.match(T)[0] : '',
            X =
                L +
                '<a class="vocal-player  vocal-player-tiny " data-vocal="{\'url\':\'' +
                t.vocal_url +
                "', 'time':" +
                t.vocal_length +
                ", 'ownerId':" +
                t.ownerId +
                ", 'voiceId':" +
                t.id +
                ", 'sourceOwner':" +
                t.sourceOwner +
                ", 'sourceId':" +
                t.sourceId +
                ", 'ugcType':" +
                t.ugcType +
                '}" href="javascript:;"><span class="btn"></span><span class="time"><span class="num">' +
                t.vocal_length +
                '</span>秒</span></a>';
        d = X;
        var S = '';
    }
    if (v > 0)
        if (k != '') var D = 'class="a-reply  showlike replylike bigemotion"';
        else var D = 'class="a-reply showlike bigemotion"';
    else var D = 'class="a-reply bigemotion"';
    let M =
        '<div ' +
        D +
        u +
        '><a namecard="' +
        r +
        '" href="http://www.renren.com/' +
        r +
        '/profile" target="_blank"  class="avatar"><img width="50" src="' +
        l +
        '" /></a><div class="reply-content"><p class="text"><a target="_blank" namecard="' +
        r +
        '" href="http://www.renren.com/' +
        r +
        '/profile" class="name">' +
        s +
        '</a>' +
        a +
        ': ' +
        d +
        '</p><div class="bottom-bar"><span class="time">' +
        c +
        '</span><div class="action">' +
        S +
        k +
        N +
        '</div></div></div></div>';
    // console.log(M);
    // debugger;
    return M;
}

module.exports = {
    packOneReplyHtml,
    FIX_COMMENT,
};
