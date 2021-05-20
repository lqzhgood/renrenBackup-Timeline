console.log('ppppppppppp');

function getPrevSibling(e) {
    do e = e.previousSibling;
    while (e && 1 != e.nodeType);
    return e;
}
function getNextSibling(e) {
    do e = e.nextSibling;
    while (e && 1 != e.nodeType);
    return e;
}
function getFirstChild(e) {
    for (var t, i = 0, n = e.childNodes.length; n > i; i++)
        if (1 == e.childNodes[i].nodeType) {
            t = e.childNodes[i];
            break;
        }
    return t;
}
function prependTo(e, t) {
    var i = getFirstChild(t);
    i ? t.insertBefore(e, i) : t.appendChild(e);
}
function getParentFromClass(e, t) {
    for (var i = null; e.parentNode; )
        if (((e = e.parentNode), XN.element.hasClassName(e, t))) {
            i = e;
            break;
        }
    return i;
}
function deepClone(e) {
    for (var t = e.tagName.toLowerCase(), i = document.createElement(t), n = 0, o = e.attributes.length; o > n; n++)
        i.setAttribute(e.attributes[n].name, e.attributes[n].value);
    return (i.innerHTML = e.innerHTML), (i.style.display = 'none'), i;
}
function cloneObj(e) {
    if (null == e || 'object' != typeof e) return e;
    var t = e.constructor();
    for (var i in e) t[i] = cloneObj(e[i]);
    return t;
}
function hasChild(e, t) {
    for (var i = !1, n = 0; n < e.childNodes.length; n++) {
        e.childNodes[n] == t, (i = !0);
        break;
    }
    return i;
}
function stopBubble(e) {
    (e = e || window.event), e.stopPropagation ? e.stopPropagation() : (e.cancelBubble = !0);
}
function parseHTML5Tags(e) {
    var t = document.createElement('div');
    (t.style.display = 'none'), document.body.appendChild(t), (t.innerHTML = e);
    for (var i = document.createDocumentFragment(); t.firstChild; ) i.appendChild(t.firstChild);
    return t.parentNode.removeChild(t), i;
}
function mockAjax(e, t, i, n, o) {
    setTimeout(function () {
        for (var a = [], r = Math.ceil(20 * Math.random()), s = t + '年' + i + '月', l = 0; r > l; l++) {
            var d = document.createElement('div');
            (d.className = 'timeline_feed'),
                (l + 1) % 5 == 0 && d.setAttribute('data-highlight', !0),
                (d.innerHTML =
                    '<div class="article" style="height:' +
                    Math.round(300 * Math.random() + 100) +
                    'px;">这真的是一条新鲜事！！！  no.' +
                    (l + 1) +
                    '&nbsp;&nbsp;&nbsp;&nbsp;' +
                    s +
                    '</article><i></i><span class="highlight">highlight</span>'),
                a.push(d);
        }
        e.call(o, a, n);
    }, 500);
}
function isYourself() {
    return CoverInfo.uid == CoverInfo.profileid;
}
function queryToJSON(e) {
    var t = {};
    e = e.split('&');
    for (var i = 0, n = e.length; n > i; i++) {
        var o = e[i].split('=');
        t[o[0]] = o[1];
    }
    return t;
}
function getImageDimensionFromHead(e, t) {
    function i(e) {
        n && (clearInterval(n), (n = null), t());
    }
    var n,
        o = new Date().getTime();
    (n = setInterval(function () {
        var t = new Date().getTime() - o;
        (e.height > 0 || t > 3e3) && (XN.event.delEvent(e, 'load', i), i());
    }, 15)),
        XN.event.addEvent(e, 'load', i),
        (e.src = e.src);
}
function evalScript(scriptContainer, type) {
    var scriptList = Sizzle('script', scriptContainer),
        scriptStr = '';
    (window.tplContainer = scriptContainer),
        scriptList.forEach(function (e) {
            (e.src && '' != e.src.trim()) || (scriptStr += e.innerHTML);
        }),
        'le-guide' != type && (eval(scriptStr), (scriptContainer.data = tplData)),
        scriptList.forEach(function (e) {
            if (e.src && '' != e.src.trim()) {
                var t = document.createElement('script');
                (t.src = e.src), scriptContainer.replaceChild(t, e);
            }
        });
}
function sleep(e) {
    var t = new Date(),
        i = null;
    do i = new Date();
    while (e > i - t);
}
function getQueryStringByName(e) {
    e = e.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var t = '[\\?&]' + e + '=([^&#]*)',
        i = new RegExp(t),
        n = i.exec(window.location.search);
    return null == n ? '' : decodeURIComponent(n[1].replace(/\+/g, ' '));
}
function profilePage_ajaxUploadPhoto() {
    function e(e, t, i) {
        (n = new XN.ui.dialog()
            .setTitle('上传本人头像')
            .setBody(
                [
                    '<div id="userpic_form_box">',
                    '<div>选择电脑里的一张相片</div>',
                    '<form id="userpic_form" method="POST" target="userpic_quick_upload" enctype="multipart/form-data" action="http://head2.upload.' +
                        XN.env.domain +
                        '/profile/FileUpload.do">',
                    '<input type="file" name="Filedata"  id="Filedata" />',
                    '<input type="hidden" name="hostid" value="' + e + '" />',
                    '<input type="hidden" name="tsc" value="' + t + '" />',
                    '<input type="hidden" name="op" value="upload" />',
                    '<input type="hidden" name="societyguester" value="' + i + '" />',
                    '</form>',
                    '<div id="userpic_error_show">支持JPG、JPEG、GIF和PNG文件，最大4M</div>',
                    '</div>',
                    '<div id="userpic_loading_box" style="display:none;margin: 0pt auto;line-height:32px;text-align:center;">',
                    '<img src="' + XN.env.staticRoot + 'imgpro/indicator/blue_large.gif" />',
                    '</div>',
                    '<iframe name="userpic_quick_upload" src="http://' +
                        XN.env.domain +
                        '/ajaxProxy.html" style="display:none;"/>',
                ].join(''),
            )
            .addButton({
                text: '取消',
                onclick: function () {
                    this.hide('fade');
                },
            })
            .show('fade')),
            (window.userpic_removeDialog = function () {
                n.hide();
            }),
            (window.userpic_showDialog = function () {
                n.show();
            }),
            (window.userpic_onUploadSuccess = function (e, t, i) {
                if (1 == e) {
                    userpic_removeDialog();
                    var n = document.createElement('img');
                    (n.src = i),
                        (n.onload = function () {
                            $('userpic').parentNode.removeChild($('userpic')),
                                (n.id = 'userpic'),
                                n.style.width > n.style.height
                                    ? (n.style.height = '177px')
                                    : n.style.width < n.style.height && (n.style.width = '177px'),
                                cutPhotoImg(n, 177),
                                $('uploadPic').appendChild(n),
                                window.profileActionLog.writeLog({
                                    actionTag: 'upload',
                                    sourceTag: 'photo',
                                    targetTag: 'portrait',
                                });
                        }),
                        userpic_resetDialog();
                } else userpic_resetDialog(), userpic_removeDialog(), XN.DO.showError(t);
            }),
            (window.userpic_resetDialog = function () {
                ($('userpic_form_box').style.display = 'block'),
                    ($('userpic_loading_box').style.display = 'none'),
                    ($('Filedata').value = '');
                var e = n.getButton('取消').getEl();
                (e.disabled = !1), (e.className = e.className.replace(/\sgray/g, ''));
            });
    }
    function t() {
        XN.event.addEvent($('Filedata'), 'change', function (e) {
            var t = $('Filedata').value;
            if (!/\.(png|jpg|jpeg|gif|bmp)/i.test(t))
                return (
                    ($('userpic_error_show').className = 'errors_div ajax_msgerror'),
                    void ($('userpic_error_show').innerHTML = '请选择一张图片')
                );
            ($('userpic_form_box').style.display = 'none'), $('userpic_form').submit();
            var i = n.getButton('取消').getEl();
            (i.disabled = !0), (i.className += ' gray'), ($('userpic_loading_box').style.display = 'block');
        });
    }
    if ($('userpic_form_box')) return void userpic_showDialog();
    try {
        new XN.NET.xmlhttp({
            url: 'http://head.upload.' + XN.env.domain + '/profile/AjaxCertificate.do',
            onSuccess: function (i) {
                var n = XN.JSON.parse(i.responseText);
                e(n.hostid, n.tsc, XN.cookie.get('societyguester')), t();
            },
            onError: function () {
                XN.DO.showError('服务器错误，请稍后重试');
            },
        });
    } catch (i) {
        return void XN.DO.showError('服务器错误，请稍后重试');
    }
    var n;
}
function refreshCaptchaCode() {
    setTimeout(function () {
        var e = $('captcha_image');
        e.src = e.src.split('&')[0] + '&uid=' + XN.user.id + '&rnd=' + Math.random();
    }, 0);
}
function grabMtMove(e, t) {
    e.style.marginTop = Math.round(-((99 * t) / 310)) + 'px';
}
function setCssFloat(e, t) {
    XN.browser.IE ? (e.style.styleFloat = t) : (e.style.cssFloat = t);
}
function cutPhotoImg(e, t) {
    e.width >= e.height
        ? ((e.width = (t * e.width) / e.height),
          (e.height = t),
          (offset = 0.5 * (e.width - t)),
          (e.style.left = -offset + 'px'))
        : ((e.height = (t * e.height) / e.width),
          (e.width = t),
          (offset = 0.5 * (e.height - t)),
          (e.style.top = -offset + 'px'));
}
function stringCut(e, t) {
    return (e = e.replace(/\s+/g, '')), e.length > t && (e = e.substr(0, t) + '...'), e;
}
function moreFeedPic(feedID, ownerID) {
    var ids = $('morePicFeed' + feedID).innerHTML,
        url = 'retrieveMorePic.do?i=' + ids + '&o=' + ownerID;
    new XN.NET.xmlhttp(
        url,
        '',
        function (r) {
            for (var photoList = eval(r.responseText), s = '', i = 0; i < photoList.length; i++)
                s +=
                    '<li><a href="http://photo.' +
                    XN.env.domain +
                    '/getphoto.do?id=' +
                    photoList[i].i +
                    '&ref=newsfeed&owner=' +
                    ownerID +
                    '" target="_blank"><img width="80" height="80" src="http://s.xnimg.cn/a.gif" style="background-image:url(' +
                    photoList[i].p +
                    ')" /></a></li>';
            ($('moreThumbnails' + feedID).innerHTML = '<ul class="thumbnails grid">' + s + '</ul>'),
                ($('moreThumbnails' + feedID).style.display = 'block');
        },
        {
            onError: function () {
                s.onError();
            },
        },
    );
}
function showFrdRelation(e, t, i) {
    if (!i.hasClicked) {
        i.hasClicked = !0;
        var n = t;
        new XN.net.xmlhttp({
            url: 'http://www.' + XN.env.domain + '/ajaxMinifeedRelations/',
            data: 'ids=' + e,
            onSuccess: function (e) {
                var t = XN.json.parse(e.responseText),
                    o = !1;
                for (key in t)
                    if ('false' == t[key]) {
                        var a = $('frd_' + key + '_inFeed_' + n);
                        (o = !0), (a.style.display = 'inline');
                    }
                o
                    ? (i.style.display = 'none')
                    : ((i.innerHTML = '你们已是好友'),
                      (i.className = ''),
                      (i.style.cssText = 'color:#888!important;text-decoration:none!important;cursor:text'));
            },
        });
    }
}
function showFrdRelationTip(e) {
    if (XN.browser.IE6) {
        if (0 != Sizzle('.names-tip', e).length) var t = Sizzle('.names-tip', e)[0];
        else {
            if (0 == Sizzle('.name-tip', e).length) return;
            var t = Sizzle('.name-tip', e)[0];
        }
        t.style.cssText = 'display: block; zoom: 1';
    }
}
function hideFrdRelationTip(e) {
    if (XN.browser.IE6) {
        if (0 != Sizzle('.names-tip', e).length) var t = Sizzle('.names-tip', e)[0];
        else {
            if (0 == Sizzle('.name-tip', e).length) return;
            var t = Sizzle('.name-tip', e)[0];
        }
        t.style.cssText = 'display: none; zoom: 0';
    }
}
function addXiaoZu(e) {
    var t = e.getAttribute('data-type'),
        i = e.getAttribute('data-id'),
        n = '';
    3 != t && (n = 'message='),
        new XN.net.xmlhttp({
            url: 'http://xiaozu.renren.com/xiaozu/' + i + '/add',
            data: n,
            onSuccess: function (e) {
                location.href = 'http://xiaozu.renren.com/xiaozu/' + i;
            },
            onError: function () {
                XN.DO.showError('网络通信失败,请重试');
            },
        });
}
function showNamecard(e, t) {
    var i = $('namecardBox_' + t);
    i.style.cssText = 'overflow:hidden;';
    var n = $('newsfeed-' + t),
        o = Sizzle('.legend > a', n)[0],
        a = o.innerHTML;
    if (-1 != a.indexOf('收起')) {
        var r = new XN.effect.Motion('easeOut', 400);
        return (
            (r.onTweening = function () {
                (i.style.height = this.equation(231, 0) + 'px'), XN.browser.IE || i.setOpacity(this.equation(1, 0));
            }),
            (r.onComplete = function () {
                (i.style.display = 'none'),
                    '点击收起' == a ? (o.innerHTML = '点击查看') : '收起名片' == a && (o.innerHTML = '查看名片');
            }),
            void r.start()
        );
    }
    if (!n.hasClickedShowCard && ((n.hasClickedShowCard = !0), i)) {
        if ('' != i.innerHTML) {
            var s = new XN.effect.Motion('easeIn', 400);
            return (
                (i.style.height = '0'),
                (s.onTweening = function () {
                    (i.style.height = this.equation(0, 231) + 'px'), XN.browser.IE || i.setOpacity(this.equation(0, 1));
                }),
                (s.onComplete = function () {
                    '点击查看' == a ? (o.innerHTML = '点击收起') : '查看名片' == a && (o.innerHTML = '收起名片'),
                        (n.hasClickedShowCard = !1);
                }),
                void s.start()
            );
        }
        var l = $element('div'),
            d = $element('div');
        (l.className = 'cards-detail'),
            (l.style.height = '0px'),
            XN.browser.IE || l.setOpacity(0),
            (d.className = 'card-privacy');
        var c = function (e, t) {
            var i = e.toString(),
                n = !1;
            return (
                '' == i
                    ? (i = '未填写')
                    : '-1' == i &&
                      ((i = XN.browser.Gecko
                          ? '<img style="vertical-align: middle;" title="隐私不可见" src="http://a.xnimg.cn/imgpro/icons/newlock.png" />'
                          : '<img style="vertical-align: middle;margin-top:5px;" title="隐私不可见" src="http://a.xnimg.cn/imgpro/icons/newlock.png" />'),
                      (n = !0)),
                [i, n]
            );
        };
        new XN.net.xmlhttp({
            url: 'http://www.renren.com/minifeedShowcard?friendID=' + e,
            onSuccess: function (t) {
                var r = XN.json.parse(t.responseText),
                    s = parseInt(r.cardPrivacy);
                parseInt(e) == parseInt(XN.user.id) && (s = 4);
                var u = 'Ta';
                r.friendGender &&
                    '' != r.friendGender &&
                    ('男生' == r.friendGender && (u = '他'), '女生' == r.friendGender && (u = '她'));
                var p = !1;
                for (key in r)
                    if (
                        'msn' == key ||
                        'phone' == key ||
                        'qq' == key ||
                        'email' == key ||
                        'address' == key ||
                        'bak' == key
                    ) {
                        var h = c(r[key], s);
                        (r[key] = h[0]), (p = h[1] || p);
                    }
                (l.innerHTML =
                    '<a href="#nogo" onclick="this.blur();" style="cursor:default;outline:0 none;" class="float-right"><img src="' +
                    r.head +
                    '" class="" width="50"></a><h2 style="*line-height:25px;">' +
                    r.name +
                    '</h2><dl class="info-detail"><dt>手机：</dt><dd>' +
                    r.phone +
                    '</dd><dt>QQ：</dt><dd>' +
                    r.qq +
                    '</dd><dt>MSN：</dt><dd>' +
                    r.msn +
                    '</dd><dt>邮箱：</dt><dd>' +
                    r.email +
                    '</dd><dt>地址：</dt><dd>' +
                    r.address +
                    '</dd><dt>补充：</dt><dd>' +
                    r.bak +
                    '</dd></dl>'),
                    1 == s
                        ? ((d.innerHTML =
                              '对方只对好友公开了详情。<a href="javascript:;" onclick="showRequestFriendDialog(\'' +
                              e +
                              "','" +
                              r.name +
                              "','" +
                              r.head +
                              "', '', '');socialFeedStats('from=mf_adbook_apply');return false;\">加为好友</a>"),
                          i.appendChild(d))
                        : 2 == s
                        ? ((d.innerHTML =
                              '由于对方隐私设置，交换名片后才能查看详情。<a href="javascript:;" onclick="socialFeedStats(\'from=mf_adbook_excard\');">立即交换</a>'),
                          $(Sizzle('a', d)[0]).addEvent('click', function () {
                              new XN.net.xmlhttp({
                                  url: 'http://friend.renren.com/exchangecard?ids=' + e,
                                  onSuccess: function (e) {
                                      var t = XN.json.parse(e.responseText);
                                      0 == parseInt(t.code)
                                          ? XN.DO.showMessage('交换请求已发送')
                                          : XN.DO.showError('网络错误，请稍后再试');
                                  },
                                  onError: function () {
                                      XN.DO.showError('网络错误，请稍后再试');
                                  },
                              });
                          }),
                          i.appendChild(d))
                        : p && ((d.innerHTML = '由于对方隐私设置，部分信息不可见'), i.appendChild(d)),
                    i.appendChild(l);
                var m = new XN.effect.Motion('easeIn', 400);
                (m.onTweening = function () {
                    (l.style.height = this.equation(0, 175) + 'px'), XN.browser.IE || l.setOpacity(this.equation(0, 1));
                }),
                    (m.onComplete = function () {
                        (l.style.height = '175px'),
                            '点击查看' == a
                                ? (o.innerHTML = '点击收起')
                                : '查看名片' == a && (o.innerHTML = '收起名片'),
                            (n.hasClickedShowCard = !1);
                    }),
                    m.start(),
                    socialFeedStats('from=mf_adbook_card');
            },
            onError: function () {
                XN.DO.showError('网络错误，请稍后重试'), (n.hasClickedShowCard = !1);
            },
        });
    }
}
function showAppsCard() {
    (appCardObj = {
        cardBox: document.createElement('div'),
        loaded: !1,
        timerOut: null,
        timerOver: null,
        triggerEle: {},
        init: function () {
            this.renderHtml();
        },
        renderHtml: function () {
            var e = this,
                t = this.cardBox;
            (t.id = 'appcardcontent'),
                (t.innerHTML = '<em></em><div class="loding-card"></div>'),
                document.delegate('a[appcard]', 'mouseover', function (t) {
                    e.clearTimer(e.timerOut);
                    var i = XN.event.element(t);
                    e.loaded && e.triggerEle !== i && e.hide(), (e.triggerEle = i), e.show(i);
                }),
                document.delegate('a[appcard]', 'mouseout', function (t) {
                    e.clearTimer(e.timerOver),
                        (e.timerOut = setTimeout(function () {
                            e.hide();
                        }, 500));
                });
        },
        show: function (e) {
            var t = this;
            this.getCardPos(e),
                (this.timerOver = setTimeout(function () {
                    t.loaded
                        ? (t.cardBox.style.display = '')
                        : (document.body.appendChild(t.cardBox), t.bindCardEvent(), (t.loaded = !0)),
                        t.getAppHtml(e);
                }, 500));
        },
        getAppId: function (e) {
            return 'img' == e.tagName.toLowerCase() && (e = e.parentNode), e.getAttribute('appcard');
        },
        getAppHtml: function (e) {
            var t = this,
                i = '',
                n = !1;
            new XN.net.xmlhttp({
                url: 'http://apps.renren.com/info/appCard',
                data: 'appId=' + t.getAppId(e) + '&origin=50198',
                useCache: !0,
                onSuccess: function (e) {
                    var o = XN.JSON.parse(e.responseText);
                    if (0 == o.code) {
                        var a = o.appDesc.length >= 40 ? o.appDesc.substr(0, 37) + '...' : o.appDesc;
                        (i =
                            '<em></em>									<div class="card-content">										<div class="card-content-left">											<a href="' +
                            o.appSideNavUrl +
                            '" target="_blank"><img src="' +
                            o.appIcon +
                            '"></a>											<p>												' +
                            o.appCategory +
                            '类											</p>										</div>										<div class="card-content-right">											<h2>												<a href="' +
                            o.appSideNavUrl +
                            '" target="_blank">' +
                            o.appName +
                            '</a>											</h2>											<p>												' +
                            a +
                            '											</p>											<div class="friendList clearfix">'),
                            o.friendsDetails.length > 5 && (n = !0);
                        for (var r = o.friendsDetails.length, s = 0; r > s && 0 != r; s++) {
                            if (n && 4 == s) {
                                i +=
                                    '<a href="' +
                                    o.appSideNavUrl +
                                    '" target="_blank">												<img src="http://a.xnimg.cn/imgpro/bg/more-apps.png">											</a>';
                                break;
                            }
                            i +=
                                '<a href="http://' +
                                o.friendsDetails[s].userProfile +
                                '" target="_blank">											<img src="' +
                                o.friendsDetails[s].userImg +
                                '">										</a>';
                        }
                        (i +=
                            '</div>										<p>											' +
                            o.appFriendsCount +
                            '个好友最近玩过										</p>									</div>								</div>								<div class="footer">									<a href="' +
                            o.appSideNavUrl +
                            '" target="_blank">我要玩</a>								</div>'),
                            (t.cardBox.innerHTML = i);
                    } else t.cardBox.innerHTML = '<em></em><div class="message">' + o.msg + '</div>';
                },
                onError: function () {},
            });
        },
        hide: function () {
            (this.cardBox.innerHTML = '<em></em><div class="loding-card"></div>'),
                (this.cardBox.style.display = 'none');
        },
        bindCardEvent: function () {
            var e = this;
            XN.event.addEvent(e.cardBox, 'mouseover', function (t) {
                e.clearTimer(e.timerOut);
            }),
                XN.event.addEvent(e.cardBox, 'mouseout', function (t) {
                    e.timerOut = setTimeout(function () {
                        e.hide();
                    }, 500);
                });
        },
        getCardPos: function (e) {
            var t = 'img' == e.tagName.toLowerCase() ? e.height : 25;
            75 == e.height && (t += 8);
            var i = 'img' == e.tagName.toLowerCase() ? e.width / 2 : 25,
                n = XN.element.getPosition(e).left,
                o = XN.element.getPosition(e).top;
            (this.cardBox.style.left = n - 32 + i + 'px'), (this.cardBox.style.top = o + t + 'px');
        },
        clearTimer: function (e) {
            e && (clearTimeout(e), (e = null));
        },
    }),
        appCardObj.init();
}
function music_openRRMCPop(e, t, i) {
    (id = e.id[0]),
        (document.domain = XN.env.domain),
        object.use('ua.extra', function (n) {
            var o = n.ua.se360;
            if (!o) {
                var a =
                        'toolbar=no,location=no,directories=no,menubar=no,resizable=yes,status=yes,scrollbars=no,width=620,height=565,left=200,top=0',
                    r = window.open('http://a.xnimg.cn/xnapp/music/res/blank.htm', 'rrMCWin', a);
                if (!r) return alert('你的浏览器拦截了播放器窗口,请设置!'), !1;
                r.focus();
            }
            var s = {
                url: 'http://music.' + XN.env.domain + '/playlist/add',
            };
            t && (s.url = s.url + ('?' == t.indexOf(0) ? t : '?' + t)), music_postRequest(s.url, e, 'rrMCWin', i);
        });
}
function music_postRequest(e, t, i, n) {
    function o(e, t, i) {
        var n = document,
            o = n.createElement('input');
        (o.type = 'hidden'), (o.name = e), (o.value = t), i.appendChild(o);
    }
    var a = [];
    n && (a = music_notify(id, 0, 1, n));
    try {
        var r = document,
            s = r.createElement('form');
        (s.action = e), (s.method = 'post');
        for (var l in t)
            if (t[l] instanceof Array) for (var d = 0; d < t[l].length; d++) o(escape(l), escape(t[l][d]), s);
            else o(escape(l), escape(t[l]), s);
        i && (s.target = i),
            o('redirectType', 'new', s),
            o('_rtk', XN.get_check_x, s),
            XN.array.each(a, function (e, t) {
                o(e, t, s);
            }),
            document.body.appendChild(s),
            s.submit();
    } catch (c) {}
}
function music_playSong(e, t, i, n) {
    (n = n || XN.func.empty), XN.namespace('XN.radio.home');
    var o = $('radio-home-con'),
        a = 'none';
    o && (a = o.getStyle('display'));
    var r = XN.radio.home;
    r.playFeedSong && o && ('' == a || 'block' == a)
        ? r.playFeedSong(e, i, t, n)
        : (music_openRRMCPop(
              {
                  type: 'song',
                  id: [e],
              },
              t,
              i,
          ),
          n('musicbox'));
}
function music_publisher(e, t) {
    XN.namespace('XN.radio.home');
    var i = XN.radio.home;
    i.clearFeedPlaying && i.clearFeedPlaying(), music_playSong(e, 'from=4', '', t);
}
function music_notify(e, t, i, n) {
    var o = document.getElementById('newsfeed-' + n);
    if (o) {
        var a = parseInt(o.getAttribute('stime')),
            r = {
                friendUid: o.getAttribute('sid'),
                friendAction: o.getAttribute('saction'),
                friendListenTime: isNaN(a) ? 0 : a,
                songId: e,
                selfUid: XN.user.id,
                selfAction: t,
                fromWhere: i,
            };
        return r;
    }
}
function imageOnLoad(e) {
    e.height >= 300 && (e.parentNode.className = 'bigPic'), e.width > 200 && (e.parentNode.className += ' width200');
}
function moreFeedPic(feedID, ownerID) {
    var ids = $('morePicFeed' + feedID).innerHTML,
        url = 'retrieveMorePic.do?i=' + ids + '&o=' + ownerID;
    new XN.NET.xmlhttp(
        url,
        '',
        function (r) {
            for (var photoList = eval(r.responseText), s = '', i = 0; i < photoList.length; i++)
                s +=
                    '<li><a href="http://photo.' +
                    XN.env.domain +
                    '/getphoto.do?id=' +
                    photoList[i].i +
                    '&ref=newsfeed&owner=' +
                    ownerID +
                    '" target="_blank"><img width="80" height="80" src="http://s.xnimg.cn/a.gif" style="background-image:url(' +
                    photoList[i].p +
                    ')" /></a></li>';
            ($('moreThumbnails' + feedID).innerHTML = '<ul class="thumbnails grid">' + s + '</ul>'),
                ($('moreThumbnails' + feedID).style.display = 'block');
        },
        {
            onError: function () {
                s.onError();
            },
        },
    );
}
function photoFeedImgLoaded(e) {
    var t,
        i,
        n = XN.element.parent(e, '.feed-photo-con'),
        o = n.getAttribute('data-width'),
        a = n.getAttribute('data-height');
    if (e.naturalWidth) var r = e.naturalWidth / e.naturalHeight;
    else {
        var s = new Image();
        s.src = e.src;
        var r = s.width / s.height;
        delete newImg;
    }
    (t = o),
        (i = t / r),
        i >= a
            ? (e.style.marginTop = -(i - a) / 2 + 'px')
            : ((i = a), (t = i * r), (e.style.marginLeft = -(t - o) / 2 + 'px')),
        (e.width = t),
        (e.height = i);
}
function feedGetXY(e) {
    for (var t = 0, i = 0; e.offsetParent; ) (t += e.offsetLeft), (i += e.offsetTop), (e = e.offsetParent);
    return {
        x: t,
        y: i,
    };
}
function feedGetQueryStringByName(e, t) {
    e = e.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var i = '[\\?&]' + e + '=([^&#]*)',
        n = new RegExp(i),
        o = n.exec(t);
    return null == o ? '' : decodeURIComponent(o[1].replace(/\+/g, ' '));
}
function similarcutImg(e) {
    e.width >= e.height
        ? ((e.width = (100 * e.width) / e.height),
          (e.height = 100),
          (offset = 0.5 * (e.width - 100)),
          (e.style.marginLeft = -offset + 'px'))
        : ((e.height = (100 * e.height) / e.width),
          (e.width = 100),
          (offset = 0.5 * (e.height - 100)),
          (e.style.marginTop = -offset + 'px'));
}
function clearStr(e) {
    return (e = e.replace(/\s+/g, '')), (e = e.replace(/<\/?.+?>/g, '')), (e = e.replace(/[\r\n]/g, ''));
}
function getWWWRoot(e) {
    return XN.page && XN.page.data && 5 == XN.page.data.type
        ? 'lover.renren.com'
        : e
        ? 'org.renren.com'
        : 'page.renren.com';
}
function playStatusVideo(e, t, i) {
    t = decodeURIComponent(t);
    var n = XN.APP.status.getVideoScale(t),
        o = XN.Template.flash({
            width: n[0],
            height: n[1],
            filename: t,
        }),
        a = i.parentNode;
    !$('media' + e) || (a.id && 'currentStatus' == a.id) || (a && /currentStatus/.test(a.className))
        ? XN.DO.alert({
              title: '状态',
              message: '<center style="padding:10px">' + o + '</center>',
              width: n[0] + 80,
              button: '关闭',
              callBack: function () {
                  this.body.setContent('');
              },
              noHeader: !0,
          })
        : /^\S*$/.test($('media' + e).innerHTML)
        ? (($('media' + e).innerHTML = '<div class="feedmediabox">' + o + '</div>'), i && $(i).addClass('expand'))
        : (($('media' + e).innerHTML = ''), i && i.delClass('expand'));
}
function playStatusAudio(e, t, i) {
    var n;
    n = /mp3$/i.test(t)
        ? XN.Template.flashPlayer({
              filename: t,
          })
        : XN.Template.mediaPlayer({
              filename: t,
          });
    var o = i.parentNode;
    !$('media' + e) || (o.id && 'currentStatus' == o.id) || (o && /currentStatus/.test(o.className))
        ? XN.DO.alert({
              title: '状态',
              message: '<center style="padding:10px">' + n + '</center>',
              width: 500,
              button: '关闭',
              callBack: function () {
                  this.body.setContent('');
              },
              noHeader: !0,
          })
        : /^\S*$/.test($('media' + e).innerHTML)
        ? (($('media' + e).innerHTML = '<div class="feedmediabox">' + n + '</div>'), i && $(i).addClass('expand'))
        : (($('media' + e).innerHTML = ''), i && i.delClass('expand'));
}
function $CursorPosition(e) {
    var t = 0,
        i = 0;
    if ('number' == typeof e.selectionStart) (t = e.selectionStart), (i = e.selectionEnd);
    else if (document.selection) {
        var n = document.selection.createRange();
        if (n.parentElement() == e) {
            var o = document.body.createTextRange();
            for (o.moveToElementText(e), t = 0; o.compareEndPoints('StartToStart', n) < 0; t++)
                o.moveStart('character', 1);
            for (var a = 0; t >= a; a++) '\n' == e.value.charAt(a) && t++;
            var o = document.body.createTextRange();
            for (o.moveToElementText(e), i = 0; o.compareEndPoints('StartToEnd', n) < 0; i++)
                o.moveStart('character', 1);
            for (var a = 0; i >= a; a++) '\n' == e.value.charAt(a) && i++;
        }
    }
    return {
        start: t,
        end: i,
        item: [t, i],
    };
}
function renderStatusFeed(e, t) {}
function acceptFriend(e, t, i, n) {
    var o = XN.DO.confirm({
        title: '接受好友请求',
        msg: '<center><img src="' + XN.ENV.staticRoot + 'img/indicator.gif" />加载中...</center>',
        callBack: function (e) {
            if (e) {
                for (
                    var i = $('popFriendGroups').getElementsByTagName('input'),
                        n = {
                            action: 'addmultgroups',
                            buddys: t,
                            names: [],
                        },
                        a = 0;
                    a < i.length;
                    a++
                )
                    i[a].checked && n.names.push(i[a].value);
                new XN.NET.xmlhttp({
                    url: 'http://friend.' + XN.env.domain + '/ApplyGuestRequest.do',
                    data: 'friendId=' + t + '&post=' + encodeURIComponent(XN.JSON.build(n)),
                    onSuccess: function (e) {
                        var t = XN.JSON.parse(e.responseText);
                        if (5 == t.ret)
                            return (
                                (o = new XN.ui.dialog({
                                    title: '无法添加好友',
                                    message: [
                                        '<p>你的好友数已到上限，可以通过<a style="font-weight:bold;" href="http://i.renren.com" target="_blank">VIP</a>服务提高好友数上限，或者删除部分好友后重试。</p>',
                                    ].join(''),
                                    showCloseButton: !0,
                                })),
                                void o.footer.hide()
                            );
                        if (4 == t.ret) {
                            var i = '女生' == t.ta ? '她' : '他';
                            return (
                                (o = new XN.ui.dialog({
                                    title: '无法添加' + t.applicantName + '为好友',
                                    message: [
                                        '<p><a style="font-weight:bold;" href="http://www.renren.com/profile.do?id=' +
                                            t.applicantId +
                                            '"  target="_blank">' +
                                            t.applicantName +
                                            '</a>好友数已到上限，可以送' +
                                            i +
                                            '<a style="font-weight:bold;" href="http://i.renren.com" target="_blank">VIP</a>提高' +
                                            i +
                                            '的好友数上限。</p>',
                                    ].join(''),
                                    showCloseButton: !0,
                                })),
                                void o.footer.hide()
                            );
                        }
                        $('friendRequest').remove();
                    },
                    onError: function () {
                        XN.DO.showError('网络通信失败,请重试');
                    },
                });
            }
        },
    });
    o.footer.hide(), fillGroup(t, o);
}
function rejectFriend(e, t, i, n) {
    new XN.NET.xmlhttp({
        url: 'http://friend.' + XN.env.domain + '/rejguereq.do',
        data: 'id=' + t,
        onSuccess: function (e) {
            $('friendRequest').remove();
        },
        onError: function () {
            XN.DO.showError('网络通信失败,请重试');
        },
    });
}
function fillGroup(e, t) {
    new XN.NET.xmlhttp({
        url: 'http://friend.' + XN.env.domain + '/showfriendgroup.do',
        data: 'friendId=' + e,
        onSuccess: function (e) {
            t.body.setContent(e.responseText);
        },
        onError: function () {
            t.hide(), XN.DO.showError('网络通信失败,请重试');
        },
        onComplete: function () {
            null != t && t.footer.show();
        },
    });
}
function adjustOffset(e) {
    if ('undefined' != typeof $(e + '_variableOffset')) {
        var t = $(e + '_variableOffset').value;
        (t -= 1), 0 > t && (t = 0), ($(e + '_variableOffset').value = t);
    }
}
function checkGroupName(e) {
    return '' == e || '新建分组' == e
        ? (alert('分组名不能为空'), !1)
        : e.length > 10
        ? (alert('分组名不能超过10个字符'), !1)
        : /^[0-9a-z\u4e00-\u9fa5]*$/i.test(e)
        ? !0
        : (alert('只允许输入英文字符、数字和中文！'), !1);
}
function popEditGroupName(e) {
    function t() {
        var e = $element('input');
        return (e.className = 'input-text'), (e.onblur = i), (e.value = n), e;
    }
    function i() {
        var t = this,
            i = XN.STRING.trim(t.value);
        $(t).remove(),
            (e.style.display = 'inline-block'),
            i != n &&
                checkGroupName(i) &&
                new XN.NET.xmlhttp({
                    url: 'http://friend.' + XN.env.domain + '/editGroup.do',
                    data:
                        'post=' +
                        encodeURIComponent(
                            XN.JSON.build({
                                action: 'rename',
                                name: i,
                                oldname: n,
                            }),
                        ),
                    onSuccess: function (t) {
                        if ('0' == XN.STRING.strip(t.responseText).charAt(0)) {
                            var n = e.parentNode;
                            (n.getElementsByTagName('input')[0].value = i),
                                (n.getElementsByTagName('label')[0].innerHTML = i),
                                (n.getElementsByTagName('a')[0].onclick = function () {
                                    popDelGroupName(i, n.id.substring(n.id.indexOf('_') + 1));
                                });
                        } else alert('重命名分组失败');
                    },
                    onError: function () {
                        alert('重命名分组失败');
                    },
                });
    }
    var n = XN.STRING.trim(e.innerHTML),
        o = t(),
        a = e.parentNode;
    return a.insertBefore(o, e), (e.style.display = 'none'), o.focus(), !1;
}
function cancelNewGroup() {
    var e = $('popNewGroup');
    e.innerHTML = '<a onclick="popNewFriendGroup()" href="#nogo">+创建新分组</a>';
}
function popNewFriendGroup() {
    var e = $('popNewGroup');
    (e.innerHTML =
        '<input id="newGroupName" class="input-text" style="width:120px;"/>　<a href="#nogo" onclick="popCreateNewGroup()">创建分组</a>　<a href="#nogo" onclick="cancelNewGroup()">取消创建</a>'),
        $('newGroupName').focus();
}
function popDelGroupName(e, t) {
    confirm('您真的要删除分组:"' + e + '"?\n提示: 删除分组操作，并不会删除该分组下的好友！') &&
        new XN.NET.xmlhttp({
            url: 'http://friend.' + XN.env.domain + '/editGroup.do',
            data:
                'post=' +
                encodeURIComponent(
                    XN.JSON.build({
                        action: 'delete',
                        name: XN.STRING.trim(e),
                    }),
                ),
            onSuccess: function (e) {
                '0' == XN.STRING.trim(e.responseText).charAt(0) ? $('groupLi_' + t).remove() : alert('删除分组失败');
            },
            onError: function () {
                alert('删除分组失败');
            },
        });
}
function popCreateNewGroup() {
    var e = XN.STRING.trim($('newGroupName').value);
    checkGroupName(e) &&
        new XN.NET.xmlhttp({
            url: 'http://friend.' + XN.env.domain + '/editGroup.do',
            data:
                'post=' +
                encodeURIComponent(
                    XN.JSON.build({
                        action: 'create',
                        name: XN.STRING.trim(e),
                    }),
                ),
            onSuccess: function (t) {
                if ('0' == XN.STRING.strip(t.responseText).charAt(0)) {
                    var i = $('popFriendGroups').getElementsByTagName('li').length,
                        n = $element('li');
                    (n.id = 'groupLi_' + i),
                        (n.innerHTML =
                            '<input name="group" id="groupCheck_' +
                            i +
                            '" type="checkbox" class="checkbox" value="' +
                            e +
                            '"/><label onclick="return popEditGroupName(this)" id="groupName_' +
                            i +
                            '" for="groupCheck_' +
                            i +
                            '">' +
                            e +
                            '</label> <a class="x-2-hide" onclick="popDelGroupName(\'' +
                            e +
                            "','" +
                            i +
                            '\')" href="javascript:void(0);">×</a>'),
                        $('popFriendGroups').appendChild(n);
                } else XN.DO.showError('创建好友分组失败<br />' + msg);
            },
            onError: function () {
                XN.DO.showError('创建好友分组失败<br />' + msg);
            },
            onComplete: function () {
                $('noGroupTip') && $('noGroupTip').remove(), cancelNewGroup();
            },
        });
}
!(function () {
    function e(e, i) {
        var n = this;
        (this.history = e),
            (this.blankHTML = '/blank.html'),
            (this._ignoreHashChange = !1),
            (e.pushState = function () {
                n.pushState.apply(n, arguments);
            }),
            i && ((n.fireEvent = i.fireEvent), i.blankHTML && (n.blankHTML = i.blankHTML)),
            t
                ? ((e._oniframechange = function () {
                      n.onIFrameChange.apply(n, arguments);
                  }),
                  window.attachEvent('onload', function () {
                      n.firePopState(),
                          n.makeIFrame(function () {
                              (n._isInit = !0), n.makeIFrameHistory('');
                          });
                  }))
                : window.addEventListener
                ? (window.addEventListener(
                      'hashchange',
                      function () {
                          n.onHashChange.apply(n, arguments);
                      },
                      !1,
                  ),
                  window.addEventListener(
                      'load',
                      function () {
                          n.firePopState();
                      },
                      !1,
                  ))
                : (window.attachEvent('onhashchange', function () {
                      n.onHashChange.apply(n, arguments);
                  }),
                  window.attachEvent('onload', function () {
                      n.firePopState();
                  }));
    }
    var t = !(
        !window.ActiveXObject ||
        (window.XMLHttpRequest && (!window.XMLHttpRequest || (document.documentMode && 7 !== document.documentMode)))
    );
    (e.prototype = {
        makeIFrame: function (e) {
            var t = 'html5history-iframe',
                i = document.createElement('iframe');
            i.setAttribute('id', t),
                document.domain != location.hostname &&
                    i.setAttribute('src', 'http://' + document.domain + this.blankHTML),
                (i.style.display = 'none'),
                i.attachEvent('onload', function () {
                    i.detachEvent('onload', arguments.callee),
                        setTimeout(function () {
                            e();
                        }, 0);
                }),
                document.body.appendChild(i),
                (this.iframe = i);
        },
        makeIFrameHistory: function (e) {
            var t = this.iframe.contentWindow.document;
            t.open(),
                t.write(
                    [
                        '<html>',
                        '<head>',
                        '<meta http-equiv="Pragma" content="no-cache" />',
                        '<meta http-equiv="Expires" content="-1" />',
                        '<script>',
                        document.domain != location.hostname ? '	document.domain="' + document.domain + '";' : '',
                        '	function pageLoad() {',
                        '		try { top.window.history._oniframechange("' + e + '") } catch(e) {}',
                        '	}',
                        '</script>',
                        '</head>',
                        '<body onload="pageLoad()">',
                        '<div id="url">' + e + '</div>',
                        '</body>',
                        '</html>',
                    ].join(''),
                ),
                (t.title = document.title),
                t.close();
        },
        firePopState: function () {
            if (this.fireEvent) this.fireEvent(window, 'popstate');
            else if (document.createEvent) {
                var e = document.createEvent('UIEvents');
                e.initEvent('popstate', !1, !1), (e.state = null), window.dispatchEvent(e);
            }
            'function' == typeof window.onpopstate && window.onpopstate();
        },
        pushState: function (e, t, i) {
            if ('#' != i.substr(0, 1) || location.hash == i)
                throw '由于浏览器限制，你必须传入一个与当前hash不同的hash值';
            this._pushState(e, t, i);
        },
        _pushState: t
            ? function (e, t, i) {
                  (this._ignoreHashChange = !0), this.makeIFrameHistory(i);
              }
            : function (e, t, i) {
                  (this._ignoreHashChange = !0), (window.location.hash = i);
              },
        onIFrameChange: function (e) {
            this._isInit
                ? (this._isInit = !1)
                : ((location.hash = e), this._ignoreHashChange || this.firePopState(), (this._ignoreHashChange = !1));
        },
        onHashChange: function (e) {
            this._ignoreHashChange || this.firePopState(), (this._ignoreHashChange = !1);
        },
    }),
        (e.bind = function (t, i) {
            t.pushState || new e(t, i);
        }),
        (window.HTML5History = e);
})();
var SWFUpload, swfobject;
void 0 == SWFUpload &&
    (SWFUpload = function (e) {
        this.initSWFUpload(e);
    }),
    (SWFUpload.prototype.initSWFUpload = function (e) {
        try {
            (this.customSettings = {}),
                (this.settings = {}),
                (this.eventQueue = []),
                (this.movieName = 'SWFUpload_' + SWFUpload.movieCount++),
                (this.movieElement = null),
                (SWFUpload.instances[this.movieName] = this),
                this.initSettings(e),
                this.loadSupport(),
                this.swfuploadPreload() && this.loadFlash(),
                this.displayDebugInfo();
        } catch (t) {
            throw (delete SWFUpload.instances[this.movieName], t);
        }
    }),
    (SWFUpload.instances = {}),
    (SWFUpload.movieCount = 0),
    (SWFUpload.version = '2.5.0 2010-01-15 Beta 2'),
    (SWFUpload.QUEUE_ERROR = {
        QUEUE_LIMIT_EXCEEDED: -100,
        FILE_EXCEEDS_SIZE_LIMIT: -110,
        ZERO_BYTE_FILE: -120,
        INVALID_FILETYPE: -130,
    }),
    (SWFUpload.UPLOAD_ERROR = {
        HTTP_ERROR: -200,
        MISSING_UPLOAD_URL: -210,
        IO_ERROR: -220,
        SECURITY_ERROR: -230,
        UPLOAD_LIMIT_EXCEEDED: -240,
        UPLOAD_FAILED: -250,
        SPECIFIED_FILE_ID_NOT_FOUND: -260,
        FILE_VALIDATION_FAILED: -270,
        FILE_CANCELLED: -280,
        UPLOAD_STOPPED: -290,
        RESIZE: -300,
    }),
    (SWFUpload.FILE_STATUS = {
        QUEUED: -1,
        IN_PROGRESS: -2,
        ERROR: -3,
        COMPLETE: -4,
        CANCELLED: -5,
    }),
    (SWFUpload.UPLOAD_TYPE = {
        NORMAL: -1,
        RESIZED: -2,
    }),
    (SWFUpload.BUTTON_ACTION = {
        SELECT_FILE: -100,
        SELECT_FILES: -110,
        START_UPLOAD: -120,
        JAVASCRIPT: -130,
        NONE: -130,
    }),
    (SWFUpload.CURSOR = {
        ARROW: -1,
        HAND: -2,
    }),
    (SWFUpload.WINDOW_MODE = {
        WINDOW: 'window',
        TRANSPARENT: 'transparent',
        OPAQUE: 'opaque',
    }),
    (SWFUpload.RESIZE_ENCODING = {
        JPEG: -1,
        PNG: -2,
    }),
    (SWFUpload.completeURL = function (e) {
        try {
            var t = '',
                i = -1;
            return 'string' != typeof e || e.match(/^https?:\/\//i) || e.match(/^\//) || '' === e
                ? e
                : ((i = window.location.pathname.lastIndexOf('/')),
                  (t = 0 >= i ? '/' : window.location.pathname.substr(0, i) + '/'),
                  t + e);
        } catch (n) {
            return e;
        }
    }),
    (SWFUpload.onload = function () {}),
    (SWFUpload.prototype.initSettings = function (e) {
        (this.ensureDefault = function (t, i) {
            var n = e[t];
            void 0 != n ? (this.settings[t] = n) : (this.settings[t] = i);
        }),
            this.ensureDefault('upload_url', ''),
            this.ensureDefault('preserve_relative_urls', !1),
            this.ensureDefault('file_post_name', 'Filedata'),
            this.ensureDefault('post_params', {}),
            this.ensureDefault('use_query_string', !1),
            this.ensureDefault('requeue_on_error', !1),
            this.ensureDefault('http_success', []),
            this.ensureDefault('assume_success_timeout', 0),
            this.ensureDefault('file_types', '*.*'),
            this.ensureDefault('file_types_description', 'All Files'),
            this.ensureDefault('file_size_limit', 0),
            this.ensureDefault('file_upload_limit', 0),
            this.ensureDefault('file_queue_limit', 0),
            this.ensureDefault('flash_url', 'swfupload.swf'),
            this.ensureDefault('flash9_url', 'swfupload_fp9.swf'),
            this.ensureDefault('prevent_swf_caching', !0),
            this.ensureDefault('button_image_url', ''),
            this.ensureDefault('button_width', 1),
            this.ensureDefault('button_height', 1),
            this.ensureDefault('button_text', ''),
            this.ensureDefault('button_text_style', 'color: #000000; font-size: 16pt;'),
            this.ensureDefault('button_text_top_padding', 0),
            this.ensureDefault('button_text_left_padding', 0),
            this.ensureDefault('button_action', SWFUpload.BUTTON_ACTION.SELECT_FILES),
            this.ensureDefault('button_disabled', !1),
            this.ensureDefault('button_placeholder_id', ''),
            this.ensureDefault('button_placeholder', null),
            this.ensureDefault('button_cursor', SWFUpload.CURSOR.ARROW),
            this.ensureDefault('button_window_mode', SWFUpload.WINDOW_MODE.WINDOW),
            this.ensureDefault('debug', !1),
            (this.settings.debug_enabled = this.settings.debug),
            (this.settings.return_upload_start_handler = this.returnUploadStart),
            this.ensureDefault('swfupload_preload_handler', null),
            this.ensureDefault('swfupload_load_failed_handler', null),
            this.ensureDefault('swfupload_loaded_handler', null),
            this.ensureDefault('file_dialog_start_handler', null),
            this.ensureDefault('file_queued_handler', null),
            this.ensureDefault('file_queue_error_handler', null),
            this.ensureDefault('file_dialog_complete_handler', null),
            this.ensureDefault('upload_resize_start_handler', null),
            this.ensureDefault('upload_start_handler', null),
            this.ensureDefault('upload_progress_handler', null),
            this.ensureDefault('upload_error_handler', null),
            this.ensureDefault('upload_success_handler', null),
            this.ensureDefault('upload_complete_handler', null),
            this.ensureDefault('mouse_click_handler', null),
            this.ensureDefault('mouse_out_handler', null),
            this.ensureDefault('mouse_over_handler', null),
            this.ensureDefault('debug_handler', this.debugMessage),
            this.ensureDefault('custom_settings', {}),
            (this.customSettings = this.settings.custom_settings),
            this.settings.prevent_swf_caching &&
                ((this.settings.flash_url =
                    this.settings.flash_url +
                    (this.settings.flash_url.indexOf('?') < 0 ? '?' : '&') +
                    'preventswfcaching=' +
                    new Date().getTime()),
                (this.settings.flash9_url =
                    this.settings.flash9_url +
                    (this.settings.flash9_url.indexOf('?') < 0 ? '?' : '&') +
                    'preventswfcaching=' +
                    new Date().getTime())),
            this.settings.preserve_relative_urls ||
                ((this.settings.upload_url = SWFUpload.completeURL(this.settings.upload_url)),
                (this.settings.button_image_url = SWFUpload.completeURL(this.settings.button_image_url))),
            delete this.ensureDefault;
    }),
    (SWFUpload.prototype.loadSupport = function () {
        this.support = {
            loading: swfobject.hasFlashPlayerVersion('9.0.28'),
            imageResize: swfobject.hasFlashPlayerVersion('10.0.0'),
        };
    }),
    (SWFUpload.prototype.loadFlash = function () {
        var e, t, i, n, o;
        if (!this.support.loading)
            return void this.queueEvent('swfupload_load_failed_handler', ["Flash Player doesn't support SWFUpload"]);
        if (null !== document.getElementById(this.movieName))
            return (
                (this.support.loading = !1),
                void this.queueEvent('swfupload_load_failed_handler', ['Element ID already in use'])
            );
        if (
            ((e = document.getElementById(this.settings.button_placeholder_id) || this.settings.button_placeholder),
            void 0 == e)
        )
            return (
                (this.support.loading = !1),
                void this.queueEvent('swfupload_load_failed_handler', ['button place holder not found'])
            );
        (i =
            'block' !==
            ((e.currentStyle && e.currentStyle.display) ||
                (window.getComputedStyle && document.defaultView.getComputedStyle(e, null).getPropertyValue('display')))
                ? 'span'
                : 'div'),
            (t = document.createElement(i)),
            (n = this.getFlashHTML());
        try {
            t.innerHTML = n;
        } catch (a) {
            return (
                (this.support.loading = !1),
                void this.queueEvent('swfupload_load_failed_handler', ['Exception loading Flash HTML into placeholder'])
            );
        }
        return (
            (o = t.getElementsByTagName('object')),
            !o || o.length > 1 || 0 === o.length
                ? ((this.support.loading = !1),
                  void this.queueEvent('swfupload_load_failed_handler', ['Unable to find movie after adding to DOM']))
                : (1 === o.length && (this.movieElement = o[0]),
                  e.parentNode.replaceChild(t.firstChild, e),
                  void (void 0 == window[this.movieName] && (window[this.movieName] = this.getMovieElement())))
        );
    }),
    (SWFUpload.prototype.getFlashHTML = function (e) {
        return [
            '<object id="',
            this.movieName,
            '" type="application/x-shockwave-flash" data="',
            this.support.imageResize ? this.settings.flash_url : this.settings.flash9_url,
            '" width="',
            this.settings.button_width,
            '" height="',
            this.settings.button_height,
            '" class="swfupload">',
            '<param name="wmode" value="',
            this.settings.button_window_mode,
            '" />',
            '<param name="movie" value="',
            this.support.imageResize ? this.settings.flash_url : this.settings.flash9_url,
            '" />',
            '<param name="quality" value="high" />',
            '<param name="allowScriptAccess" value="always" />',
            '<param name="flashvars" value="' + this.getFlashVars() + '" />',
            '</object>',
        ].join('');
    }),
    (SWFUpload.prototype.getFlashVars = function () {
        var e, t;
        return (
            (t = this.buildParamString()),
            (e = this.settings.http_success.join(',')),
            [
                'movieName=',
                encodeURIComponent(this.movieName),
                '&amp;uploadURL=',
                encodeURIComponent(this.settings.upload_url),
                '&amp;useQueryString=',
                encodeURIComponent(this.settings.use_query_string),
                '&amp;requeueOnError=',
                encodeURIComponent(this.settings.requeue_on_error),
                '&amp;httpSuccess=',
                encodeURIComponent(e),
                '&amp;assumeSuccessTimeout=',
                encodeURIComponent(this.settings.assume_success_timeout),
                '&amp;params=',
                encodeURIComponent(t),
                '&amp;filePostName=',
                encodeURIComponent(this.settings.file_post_name),
                '&amp;fileTypes=',
                encodeURIComponent(this.settings.file_types),
                '&amp;fileTypesDescription=',
                encodeURIComponent(this.settings.file_types_description),
                '&amp;fileSizeLimit=',
                encodeURIComponent(this.settings.file_size_limit),
                '&amp;fileUploadLimit=',
                encodeURIComponent(this.settings.file_upload_limit),
                '&amp;fileQueueLimit=',
                encodeURIComponent(this.settings.file_queue_limit),
                '&amp;debugEnabled=',
                encodeURIComponent(this.settings.debug_enabled),
                '&amp;buttonImageURL=',
                encodeURIComponent(this.settings.button_image_url),
                '&amp;buttonWidth=',
                encodeURIComponent(this.settings.button_width),
                '&amp;buttonHeight=',
                encodeURIComponent(this.settings.button_height),
                '&amp;buttonText=',
                encodeURIComponent(this.settings.button_text),
                '&amp;buttonTextTopPadding=',
                encodeURIComponent(this.settings.button_text_top_padding),
                '&amp;buttonTextLeftPadding=',
                encodeURIComponent(this.settings.button_text_left_padding),
                '&amp;buttonTextStyle=',
                encodeURIComponent(this.settings.button_text_style),
                '&amp;buttonAction=',
                encodeURIComponent(this.settings.button_action),
                '&amp;buttonDisabled=',
                encodeURIComponent(this.settings.button_disabled),
                '&amp;buttonCursor=',
                encodeURIComponent(this.settings.button_cursor),
            ].join('')
        );
    }),
    (SWFUpload.prototype.getMovieElement = function () {
        if (
            (void 0 == this.movieElement && (this.movieElement = document.getElementById(this.movieName)),
            null === this.movieElement)
        )
            throw 'Could not find Flash element';
        return this.movieElement;
    }),
    (SWFUpload.prototype.buildParamString = function () {
        var e,
            t,
            i = [];
        if (((t = this.settings.post_params), 'object' == typeof t))
            for (e in t)
                t.hasOwnProperty(e) &&
                    i.push(encodeURIComponent(e.toString()) + '=' + encodeURIComponent(t[e].toString()));
        return i.join('&amp;');
    }),
    (SWFUpload.prototype.destroy = function () {
        var e;
        try {
            if ((this.cancelUpload(null, !1), (e = this.cleanUp())))
                try {
                    e.parentNode.removeChild(e);
                } catch (t) {}
            return (
                (window[this.movieName] = null),
                (SWFUpload.instances[this.movieName] = null),
                delete SWFUpload.instances[this.movieName],
                (this.movieElement = null),
                (this.settings = null),
                (this.customSettings = null),
                (this.eventQueue = null),
                (this.movieName = null),
                !0
            );
        } catch (i) {
            return !1;
        }
    }),
    (SWFUpload.prototype.displayDebugInfo = function () {
        this.debug(
            [
                '---SWFUpload Instance Info---\n',
                'Version: ',
                SWFUpload.version,
                '\n',
                'Movie Name: ',
                this.movieName,
                '\n',
                'Settings:\n',
                '	',
                'upload_url:               ',
                this.settings.upload_url,
                '\n',
                '	',
                'flash_url:                ',
                this.settings.flash_url,
                '\n',
                '	',
                'flash9_url:                ',
                this.settings.flash9_url,
                '\n',
                '	',
                'use_query_string:         ',
                this.settings.use_query_string.toString(),
                '\n',
                '	',
                'requeue_on_error:         ',
                this.settings.requeue_on_error.toString(),
                '\n',
                '	',
                'http_success:             ',
                this.settings.http_success.join(', '),
                '\n',
                '	',
                'assume_success_timeout:   ',
                this.settings.assume_success_timeout,
                '\n',
                '	',
                'file_post_name:           ',
                this.settings.file_post_name,
                '\n',
                '	',
                'post_params:              ',
                this.settings.post_params.toString(),
                '\n',
                '	',
                'file_types:               ',
                this.settings.file_types,
                '\n',
                '	',
                'file_types_description:   ',
                this.settings.file_types_description,
                '\n',
                '	',
                'file_size_limit:          ',
                this.settings.file_size_limit,
                '\n',
                '	',
                'file_upload_limit:        ',
                this.settings.file_upload_limit,
                '\n',
                '	',
                'file_queue_limit:         ',
                this.settings.file_queue_limit,
                '\n',
                '	',
                'debug:                    ',
                this.settings.debug.toString(),
                '\n',
                '	',
                'prevent_swf_caching:      ',
                this.settings.prevent_swf_caching.toString(),
                '\n',
                '	',
                'button_placeholder_id:    ',
                this.settings.button_placeholder_id.toString(),
                '\n',
                '	',
                'button_placeholder:       ',
                this.settings.button_placeholder ? 'Set' : 'Not Set',
                '\n',
                '	',
                'button_image_url:         ',
                this.settings.button_image_url.toString(),
                '\n',
                '	',
                'button_width:             ',
                this.settings.button_width.toString(),
                '\n',
                '	',
                'button_height:            ',
                this.settings.button_height.toString(),
                '\n',
                '	',
                'button_text:              ',
                this.settings.button_text.toString(),
                '\n',
                '	',
                'button_text_style:        ',
                this.settings.button_text_style.toString(),
                '\n',
                '	',
                'button_text_top_padding:  ',
                this.settings.button_text_top_padding.toString(),
                '\n',
                '	',
                'button_text_left_padding: ',
                this.settings.button_text_left_padding.toString(),
                '\n',
                '	',
                'button_action:            ',
                this.settings.button_action.toString(),
                '\n',
                '	',
                'button_cursor:            ',
                this.settings.button_cursor.toString(),
                '\n',
                '	',
                'button_disabled:          ',
                this.settings.button_disabled.toString(),
                '\n',
                '	',
                'custom_settings:          ',
                this.settings.custom_settings.toString(),
                '\n',
                'Event Handlers:\n',
                '	',
                'swfupload_preload_handler assigned:  ',
                ('function' == typeof this.settings.swfupload_preload_handler).toString(),
                '\n',
                '	',
                'swfupload_load_failed_handler assigned:  ',
                ('function' == typeof this.settings.swfupload_load_failed_handler).toString(),
                '\n',
                '	',
                'swfupload_loaded_handler assigned:  ',
                ('function' == typeof this.settings.swfupload_loaded_handler).toString(),
                '\n',
                '	',
                'mouse_click_handler assigned:       ',
                ('function' == typeof this.settings.mouse_click_handler).toString(),
                '\n',
                '	',
                'mouse_over_handler assigned:        ',
                ('function' == typeof this.settings.mouse_over_handler).toString(),
                '\n',
                '	',
                'mouse_out_handler assigned:         ',
                ('function' == typeof this.settings.mouse_out_handler).toString(),
                '\n',
                '	',
                'file_dialog_start_handler assigned: ',
                ('function' == typeof this.settings.file_dialog_start_handler).toString(),
                '\n',
                '	',
                'file_queued_handler assigned:       ',
                ('function' == typeof this.settings.file_queued_handler).toString(),
                '\n',
                '	',
                'file_queue_error_handler assigned:  ',
                ('function' == typeof this.settings.file_queue_error_handler).toString(),
                '\n',
                '	',
                'upload_resize_start_handler assigned:      ',
                ('function' == typeof this.settings.upload_resize_start_handler).toString(),
                '\n',
                '	',
                'upload_start_handler assigned:      ',
                ('function' == typeof this.settings.upload_start_handler).toString(),
                '\n',
                '	',
                'upload_progress_handler assigned:   ',
                ('function' == typeof this.settings.upload_progress_handler).toString(),
                '\n',
                '	',
                'upload_error_handler assigned:      ',
                ('function' == typeof this.settings.upload_error_handler).toString(),
                '\n',
                '	',
                'upload_success_handler assigned:    ',
                ('function' == typeof this.settings.upload_success_handler).toString(),
                '\n',
                '	',
                'upload_complete_handler assigned:   ',
                ('function' == typeof this.settings.upload_complete_handler).toString(),
                '\n',
                '	',
                'debug_handler assigned:             ',
                ('function' == typeof this.settings.debug_handler).toString(),
                '\n',
                'Support:\n',
                '	',
                'Load:                     ',
                this.support.loading ? 'Yes' : 'No',
                '\n',
                '	',
                'Image Resize:             ',
                this.support.imageResize ? 'Yes' : 'No',
                '\n',
            ].join(''),
        );
    }),
    (SWFUpload.prototype.addSetting = function (e, t, i) {
        return void 0 == t ? (this.settings[e] = i) : (this.settings[e] = t);
    }),
    (SWFUpload.prototype.getSetting = function (e) {
        return void 0 != this.settings[e] ? this.settings[e] : '';
    }),
    (SWFUpload.prototype.callFlash = function (functionName, argumentArray) {
        var movieElement, returnValue, returnString;
        (argumentArray = argumentArray || []), (movieElement = this.getMovieElement());
        try {
            void 0 != movieElement
                ? ((returnString = movieElement.CallFunction(
                      '<invoke name="' +
                          functionName +
                          '" returntype="javascript">' +
                          __flash__argumentsToXML(argumentArray, 0) +
                          '</invoke>',
                  )),
                  (returnValue = eval(returnString)))
                : this.debug("Can't call flash because the movie wasn't found.");
        } catch (ex) {
            this.debug("Exception calling flash function '" + functionName + "': " + ex.message);
        }
        return (
            void 0 != returnValue &&
                'object' == typeof returnValue.post &&
                (returnValue = this.unescapeFilePostParams(returnValue)),
            returnValue
        );
    }),
    (SWFUpload.prototype.selectFile = function () {
        this.callFlash('SelectFile');
    }),
    (SWFUpload.prototype.selectFiles = function () {
        this.callFlash('SelectFiles');
    }),
    (SWFUpload.prototype.startUpload = function (e) {
        this.callFlash('StartUpload', [e]);
    }),
    (SWFUpload.prototype.startResizedUpload = function (e, t, i, n, o, a) {
        this.callFlash('StartUpload', [
            e,
            {
                width: t,
                height: i,
                encoding: n,
                quality: o,
                allowEnlarging: a,
            },
        ]);
    }),
    (SWFUpload.prototype.cancelUpload = function (e, t) {
        t !== !1 && (t = !0), this.callFlash('CancelUpload', [e, t]);
    }),
    (SWFUpload.prototype.stopUpload = function () {
        this.callFlash('StopUpload');
    }),
    (SWFUpload.prototype.requeueUpload = function (e) {
        return this.callFlash('RequeueUpload', [e]);
    }),
    (SWFUpload.prototype.getStats = function () {
        return this.callFlash('GetStats');
    }),
    (SWFUpload.prototype.setStats = function (e) {
        this.callFlash('SetStats', [e]);
    }),
    (SWFUpload.prototype.getFile = function (e) {
        return 'number' == typeof e ? this.callFlash('GetFileByIndex', [e]) : this.callFlash('GetFile', [e]);
    }),
    (SWFUpload.prototype.getQueueFile = function (e) {
        return 'number' == typeof e ? this.callFlash('GetFileByQueueIndex', [e]) : this.callFlash('GetFile', [e]);
    }),
    (SWFUpload.prototype.addFileParam = function (e, t, i) {
        return this.callFlash('AddFileParam', [e, t, i]);
    }),
    (SWFUpload.prototype.removeFileParam = function (e, t) {
        this.callFlash('RemoveFileParam', [e, t]);
    }),
    (SWFUpload.prototype.setUploadURL = function (e) {
        (this.settings.upload_url = e.toString()), this.callFlash('SetUploadURL', [e]);
    }),
    (SWFUpload.prototype.setPostParams = function (e) {
        (this.settings.post_params = e), this.callFlash('SetPostParams', [e]);
    }),
    (SWFUpload.prototype.addPostParam = function (e, t) {
        (this.settings.post_params[e] = t), this.callFlash('SetPostParams', [this.settings.post_params]);
    }),
    (SWFUpload.prototype.removePostParam = function (e) {
        delete this.settings.post_params[e], this.callFlash('SetPostParams', [this.settings.post_params]);
    }),
    (SWFUpload.prototype.setFileTypes = function (e, t) {
        (this.settings.file_types = e),
            (this.settings.file_types_description = t),
            this.callFlash('SetFileTypes', [e, t]);
    }),
    (SWFUpload.prototype.setFileSizeLimit = function (e) {
        (this.settings.file_size_limit = e), this.callFlash('SetFileSizeLimit', [e]);
    }),
    (SWFUpload.prototype.setFileUploadLimit = function (e) {
        (this.settings.file_upload_limit = e), this.callFlash('SetFileUploadLimit', [e]);
    }),
    (SWFUpload.prototype.setFileQueueLimit = function (e) {
        (this.settings.file_queue_limit = e), this.callFlash('SetFileQueueLimit', [e]);
    }),
    (SWFUpload.prototype.setFilePostName = function (e) {
        (this.settings.file_post_name = e), this.callFlash('SetFilePostName', [e]);
    }),
    (SWFUpload.prototype.setUseQueryString = function (e) {
        (this.settings.use_query_string = e), this.callFlash('SetUseQueryString', [e]);
    }),
    (SWFUpload.prototype.setRequeueOnError = function (e) {
        (this.settings.requeue_on_error = e), this.callFlash('SetRequeueOnError', [e]);
    }),
    (SWFUpload.prototype.setHTTPSuccess = function (e) {
        'string' == typeof e && (e = e.replace(' ', '').split(',')),
            (this.settings.http_success = e),
            this.callFlash('SetHTTPSuccess', [e]);
    }),
    (SWFUpload.prototype.setAssumeSuccessTimeout = function (e) {
        (this.settings.assume_success_timeout = e), this.callFlash('SetAssumeSuccessTimeout', [e]);
    }),
    (SWFUpload.prototype.setDebugEnabled = function (e) {
        (this.settings.debug_enabled = e), this.callFlash('SetDebugEnabled', [e]);
    }),
    (SWFUpload.prototype.setButtonImageURL = function (e) {
        void 0 == e && (e = ''), (this.settings.button_image_url = e), this.callFlash('SetButtonImageURL', [e]);
    }),
    (SWFUpload.prototype.setButtonDimensions = function (e, t) {
        (this.settings.button_width = e), (this.settings.button_height = t);
        var i = this.getMovieElement();
        void 0 != i && ((i.style.width = e + 'px'), (i.style.height = t + 'px')),
            this.callFlash('SetButtonDimensions', [e, t]);
    }),
    (SWFUpload.prototype.setButtonText = function (e) {
        (this.settings.button_text = e), this.callFlash('SetButtonText', [e]);
    }),
    (SWFUpload.prototype.setButtonTextPadding = function (e, t) {
        (this.settings.button_text_top_padding = t),
            (this.settings.button_text_left_padding = e),
            this.callFlash('SetButtonTextPadding', [e, t]);
    }),
    (SWFUpload.prototype.setButtonTextStyle = function (e) {
        (this.settings.button_text_style = e), this.callFlash('SetButtonTextStyle', [e]);
    }),
    (SWFUpload.prototype.setButtonDisabled = function (e) {
        (this.settings.button_disabled = e), this.callFlash('SetButtonDisabled', [e]);
    }),
    (SWFUpload.prototype.setButtonAction = function (e) {
        (this.settings.button_action = e), this.callFlash('SetButtonAction', [e]);
    }),
    (SWFUpload.prototype.setButtonCursor = function (e) {
        (this.settings.button_cursor = e), this.callFlash('SetButtonCursor', [e]);
    }),
    (SWFUpload.prototype.queueEvent = function (e, t) {
        var i = this;
        if ((void 0 == t ? (t = []) : t instanceof Array || (t = [t]), 'function' == typeof this.settings[e]))
            this.eventQueue.push(function () {
                this.settings[e].apply(this, t);
            }),
                setTimeout(function () {
                    i.executeNextEvent();
                }, 0);
        else if (null !== this.settings[e]) throw 'Event handler ' + e + ' is unknown or is not a function';
    }),
    (SWFUpload.prototype.executeNextEvent = function () {
        var e = this.eventQueue ? this.eventQueue.shift() : null;
        'function' == typeof e && e.apply(this);
    }),
    (SWFUpload.prototype.unescapeFilePostParams = function (e) {
        var t,
            i,
            n,
            o = /[$]([0-9a-f]{4})/i,
            a = {};
        if (void 0 != e) {
            for (i in e.post)
                if (e.post.hasOwnProperty(i)) {
                    for (t = i; null !== (n = o.exec(t)); )
                        t = t.replace(n[0], String.fromCharCode(parseInt('0x' + n[1], 16)));
                    a[t] = e.post[i];
                }
            e.post = a;
        }
        return e;
    }),
    (SWFUpload.prototype.swfuploadPreload = function () {
        var e;
        if ('function' == typeof this.settings.swfupload_preload_handler)
            e = this.settings.swfupload_preload_handler.call(this);
        else if (void 0 != this.settings.swfupload_preload_handler) throw 'upload_start_handler must be a function';
        return void 0 === e && (e = !0), !!e;
    }),
    (SWFUpload.prototype.flashReady = function () {
        var e = this.cleanUp();
        return e
            ? void this.queueEvent('swfupload_loaded_handler')
            : void this.debug("Flash called back ready but the flash movie can't be found.");
    }),
    (SWFUpload.prototype.cleanUp = function () {
        var e,
            t = this.getMovieElement();
        try {
            if (t && 'unknown' == typeof t.CallFunction) {
                this.debug(
                    'Removing Flash functions hooks (this should only run in IE and should prevent memory leaks)',
                );
                for (e in t)
                    try {
                        'function' == typeof t[e] &&
                            !HTMLObjectElement.prototype[e] &&
                            e[0] >= 'A' &&
                            e[0] <= 'z' &&
                            (t[e] = null);
                    } catch (i) {}
            }
        } catch (n) {}
        return (
            (window.__flash__removeCallback = function (e, t) {
                try {
                    e && (e[t] = null);
                } catch (i) {}
            }),
            t
        );
    }),
    (SWFUpload.prototype.mouseClick = function () {
        this.queueEvent('mouse_click_handler');
    }),
    (SWFUpload.prototype.mouseOver = function () {
        this.queueEvent('mouse_over_handler');
    }),
    (SWFUpload.prototype.mouseOut = function () {
        this.queueEvent('mouse_out_handler');
    }),
    (SWFUpload.prototype.fileDialogStart = function () {
        this.queueEvent('file_dialog_start_handler');
    }),
    (SWFUpload.prototype.fileQueued = function (e) {
        (e = this.unescapeFilePostParams(e)), this.queueEvent('file_queued_handler', e);
    }),
    (SWFUpload.prototype.fileQueueError = function (e, t, i) {
        (e = this.unescapeFilePostParams(e)), this.queueEvent('file_queue_error_handler', [e, t, i]);
    }),
    (SWFUpload.prototype.fileDialogComplete = function (e, t, i) {
        this.queueEvent('file_dialog_complete_handler', [e, t, i]);
    }),
    (SWFUpload.prototype.uploadResizeStart = function (e, t) {
        (e = this.unescapeFilePostParams(e)),
            this.queueEvent('upload_resize_start_handler', [e, t.width, t.height, t.encoding, t.quality]);
    }),
    (SWFUpload.prototype.uploadStart = function (e) {
        (e = this.unescapeFilePostParams(e)), this.queueEvent('return_upload_start_handler', e);
    }),
    (SWFUpload.prototype.returnUploadStart = function (e) {
        var t;
        if ('function' == typeof this.settings.upload_start_handler)
            (e = this.unescapeFilePostParams(e)), (t = this.settings.upload_start_handler.call(this, e));
        else if (void 0 != this.settings.upload_start_handler) throw 'upload_start_handler must be a function';
        void 0 === t && (t = !0), (t = !!t), this.callFlash('ReturnUploadStart', [t]);
    }),
    (SWFUpload.prototype.uploadProgress = function (e, t, i) {
        (e = this.unescapeFilePostParams(e)), this.queueEvent('upload_progress_handler', [e, t, i]);
    }),
    (SWFUpload.prototype.uploadError = function (e, t, i) {
        (e = this.unescapeFilePostParams(e)), this.queueEvent('upload_error_handler', [e, t, i]);
    }),
    (SWFUpload.prototype.uploadSuccess = function (e, t, i) {
        (e = this.unescapeFilePostParams(e)), this.queueEvent('upload_success_handler', [e, t, i]);
    }),
    (SWFUpload.prototype.uploadComplete = function (e) {
        (e = this.unescapeFilePostParams(e)), this.queueEvent('upload_complete_handler', e);
    }),
    (SWFUpload.prototype.debug = function (e) {
        this.queueEvent('debug_handler', e);
    }),
    (SWFUpload.prototype.debugMessage = function (e) {
        var t, i, n;
        if (this.settings.debug)
            if (((i = []), 'object' == typeof e && 'string' == typeof e.name && 'string' == typeof e.message)) {
                for (n in e) e.hasOwnProperty(n) && i.push(n + ': ' + e[n]);
                (t = i.join('\n') || ''),
                    (i = t.split('\n')),
                    (t = 'EXCEPTION: ' + i.join('\nEXCEPTION: ')),
                    SWFUpload.Console.writeLine(t);
            } else SWFUpload.Console.writeLine(e);
    }),
    (SWFUpload.Console = {}),
    (SWFUpload.Console.writeLine = function (e) {
        var t, i;
        try {
            (t = document.getElementById('SWFUpload_Console')),
                t ||
                    ((i = document.createElement('form')),
                    document.getElementsByTagName('body')[0].appendChild(i),
                    (t = document.createElement('textarea')),
                    (t.id = 'SWFUpload_Console'),
                    (t.style.fontFamily = 'monospace'),
                    t.setAttribute('wrap', 'off'),
                    (t.wrap = 'off'),
                    (t.style.overflow = 'auto'),
                    (t.style.width = '700px'),
                    (t.style.height = '350px'),
                    (t.style.margin = '5px'),
                    i.appendChild(t)),
                (t.value += e + '\n'),
                (t.scrollTop = t.scrollHeight - t.clientHeight);
        } catch (n) {
            alert('Exception: ' + n.name + ' Message: ' + n.message);
        }
    }),
    (swfobject = (function () {
        function e() {
            if (!$) {
                try {
                    var e = F.getElementsByTagName('body')[0].appendChild(g('span'));
                    e.parentNode.removeChild(e);
                } catch (t) {
                    return;
                }
                $ = !0;
                for (var i = U.length, n = 0; i > n; n++) U[n]();
            }
        }
        function t(e) {
            $ ? e() : (U[U.length] = e);
        }
        function i(e) {
            if (typeof A.addEventListener != C) A.addEventListener('load', e, !1);
            else if (typeof F.addEventListener != C) F.addEventListener('load', e, !1);
            else if (typeof A.attachEvent != C) v(A, 'onload', e);
            else if ('function' == typeof A.onload) {
                var t = A.onload;
                A.onload = function () {
                    t(), e();
                };
            } else A.onload = e;
        }
        function n() {
            B ? o() : a();
        }
        function o() {
            var e = F.getElementsByTagName('body')[0],
                t = g(T);
            t.setAttribute('type', D);
            var i = e.appendChild(t);
            if (i) {
                var n = 0;
                !(function () {
                    if (typeof i.GetVariable != C) {
                        var o = i.GetVariable('$version');
                        o &&
                            ((o = o.split(' ')[1].split(',')),
                            (q.pv = [parseInt(o[0], 10), parseInt(o[1], 10), parseInt(o[2], 10)]));
                    } else if (10 > n) return n++, void setTimeout(arguments.callee, 10);
                    e.removeChild(t), (i = null), a();
                })();
            } else a();
        }
        function a() {
            var e = H.length;
            if (e > 0)
                for (var t = 0; e > t; t++) {
                    var i = H[t].id,
                        n = H[t].callbackFn,
                        o = {
                            success: !1,
                            id: i,
                        };
                    if (q.pv[0] > 0) {
                        var a = f(i);
                        if (a)
                            if (!y(H[t].swfVersion) || (q.wk && q.wk < 312))
                                if (H[t].expressInstall && s()) {
                                    var c = {};
                                    (c.data = H[t].expressInstall),
                                        (c.width = a.getAttribute('width') || '0'),
                                        (c.height = a.getAttribute('height') || '0'),
                                        a.getAttribute('class') && (c.styleclass = a.getAttribute('class')),
                                        a.getAttribute('align') && (c.align = a.getAttribute('align'));
                                    for (
                                        var u = {}, p = a.getElementsByTagName('param'), h = p.length, m = 0;
                                        h > m;
                                        m++
                                    )
                                        'movie' != p[m].getAttribute('name').toLowerCase() &&
                                            (u[p[m].getAttribute('name')] = p[m].getAttribute('value'));
                                    l(c, u, i, n);
                                } else d(a), n && n(o);
                            else b(i, !0), n && ((o.success = !0), (o.ref = r(i)), n(o));
                    } else if ((b(i, !0), n)) {
                        var g = r(i);
                        g && typeof g.SetVariable != C && ((o.success = !0), (o.ref = g)), n(o);
                    }
                }
        }
        function r(e) {
            var t = null,
                i = f(e);
            if (i && 'OBJECT' == i.nodeName)
                if (typeof i.SetVariable != C) t = i;
                else {
                    var n = i.getElementsByTagName(T)[0];
                    n && (t = n);
                }
            return t;
        }
        function s() {
            return !W && y('6.0.65') && (q.win || q.mac) && !(q.wk && q.wk < 312);
        }
        function l(e, t, i, n) {
            (W = !0),
                (E = n || null),
                (x = {
                    success: !1,
                    id: i,
                });
            var o = f(i);
            if (o) {
                'OBJECT' == o.nodeName ? ((k = c(o)), (N = null)) : ((k = o), (N = i)),
                    (e.id = M),
                    (typeof e.width == C || (!/%$/.test(e.width) && parseInt(e.width, 10) < 310)) && (e.width = '310'),
                    (typeof e.height == C || (!/%$/.test(e.height) && parseInt(e.height, 10) < 137)) &&
                        (e.height = '137'),
                    (F.title = F.title.slice(0, 47) + ' - Flash Player Installation');
                var a = q.ie && q.win ? 'ActiveX' : 'PlugIn',
                    r =
                        'MMredirectURL=' +
                        A.location.toString().replace(/&/g, '%26') +
                        '&MMplayerType=' +
                        a +
                        '&MMdoctitle=' +
                        F.title;
                if (
                    (typeof t.flashvars != C ? (t.flashvars += '&' + r) : (t.flashvars = r),
                    q.ie && q.win && 4 != o.readyState)
                ) {
                    var s = g('div');
                    (i += 'SWFObjectNew'),
                        s.setAttribute('id', i),
                        o.parentNode.insertBefore(s, o),
                        (o.style.display = 'none'),
                        (function () {
                            4 == o.readyState ? o.parentNode.removeChild(o) : setTimeout(arguments.callee, 10);
                        })();
                }
                u(e, t, i);
            }
        }
        function d(e) {
            if (q.ie && q.win && 4 != e.readyState) {
                var t = g('div');
                e.parentNode.insertBefore(t, e),
                    t.parentNode.replaceChild(c(e), t),
                    (e.style.display = 'none'),
                    (function () {
                        4 == e.readyState ? e.parentNode.removeChild(e) : setTimeout(arguments.callee, 10);
                    })();
            } else e.parentNode.replaceChild(c(e), e);
        }
        function c(e) {
            var t = g('div');
            if (q.win && q.ie) t.innerHTML = e.innerHTML;
            else {
                var i = e.getElementsByTagName(T)[0];
                if (i) {
                    var n = i.childNodes;
                    if (n)
                        for (var o = n.length, a = 0; o > a; a++)
                            (1 == n[a].nodeType && 'PARAM' == n[a].nodeName) ||
                                8 == n[a].nodeType ||
                                t.appendChild(n[a].cloneNode(!0));
                }
            }
            return t;
        }
        function u(e, t, i) {
            var n,
                o = f(i);
            if (q.wk && q.wk < 312) return n;
            if (o)
                if ((typeof e.id == C && (e.id = i), q.ie && q.win)) {
                    var a = '';
                    for (var r in e)
                        e[r] != Object.prototype[r] &&
                            ('data' == r.toLowerCase()
                                ? (t.movie = e[r])
                                : 'styleclass' == r.toLowerCase()
                                ? (a += ' class="' + e[r] + '"')
                                : 'classid' != r.toLowerCase() && (a += ' ' + r + '="' + e[r] + '"'));
                    var s = '';
                    for (var l in t)
                        t[l] != Object.prototype[l] && (s += '<param name="' + l + '" value="' + t[l] + '" />');
                    (o.outerHTML =
                        '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"' + a + '>' + s + '</object>'),
                        (j[j.length] = e.id),
                        (n = f(e.id));
                } else {
                    var d = g(T);
                    d.setAttribute('type', D);
                    for (var c in e)
                        e[c] != Object.prototype[c] &&
                            ('styleclass' == c.toLowerCase()
                                ? d.setAttribute('class', e[c])
                                : 'classid' != c.toLowerCase() && d.setAttribute(c, e[c]));
                    for (var u in t) t[u] != Object.prototype[u] && 'movie' != u.toLowerCase() && p(d, u, t[u]);
                    o.parentNode.replaceChild(d, o), (n = d);
                }
            return n;
        }
        function p(e, t, i) {
            var n = g('param');
            n.setAttribute('name', t), n.setAttribute('value', i), e.appendChild(n);
        }
        function h(e) {
            var t = f(e);
            t &&
                'OBJECT' == t.nodeName &&
                (q.ie && q.win
                    ? ((t.style.display = 'none'),
                      (function () {
                          4 == t.readyState ? m(e) : setTimeout(arguments.callee, 10);
                      })())
                    : t.parentNode.removeChild(t));
        }
        function m(e) {
            var t = f(e);
            if (t) {
                for (var i in t) 'function' == typeof t[i] && (t[i] = null);
                t.parentNode.removeChild(t);
            }
        }
        function f(e) {
            var t = null;
            try {
                t = F.getElementById(e);
            } catch (i) {}
            return t;
        }
        function g(e) {
            return F.createElement(e);
        }
        function v(e, t, i) {
            e.attachEvent(t, i), (R[R.length] = [e, t, i]);
        }
        function y(e) {
            var t = q.pv,
                i = e.split('.');
            return (
                (i[0] = parseInt(i[0], 10)),
                (i[1] = parseInt(i[1], 10) || 0),
                (i[2] = parseInt(i[2], 10) || 0),
                t[0] > i[0] || (t[0] == i[0] && t[1] > i[1]) || (t[0] == i[0] && t[1] == i[1] && t[2] >= i[2]) ? !0 : !1
            );
        }
        function w(e, t, i, n) {
            if (!q.ie || !q.mac) {
                var o = F.getElementsByTagName('head')[0];
                if (o) {
                    var a = i && 'string' == typeof i ? i : 'screen';
                    if ((n && ((I = null), (S = null)), !I || S != a)) {
                        var r = g('style');
                        r.setAttribute('type', 'text/css'),
                            r.setAttribute('media', a),
                            (I = o.appendChild(r)),
                            q.ie &&
                                q.win &&
                                typeof F.styleSheets != C &&
                                F.styleSheets.length > 0 &&
                                (I = F.styleSheets[F.styleSheets.length - 1]),
                            (S = a);
                    }
                    q.ie && q.win
                        ? I && typeof I.addRule == T && I.addRule(e, t)
                        : I && typeof F.createTextNode != C && I.appendChild(F.createTextNode(e + ' {' + t + '}'));
                }
            }
        }
        function b(e, t) {
            if (z) {
                var i = t ? 'visible' : 'hidden';
                $ && f(e) ? (f(e).style.visibility = i) : w('#' + e, 'visibility:' + i);
            }
        }
        function _(e) {
            var t = /[\\\"<>\.;]/,
                i = null != t.exec(e);
            return i && typeof encodeURIComponent != C ? encodeURIComponent(e) : e;
        }
        var k,
            N,
            E,
            x,
            I,
            S,
            C = 'undefined',
            T = 'object',
            L = 'Shockwave Flash',
            X = 'ShockwaveFlash.ShockwaveFlash',
            D = 'application/x-shockwave-flash',
            M = 'SWFObjectExprInst',
            P = 'onreadystatechange',
            A = window,
            F = document,
            O = navigator,
            B = !1,
            U = [n],
            H = [],
            j = [],
            R = [],
            $ = !1,
            W = !1,
            z = !0,
            q = (function () {
                var e =
                        typeof F.getElementById != C &&
                        typeof F.getElementsByTagName != C &&
                        typeof F.createElement != C,
                    t = O.userAgent.toLowerCase(),
                    i = O.platform.toLowerCase(),
                    n = i ? /win/.test(i) : /win/.test(t),
                    o = i ? /mac/.test(i) : /mac/.test(t),
                    a = /webkit/.test(t) ? parseFloat(t.replace(/^.*webkit\/(\d+(\.\d+)?).*$/, '$1')) : !1,
                    r = !1,
                    s = [0, 0, 0],
                    l = null;
                if (typeof O.plugins != C && typeof O.plugins[L] == T)
                    (l = O.plugins[L].description),
                        !l ||
                            (typeof O.mimeTypes != C && O.mimeTypes[D] && !O.mimeTypes[D].enabledPlugin) ||
                            ((B = !0),
                            (r = !1),
                            (l = l.replace(/^.*\s+(\S+\s+\S+$)/, '$1')),
                            (s[0] = parseInt(l.replace(/^(.*)\..*$/, '$1'), 10)),
                            (s[1] = parseInt(l.replace(/^.*\.(.*)\s.*$/, '$1'), 10)),
                            (s[2] = /[a-zA-Z]/.test(l) ? parseInt(l.replace(/^.*[a-zA-Z]+(.*)$/, '$1'), 10) : 0));
                else if (typeof A.ActiveXObject != C)
                    try {
                        var d = new ActiveXObject(X);
                        d &&
                            ((l = d.GetVariable('$version')),
                            l &&
                                ((r = !0),
                                (l = l.split(' ')[1].split(',')),
                                (s = [parseInt(l[0], 10), parseInt(l[1], 10), parseInt(l[2], 10)])));
                    } catch (c) {}
                return {
                    w3: e,
                    pv: s,
                    wk: a,
                    ie: r,
                    win: n,
                    mac: o,
                };
            })();
        (function () {
            q.w3 &&
                (((typeof F.readyState != C && 'complete' == F.readyState) ||
                    (typeof F.readyState == C && (F.getElementsByTagName('body')[0] || F.body))) &&
                    e(),
                $ ||
                    (typeof F.addEventListener != C && F.addEventListener('DOMContentLoaded', e, !1),
                    q.ie &&
                        q.win &&
                        (F.attachEvent(P, function () {
                            'complete' == F.readyState && (F.detachEvent(P, arguments.callee), e());
                        }),
                        A == top &&
                            !(function () {
                                if (!$) {
                                    try {
                                        F.documentElement.doScroll('left');
                                    } catch (t) {
                                        return void setTimeout(arguments.callee, 0);
                                    }
                                    e();
                                }
                            })()),
                    q.wk &&
                        !(function () {
                            return $
                                ? void 0
                                : /loaded|complete/.test(F.readyState)
                                ? void e()
                                : void setTimeout(arguments.callee, 0);
                        })(),
                    i(e)));
        })(),
            (function () {
                q.ie &&
                    q.win &&
                    window.attachEvent('onunload', function () {
                        for (var e = R.length, t = 0; e > t; t++) R[t][0].detachEvent(R[t][1], R[t][2]);
                        for (var i = j.length, n = 0; i > n; n++) h(j[n]);
                        for (var o in q) q[o] = null;
                        q = null;
                        for (var a in swfobject) swfobject[a] = null;
                        swfobject = null;
                    });
            })();
        return {
            registerObject: function (e, t, i, n) {
                if (q.w3 && e && t) {
                    var o = {};
                    (o.id = e),
                        (o.swfVersion = t),
                        (o.expressInstall = i),
                        (o.callbackFn = n),
                        (H[H.length] = o),
                        b(e, !1);
                } else
                    n &&
                        n({
                            success: !1,
                            id: e,
                        });
            },
            getObjectById: function (e) {
                return q.w3 ? r(e) : void 0;
            },
            embedSWF: function (e, i, n, o, a, r, d, c, p, h) {
                var m = {
                    success: !1,
                    id: i,
                };
                q.w3 && !(q.wk && q.wk < 312) && e && i && n && o && a
                    ? (b(i, !1),
                      t(function () {
                          (n += ''), (o += '');
                          var t = {};
                          if (p && typeof p === T) for (var f in p) t[f] = p[f];
                          (t.data = e), (t.width = n), (t.height = o);
                          var g = {};
                          if (c && typeof c === T) for (var v in c) g[v] = c[v];
                          if (d && typeof d === T)
                              for (var w in d)
                                  typeof g.flashvars != C
                                      ? (g.flashvars += '&' + w + '=' + d[w])
                                      : (g.flashvars = w + '=' + d[w]);
                          if (y(a)) {
                              var _ = u(t, g, i);
                              t.id == i && b(i, !0), (m.success = !0), (m.ref = _);
                          } else {
                              if (r && s()) return (t.data = r), void l(t, g, i, h);
                              b(i, !0);
                          }
                          h && h(m);
                      }))
                    : h && h(m);
            },
            switchOffAutoHideShow: function () {
                z = !1;
            },
            ua: q,
            getFlashPlayerVersion: function () {
                return {
                    major: q.pv[0],
                    minor: q.pv[1],
                    release: q.pv[2],
                };
            },
            hasFlashPlayerVersion: y,
            createSWF: function (e, t, i) {
                return q.w3 ? u(e, t, i) : void 0;
            },
            showExpressInstall: function (e, t, i, n) {
                q.w3 && s() && l(e, t, i, n);
            },
            removeSWF: function (e) {
                q.w3 && h(e);
            },
            createCSS: function (e, t, i, n) {
                q.w3 && w(e, t, i, n);
            },
            addDomLoadEvent: t,
            addLoadEvent: i,
            getQueryParamValue: function (e) {
                var t = F.location.search || F.location.hash;
                if (t) {
                    if ((/\?/.test(t) && (t = t.split('?')[1]), null == e)) return _(t);
                    for (var i = t.split('&'), n = 0; n < i.length; n++)
                        if (i[n].substring(0, i[n].indexOf('=')) == e) return _(i[n].substring(i[n].indexOf('=') + 1));
                }
                return '';
            },
            expressInstallCallback: function () {
                if (W) {
                    var e = f(M);
                    e &&
                        k &&
                        (e.parentNode.replaceChild(k, e),
                        N && (b(N, !0), q.ie && q.win && (k.style.display = 'block')),
                        E && E(x)),
                        (W = !1);
                }
            },
        };
    })()),
    swfobject.addDomLoadEvent(function () {
        'function' == typeof SWFUpload.onload && SWFUpload.onload.call(window);
    });
var Dimension = {
        getXY: function (e) {
            for (var t = 0, i = 0; e.offsetParent; ) (t += e.offsetLeft), (i += e.offsetTop), (e = e.offsetParent);
            return {
                x: t,
                y: i,
            };
        },
        getScrollTop: function () {
            return Math.max(document.documentElement.scrollTop, document.body.scrollTop);
        },
        getScrollLeft: function () {
            return Math.max(document.documentElement.scrollLeft, document.body.scrollLeft);
        },
        getScrollTopObj: function () {
            return 'CSS1Compat' != document.compatMode || XN.browser.WebKit ? document.body : document.documentElement;
        },
        getViewportHeight: function () {
            if ('undefined' != typeof window.innerHeight) var e = window.innerHeight;
            else if (
                'undefined' != typeof document.documentElement &&
                'undefined' != typeof document.documentElement.clientHeight &&
                0 != document.documentElement.clientHeight
            )
                var e = document.documentElement.clientHeight;
            else var e = document.getElementsByTagName('body')[0].clientHeight;
            return e;
        },
        getViewportWidth: function () {
            if ('undefined' != typeof window.innerWidth) var e = window.innerWidth;
            else if (
                'undefined' != typeof document.documentElement &&
                'undefined' != typeof document.documentElement.clientWidth &&
                0 != document.documentElement.clientWidth
            )
                var e = document.documentElement.clientWidth;
            else var e = document.getElementsByTagName('body')[0].clientWidth;
            return e;
        },
        getDocumentHeight: function () {
            var e = document.body,
                t = document.documentElement;
            return Math.max(e.scrollHeight, e.offsetHeight, t.clientHeight, t.scrollHeight, t.offsetHeight);
        },
    },
    Coordinate = {
        getPageY: function (e) {
            return e.pageY ? e.pageY : e.clientY + Dimension.getScrollTop();
        },
        getPageX: function (e) {
            return e.pageX ? e.pageX : e.clientX + Dimension.getScrollLeft();
        },
    },
    DS = {
        getData: function (e) {
            return CoverInfo[e] ? CoverInfo[e] : void 0;
        },
        syncData: function (e, t) {
            CoverInfo.hasOwnProperty(e) && (CoverInfo[e] = t);
        },
        hasProp: function (e) {
            return CoverInfo[e] ? '0' != CoverInfo[e] && '' != CoverInfo[e] : void 0;
        },
    };
object.define('xn/profile/log', 'dom, events, net, ua', function (require, e) {
    var t = (require('dom'), require('events'), require('net')),
        i = require('ua');
    e.actionLog = new Class(function () {
        (this.limitCount = 10),
            (this.limitTime = 15e3),
            (this.logAry = []),
            (this.startTime = new Date().getTime()),
            (this.interval = null),
            (this.sendLog = function (e, i) {
                new t.Request({
                    url: 'http://www.' + XN.env.domain + '/profileLogger/send',
                    method: 'post',
                    onsuccess: function (e) {},
                    onerror: function () {},
                }).send('log=' + i);
            }),
            (this.writeLog = function (e, t) {
                object.extend(t, {
                    sendUserId: uid,
                    getUserId: profileOwnerId,
                    needRecordRelation: t.needRecordRelation || !1,
                }),
                    (t = JSON.stringify(t)),
                    e.logAry.length <= 0 && ((e.startTime = new Date().getTime()), e.isTimeout()),
                    e.logAry.push(t),
                    e.isCountout();
            }),
            (this.transformLog = function (e) {
                var t = '[' + e.logAry.join(',') + ']';
                return t;
            }),
            (this.isCountout = function (e) {
                e.logAry.length >= e.limitCount && e.sendAndReset();
            }),
            (this.isTimeout = function (e) {
                e.interval = setInterval(function () {
                    new Date().getTime() - e.startTime >= e.limitTime && e.sendAndReset();
                }, 1e3);
            }),
            (this.sendLogBeforePageUnload = function (e) {
                if ((e.sendAndReset(), i.ua.ie)) setTimeout(function () {}, 1e3);
                else for (var t = 0; 1e6 > t; t++);
            }),
            (this.sendAndReset = function (e) {
                e.logAry.length > 0 && e.sendLog(e.transformLog()),
                    (e.logAry = []),
                    e.interval && (clearInterval(e.interval), (e.interval = null));
            }),
            (this.initialize = function (e) {
                window.addEvent('unload', function () {
                    e.sendLogBeforePageUnload();
                }),
                    window.addEvent('beforeunload', function () {
                        e.sendLogBeforePageUnload();
                    });
            });
    });
}),
    object.define('xn/profile/ufa', 'dom, events', function (require, e) {
        var t = require('dom'),
            i =
                (require('events'),
                {
                    reqAlbum: function (e) {
                        new XN.net.xmlhttp({
                            url: 'http://photo.' + XN.env.domain + '/photo/' + uid + '/album/common/ajax',
                            method: 'get',
                            useCache: !0,
                            onSuccess: function (t) {
                                var i = XN.json.parse(t.responseText);
                                if ('0' == i.code) for (var n in i.list) i.list.hasOwnProperty(n) && e(i.list[n]);
                                else new XN.DO.showMsg(i.code);
                            },
                            onError: function () {
                                new XN.DO.showMsg('通信错误');
                            },
                        });
                    },
                    reqPhoto: function (e, t) {
                        new XN.net.xmlhttp({
                            url: 'http://photo.' + XN.env.domain + '/photo/' + uid + '/album-' + e + '/list',
                            method: 'get',
                            useCache: !0,
                            onSuccess: function (e) {
                                var i = XN.json.parse(e.responseText);
                                if ('0' == i.code) for (var n in i.list) i.list.hasOwnProperty(n) && t(i.list[n]);
                                else new XN.DO.showMsg(i.code);
                            },
                            onError: function () {
                                new XN.DO.showMsg('通信错误');
                            },
                        });
                    },
                });
        (e.upFromAlbum = function (e, t) {
            (this.uploadMixinObj = e), (this.config = t || {}), (this.allImgData = []);
        }),
            (e.upFromAlbum.prototype = {
                ejectAlbumLayer: function () {
                    var e = this;
                    (this.uploadMixinObj.dialog = new XN.DO.confirm({
                        title: '选择照片',
                        width: 620,
                        message:
                            '<h1 class="clearfix album_title"><span id="album_name">全部相册</span><a href="#nogo" id="backto_album">查看所有相册</a></h1>',
                        callback: function (t) {
                            t && e.uploadMixinObj.uploadFromAlbumCallback.call(e.uploadMixinObj);
                        },
                    })),
                        this.config.fromLe || (this.uploadMixinObj.dialog._buttons[0].frame.style.display = 'none');
                    var i = document.createElement('ul');
                    i.className = 'album_con clearfix';
                    var n = document.createElement('ul');
                    if (((n.className = 'photo_con clearfix'), this.config.fromLe)) {
                        var o = document.createElement('span');
                        (o.innerHTML = '<input type="checkbox" /> 全选'),
                            (o.className = 'select-all-btn'),
                            (this.selectAllBtn = o),
                            (this.selectAllCB = t.getElement('input', o)),
                            this.uploadMixinObj.dialog.body.appendChild(o),
                            XN.event.addEvent(this.selectAllCB, 'click', function (t) {
                                var i = XN.event.element(t);
                                i.checked ? e.uploadMixinObj.selectAllImg() : e.uploadMixinObj.deselectAllImg();
                            });
                    }
                    this.uploadMixinObj.dialog.body.appendChild(i), this.uploadMixinObj.dialog.body.appendChild(n);
                    var a = $('album_name'),
                        r = $('backto_album');
                    XN.event.addEvent(r, 'click', function () {
                        (i.style.display = 'block'),
                            (n.style.display = 'none'),
                            (r.style.display = 'none'),
                            (a.innerHTML = '全部相册'),
                            e.config.fromLe && (e.selectAllBtn.style.display = 'none');
                    }),
                        this.loadAlbum({
                            album: i,
                            photo: n,
                            albumName: a,
                            backtoAlbum: r,
                        });
                },
                loadAlbum: function (e) {
                    function t(t) {
                        var i = document.createElement('li');
                        i.setAttribute('data-id', t.id),
                            (i.innerHTML =
                                '<div><img src="' +
                                t.headurl +
                                '" /></div><p>' +
                                (t.name.length > 8 ? t.name.substr(0, 7) + '...' : t.name) +
                                '</p>'),
                            e.album.appendChild(i),
                            XN.event.addEvent(i, 'click', function (i) {
                                var o = XN.event.element(i);
                                'li' != o.tagName.toLowerCase() && (o = XN.element.parent(o, 'li')),
                                    n.loadPhoto(e.photo, o.getAttribute('data-id')),
                                    (e.albumName.innerHTML = t.name),
                                    (e.album.style.display = 'none'),
                                    (e.photo.style.display = 'block'),
                                    (e.backtoAlbum.style.display = 'block'),
                                    (n.allImgData = []),
                                    (n.uploadMixinObj.albumDataSource = []);
                            });
                    }
                    i.reqAlbum(t);
                    var n = this;
                },
                loadPhoto: function (e, t) {
                    function n(t) {
                        var i = document.createElement('li');
                        (i.innerHTML = '<img src="' + t.mainUrl + '" data-source="' + t.largeUrl + '" />'),
                            e.appendChild(i),
                            o.allImgData.push({
                                album: t.album,
                                photo: t.id,
                            }),
                            XN.event.addEvent(i, 'click', function (e) {
                                var i = XN.event.element(e);
                                (i = 'li' == i.tagName.toLowerCase() ? i : i.parentNode),
                                    o.config.fromLe
                                        ? o.uploadMixinObj.chooseImgFromAlbum(t, i)
                                        : o.uploadMixinObj.uploadFromAlbumCallback(t),
                                    o.uploadMixinObj.dialog && !o.config.fromLe && o.uploadMixinObj.dialog.remove();
                            }),
                            o.config.fromLe &&
                                (XN.event.addEvent(i, 'mouseover', function (e) {
                                    var t = XN.event.element(e);
                                    (t = 'li' == t.tagName.toLowerCase() ? t : t.parentNode),
                                        o.uploadMixinObj.showAlbumImgAddView(t);
                                }),
                                XN.event.addEvent(i, 'mouseleave', function (e) {
                                    var t = XN.event.element(e);
                                    (t = 'li' == t.tagName.toLowerCase() ? t : t.parentNode),
                                        o.uploadMixinObj.hideAlbumImgAddView(t);
                                }));
                    }
                    var o = this;
                    (e.innerHTML = ''),
                        i.reqPhoto(t, n),
                        o.config.fromLe && ((o.selectAllBtn.style.display = 'block'), (o.selectAllCB.checked = !1));
                },
            });
    }),
    object.define('xn/profile/ufl', 'dom, events', function (require, e) {
        require('dom'), require('events');
        (e.upFromLocal = function (e, t) {
            (this.uploadMixinObj = e), (this.uploadConfig = t);
        }),
            (e.upFromLocal.prototype = {
                initFlashUpload: function (e) {
                    var t = this;
                    (this.isMultiple = e),
                        (this.swfu = new SWFUpload({
                            flash_url: this.uploadConfig.flash_url,
                            file_size_limit: '15 MB',
                            file_types: '*.jpg;*.jpeg;' + (e ? '' : '*.gif;') + '*.png;*.bmp',
                            file_types_description: 'All Image Type',
                            file_upload_limit: 0,
                            file_queue_limit: 0,
                            button_width: this.uploadConfig.button_width,
                            button_height: this.uploadConfig.button_height,
                            button_placeholder_id: this.uploadConfig.button_placeholder_id,
                            button_window_mode: SWFUpload.WINDOW_MODE.TRANSPARENT,
                            button_cursor: SWFUpload.CURSOR.HAND,
                            button_action: e
                                ? SWFUpload.BUTTON_ACTION.SELECT_FILES
                                : SWFUpload.BUTTON_ACTION.SELECT_FILE,
                            file_dialog_start_handler: function () {
                                t.uploadMixinObj.combobox && (t.uploadMixinObj.combobox.fileDialogOpen = !0);
                            },
                            file_dialog_complete_handler: function (e) {
                                e > 0 && t.uploadMixinObj.beforeStartUpload.call(t.uploadMixinObj, this),
                                    t.uploadMixinObj.combobox && (t.uploadMixinObj.combobox.fileDialogOpen = !1);
                            },
                            file_queued_handler: function () {},
                            file_queue_error_handler: function (e, i, n) {
                                '-110' == i && new XN.DO.showError('图片不能超过15Mb!'),
                                    '-120' == i && new XN.DO.showError('不能上传0字节的图片！'),
                                    setTimeout(function () {
                                        t.uploadMixinObj.removeLoading.call(t.uploadMixinObj);
                                    }, 100);
                            },
                            upload_start_handler: function (e) {
                                t.uploadMixinObj.uploadStart &&
                                    t.uploadMixinObj.uploadStart.call(t.uploadMixinObj, this);
                            },
                            upload_error_handler: function (e, t, i) {},
                            upload_progress_handler: function (e, i, n) {
                                t.uploadMixinObj.uploadProgress &&
                                    t.uploadMixinObj.uploadProgress.call(t.uploadMixinObj, this, i, n);
                            },
                            upload_success_handler: function (e, i) {
                                var n = XN.json.parse(i).files[0].images,
                                    o = [],
                                    a = !0;
                                n.length <= 0 &&
                                    (t.uploadMixinObj.removeLoading.call(t.uploadMixinObj),
                                    new XN.DO.showError('图片上传失败！'),
                                    (a = !1));
                                var r = this.getStats();
                                a &&
                                    (n.forEach(function (e, t) {
                                        o.push({
                                            width: e.width,
                                            src: e.url,
                                        });
                                    }),
                                    o.sort(function (e, t) {
                                        return parseInt(e.width) > parseInt(t.width) ? -1 : 1;
                                    }),
                                    t.isMultiple
                                        ? t.uploadMixinObj.uploadSuccess.call(
                                              t.uploadMixinObj,
                                              this,
                                              'http://fmn.rrimg.com/' + o[0].src,
                                              r.successful_uploads,
                                              i,
                                          )
                                        : t.uploadMixinObj.uploadSuccess.call(
                                              t.uploadMixinObj,
                                              'http://fmn.rrimg.com/' + o[0].src,
                                              i,
                                          )),
                                    r.files_queued > 0
                                        ? this.startUpload()
                                        : t.uploadMixinObj.uploadComplete &&
                                          t.uploadMixinObj.uploadComplete.call(t.uploadMixinObj, this);
                            },
                        }));
                },
            });
    }),
    object.define('xn/profile/handlePhoto', 'dom, events', function (require, e) {
        var t = require('dom'),
            i =
                (require('events'),
                {
                    getPageY: function (e) {
                        return e.pageY ? e.pageY : e.clientY + Dimension.getXY(e.target || e.srcElement).y;
                    },
                    getPageX: function (e) {
                        return e.pageX ? e.pageX : e.clientX + Dimension.getXY(e.target || e.srcElement).x;
                    },
                }),
            n = {
                savePhoto: function (e, t, i, n) {
                    new XN.net.xmlhttp({
                        url: 'http://upload.' + XN.env.domain + '/facade/common/upload/' + XN.user.id + '/photo/save',
                        method: 'post',
                        data: e,
                        onSuccess: function (e) {
                            var o = XN.json.parse(e.responseText);
                            '0' == o.code
                                ? t && '0' != t
                                    ? i.call(n, o.photoIds, t)
                                    : i.call(n, o.photoIds, o.albumId)
                                : new XN.DO.showError(o.msg);
                        },
                        onError: function () {
                            new XN.DO.showMsg('通信错误');
                        },
                    });
                },
            };
        (e.photoHandle = function (e, t, i, n) {
            (this.imgCon = e || null),
                (this.standardWidth = t || 0),
                (this.standardHeight = i || 0),
                (this.mixinObject = n || null),
                (this.dragMode = !1);
        }),
            (e.photoHandle.prototype = {
                bindDragPhotoEvent: function (e, n) {
                    var o = this,
                        e = e || this.imgCon;
                    t.wrap(e).delegate('img', 'mousedown', function (t) {
                        function a(e) {
                            o.dragMode &&
                                (window.event && (window.event.returnValue = !1),
                                o.dragPhoto(e, o.imgRotate, o.imgWHDis),
                                n && o.dragPhotoX(e, o.imgRotate, o.imgWHDis));
                        }
                        function r(e) {
                            o.dragMode && ((o.dragMode = !1), (o.draggedImage = null)),
                                XN.event.delEvent(document, 'mousemove', a),
                                XN.event.delEvent(document, 'mouseup', r);
                        }
                        t.preventDefault(),
                            ((o.mixinObject && o.mixinObject.editMode) || !o.mixinObject) &&
                                ((o.dragMode = !0),
                                (o.draggedImage = XN.event.element(t)),
                                (o.imgConStartPoint = Dimension.getXY(e).y),
                                (o.dragStartPoint = i.getPageY(t) - o.imgConStartPoint),
                                (o.draggedHeight = o.draggedImage.parentNode.clientHeight),
                                n && (o.imgConStartPointX = Dimension.getXY(e).x),
                                n && (o.dragStartPointX = i.getPageX(t) - o.imgConStartPointX),
                                n && (o.draggedWidth = o.draggedImage.parentNode.clientWidth),
                                (o.imgRotate = parseInt(o.draggedImage.className.substring(3))),
                                (o.imgWHDis = 0.5 * (o.draggedImage.width - o.draggedImage.height))),
                            XN.event.addEvent(document, 'mousemove', a),
                            XN.event.addEvent(document, 'mouseup', r);
                    });
                },
                dragPhoto: function (e, t, n) {
                    var o = i.getPageY(e) - this.imgConStartPoint,
                        a = o - this.dragStartPoint,
                        r = this.draggedImage.style.marginTop,
                        r = '' == r ? 0 : r,
                        s = parseInt(r);
                    if (90 == t || 270 == t)
                        var l = this.draggedImage.width,
                            d = l - this.draggedHeight - n,
                            c = n;
                    else
                        var l = this.draggedImage.height,
                            d = l - this.draggedHeight,
                            c = 0;
                    (this.dragStartPoint = o),
                        a >= 0 ? (s += Math.abs(a)) : (s -= Math.abs(a)),
                        s >= c && (s = c),
                        -d >= s && (s = -d),
                        (this.draggedImage.style.marginTop = s + 'px');
                },
                dragPhotoX: function (e, t, n) {
                    var o = i.getPageX(e) - this.imgConStartPointX,
                        a = o - this.dragStartPointX,
                        r = this.draggedImage.style.marginLeft,
                        r = '' == r ? 0 : r,
                        s = parseInt(r);
                    if (90 == t || 270 == t)
                        var l = this.draggedImage.height,
                            d = l - this.draggedWidth + n,
                            c = -n;
                    else
                        var l = this.draggedImage.width,
                            d = l - this.draggedWidth,
                            c = 0;
                    (this.dragStartPointX = o),
                        a >= 0 ? (s += Math.abs(a)) : (s -= Math.abs(a)),
                        s >= c && (s = c),
                        -d >= s && (s = -d),
                        (this.draggedImage.style.marginLeft = s + 'px');
                },
                scaleMovePhoto: function (e, t, i) {
                    var n = e.width,
                        o = e.height,
                        a = (o * this.standardWidth) / n;
                    if (a >= this.standardHeight) (n = this.standardWidth), (o = a);
                    else {
                        var r = o;
                        (o = this.standardHeight), (n = (n * this.standardHeight) / r);
                    }
                    (e.width = n),
                        (e.height = o),
                        t
                            ? 'cover' == i
                                ? (e.style.marginTop = -(Math.round(t * o) - 208) + 'px')
                                : (e.style.marginTop = -Math.round(t * o) + 'px')
                            : (e.style.marginTop = '0px'),
                        (e.style.display = 'block');
                },
                photoToDb: function (e, t, i, o, a, r) {
                    var s = {
                            type: '',
                            desc: '',
                            url: '',
                        },
                        l = 'sourceJson=' + JSON.stringify(s) + '&sendFeed=0&photos=';
                    (l += isArray(e)
                        ? encodeURIComponent('[' + e.join(',') + ']')
                        : encodeURIComponent(JSON.stringify(XN.json.parse(e).files))),
                        a && '0' != a
                            ? (l += '&flag=0&album.id=' + a)
                            : ((l += '&flag=1&album.control=99&album.name=' + encodeURIComponent(t)),
                              r && (l += '&album.type=' + r)),
                        n.savePhoto(l, a, i, o);
                },
            });
    }),
    object.define(
        'xn/profile/Cover',
        'dom, events, xn/profile/comboBox, xn/profile/handlePhoto',
        function (require, e) {
            var t = (require('dom'), require('events'), require('xn/profile/comboBox')),
                i = require('xn/profile/handlePhoto'),
                n = {
                    createAlbum: function (e, t) {
                        new XN.net.xmlhttp({
                            url: 'http://photo.' + XN.env.domain + '/ajaxcreatealbum.do',
                            method: 'post',
                            data:
                                'title=' +
                                encodeURIComponent('封面相册') +
                                '&control=99&password=&passwordProtected=false',
                            onSuccess: function (i) {
                                var n = XN.json.parse(i.responseText);
                                DS.syncData('albumid', n.albumid), e.call(t, null, n.albumid);
                            },
                            onError: function () {
                                new XN.DO.showMsg('通信错误');
                            },
                        });
                    },
                    saveCoverImage: function (e, t, i, n) {
                        var o = DS.hasProp('photoid') ? 'ecp' : 'ccp';
                        new XN.net.xmlhttp({
                            url: 'http://www.' + XN.env.domain + '/cover/' + o,
                            method: 'post',
                            data: 'option=&headWidth=142' + e,
                            onSuccess: function (e) {
                                var o = XN.json.parse(e.responseText);
                                '1' == o.code || '4' == o.code ? t.call(n, o.code) : i.call(n);
                            },
                            onError: function () {
                                new XN.DO.showMsg('通信错误');
                            },
                        });
                    },
                    deleteCoverImage: function (e, t) {
                        new XN.net.xmlhttp({
                            url: 'http://www.' + XN.env.domain + '/cover/dcp',
                            method: 'post',
                            data: 'userId=' + DS.getData('uid'),
                            onSuccess: function (i) {
                                var n = XN.json.parse(i.responseText);
                                '1' == n.code ? e.call(t, t) : new XN.DO.showMsg(n.msg);
                            },
                            onError: function () {
                                new XN.DO.showMsg('通信错误');
                            },
                        });
                    },
                    isAlbumExist: function (e, t) {
                        new XN.net.xmlhttp({
                            url: 'http://www.' + XN.env.domain + '/cover/isAlbumExisted',
                            method: 'get',
                            data: 'albumId=' + e,
                            onSuccess: function (e) {
                                var i = XN.json.parse(e.responseText).albumId;
                                t(i);
                            },
                            onError: function () {
                                new XN.DO.showMsg('通信错误');
                            },
                        });
                    },
                    coverLike: function (e, t, i, n) {
                        new XN.net.xmlhttp({
                            url: 'http://like.' + XN.env.domain + '/' + e,
                            method: 'get',
                            data: t,
                            onSuccess: function (e) {
                                var t = XN.json.parse(e.responseText);
                                '0' == t.code ? i.call(n, t) : new XN.DO.showMsg(t.msg);
                            },
                            onError: function () {
                                new XN.DO.showMsg('通信错误');
                            },
                        });
                    },
                };
            (e.Cover = function () {
                (this.standardWidth = 860),
                    (this.standardHeight = 310),
                    (this.minimumWidth = 399),
                    (this.coverOuterCon = $('cover')),
                    (this.buttonArea = $('func_area')),
                    (this.friendOperateArea = Sizzle('.friend-area')[0]),
                    (this.saveButton = $('save_action')),
                    (this.cancelButton = $('cancel_action')),
                    (this.editInfoBtn = Sizzle('.editinfo')[0]),
                    DS.hasProp('photoid') && (this.photoid = DS.getData('photoid')),
                    (this.editMode = !1),
                    (this.dragMode = !1),
                    (this.uploadInProgress = !1),
                    (this.combobox = new t.ComboBox(this)),
                    (this.wScale = 0),
                    (this.hScale = 0),
                    (this.handlePhotoObj = new i.photoHandle(
                        this.coverOuterCon,
                        this.standardWidth,
                        this.standardHeight,
                        this,
                    )),
                    (this.logger = window.profileActionLog),
                    (this.baseLogObj = {
                        sourceTag: 'photo',
                    }),
                    (this.swfuploading = !1),
                    (this.likeCount = 0),
                    this.init();
            }),
                (e.Cover.prototype = {
                    init: function () {
                        isYourself() ? this.initSelf() : this.initOther(), this.doLike('showlike');
                    },
                    initSelf: function () {
                        this.initCover(), this.handlePhotoObj.bindDragPhotoEvent(), this.bindButtonActionEvent();
                    },
                    initOther: function () {
                        this.initCover();
                    },
                    initCover: function () {
                        DS.hasProp('photoid')
                            ? this.handleCoverImage(
                                  DS.getData('coverAddress'),
                                  DS.getData('coverScale'),
                                  'noReposition',
                              )
                            : (isYourself() && this.createNormalCover(), this.combobox.createBox());
                    },
                    setImageWHScale: function (e) {
                        (this.wScale = this.standardWidth / (e.width < 1024 ? e.width : 1024)),
                            (this.hScale = this.standardHeight / e.height);
                    },
                    createNormalCover: function () {
                        var e = document.createElement('div'),
                            t = document.createElement('img');
                        (e.id = 'normal_cover'),
                            (e.className = 'normal_cover'),
                            (t.src = 'http://s.xnimg.cn/apps/profile2/res/cover/cover_guide2.png'),
                            e.appendChild(t),
                            this.coverOuterCon.appendChild(e);
                    },
                    createCoverImage: function (e, t, i) {
                        var n = document.createElement('div'),
                            o = document.createElement('img'),
                            a = this;
                        (n.id = 'cover_image'),
                            XN.event.addEvent(o, 'load', function () {
                                a.setImageWHScale(o),
                                    a.removeLoading(),
                                    $('normal_cover') && $('normal_cover').remove(),
                                    n.appendChild(o),
                                    a.coverOuterCon.appendChild(n),
                                    (a.coverImage = o),
                                    (a.coverCon = n),
                                    a.handlePhotoObj.scaleMovePhoto(o, t, 'cover'),
                                    i ? a.combobox.createBox() : a.repositionCover(),
                                    window.timelineTopAttachBar && window.timelineTopAttachBar.setThresholdY();
                            }),
                            (o.src = e),
                            a.navigateToCoverUrl(o);
                    },
                    resetCoverImage: function (e, t, i) {
                        var n = document.createElement('img'),
                            o = this;
                        XN.event.addEvent(n, 'load', function () {
                            o.setImageWHScale(n),
                                o.removeLoading(),
                                o.checkCoverImageWidth(n) &&
                                    (o.coverImage.parentNode.replaceChild(n, o.coverImage),
                                    (o.coverImage = n),
                                    o.handlePhotoObj.scaleMovePhoto(n, t, 'cover'),
                                    i || o.repositionCover(),
                                    window.timelineTopAttachBar && window.timelineTopAttachBar.setThresholdY());
                        }),
                            (n.src = e),
                            o.navigateToCoverUrl(n);
                    },
                    handleCoverImage: function (e, t, i) {
                        this.addLoading(),
                            this.coverCon ? this.resetCoverImage(e, t, i) : this.createCoverImage(e, t, i);
                    },
                    checkCoverImageWidth: function (e) {
                        return e.width < 399 || e.height < 310 || e.width / e.height < 0.33
                            ? (e.width < 399
                                  ? new XN.DO.showError('图片宽度不能小于399像素!')
                                  : e.height < 310
                                  ? new XN.DO.showError('图片高度不能小于310像素!')
                                  : e.width / e.height < 0.33 && new XN.DO.showError('图片宽高比不能小于1/3!'),
                              this.uploadInProgress && (this.uploadInProgress = !1),
                              !1)
                            : !0;
                    },
                    addLoading: function () {
                        if (!this.loadingIndicator) {
                            var e = 16,
                                t = 11,
                                i = this.standardWidth,
                                n = this.coverOuterCon.clientHeight,
                                o = 0.5 * (n - t),
                                a = 0.5 * (i - e),
                                r = document.createElement('img');
                            (r.className = 'cover_loading'),
                                (r.src = 'http://s.xnimg.cn/apps/profile2/res/timeline/feed_loading.gif'),
                                (r.style.top = o + 'px'),
                                (r.style.left = a + 'px'),
                                this.coverOuterCon.appendChild(r),
                                (this.loadingIndicator = r),
                                this.coverImage && this.coverImage.setOpacity && this.coverImage.setOpacity(0.2);
                        }
                    },
                    removeLoading: function () {
                        this.loadingIndicator && this.loadingIndicator.parentNode.removeChild(this.loadingIndicator),
                            this.coverImage && this.coverImage.setOpacity(1),
                            (this.loadingIndicator = null);
                    },
                    enterEditMode: function () {
                        (this.buttonArea.style.display = 'block'),
                            (this.friendOperateArea.style.display = 'none'),
                            this.editInfoBtn && (this.editInfoBtn.style.display = 'none'),
                            this.combobox.hideBox(),
                            XN.element.addClass(this.coverOuterCon, 'drag_mode'),
                            (this.editMode = !0);
                    },
                    escapeEditMode: function () {
                        (this.buttonArea.style.display = 'none'),
                            (this.friendOperateArea.style.display = 'block'),
                            window.nx && (Sizzle('.comboBox')[0].style.display = 'block'),
                            this.editInfoBtn && (this.editInfoBtn.style.display = 'block'),
                            this.dragIndicator && (this.dragIndicator.style.display = 'none'),
                            XN.element.delClass(this.coverOuterCon, 'drag_mode'),
                            (this.editMode = !1),
                            this.combobox.hideDropDown();
                    },
                    bindButtonActionEvent: function () {
                        var e = this;
                        XN.event.addEvent(this.saveButton, 'click', function () {
                            e.saveAction();
                        }),
                            XN.event.addEvent(this.cancelButton, 'click', function () {
                                e.cancelAction();
                            });
                    },
                    saveAction: function (e) {
                        var t = this;
                        if (
                            (e &&
                                ((this.extraData = e),
                                (this.coverImage = Sizzle('#cover_image img')[0]),
                                (this.coverImage.style.marginTop = 0)),
                            this.escapeEditMode(),
                            this.uploadInProgress)
                        ) {
                            var i = DS.getData('albumid');
                            '' != i &&
                                n.isAlbumExist(i, function (e) {
                                    '0' == e && (i = ''),
                                        t.handlePhotoObj.photoToDb(t.serverData, '封面相册', t.saveCover, t, i),
                                        t.logger.writeLog(
                                            object.extend(t.baseLogObj, {
                                                actionTag: 'upload',
                                                targetTag: 'cover_local',
                                            }),
                                        );
                                });
                        } else
                            DS.hasProp('albumid')
                                ? (this.saveCover(),
                                  this.logger.writeLog(
                                      object.extend(this.baseLogObj, {
                                          actionTag: 'select',
                                          targetTag: 'cover_online',
                                      }),
                                  ))
                                : (n.createAlbum(this.saveCover, this),
                                  this.logger.writeLog(
                                      object.extend(this.baseLogObj, {
                                          actionTag: 'select',
                                          targetTag: 'cover_online',
                                      }),
                                  ));
                    },
                    saveCover: function (e, t) {
                        e && (this.photoid = e), t && DS.syncData('albumid', t);
                        var i = Math.abs(parseInt(this.coverImage.style.marginTop)),
                            o = i,
                            a = (i + 208) / this.coverImage.height,
                            r = 20 / this.coverImage.width,
                            s =
                                '&mTop=' +
                                o +
                                '&wScale=' +
                                this.wScale +
                                '&hScale=' +
                                this.hScale +
                                '&xScale=' +
                                r +
                                '&yScale=' +
                                a +
                                '&albumId=' +
                                DS.getData('albumid'),
                            l = this;
                        (s += this.extraData ? this.extraData : '&photoId=' + this.photoid),
                            this.addLoading(),
                            n.saveCoverImage(
                                s,
                                function (e) {
                                    if (
                                        (DS.syncData('coverAddress', l.coverImage.src),
                                        DS.syncData('coverScale', a),
                                        DS.hasProp('photoid') ||
                                            (DS.syncData('photoid', l.photoid),
                                            l.combobox.destroyBox(),
                                            l.combobox.createBox()),
                                        s.photoId && DS.syncData('photoid', s.photoId),
                                        l.removeLoading(),
                                        l.doLike('showlike'),
                                        '4' == e || l.extraData)
                                    )
                                        return void (l.extraData = null);
                                    if (window.globalTimeline) {
                                        var t = new Date().getFullYear(),
                                            i = new Date().getMonth() + 1,
                                            n = new Date().getDate();
                                        window.globalTimeline.submitFeedCallback.call(
                                            window.globalTimeline,
                                            l.photoid,
                                            '1206',
                                            t,
                                            i,
                                            n,
                                        );
                                    }
                                },
                                function () {},
                                this,
                            ),
                            (this.uploadInProgress = !1);
                    },
                    cancelAction: function () {
                        this.escapeEditMode(),
                            (this.uploadInProgress = !1),
                            DS.hasProp('photoid')
                                ? this.resetCoverImage(
                                      DS.getData('coverAddress'),
                                      DS.getData('coverScale'),
                                      'noReposition',
                                  )
                                : this.destroyCoverImage('noConfirm');
                    },
                    beforeStartUpload: function (e) {
                        (this.swfu = e), this.addLoading(), this.startUpload();
                    },
                    startUpload: function () {
                        (this.swfuploading = !0),
                            this.swfu.setUploadURL(
                                'http://upload.' +
                                    XN.env.domain +
                                    '/upload.fcgi?pagetype=addphotoflash&hostid=' +
                                    DS.getData('uid') +
                                    '&uploadid=' +
                                    new Date().getTime() +
                                    '&tick=' +
                                    DS.getData('uploadCoverMd5String'),
                            ),
                            this.swfu.startUpload();
                    },
                    uploadSuccess: function (e, t) {
                        (this.swfuploading = !1),
                            this.handleCoverImage(e),
                            (this.serverData = t),
                            (this.uploadInProgress = !0);
                    },
                    uploadFromAlbumCallback: function (e) {
                        this.handleCoverImage(e.largeUrl), (this.photoid = e.id);
                    },
                    repositionCover: function () {
                        if ((this.enterEditMode(), this.dragIndicator)) this.dragIndicator.style.display = 'block';
                        else {
                            var e = document.createElement('div');
                            (e.innerHTML = '拖动以调整封面照片'),
                                (e.className = 'drag_indicator'),
                                this.coverOuterCon.appendChild(e),
                                (this.dragIndicator = e);
                        }
                    },
                    destroyCoverImage: function (e) {
                        function t(e) {
                            e.combobox.destroyBox(),
                                e.coverCon.parentNode.removeChild(e.coverCon),
                                (e.coverCon = e.coverImage = null),
                                DS.syncData('photoid', ''),
                                e.createNormalCover(),
                                e.combobox.createBox(),
                                i.likeBox && (i.likeBox.style.display = 'none');
                        }
                        var i = this;
                        return 'noConfirm' == e
                            ? void t(i)
                            : void new XN.DO.confirm({
                                  title: '封面图片',
                                  message: '你确定要删除封面图片吗？',
                                  callback: function (e) {
                                      e && n.deleteCoverImage(t, i),
                                          window.timelineTopAttachBar && window.timelineTopAttachBar.setThresholdY();
                                  },
                              });
                    },
                    navigateToCoverUrl: function (e) {
                        var t = this;
                        XN.event.addEvent(e, 'click', function () {
                            if (!t.editMode) {
                                if ('undefined' != typeof isPrivacy && 1 == isPrivacy)
                                    return void toastfun('基于对方的隐私设置，您只能查看Ta的部分资料哦', 2e3);
                                if ('undefined' != typeof timelineV7 && 1 == timelineV7)
                                    var e =
                                        'http://photo.renren.com/photo/' +
                                        CoverInfo.uid +
                                        '/photo-' +
                                        t.photoid +
                                        '/v7';
                                else var e = 'http://photo.renren.com/photo/' + CoverInfo.uid + '/photo-' + t.photoid;
                                window.location.href = e;
                            }
                        });
                    },
                    doLike: function (e) {
                        if (this.photoid && (!isUseSkin || 'undefined' != typeof timelineV7)) {
                            var t = XN.user.id,
                                i = profileOwnerId;
                            encodeURIComponent('封面相册');
                            if ('showlike' == e) var o = 'gid=photo_' + CoverInfo.photoid + '&uid=' + t;
                            else
                                var o =
                                    'gid=photo_' +
                                    CoverInfo.photoid +
                                    '&uid=' +
                                    t +
                                    '&owner=' +
                                    i +
                                    '&type=2&t=' +
                                    Math.random();
                            n.coverLike(e, o, this.renderLike, this);
                        }
                    },
                    renderLike: function (e) {
                        if (!this.likeBox) {
                            var t = document.createElement('span');
                            (t.className = 'cover-like'),
                                this.coverOuterCon.appendChild(t),
                                (this.likeBox = t),
                                this.bindLikeEvent(t);
                        }
                        (this.likeCount = e.likeCount),
                            (this.likeBox.style.display = 'block'),
                            (this.likeBox.innerHTML = 0 == this.likeCount ? '赞封面' : this.likeCount),
                            (this.coverLiked = e.ownerLike),
                            this.coverLiked
                                ? (this.likeBox.className = 'cover-like cover-like-hover')
                                : (this.likeBox.className = 'cover-like'),
                            (this.likeBox.className += isYourself() ? '' : ' cover-other');
                    },
                    bindLikeEvent: function (e) {
                        var t = this;
                        $(e).addEvent('click', function () {
                            t.coverLiked ? t.doLike('removelike') : t.doLike('addlike');
                        }),
                            $(e).addEvent('mouseover', function () {
                                t.coverLiked ? (e.innerHTML = '取消') : (e.innerHTML = '赞封面');
                            }),
                            $(e).addEvent('mouseout', function () {
                                e.innerHTML = t.likeCount > 0 ? t.likeCount : '赞';
                            });
                    },
                });
        },
    ),
    (function () {
        var e = {
            obj: null,
            init: function (t, i, n, o, a, r, s, l, d, c, u) {
                (t.onmousedown = e.start),
                    (t.hmode = l ? !1 : !0),
                    (t.vmode = d ? !1 : !0),
                    (t.root = n && null != n ? n : t),
                    t.hmode && isNaN(parseInt(t.root.style.left)) && (t.root.style.left = '0px'),
                    t.vmode && isNaN(parseInt(t.root.style.top)) && (t.root.style.top = '0px'),
                    !t.hmode && isNaN(parseInt(t.root.style.right)) && (t.root.style.right = '0px'),
                    !t.vmode && isNaN(parseInt(t.root.style.bottom)) && (t.root.style.bottom = '0px'),
                    (t.minX = 'undefined' != typeof o ? o : null),
                    (t.minY = 'undefined' != typeof r ? r : null),
                    (t.maxX = 'undefined' != typeof a ? a : null),
                    (t.maxY = 'undefined' != typeof s ? s : null),
                    (t.xMapper = c ? c : null),
                    (t.yMapper = u ? u : null),
                    (t.root.onDragStart = i.dragstart || new Function()),
                    (t.root.onDragEnd = i.dragend || new Function()),
                    (t.root.onDrag = i.drag || new Function());
            },
            start: function (t) {
                if (window.hlDragMode) {
                    var i = (e.obj = this);
                    t = e.fixE(t);
                    var n = parseInt(i.vmode ? i.root.style.top : i.root.style.bottom),
                        o = parseInt(i.hmode ? i.root.style.left : i.root.style.right);
                    return (
                        i.root.onDragStart(t, o, n),
                        (i.lastMouseX = t.clientX),
                        (i.lastMouseY = t.clientY),
                        i.hmode
                            ? (null != i.minX && (i.minMouseX = t.clientX - o + i.minX),
                              null != i.maxX && (i.maxMouseX = i.minMouseX + i.maxX - i.minX))
                            : (null != i.minX && (i.maxMouseX = -i.minX + t.clientX + o),
                              null != i.maxX && (i.minMouseX = -i.maxX + t.clientX + o)),
                        i.vmode
                            ? (null != i.minY && (i.minMouseY = t.clientY - n + i.minY),
                              null != i.maxY && (i.maxMouseY = i.minMouseY + i.maxY - i.minY))
                            : (null != i.minY && (i.maxMouseY = -i.minY + t.clientY + n),
                              null != i.maxY && (i.minMouseY = -i.maxY + t.clientY + n)),
                        (document.onmousemove = e.drag),
                        (document.onmouseup = e.end),
                        !1
                    );
                }
            },
            drag: function (t) {
                t = e.fixE(t);
                var i,
                    n,
                    o = e.obj,
                    a = t.clientY,
                    r = t.clientX,
                    s = parseInt(o.vmode ? o.root.style.top : o.root.style.bottom),
                    l = parseInt(o.hmode ? o.root.style.left : o.root.style.right);
                return (
                    null != o.minX && (r = o.hmode ? Math.max(r, o.minMouseX) : Math.min(r, o.maxMouseX)),
                    null != o.maxX && (r = o.hmode ? Math.min(r, o.maxMouseX) : Math.max(r, o.minMouseX)),
                    null != o.minY && (a = o.vmode ? Math.max(a, o.minMouseY) : Math.min(a, o.maxMouseY)),
                    null != o.maxY && (a = o.vmode ? Math.min(a, o.maxMouseY) : Math.max(a, o.minMouseY)),
                    (i = l + (r - o.lastMouseX) * (o.hmode ? 1 : -1)),
                    (n = s + (a - o.lastMouseY) * (o.vmode ? 1 : -1)),
                    o.xMapper ? (i = o.xMapper(s)) : o.yMapper && (n = o.yMapper(l)),
                    (e.obj.root.style[o.hmode ? 'left' : 'right'] = i + 'px'),
                    (e.obj.root.style[o.vmode ? 'top' : 'bottom'] = n + 'px'),
                    (e.obj.lastMouseX = r),
                    (e.obj.lastMouseY = a),
                    e.obj.root.onDrag(t, i, n),
                    !1
                );
            },
            end: function (t) {
                (document.onmousemove = null),
                    (document.onmouseup = null),
                    (t = e.fixE(t)),
                    e.obj.root.onDragEnd(
                        t,
                        parseInt(e.obj.root.style[e.obj.hmode ? 'left' : 'right']),
                        parseInt(e.obj.root.style[e.obj.vmode ? 'top' : 'bottom']),
                    ),
                    (e.obj = null);
            },
            fixE: function (e) {
                return (
                    'undefined' == typeof e && (e = window.event),
                    'undefined' == typeof e.layerX && (e.layerX = e.offsetX),
                    'undefined' == typeof e.layerY && (e.layerY = e.offsetY),
                    e
                );
            },
        };
        window.HLDrag = e;
    })(),
    object.define('xn/profile/leslider', 'dom, events', function (require, e) {
        var t = require('dom');
        require('events');
        e.LeSlider = new Class(function () {
            (this.slideInterval = 8e3),
                (this.initialize = function (e, i, n) {
                    e.clearSlideInterval(),
                        (e.motion = new XN.effect.Motion('easeOutStrong', 500)),
                        (e.fadeInMotion = new XN.effect.Motion('easeOutStrong', 1e3)),
                        (e.interval = null),
                        (e.currentIndex = 0),
                        (e.outerContainer = i),
                        e.outerContainer &&
                            ((e.innerContainer = t.getElement('ul', e.outerContainer)),
                            (e.prevBtn = t.getElements('a', e.outerContainer)[0]),
                            (e.nextBtn = t.getElements('a', e.outerContainer)[1]),
                            (e.slideDistance = parseInt(
                                t.getElements('section', e.outerContainer)[0].getStyle('width'),
                            )),
                            e.initSlide(n),
                            'notfadein' == n ? e.startSlide() : (e.bindCreateLeEvent(), e.startSlide(!0)));
                }),
                (this.initSlide = function (e, i) {
                    i || (e.slideList = t.getElements('li', e.innerContainer)),
                        (e.slideListLength = e.slideList.length),
                        '1' == e.slideListLength && e.oneSlide(),
                        e.slideListLength
                            ? (e.removeAllSlideChild(), e.innerContainer.appendChild(e.slideList[e.currentIndex]))
                            : e.outerContainer.parentNode &&
                              ('top-attach' == e.outerContainer.parentNode.id
                                  ? e.outerContainer.parentNode.removeChild(e.outerContainer)
                                  : (e.innerContainer.appendChild(e.createRedirectSlide()), (e.slideListLength = 1)));
                }),
                (this.fadeInSlide = function (e) {
                    e.fadeInMotion.tweening || e.fadeInMotion.start(),
                        (e.fadeInMotion.onTweening = function () {
                            e.outerContainer.style.opacity = this.equation(0, 1);
                        }),
                        (e.fadeInMotion.onComplete = function () {
                            e.bindCreateLeEvent(), e.startSlide(!0);
                        });
                }),
                (this.oneSlide = function (e) {
                    return 0 == e.slideListLength || 1 == e.slideListLength
                        ? ((e.prevBtn.style.visibility = 'hidden'), (e.nextBtn.style.visibility = 'hidden'), !0)
                        : !1;
                }),
                (this.startSlide = function (e, t) {
                    var i = e.oneSlide();
                    i || (e.autoSlide(), t && e.bindSlideBtnEvent());
                }),
                (this.slideAnim = function (e, t, i) {
                    var n = 'left' == t ? -e.slideDistance : e.slideDistance,
                        o = parseInt(parseFloat(e.innerContainer.style.left));
                    (o = isNaN(o) ? 0 : o),
                        e.motion.tweening || e.motion.start(),
                        (e.motion.onTweening = function () {
                            e.innerContainer.style.left = this.equation(o, o + n) + 'px';
                        }),
                        (e.motion.onComplete = function () {
                            e.clearSlide(e.slideList[e.currentIndex]), 'reauto' == i && e.autoSlide();
                        });
                }),
                (this.autoSlide = function (e) {
                    e.interval && e.clearSlideInterval(),
                        (e.interval = setInterval(function () {
                            e.slide('left');
                        }, e.slideInterval));
                }),
                (this.setNextSlide = function (e, t) {
                    var i = e.slideList[e.currentIndex];
                    'left' == t
                        ? (e.currentIndex < e.slideListLength - 1 ? e.currentIndex++ : (e.currentIndex = 0),
                          XN.dom.insertAfter(e.slideList[e.currentIndex], i),
                          (e.innerContainer.style.left = 0))
                        : 'right' == t &&
                          (e.currentIndex > 0 ? e.currentIndex-- : (e.currentIndex = e.slideListLength - 1),
                          e.innerContainer.insertBefore(e.slideList[e.currentIndex], i),
                          (e.innerContainer.style.left = -e.slideDistance + 'px'));
                }),
                (this.clearSlide = function (e, i) {
                    for (var n = t.getElements('li', e.innerContainer), o = 0, a = n.length; a > o; o++)
                        if (n[o] != i) {
                            e.innerContainer.removeChild(n[o]);
                            break;
                        }
                    e.innerContainer.style.left = 0;
                }),
                (this.clearSlideInterval = function (e) {
                    e.interval && (clearInterval(e.interval), (e.interval = null));
                }),
                (this.slide = function (e, t, i) {
                    e.setNextSlide(t), e.slideAnim(t, i);
                }),
                (this.bindSlideBtnEvent = function (e) {
                    e.prevBtn.addEvent('click', function (t) {
                        e.motion.tweening || (e.clearSlideInterval(), e.slide('right', 'reauto'));
                    }),
                        e.nextBtn.addEvent('click', function (t) {
                            e.motion.tweening || (e.clearSlideInterval(), e.slide('left', 'reauto'));
                        });
                }),
                (this.bindCreateLeEvent = function (e) {
                    e.outerContainer.delegate('li[data-type]', 'click', function (e) {
                        var t = e.target;
                        (t = 'li' == t.tagName.toLowerCase() ? t : t.parentNode),
                            require.async('xn/profile/tplcreate', function (e) {
                                e = new e.createTpl(t.className);
                            });
                    });
                }),
                (this.reset = function (e, t) {
                    ('605' == t || '606' == t || '607' == t) &&
                        (e.slideList.forEach(function (i, n) {
                            i.getAttribute('data-type') == t && e.slideList.splice(n, 1);
                        }),
                        e.slideList.length
                            ? e.initialize(e.outerContainer, 'notfadein')
                            : isYourself()
                            ? (e.outerContainer.parentNode.removeChild(e.outerContainer),
                              e.initialize(e.outerContainer, 'notfadein'))
                            : (e.innerContainer.appendChild(e.createRedirectSlide),
                              e.clearSlideInterval(),
                              e.oneSlide()));
                }),
                (this.createRedirectSlide = function () {
                    var e = document.createElement('li');
                    return (
                        (e.innerHTML = '<h1>写下彼此难忘经历</h1><p>相逢、相识、相知、相爱...</p>'),
                        t.wrap(e).addEvent('click', function () {
                            window.location.href = 'http://www.renren.com/' + XN.user.id + '/profile?leAdd=1';
                        }),
                        e
                    );
                }),
                (this.removeAllSlideChild = function (e) {
                    var i = document.createElement('ul');
                    e.innerContainer.parentNode.replaceChild(i, e.innerContainer), (e.innerContainer = t.wrap(i));
                });
        });
    }),
    object.define('xn/profile/lifeeventEdit', 'dom, events', function (require, e) {
        var t = require('dom');
        require('events');
        (e.leEdit = function () {
            (this.timelineCon = $('timeline')), this.init();
        }),
            (e.leEdit.prototype = {
                init: function () {
                    this.bindEditBtnEvent();
                },
                bindEditBtnEvent: function () {
                    t.wrap(this.timelineCon).delegate('.menu-list .mod, .add-photo', 'click', function (e) {
                        var t = XN.event.element(e),
                            t = XN.element.parent(t, 'section.tl-a-feed'),
                            i = t.parentNode,
                            n = t.getAttribute('eventid');
                        require.async('xn/profile/tpledit', function (e) {
                            new e.editTpl(n, i);
                        });
                    });
                },
            });
    }),
    object.define('xn/ilikeSeed', 'dom', function (require, exports, module) {
        var dom = require('dom');
        (this.ilikeInstances = {}),
            (this.getIlikeId = function (ele) {
                var data = eval('(' + ele.getAttribute('data-ilike') + ')');
                return data.type + '_' + data.id;
            }),
            (this.init = function (e) {
                var e = e || {},
                    t = dom.wrap(e.context || document.body);
                t.delegate('.ilike-button', 'click', function (i) {
                    var n = this,
                        o = exports.getIlikeId(this),
                        a = exports.ilikeInstances[o];
                    a
                        ? a.toggle(n)
                        : require.async('xn/ilike', function (i) {
                              (a = exports.ilikeInstances[o] = new i.IlikeAction({
                                  button: n,
                                  context: t,
                                  onadd: e.onadd,
                                  onremove: e.onremove,
                              })),
                                  a.toggle(n);
                          });
                }),
                    t.delegate('.removeLike', 'click', function (i) {
                        var n = this,
                            o = exports.getIlikeId(this),
                            a = exports.ilikeInstances[o];
                        XN.Do.confirm({
                            message: '真的要撤销对此新鲜事的全部点赞吗',
                            callback: function (i) {
                                i &&
                                    (a
                                        ? a.toggle(n)
                                        : require.async('xn/ilike', function (i) {
                                              (a = exports.ilikeInstances[o] = new i.IlikeAction({
                                                  button: n,
                                                  context: t,
                                                  onadd: e.onadd,
                                                  onremove: e.onremove,
                                              })),
                                                  a.toggle(n);
                                          }));
                            },
                        });
                    });
            });
    }),
    object.define('xn/feed/reply', 'dom, net, events, string, xn.net, xn.mention, ua', function (require, e, t) {
        var i = require('dom'),
            n = require('net'),
            o = require('events'),
            a = require('string'),
            r = require('xn.mention').mention,
            s = require('ua'),
            l = function (e) {
                (e.cancelBubble = !0), e.preventDefault(), e.stopPropagation();
            };
        (this._editors = {}),
            (this.ReplyUI = new Class(function () {
                Class.mixin(this, o.Events),
                    (this._statusUpdater = null),
                    (this._shareThis = !1),
                    (this._replyTo = null),
                    (this.deactiveDelay = null),
                    (this._errors = {
                        1: '请不要从站外提交',
                        2: '该状态不存在',
                        6: '对不起，请重试。',
                        3: '抱歉，您不能发布空状态',
                        4: '抱歉，某些信息是不能发布的哦：）谢谢您的谅解。',
                        5: '你短时间内发表了太多相同的内容',
                        9: '你还不是TA的好友，不能使用“回复所有人”',
                        11: '该用户不是您的好友, 不能转发其状态',
                        12: '参数不完整, 提交失败, 请联系客服',
                        15: '请激活账号',
                        16: '抱歉，由于对方的隐私设置，你无法进行该操作',
                        100: '本公共主页管理员关闭了该公共主页，请稍后再试',
                        101: '你现在不是该公共主页的粉丝，成为粉丝后才可回复',
                        102: '此公共主页的主人关闭了回复功能，目前不能回复',
                        103: '检测到异常无法发布，请尝试刷新页面或重新登录',
                        105: '你现在不是该情侣空间的关注者，加入后才可回复',
                        106: '该报到不存在',
                        107: '回复失败',
                        301: '请您不要频繁发布相同内容',
                        407: '抱歉，某些信息是不能发布的哦：）谢谢您的谅解',
                        998: '输入不能为空',
                        999: '发生异常，请尝试刷新页面后再试',
                        1030: '抱歉，某些信息是不能发布的哦：）',
                        1031: '请您不要频繁发布相同内容。',
                        1020: '您没有权限发布。',
                        1021: '发布内容太长',
                        1052: '该状态不存在，或者已经被删除！',
                        10: '系统繁忙,请您稍候再试。',
                        6010014: '获取日志失败，请您稍后再试。',
                        6020109: '该日志不存在！',
                        6030110: '由于对方的隐私设置，您不能留言。',
                        6030101: '您的留言权限被暂时封禁，请联系管理员。',
                        6030107: '抱歉，您已超过每日的评论限额！（<a href=""+ DomainUtil.getUrlMain()+ "/notselectuser.do?action=no">成为星级用户</a>）可继续评论。',
                        6030103: '抱歉，某些信息是不能发布的哦：）',
                        6010106: '请您不要频繁发布相同内容。',
                        6030104: '评论内容不能为空',
                        6030105: '评论内容不能长于500个字符',
                        601e4: '系统繁忙,请您稍候再试。',
                        6010010: '由于对方的隐私设置，你没有权限执行该操作。',
                        1201: '由于对方的隐私设置，您不能进行此操作。',
                        201: '该分享不存在，或者已经被删除！',
                        901: '请您不要频繁发布相同内容。',
                        501: '抱歉，某些信息是不能发布的哦：）',
                        1001: '系统繁忙,请您稍候再试。',
                        6030108: '查询评论出错',
                        2001: '服务器忙,请稍候重试',
                        2002: '未知错误',
                        2003: '获取用户信息失败',
                        2004: '删除评论失败，请您稍候再试。',
                        66400: '表怪我，相册/照片可能是被主人搬走了。',
                        66100: '抱歉，部分内容不是很适合在这里发布哦',
                        66101: '请您修改内容或者稍等片刻',
                        66402: '您还未激活您的账号，赶紧去邮箱看看吧',
                        66403: '哎哟，对方设置了隐私，尝试一下其他的联系方式吧',
                        66102: '亲，您还没有输入要发布的内容呢',
                        66103: '您写的太好了，可是超出了500个字符哦',
                        66500: '服务出错了，请刷新再来一遍吧～',
                    }),
                    (this.initialize = function (t, n) {
                        (t.fid = n),
                            (t.container = i.id('newsfeed-' + t.fid)),
                            (t.activeBtn = i.getElement('.act-reply', t.container)),
                            (t.repliesbox = i.getElement('.feed-replies', t.container)),
                            (t.cmtbox = i.getElement('textarea', t.container)),
                            (t.defaultValue = a.trim(t.cmtbox.innerHTML)),
                            (t.cmtbody = i.getElement('.feed-comment', t.container)),
                            (t.submitBtn = i.getElement('.submit', t.cmtbody)),
                            (t.paramsWrapper = i.getElement('#reply-params-' + t.fid, t.container)),
                            (t.foldBtn = i.getElement('.fold-replies', t.container)),
                            (t.getMoreBtn = i.getElement('.more-reply a', t.container)),
                            (t.countbox = i.getElement('.action .count', t.container)),
                            (t.countNum = i.getElement('.inputed', t.countbox)),
                            (t.cmtMain = i.getElement('.comment-box', t.container)),
                            (t.actionBar = i.getElement('.action', t.cmtMain)),
                            (t.emotionBtn = i.getElement('.emotion', t.actionBar)),
                            (t.mentionBtn = i.getElement('.mention', t.actionBar)),
                            (t.shareCheckbox = i.getElement('#shareThis_' + t.fid, t.actionBar)),
                            (t.maxlength = parseInt(i.getElement('.maxlength', t.countbox).innerHTML)),
                            (t.replyBtn = '.bottom-bar .reply'),
                            (t.delBtn = '.bottom-bar .delet'),
                            (t.outerContainer = i.id('dropmenuHolder')),
                            t.shareCheckbox && (t.shareCheckbox.checked = !1),
                            XN.browser.IE && (t.cmtbox.value = t.defaultValue),
                            XN.browser.IE || ((t.cmtbox.value = ''), t.cmtbox.set('placeholder', t.defaultValue)),
                            i.getElement('.avatar img', t.cmtbody) &&
                                (i.getElement('.avatar img', t.cmtbody).src = XN.user.tinyPic),
                            t.getParams(),
                            t.bindEvent(),
                            t.initMention(),
                            (e._editors[n.toString()] = t);
                    }),
                    (this.getParams = function (e) {
                        var t = -1 != navigator.userAgent.indexOf('iPad');
                        t
                            ? (e.params = JSON.parse(clearStr(XN.string.unescapeHTML(e.paramsWrapper.innerHTML))))
                            : (e.params = JSON.parse(a.trim(XN.string.unescapeHTML(e.paramsWrapper.innerHTML))));
                    }),
                    (this.buildParams = function (e) {
                        var t = a.trim(e.cmtbox.value);
                        /@\S.+\(\d+\)$/.test(t) && (t += ' ');
                        var n = e.params.oid,
                            o = e._replyTo ? 1 : 0,
                            r = e.params.cid,
                            s = e.params.typeNum,
                            l = e.params.type,
                            d = e.params.replyType,
                            c = e.params.stype,
                            u = e.params.subjectOwnerId;
                        if ((1260 == c && (c = 601), 'newrestapi' == d))
                            var p =
                                'content=' +
                                encodeURIComponent(t) +
                                '&type=' +
                                l +
                                '&entryId=' +
                                e.fid +
                                '&entryOwnerId=' +
                                n +
                                '&stype=' +
                                c +
                                '&sourceId=' +
                                r;
                        else
                            var p =
                                'c=' +
                                encodeURIComponent(t) +
                                '&owner=' +
                                n +
                                '&rpLayer=' +
                                o +
                                '&source=' +
                                r +
                                '&t=' +
                                s;
                        if ('blog' == l)
                            var p =
                                'content=' +
                                encodeURIComponent(t) +
                                '&type=' +
                                l +
                                '&entryId=' +
                                r +
                                '&entryOwnerId=' +
                                n +
                                '&stype=' +
                                c +
                                '&sourceId=' +
                                r +
                                '&c=' +
                                encodeURIComponent(t) +
                                '&owner=' +
                                n +
                                '&rpLayer=' +
                                o +
                                '&source=' +
                                r +
                                '&t=' +
                                s;
                        if (e.params.useCC || e.params.cSection)
                            var p =
                                'content=' +
                                encodeURIComponent(t) +
                                '&type=' +
                                l +
                                '&entryId=' +
                                r +
                                '&entryOwnerId=' +
                                n +
                                '&t=' +
                                s +
                                '&stype=' +
                                c;
                        if (
                            (('zhan' == l || 'minigroup' == l) &&
                                (p =
                                    'content=' +
                                    encodeURIComponent(t) +
                                    '&type=nf&toId=' +
                                    (e._replyTo ? e._replyTo.uid : 0)),
                            1 == o &&
                                (p +=
                                    'newrestapi' == d
                                        ? '&replyTo=' + e._replyTo.uid
                                        : '&replyName=' +
                                          encodeURIComponent(e._replyTo.uname) +
                                          '&replyTo=' +
                                          e._replyTo.uid +
                                          '&toCommentId=' +
                                          e._replyTo.rid),
                            'lifeevent' == e.params.type)
                        ) {
                            var h = i.getElement('input[type]="hidden"', e.container);
                            if (h) p += '&leCreateDate=' + h.value;
                            else {
                                var m = i.getElement('.le-time', e.container).href.split('?')[1];
                                p += '&leCreateDate=' + feedGetQueryStringByName('date', m);
                            }
                        }
                        var c = e.params.stype;
                        return (
                            !c ||
                                ('103' != c && '502' != c && '701' != c && '708' != c && '709' != c) ||
                                (p += '&stype=' + c + '&replyref=newsfeed'),
                            !c || ('715' != c && '716' != c) || (p += '&subjectOwnerId=' + u),
                            c && '709' == c && (p += '&isLinked=true'),
                            c && '702' == c && (p += '&stype=702&feedOwnerId=' + e.params.feedOwnerId),
                            window.sendatlog && window.sendatlog(t, c),
                            p
                        );
                    }),
                    (this.fixWidth = function (e) {
                        s.ua.ie >= 8 ||
                            ((e.cmtbox.style.width = '100%'),
                            XN.element.hasClassName(e.cmtbody, 'feed-comment-attach')
                                ? (e.cmtbox.style.width = e.cmtbody.offsetWidth - 110 + 'px')
                                : (e.cmtbox.style.width = e.cmtbox.offsetWidth - 16 + 'px'));
                    }),
                    (this.activeCmtBox = function (e) {
                        if (!e._actived) {
                            e.cmtbody.addClass('feed-comment-expand');
                            var t = e.cmtbody.getElement('.comment-box');
                            'comment-box comment-box-new' == t.className &&
                                ((t.className = 'comment-box'),
                                (e.cmtbody.getElement('.avatar').style.display = 'none')),
                                (e._actived = !0),
                                XN.browser.IE
                                    ? (e.cmtbox.focusToPosition(e.cmtbox.get('selectionStart')), e.fixWidth())
                                    : e.cmtbox.set('placeholder', ''),
                                (e.keepOpen = !1);
                        }
                    }),
                    (this.deactiveCmtBox = function (e) {
                        if (e._actived && !XN.element.hasClassName(e.cmtbody, 'feed-comment-attach')) {
                            e.cmtbody.removeClass('feed-comment-expand');
                            var t = e.cmtbody.getElement('.avatar-new'),
                                i = e.cmtbody.getElement('.comment-box');
                            t &&
                                ((i.className = 'comment-box comment-box-new'),
                                (e.cmtbody.className = 'feed-comment zoom-position')),
                                XN.browser.IE && (i.getElement('textarea').innerHTML = '评论...'),
                                (e._actived = !1),
                                e._emotions && e._emotions.hideEmoPop(),
                                XN.browser.IE ? e.fixWidth() : e.cmtbox.set('placeholder', e.defaultValue),
                                e.cmtbox.blur();
                        }
                    }),
                    (this.expandReplies = function (e, t) {
                        var n = i.getElement('.fold-reply-disabled', e.container);
                        n && (n.className = 'fold-reply'),
                            window.replyAttachBottomClass &&
                                (e.getMoreBtn && window.replyAttachBottomClass.addAttachReplyBox(i.wrap(e.container)),
                                'send' == t && window.replyAttachBottomClass.scrollToBottomReply(e.container),
                                'get' == t && window.replyAttachBottomClass.attachingBottom());
                    }),
                    (this.sendReply = function (e) {
                        e.stopCount(),
                            XN.browser.Gecko || XN.browser.IE || (e.cmtbox.disabled = !0),
                            e.submitBtn.addClass('submit-disabled');
                        var t = a.trim(e.cmtbox.value);
                        if ('' == t)
                            return (
                                XN.Do.showError(e._errors[998]),
                                (e.cmtbox.disabled = !1),
                                e.submitBtn.removeClass('submit-disabled'),
                                void e.checkCount()
                            );
                        /@\S.+\(\d+\)$/.test(t) && (t += ' ');
                        var o = null;
                        -1 != window.location.href.indexOf('lover.renren.com') &&
                            (o = 'http://lover.renren.com/doing/reply'),
                            new n.Request({
                                url: o || e.params.sendURI,
                                method: 'post',
                                onsuccess: function (n) {
                                    (e.cmtbox.disabled = !1),
                                        e.submitBtn.removeClass('submit-disabled'),
                                        e.checkCount();
                                    var o = XN.JSON.parse(n.responseText);
                                    if (0 != parseInt(o.code))
                                        return void e.fireEvent('senterror', {
                                            data: o,
                                            orc: t,
                                        });
                                    var a = e.repliesbox.getParent('.a-feed'),
                                        r = i.getElement('.next-reply ', a);
                                    if (!i.getElement('.more-reply a', e.repliesbox) && !r) {
                                        var s = i.getElement('.unfold-reply', e.container);
                                        s
                                            ? (e.showAllReply(s), e.expandReplies('send'))
                                            : XN.element.hasClassName(e.cmtbody, 'feed-comment-attach')
                                            ? e.expandReplies('send')
                                            : e.expandReplies('get');
                                    }
                                    e.fireEvent('sent', {
                                        data: o,
                                        orc: t,
                                    });
                                },
                                onerror: function () {
                                    (e.cmtbox.disabled = !1),
                                        e.submitBtn.removeClass('submit-disabled'),
                                        e.checkCount(),
                                        e.fireEvent('senterror');
                                },
                            }).send(e.buildParams());
                    }),
                    (this.showAllReply = function (e, t) {
                        var n = e.container,
                            o = i.getElements('.a-reply', n),
                            a = i.getElements('.headtail', n)[0];
                        a && a.parentNode.removeChild(a),
                            o.forEach(function (e, t) {
                                e.style.display = 'block';
                            }),
                            t.parentNode.removeChild(t),
                            i.getElement('.next-reply', n) && (i.getElement('.next-reply', n).style.display = 'block');
                        var r = i.getElement('.fold-reply-disabled', e.container);
                        r && (r.className = 'fold-reply');
                    }),
                    (this.showAllReply2 = function (e, t) {
                        var n = e.container,
                            o = i.getElements('.a-reply', n);
                        o.forEach(function (e, t) {
                            e.style.display = 'block';
                        });
                        var a = t.getParent('.a-feed').getElement('.unfold-reply');
                        a && a.parentNode.removeChild(a);
                        var r = i.getElement('.fold-reply-disabled', e.container);
                        r && (r.className = 'fold-reply');
                    }),
                    (this.packOneReplyHtml = function (e, t) {
                        console.log('packOneReplyHtml e', e);
                        console.log('packOneReplyHtml t', t);
                        console.log('e.params.replyType', e.params.replyType);
                        var i = !1,
                            n = 'undefined' != typeof t.id ? t.id : t.comment.id,
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
                        var y, w;
                        t.comment;
                        0 == g || void 0 == g ? ((y = !1), (w = '赞')) : ((y = !0), (w = '')),
                            (0 == v || void 0 == v) && (v = ''),
                            'page' == e.params.type &&
                                'undefined' != typeof XN.page.data &&
                                XN.page.data.isAdmin &&
                                (i = !0);
                        var b =
                                ('undefined' == typeof XN.page.data && r != XN.user.id) ||
                                ('undefined' != typeof XN.page.data && !XN.page.data.isAdmin && r != XN.user.id) ||
                                ('undefined' != typeof XN.page.data && XN.page.data.isAdmin && r != XN.page.data.id),
                            _ = r == XN.user.id || (e.params.oid == XN.user.id && 'share_edm' != e.params.type) || i,
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
                            'status' == e.params.type ||
                            'share' == e.params.type ||
                            'blog' == e.params.type ||
                            'album' == e.params.type ||
                            'photo' == e.params.type
                        ) {
                            console.log('XN.user.name', XN.user.name);
                            var E =
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
                                    var I =
                                        "'url':'http://status.renren.com/getdoing.do?id=" + m + '&doingId=' + h + "',";
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
                        if ((void 0 == g && (S = ''), 'newrestapi' == e.params.replyType)) {
                            var C = t.authorHeadUrl || t.comment.authorHeadUrl;
                            l = C;
                        }
                        if (
                            (-1 == l.indexOf('http://') && (l = 'http://hdn.xnimg.cn/photos/' + l),
                            void 0 != t.vocal_url)
                        ) {
                            var T = /^回复.+[:：](?!\/)/,
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
                            if ('' != k) var D = 'class="a-reply  showlike replylike bigemotion"';
                            else var D = 'class="a-reply showlike bigemotion"';
                        else var D = 'class="a-reply bigemotion"';
                        var M =
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
                    }),
                    (this.buildOneReply = function (e, t) {
                        var n = document.createElement('div');
                        return (n.innerHTML = e.packOneReplyHtml(t)), i.getElement('.a-reply', n);
                    }),
                    (this.appendOneReply = function (e, t) {
                        var n = e.buildOneReply(t);
                        if ((e.repliesbox.appendChild(n), e.repliesbox.getParent('.a-feed'))) {
                            var o = e.repliesbox.getParent('.a-feed').getElement('.reply-count'),
                                a = e.repliesbox.getParent('.a-feed').getElement('.reply-show-word'),
                                r = e.repliesbox.getParent('.a-feed').getElement('.reply-new');
                            if (r)
                                if (((e.repliesbox.style.display = 'block'), o)) {
                                    var s = parseInt(o.innerHTML) + 1;
                                    (a.innerHTML = '收起回复'), (o.innerHTML = s);
                                } else {
                                    var s = '(<span class="reply-count">1</span>)';
                                    r.innerHTML = '<span class="reply-show-word">收起回复</span>' + s;
                                }
                        }
                        var l = e.repliesbox.getParent('.a-feed'),
                            d = i.getElement('.next-reply a', l);
                        if (d) {
                            var c = d.getAttribute('data-offset');
                            d.setAttribute('data-offset', parseInt(c) + 1);
                        }
                        if (window.sendreplylog && n.getParent('.a-feed')) {
                            var u = '';
                            null != e._replyTo && (u = e._replyTo.uid), window.sendreplylog(n, u);
                        }
                        if (e.repliesbox.getAttribute('data-more')) {
                            var p = parseInt(e.repliesbox.getAttribute('data-more')) + 1;
                            e.repliesbox.setAttribute('data-more', p);
                        }
                        window.wikiHighlight && window.wikiHighlight();
                    }),
                    (this.isEarlyFeed = function (e, t) {
                        var n = i.wrap(t).getParent('section');
                        if (!n) return !1;
                        var o = Sizzle('input[type="hidden"]', n)[0];
                        if (!o) return !1;
                        var a = parseInt(o.value.split('-')[0]);
                        return !isNaN(a) && 2009 >= a ? !0 : !1;
                    }),
                    (this.getReplies = function (e, t) {
                        var o = e.repliesbox.getParent('.a-feed'),
                            a = i.getElement('.next-reply a', o);
                        if (!e.isEarlyFeed(e.repliesbox)) {
                            if (!i.getElement('.more-reply a', e.repliesbox) && !a) return;
                            a || (e.getMoreBtn.parentNode.innerHTML = '<span style="color:#888;">加载中...</span>');
                        }
                        var r = e.params.replyType;
                        if ('newrestapi' == r)
                            var s =
                                'type=' +
                                e.params.type +
                                '&entryId=' +
                                e.fid +
                                '&entryOwnerId=' +
                                e.params.oid +
                                '&stype=' +
                                e.params.stype +
                                '&sourceId=' +
                                e.params.cid;
                        else
                            var s =
                                'doingId=' +
                                e.params.cid +
                                '&owner=' +
                                e.params.oid +
                                '&source=' +
                                e.params.cid +
                                '&t=' +
                                e.params.typeNum;
                        if ('blog' == e.params.type)
                            var s =
                                'type=' +
                                e.params.type +
                                '&entryId=' +
                                e.params.cid +
                                '&entryOwnerId=' +
                                e.params.oid +
                                '&stype=' +
                                e.params.stype +
                                '&sourceId=' +
                                e.params.cid +
                                '&doingId=' +
                                e.params.cid +
                                '&owner=' +
                                e.params.oid +
                                '&source=' +
                                e.params.cid +
                                '&t=' +
                                e.params.typeNum;
                        !e.params.type ||
                            ('715' != e.params.type && '716' != e.params.type) ||
                            (s += '&subjectOwnerId=' + e.params.subjectOwnerId);
                        var l = 'post';
                        ('zhan' == e.params.type ||
                            'minigroup' == e.params.type ||
                            'lifeevent' == e.params.type ||
                            'newrestapi' == r ||
                            'blog' == e.params.type) &&
                            (l = 'get');
                        var d = null;
                        if (
                            (-1 != window.location.href.indexOf('lover.renren.com') &&
                                (d = 'http://lover.renren.com/doing/replyList'),
                            e.params.useCC || e.params.cSection)
                        ) {
                            if (a) var c = a.getAttribute('data-offset');
                            else var c = 0;
                            (l = 'get'),
                                (s =
                                    'type=' +
                                    e.params.type +
                                    '&entryId=' +
                                    e.params.cid +
                                    '&entryOwnerId=' +
                                    e.params.oid +
                                    '&desc=true&limit=30&offset=' +
                                    c);
                        }
                        new n.Request({
                            url: d || e.params.loadURI,
                            method: l,
                            onsuccess: function (i) {
                                var n = JSON.parse(i.responseText);
                                return 0 != parseInt(n.code)
                                    ? void e.fireEvent('geterror', {
                                          data: n,
                                      })
                                    : (e.params.cSection
                                          ? e.fireEvent('gotall2', {
                                                data: n,
                                            })
                                          : e.fireEvent('gotall', {
                                                data: n,
                                            }),
                                      void ('click' == t ? e.expandReplies('get') : e.expandReplies('send')));
                            },
                            onerror: function () {
                                e.fireEvent('geterror');
                            },
                        }).send(s);
                    }),
                    (this.setReplies = function (e, t) {
                        for (var i = t.replyList || t.comments || t.comment, n = [], o = 0; o < i.length; o++) {
                            var a = i[o];
                            if (null != t.wikiWordsMap) {
                                var r;
                                try {
                                    r = JSON.parse(t.wikiWordsMap);
                                } catch (s) {
                                    r = t.wikiWordsMap;
                                }
                                object.extend(a, {
                                    wikiWords: r[a.id],
                                });
                            }
                            n.push(e.packOneReplyHtml(a));
                        }
                        (e.repliesbox.innerHTML = n.join('')), window.wikiHighlight && window.wikiHighlight();
                    }),
                    (this.setReplies2 = function (e, t) {
                        for (
                            var n = t.replyList || t.comments || t.comment,
                                o = [],
                                a = e.repliesbox.innerHTML,
                                r = n.length - 1;
                            r > -1;
                            r--
                        ) {
                            var s = n[r];
                            if (null != t.wikiWordsMap) {
                                var l;
                                try {
                                    l = JSON.parse(t.wikiWordsMap);
                                } catch (d) {
                                    l = t.wikiWordsMap;
                                }
                                object.extend(s, {
                                    wikiWords: l[s.id],
                                });
                            }
                            o.push(e.packOneReplyHtml(s));
                        }
                        var c = e.repliesbox.getParent('.a-feed'),
                            u = i.getElement('.next-reply a', c);
                        if (t.hasMore && !u) {
                            var p = document.createElement('div');
                            (p.className = 'next-reply'),
                                (p.innerHTML = '<a href="#nogo" data-offset="' + t.nextOffset + '">查看更多评论</a>'),
                                e.repliesbox.parentNode.insertBefore(p, e.repliesbox),
                                (a = '');
                        }
                        t.hasMore || u || (a = '');
                        var u = i.getElement('.next-reply ', c);
                        u && i.getElement('.next-reply a', c).setAttribute('data-offset', t.nextOffset),
                            0 == t.hasMore && u && u.remove(),
                            (e.repliesbox.innerHTML = o.join('') + a);
                        var h = jxn('.more-reply', e.repliesbox);
                        h.remove();
                        var c = e.repliesbox.getParent('.a-feed'),
                            m = i.getElement('.next-reply a', c);
                        m &&
                            30 == t.nextOffset &&
                            m.addEvent('click', function () {
                                e.getReplies('click');
                            }),
                            window.wikiHighlight && window.wikiHighlight();
                    }),
                    (this.toggleBtn = function (e) {
                        e.foldBtn &&
                            ('收起回复' == a.trim(e.foldBtn.innerHTML)
                                ? ((e.repliesbox.style.display = 'none'),
                                  (e.foldBtn.innerHTML = '回复(' + e.params.rpLength + ')'))
                                : ((e.repliesbox.style.display = 'block'), (e.foldBtn.innerHTML = '收起回复')));
                    }),
                    (this.replyTo = function (e, t, i, n) {
                        if ((e.cmtbox.focusToPosition(e.cmtbox.get('selectionStart')), n)) {
                            e._replyTo = {
                                uid: t,
                                uname: i,
                                rid: n,
                            };
                            var o = a.trim(e.cmtbox.value);
                            e._replyPrefix && (o = o.replace(e._replyPrefix, '')),
                                XN.browser.IE && o == e.defaultValue && (o = '');
                            var r = '';
                            XN.page &&
                                XN.page.data &&
                                5 == XN.page.data.type &&
                                XN.page.data.isAdmin &&
                                XN.user &&
                                XN.user.name &&
                                ((r = '【' + XN.user.name + '】'), (o = '')),
                                (e._replyPrefix = r + '回复' + XN.string.unescapeHTML(i) + ': '),
                                (e.cmtbox.value = 0 == o.indexOf('回复') ? e._replyPrefix : e._replyPrefix + o),
                                e.count(),
                                (e.submitBtn.innerHTML = '回复');
                        } else e.count();
                        var s = 'scrollTop',
                            l = XN.browser.WebKit ? 'body' : 'documentElement',
                            d = XN.element.realTop(e.cmtbox) + 107,
                            c = document[l][s] + document.documentElement.clientHeight;
                        d > c && (document[l][s] = document[l][s] + d - c);
                    }),
                    (this.delReply = function (e, t, o, a) {
                        var r = null;
                        -1 != window.location.href.indexOf('lover.renren.com') &&
                            (r = 'http://lover.renren.com/doing/delReply');
                        var s = r || e.params.delURI;
                        ('zhan' == e.params.type || 'minigroup' == e.params.type) &&
                            (s = e.params.delURI.replace('{{commentId}}', a)),
                            (e.params.useCC || e.params.cSection) && (s = e.params.delURI.replace('commentId', a));
                        var l = e.params.replyType;
                        XN.Do.confirm({
                            message: '确定要删除这条回复吗？',
                            callback: function (o) {
                                if (o) {
                                    if (l && 'newrestapi' == l) {
                                        s = e.params.delURI.replace('commentId', a);
                                        var r =
                                            'type=' +
                                            e.params.type +
                                            '&entryId=' +
                                            e.fid +
                                            '&entryOwnerId=' +
                                            e.params.oid +
                                            '&stype=' +
                                            e.params.stype +
                                            '&sourceId=' +
                                            e.params.cid;
                                    } else
                                        var r =
                                            'replyId=' +
                                            a +
                                            '&source=' +
                                            e.params.cid +
                                            '&doingId=' +
                                            e.params.cid +
                                            '&owner=' +
                                            e.params.oid +
                                            '&t=' +
                                            e.params.typeNum +
                                            '&createId=' +
                                            t;
                                    if ('blog' == e.params.type) {
                                        s = e.params.delURI.replace('commentId', a);
                                        var r =
                                            'type=' +
                                            e.params.type +
                                            '&entryId=' +
                                            e.params.cid +
                                            '&entryOwnerId=' +
                                            e.params.oid +
                                            '&stype=' +
                                            e.params.stype +
                                            '&sourceId=' +
                                            e.params.cid +
                                            '&replyId=' +
                                            a +
                                            '&source=' +
                                            e.params.cid +
                                            '&doingId=' +
                                            e.params.cid +
                                            '&owner=' +
                                            e.params.oid +
                                            '&t=' +
                                            e.params.typeNum +
                                            '&createId=' +
                                            t;
                                    }
                                    if (e.params.useCC || e.params.cSection)
                                        var r =
                                            'type=' +
                                            e.params.type +
                                            '&entryId=' +
                                            e.params.cid +
                                            '&entryOwnerId=' +
                                            e.params.oid +
                                            '&stype=' +
                                            e.params.stype;
                                    !e.params.type ||
                                        ('715' != e.params.type && '716' != e.params.type) ||
                                        (r += '&subjectOwnerId=' + e.params.subjectOwnerId),
                                        new n.Request({
                                            url: s,
                                            method: 'post',
                                            onsuccess: function (t) {
                                                e.fireEvent('deleted');
                                                var n = i
                                                    .getElement('.delet[data-rid=' + a + ']', e.repliesbox)
                                                    .getParent('.a-reply');
                                                n.parentNode.removeChild(n);
                                                var o = e.repliesbox.getAttribute('data-more'),
                                                    r = e.repliesbox.getParent('.a-feed'),
                                                    s = i.getElement('.next-reply a', r);
                                                if (s) {
                                                    var l = s.getAttribute('data-offset');
                                                    s.setAttribute('data-offset', parseInt(l) - 1);
                                                }
                                                o && e.repliesbox.setAttribute('data-more', o - 1);
                                            },
                                            onerror: function () {
                                                e.fireEvent('delerror');
                                            },
                                        }).send(r);
                                }
                            },
                        });
                    }),
                    (this.initEmotion = function (e, t) {
                        if (e._emotions)
                            object.extend(e._emotions.pos, {
                                start: e.cmtbox.get('selectionStart'),
                                end: e.cmtbox.get('selectionEnd'),
                            }),
                                e._emotions.showEmoPop(t || window.event);
                        else {
                            var i = {
                                input: e.cmtbox,
                                btnAlignType: '4-1',
                                onShowEmoPop: function () {
                                    var t = (parseInt(XN.user.id), this.emotionsContainer);
                                    e.moveEmotion.call(e, t);
                                },
                            };
                            'status' == e.params.type &&
                                object.extend(i, {
                                    url: 'http://shell.renren.com/ubb/doingubb?t=' + new Date().getTime(),
                                }),
                                XN.loadFiles(
                                    [
                                        'http://s.xnimg.cn/jspro/xn.ui.emoticons.js',
                                        'http://s.xnimg.cn/csspro/module/minieditor.css',
                                    ],
                                    function () {
                                        (e._emotions = XN.ui.emoticons(i)),
                                            object.extend(e._emotions.pos, {
                                                start: e.cmtbox.get('selectionStart'),
                                                end: e.cmtbox.get('selectionEnd'),
                                            }),
                                            e._emotions.showEmoPop(t || window.event);
                                    },
                                );
                        }
                    }),
                    (this.moveEmotion = function (e, t) {
                        var n = i.getElement('.feed-comment', e.container);
                        XN.element.hasClassName(n, 'feed-comment-attach') ? e.moveEmoToAttach(n) : e.moveEmoToNormal(n);
                    }),
                    (this.moveEmoToAttach = function (e, t) {
                        var n = e._emotions.emotionsContainer.container.parentNode,
                            o = i.getElement('.comment-box', t);
                        '-9999px' != n.style.left &&
                            (o.appendChild(n),
                            (n.style.top = 'auto'),
                            (n.style.bottom = '76px'),
                            s.ua.ie ? (n.style.left = '10px') : (n.style.left = 0),
                            XN.element.addClass(n, 'emo-attach'));
                    }),
                    (this.moveEmoToNormal = function (e, t) {
                        var i = e._emotions.emotionsContainer.container.parentNode;
                        '-9999px' != i.style.left &&
                            (e.outerContainer.appendChild(i),
                            (i.style.bottom = 'auto'),
                            (i.style.top = feedGetXY(t).y + 51 - 1 + 'px'),
                            (i.style.left = feedGetXY(t).x - feedGetXY(e.outerContainer).x + 40 + 'px'),
                            XN.element.delClass(i, 'emo-attach'));
                    }),
                    (this.initMention = function (e) {
                        if (e.mentionBtn) {
                            var t = {
                                obj: e.cmtbox,
                                button: e.mentionBtn,
                                ugcId: e.params.cid,
                                ugcType: e.params.type,
                                ownerId: e.params.oid,
                                whisper: !1,
                            };
                            r.Mention.init([t]), r.initMain(e.cmtbox, t);
                        }
                    }),
                    (this.moveAtToAttach = function (e, t, n) {
                        if (e.cmtbox.mention.selector) {
                            var o = e.cmtbox.mention.selector._menuList,
                                a = i.getElement('.comment-box', t);
                            '-9999px' != o.style.left &&
                                (a.appendChild(o),
                                setTimeout(function () {
                                    e.cmtbox.mention.check();
                                }, 15));
                        }
                    }),
                    (this.moveAtToNormal = function (e, t, i) {
                        if (e.cmtbox.mention.selector) {
                            var n = e.cmtbox.mention.selector._menuList;
                            '-9999px' != n.style.left &&
                                (e.outerContainer.appendChild(n),
                                (n.style.bottom = 'auto'),
                                setTimeout(function () {
                                    e.cmtbox.mention.check();
                                }, 15));
                        }
                    }),
                    (this.shareThis = function (e, t) {
                        var i = e.params.cid,
                            n = e.params.oid,
                            o = {
                                action: 'add',
                                auth: 99,
                                body: encodeURIComponent(t.replace(/"/g, '&quot;')),
                            };
                        if ('share' == e.params.type)
                            var a =
                                    'shareId=' +
                                    i +
                                    '&shareUserId=' +
                                    n +
                                    '&post=' +
                                    JSON.stringify(o) +
                                    '&from="0101010901"',
                                r = 'http://share.renren.com/share/submit.do';
                        else if ('blog' == e.params.type)
                            var a =
                                    'ownerId=' +
                                    e.params.oid +
                                    '&blogId=' +
                                    i +
                                    '&isBlogShare=1&body=' +
                                    encodeURIComponent(t),
                                r = 'http://blog.renren.com/share/createShareBlog';
                        new XN.net.xmlhttp({
                            url: r,
                            method: 'post',
                            data: a,
                            onSuccess: function (t) {
                                if ('blog' == e.params.type) {
                                    var i = JSON.parse(t.responseText);
                                    if (0 != i.code) {
                                        var n = XN.DO.alert({
                                            message: '<div style="width:100%;text-align:center">' + i.msg + '</div>',
                                            autoHide: 3,
                                        });
                                        n.header.hide(), n.footer.hide();
                                    }
                                }
                            },
                        });
                    }),
                    (this.forwardThis = function (e, t) {
                        function i() {
                            e._statusUpdater || (e._statusUpdater = new XN.APP.status.updateAction());
                            var i = e.params.cid,
                                n = e.params.oid,
                                o = 'status';
                            fwdmgr.fowardThis(i, n, o, function (a) {
                                var r = JSON.parse(a.responseText);
                                if (r.code && r.msg) return void XN.Do.showError(r.msg);
                                var s = '转自';
                                (s += void 0 === r.fwdRootStatus ? r.userName : r.userName + ': ' + r.statusContent),
                                    (s = t + s),
                                    s.length > e.maxlength && (s = s.slice(0, e.maxlength - 3) + '...'),
                                    XN.APP.status.setForwardTrue(i, n, o),
                                    setTimeout(function () {
                                        e._statusUpdater.update(s);
                                    }, 10);
                            });
                        }
                        XN.APP.status && XN.App.status.updateAction
                            ? i()
                            : XN.loadFile('http://s.xnimg.cn/jspro/xn.app.status.js', function () {
                                  i();
                              });
                    }),
                    (this.reset = function (e) {
                        e.stopCount(),
                            e.count(!0),
                            (e._replyTo = null),
                            (e.keepOpen = !1),
                            e.shareCheckbox && (e.shareCheckbox.checked = !1),
                            e.deactiveDelay && (clearTimeout(e.deactiveDelay), (e.deactiveDelay = null)),
                            (e.deactiveDelay = setTimeout(function () {
                                XN.browser.IE
                                    ? XN.element.hasClassName(e.cmtbody, 'feed-comment-attach') ||
                                      (e.cmtbox.value = e.defaultValue)
                                    : (e.cmtbox.value = ''),
                                    e.deactiveCmtBox(),
                                    (e.submitBtn.innerHTML = '回复');
                            }, 100));
                    }),
                    (this.count = function (e, t) {
                        var i = t ? '' : e.cmtbox.value,
                            n = i.length;
                        if (
                            (n > e.maxlength
                                ? (e.countbox.addClass('count-full'), e.submitBtn.addClass('submit-disabled'))
                                : e.countbox.removeClass('count-full'),
                            (e.countNum.innerHTML = n),
                            0 == n)
                        )
                            e.submitBtn.addClass('submit-disabled');
                        else {
                            if (n > e.maxlength) return;
                            e.submitBtn.removeClass('submit-disabled');
                        }
                    }),
                    (this.countTimer = null),
                    (this.checkCount = function (e) {
                        e.countTimer ||
                            (e.countTimer = setInterval(function () {
                                e.count();
                            }, 100));
                    }),
                    (this.stopCount = function (e) {
                        e.countTimer && clearInterval(e.countTimer), (e.countTimer = null);
                    }),
                    (this.checkReplyTo = function (e) {
                        if (e._replyTo) {
                            var t = a.trim(e.cmtbox.value);
                            return 0 != t.indexOf('回复' + e._replyTo.uname + ':')
                                ? ((e.submitBtn.innerHTML = '回复'), !0)
                                : ((e.submitBtn.innerHTML = '回复'), !1);
                        }
                        return !1;
                    }),
                    (this.check = function (e) {
                        return e.submitBtn.hasClass('submit-disabled')
                            ? !1
                            : (e.shareCheckbox && e.shareCheckbox.checked ? (e._shareThis = !0) : (e._shareThis = !1),
                              e.checkReplyTo() && (e._replyTo = null),
                              !0);
                    }),
                    (this.showError = function (e, t) {
                        var t = t || {};
                        return 'newrestapi' == e.params.replyType
                            ? void XN.Do.showError(t.msg)
                            : 129 == t.code
                            ? void e.showVerify(t)
                            : void ('page' == e.params.type || 'minigroup' == e.params.type
                                  ? 'page' == e.params.type && 9 == t.code
                                      ? e.showVerify(t)
                                      : XN.Do.showError(t.msg || e._errors[t.code] || e._errors[999])
                                  : XN.Do.showError(e._errors[t.code] || t.msg || e._errors[999]));
                    }),
                    (this.showVerify = function (e, t) {
                        XN.Do.confirm({
                            title: '请输入验证码',
                            modal: !0,
                            message:
                                '<div><center><input style="height:30px;width:120px;margin-right:10px" type="text" maxlength="6" id="checkCodeTxt_page" /><img id="page_checkCodeImg" height="45" width="120" style="vertical-align:middle;margin-right:5px" src="http://icode.renren.com/getcode.do?t=PageReplyIcode&rnd=' +
                                Math.random() +
                                '" title="验证码" /><a href="javascript:;" onclick="$(\'page_checkCodeImg\').src+=Math.random()">换一张</a></center></div>',
                            callback: function (t) {
                                if (t) {
                                    var o = a.trim(e.cmtbox.value);
                                    if ('' == o)
                                        return (
                                            XN.Do.showError(e._errors[998]),
                                            (e.cmtbox.disabled = !1),
                                            e.submitBtn.removeClass('submit-disabled'),
                                            void e.checkCount()
                                        );
                                    /@\S.+\(\d+\)$/.test(o) && (o += ' '),
                                        new n.Request({
                                            url: e.params.sendURI,
                                            method: 'post',
                                            onsuccess: function (t) {
                                                (e.cmtbox.disabled = !1),
                                                    e.submitBtn.removeClass('submit-disabled'),
                                                    e.checkCount();
                                                var n = XN.JSON.parse(t.responseText);
                                                if (9 == parseInt(n.code)) return void XN.Do.showError(n.msg);
                                                if (0 != parseInt(n.code) && 9 != parseInt(n.code))
                                                    return void e.fireEvent('senterror', {
                                                        data: n,
                                                        orc: o,
                                                    });
                                                if (!i.getElement('.more-reply a', e.repliesbox)) {
                                                    var a = i.getElement('.unfold-reply', e.container);
                                                    a
                                                        ? (e.showAllReply(a), e.expandReplies('send'))
                                                        : XN.element.hasClassName(e.cmtbody, 'feed-comment-attach')
                                                        ? e.expandReplies('send')
                                                        : e.expandReplies('get');
                                                }
                                                e.fireEvent('sent', {
                                                    data: n,
                                                    orc: o,
                                                });
                                            },
                                            onerror: function () {
                                                (e.cmtbox.disabled = !1),
                                                    e.submitBtn.removeClass('submit-disabled'),
                                                    e.checkCount(),
                                                    e.fireEvent('senterror');
                                            },
                                        }).send(e.buildParams() + '&code=' + $('checkCodeTxt_page').value);
                                }
                            },
                        });
                    }),
                    (this.bindEvent = function (e) {
                        XN.browser.IE ||
                            window.addEvent('blur', function () {
                                e.cmtbox.blur();
                            }),
                            e.cmtMain.addEvent('mouseover', function () {
                                e._actived && (e.keepOpen = !0);
                            }),
                            e.cmtMain.addEvent('mouseout', function () {
                                e.keepOpen = !1;
                            }),
                            e.cmtbox.addEvent('click', function (t) {
                                l(t), e._emotions && e._emotions.hideEmoPop();
                            }),
                            e.cmtbox.addEvent('focus', function (t) {
                                (e.keepOpen = !0),
                                    l(t),
                                    XN.browser.IE && this.value == e.defaultValue && (this.value = ''),
                                    e.activeCmtBox(),
                                    e.checkCount();
                            }),
                            e.cmtbox.addEvent('keyup', function (t) {
                                return 13 === t.keyCode ? (l(t), !1) : void e.checkReplyTo();
                            }),
                            e.cmtbox.addEvent('keydown', function (t) {
                                if (13 === t.keyCode) {
                                    if (
                                        (l(t),
                                        e.cmtbox.mention && e.cmtbox.mention.selectorShow && !e.cmtbox.mention.noMatch)
                                    )
                                        return !1;
                                    if (!e.check()) return !1;
                                    e.sendReply();
                                }
                            }),
                            e.cmtbox.addEvent('mouseup', function () {
                                e.checkReplyTo();
                            }),
                            e.cmtbox.addEvent('blur', function () {
                                e.stopCount(), '' != a.trim(e.cmtbox.value) || e.keepOpen || e.reset();
                            }),
                            i.wrap(document).addEvent('click', function () {
                                e._actived && ('' != a.trim(e.cmtbox.value) || e.keepOpen || e.reset());
                            }),
                            e.foldBtn &&
                                e.foldBtn.addEvent('click', function () {
                                    e.toggleBtn();
                                }),
                            e.getMoreBtn &&
                                e.getMoreBtn.addEvent('click', function () {
                                    e.getReplies('click');
                                }),
                            e.submitBtn.addEvent('click', function () {
                                e.check() && e.sendReply();
                            }),
                            e.emotionBtn &&
                                e.emotionBtn.addEvent('click', function (t) {
                                    e.initEmotion(t);
                                }),
                            e.repliesbox.delegate(e.replyBtn, 'mouseover', function () {
                                e.keepOpen = !0;
                            }),
                            e.repliesbox.delegate(e.replyBtn, 'mouseout', function () {
                                e.keepOpen = !1;
                            }),
                            e.repliesbox.delegate(e.replyBtn, 'click', function () {
                                var t = this.getAttribute('data-uid'),
                                    i = this.getAttribute('data-uname'),
                                    n = this.getAttribute('data-rid');
                                e.replyTo(t, i, n);
                            }),
                            e.activeBtn &&
                                (e.activeBtn.addEvent('mouseover', function () {
                                    e.keepOpen = !0;
                                }),
                                e.activeBtn.addEvent('mouseout', function () {
                                    e.keepOpen = !1;
                                }),
                                e.activeBtn.addEvent('mousedown', function (t) {
                                    l(t),
                                        (e.keepOpen = !0),
                                        e.replyTo(),
                                        e.cmtbox.focusToPosition(e.cmtbox.get('selectionStart'));
                                }),
                                e.activeBtn.addEvent('mouseup', function (t) {
                                    l(t), e.cmtbox.focusToPosition(e.cmtbox.get('selectionStart'));
                                }),
                                e.activeBtn.addEvent('click', function (t) {
                                    l(t), e.cmtbox.focusToPosition(e.cmtbox.get('selectionStart'));
                                })),
                            e.repliesbox.delegate(e.delBtn, 'click', function () {
                                var t = this.getAttribute('data-uid'),
                                    i = this.getAttribute('data-uname'),
                                    n = this.getAttribute('data-rid');
                                e.delReply(t, i, n);
                            }),
                            e.addEvent('sent', function (t) {
                                var n = i.getElement('.more', e.repliesbox);
                                n && e.repliesbox.setAttribute('data-more', n.innerHTML.replace(/[^0-9]/g, '')),
                                    e.appendOneReply(t.data),
                                    e.cmtbox.blur(),
                                    e.reset(),
                                    e._shareThis &&
                                        ('status' == e.params.type ? e.forwardThis(t.orc) : e.shareThis(t.orc));
                                var o = e.repliesbox.getParent('.a-feed'),
                                    a = i.getElement('.next-reply', o),
                                    r = i.getElement('.unfold-reply', o);
                                a || e.getReplies(), a && 'none' == a.style.display && e.showAllReply(r);
                            }),
                            e.addEvent('gotall', function (t) {
                                e.setReplies(t.data);
                                var i = t.data.replyList || t.data.comment || t.data.comments;
                                e.params.rpLength = i.length;
                            }),
                            e.addEvent('gotall2', function (t) {
                                e.setReplies2(t.data);
                                var i = t.data.replyList || t.data.comment || t.data.comments;
                                e.params.rpLength = i.length;
                            }),
                            e.addEvent('senterror', function (t) {
                                e.showError(t.data);
                            }),
                            e.addEvent('geterror', function (t) {
                                e.showError(t.data);
                            });
                    });
            })),
            (this.delegates = {
                replyBtn_click: function (t, i) {
                    var n = t.getAttribute('data-fid'),
                        o = document.getElementById('newsfeed-' + n);
                    if (!o._replyEditorInited) {
                        o._replyEditorInited = !0;
                        var a = t.getAttribute('data-rid'),
                            r = t.getAttribute('data-uid'),
                            s = t.getAttribute('data-uname'),
                            l = new e.ReplyUI(n);
                        (o._editor = l), (l.keepOpen = !0), l.replyTo(r, s, a);
                    }
                },
                delBtn_click: function (t, i) {
                    var n = t.getAttribute('data-fid'),
                        o = document.getElementById('newsfeed-' + n);
                    if (!o._replyEditorInited) {
                        o._replyEditorInited = !0;
                        var a = t.getAttribute('data-rid'),
                            r = t.getAttribute('data-uid'),
                            s = t.getAttribute('data-uname'),
                            l = new e.ReplyUI(n);
                        (o._editor = l), l.delReply(r, s, a);
                    }
                },
                textarea_click: function (t, i) {
                    if (t.getParent('.a-feed'))
                        var n = t.getParent('.a-feed').getElement('.avatar-new'),
                            o = t.getParent('.a-feed').getElement('.feed-comment'),
                            a = Sizzle('.avatar', o)[0];
                    n && (a.style.display = 'none');
                    var r = t.getAttribute('data-fid'),
                        s = document.getElementById('newsfeed-' + r);
                    if (!s._replyEditorInited) {
                        (s._replyEditorInited = !0), l(i);
                        var d = new e.ReplyUI(r);
                        (s._editor = d),
                            (d.keepOpen = !0),
                            XN.browser.IE && t.value == d.defaultValue && (t.value = ''),
                            d.activeCmtBox(),
                            d.checkCount();
                    }
                },
                moreBtn_click: function (t, i) {
                    t.getParent('.feed-replies') &&
                        t.getParent('.feed-replies').setAttribute('data-more', t.innerHTML.replace(/[^0-9]/g, '')),
                        window.more_reply_action && window.more_reply_action(t);
                    var n = t.getAttribute('data-fid'),
                        o = document.getElementById('newsfeed-' + n);
                    if (!o._replyEditorInited) {
                        o._replyEditorInited = !0;
                        var a = new e.ReplyUI(n);
                        o._editor = a;
                        t.getParent('.feed-replies');
                        a.getReplies('click');
                    }
                },
                moreBtn_click2: function (t, i) {
                    var n = t.getAttribute('data-fid'),
                        o = document.getElementById('newsfeed-' + n),
                        a = $('feedbody' + n);
                    t = t.getParent('.reply-new');
                    var r = Sizzle('.feed-comment-expand ', o)[0],
                        s = Sizzle('.feed-comment', o)[0],
                        l = Sizzle('textarea', o)[0],
                        d = Sizzle('.avatar-new', o)[0],
                        c = t.getParent('.a-feed').getElement('.reply-show-word');
                    a &&
                        ('none' == a.style.display
                            ? ((a.style.display = 'block'),
                              (s.style.display = 'block'),
                              (c.innerHTML = '收起回复'),
                              void 0 != r && (r.style.display = 'block'))
                            : ((a.style.display = 'none'), (c.innerHTML = '回复')),
                        XN.browser.IE &&
                            ((l.style.width = '100%'),
                            XN.element.hasClassName(s, 'feed-comment-attach')
                                ? (l.style.width = s.offsetWidth - 110 + 'px')
                                : d
                                ? (l.style.width = s.offsetWidth - 51 + 'px')
                                : (l.style.width = s.offsetWidth - 16 + 'px'))),
                        (o._replyEditorInited = !0);
                    var u = new e.ReplyUI(n);
                    (o._editor = u), u.getReplies('click');
                },
                foldBtn_click: function (t, i) {
                    var n = t.getAttribute('data-fid'),
                        o = document.getElementById('newsfeed-' + n);
                    if (!o._replyEditorInited) {
                        o._replyEditorInited = !0;
                        var a = new e.ReplyUI(n);
                        (o._editor = a), a.toggleBtn();
                    }
                },
                foldReply_click: function (t, n) {
                    var o = [102, 103, 104, 107, 601, 602, 701, 708, 709];
                    XN.event.element(n).className = 'fold-reply-disabled';
                    var a = i.wrap(t).getParent('article'),
                        r = i.getElements('.a-reply', a),
                        s = i.getElement('.feed-comment', a),
                        l = parseInt(i.getElement('figure', a).getAttribute('data-stype')),
                        d = o.indexOf(l),
                        c = a.id.replace(/[^0-9]/gi, ''),
                        u = i.getElement('#reply-params-' + c, a),
                        p = JSON.parse(clearStr(XN.string.unescapeHTML(u.innerHTML))),
                        h = i.getElement('.feed-replies', a),
                        m = i.getElement('.next-reply', a);
                    m && (m.style.display = 'none');
                    var f = h.getAttribute('data-more');
                    if (f && f >= r.length - 2) var g = f;
                    else var g = r.length - 2;
                    if (d > -1 && p.useCC)
                        if (f && f >= r.length - 5) var g = f;
                        else var g = r.length - 5;
                    if (d > -1 && p.useCC) {
                        if (r.length <= 5 || a.getElement('.unfold-reply')) return;
                    } else if (r.length <= 2 || a.getElement('.unfold-reply')) return;
                    var v = document.createElement('div');
                    if (
                        ((v.className = 'unfold-reply'),
                        d > -1 &&
                            p.useCC &&
                            (v.innerHTML = '<a href="javascript:;" class="more">还有' + g + '条更早的回复</a>'),
                        r.forEach(function (e, t) {
                            if (d > -1 && p.useCC) {
                                var i = r.length - 5;
                                i > t && (e.style.display = 'none'), 0 == t && e.parentNode.insertBefore(v, e);
                            } else e.style.display = 'none';
                        }),
                        XN.element.delClass(s, 'feed-comment-attach'),
                        '' == a._editor.cmtbox.value.trim() && a._editor.deactiveCmtBox(),
                        window.replyAttachBottomClass &&
                            (window.replyAttachBottomClass.removeAttachReplyBox(i.wrap(a)),
                            window.replyAttachBottomClass.scrollToUnfoldFeed(i.wrap(a)),
                            a._editor && (a._editor.status = 'noattach')),
                        !(d > -1 && p.useCC))
                    ) {
                        var p =
                            'type=' +
                            p.type +
                            '&entryId=' +
                            p.cid +
                            '&entryOwnerId=' +
                            p.oid +
                            '&headLimit=1&tailLimit=1&desc=true';
                        new XN.net.xmlhttp({
                            url: 'http://comment.renren.com/comment/xoa2/headtail',
                            method: 'get',
                            data: p,
                            onSuccess: function (t) {
                                t = XN.JSON.parse(t.responseText);
                                var i = t.headComments[0],
                                    n = new e.ReplyUI(c);
                                a._editor = n;
                                var o = n.packOneReplyHtml(i),
                                    r = t.tailComments[0],
                                    s = n.packOneReplyHtml(r);
                                if (((totalnum = t.commentTotalCount), totalnum > 2))
                                    var l =
                                        '<div class="unfold-reply"><a href="javascript:;" class="more">还有' +
                                        (totalnum - 2) +
                                        '条回复</a></div>';
                                else l = '';
                                var d = '<div class="headtail">' + o + l + s + '</div>',
                                    u = h.innerHTML;
                                h.innerHTML = d + u;
                            },
                        });
                    }
                },
                unfoldReply_click: function (e, t) {
                    window.more_reply_action && window.more_reply_action(e);
                    var n = i.wrap(e).getParent('article');
                    n._editor && n._editor.showAllReply(e),
                        window.replyAttachBottomClass &&
                            (window.replyAttachBottomClass.addAttachReplyBox(i.wrap(n)),
                            window.replyAttachBottomClass.attachingBottom());
                },
                unfoldReply_click2: function (e, t) {
                    var n = i.wrap(e).getParent('article');
                    n._editor && n._editor.showAllReply2(e),
                        window.replyAttachBottomClass &&
                            (window.replyAttachBottomClass.addAttachReplyBox(i.wrap(n)),
                            window.replyAttachBottomClass.attachingBottom()),
                        window.newsfeedImgLazyLoaded && window.newsfeedImgLazyLoaded.appendLazyloadImg(e);
                },
                activeBtn_click: function (t, i) {
                    l(i);
                    var n = t.getAttribute('data-fid'),
                        o = document.getElementById('newsfeed-' + n);
                    if (!o._replyEditorInited) {
                        o._replyEditorInited = !0;
                        var a = new e.ReplyUI(n);
                        (o._editor = a), (a.keepOpen = !0), a.replyTo();
                    }
                },
            });
    }),
    object.use('dom', function (e) {
        var t = function (e) {
            var t = null,
                i = null;
            if (
                (null != e.getAttribute('data-width') &&
                    '' != e.getAttribute('data-width') &&
                    (t = e.getAttribute('data-width')),
                null != e.getAttribute('data-height') &&
                    '' != e.getAttribute('data-height') &&
                    (i = e.getAttribute('data-height')),
                (null != t) & (null != i))
            )
                return {
                    width: t,
                    height: i,
                };
            if (void 0 != e.naturalHeight) (t = t || e.naturalWidth), (i = i || e.naturalHeight);
            else {
                var n = new Image();
                (n.src = e.src), (t = t || n.width), (i = i || n.height), delete n;
            }
            return {
                width: t,
                height: i,
            };
        };
        (window.fixImageLayout = function (i, n, o) {
            var n = parseInt(n),
                o = parseInt(o),
                a = t(i),
                r = a.width,
                s = a.height,
                l = $(i.parentNode);
            if (l) {
                if (
                    (' no-scale' == l.className && (l.className = ''),
                    XN.browser.IE6 && e.wrap(l).getParent('div.a-photo'))
                ) {
                    var d = e.wrap(l).getParent('div[data-highlight], section[data-highlight]');
                    d
                        ? s > 410 && (l.parentNode.style.height = '410px')
                        : i.height > 450 && (l.parentNode.style.height = '450px');
                }
                return r >= o ? void 0 : r >= n ? void l.addClass('scale-when-normal') : void l.addClass('no-scale');
            }
        }),
            (window.autoImage = function (e, i, n, o, a) {
                e.onload = null;
                var i = parseInt(i),
                    n = parseInt(n),
                    o = parseInt(o),
                    a = parseInt(a),
                    r = t(e),
                    s = r.width,
                    l = r.height,
                    d = $(e);
                s / l > i / n ? d.addClass('fullHeight') : i / n > s / l && d.addClass('fullWidth'),
                    s / l > o / a ? d.addClass('halfHeight') : o / a > s / l && d.addClass('halfWidth');
            }),
            (window.autoLEimage = function (e, t, i, n, o) {
                if (e.naturalWidth)
                    var a = e.naturalWidth,
                        r = e.naturalHeight;
                else {
                    var s = new Image();
                    s.src = e.src;
                    var a = s.width,
                        r = s.height;
                    delete s;
                }
                e.className.substring(3);
                if ('1' == e.getAttribute('data-highlight'))
                    var l = n,
                        d = o,
                        c = a,
                        u = r;
                else
                    var l = t,
                        d = i,
                        c = a,
                        u = r;
                if ('1' == e.getAttribute('data-highlight')) {
                    var p = e.getAttribute('data-scale');
                    if (p.toLowerCase().indexOf('w') > 0)
                        var h = p.split('w')[1],
                            m = 2 * h.split('h')[0];
                    if (m > c) {
                        var f;
                        (f = a), (a = m), (r = (m / f) * r);
                    }
                }
                l > a
                    ? ((a = l), (r = (l * u) / c), d > r && ((r = d), (a = (d * c) / u)))
                    : d > r && ((r = d), (a = (d * c) / u), l > a && ((a = l), (r = (l * u) / c))),
                    (e.style.width = a + 'px'),
                    (e.style.height = r + 'px');
            }),
            (window.removeFakeLinkImgTL = function (e) {
                var t = XN.element.parent(e, '.share-pic');
                t && (t.style.display = 'none');
                var i = t.nextSibling;
                i && i.style && (i.style.marginLeft = 0);
            }),
            (window.fixShareImg = function (e) {
                e.width / e.height >= 4 / 3
                    ? ((e.width = (90 / e.height) * e.width),
                      (e.height = 90),
                      (offset = 0.5 * (e.width - 120)),
                      (e.style.left = -offset + 'px'))
                    : ((e.height = (120 / e.width) * e.height),
                      (e.width = 120),
                      (offset = 0.5 * (e.height - 90)),
                      (e.style.top = -offset + 'px'));
            });
    }),
    object.use('xn/feed/reply, xn/ilikeSeed, dom, xn.net', function (e, t, i) {
        i.ready(function () {
            var n = i.id('timeline');
            n.delegate('.bottom-bar .reply', 'click', function () {
                e.delegates.replyBtn_click(this);
            }),
                n.delegate('.bottom-bar .delet', 'click', function () {
                    e.delegates.delBtn_click(this);
                }),
                n.delegate('.comment-box textarea', 'click', function (t) {
                    e.delegates.textarea_click(this, t);
                }),
                n.delegate('.more-reply a, .legend .replied', 'click', function (t) {
                    e.delegates.moreBtn_click(this);
                    var n = XN.event.element(t);
                    if ('replied' == n.className) {
                        var o = XN.element.parent(this, 'section');
                        i.getElements('.feed-replies, .feed-comment', o).forEach(function (e) {
                            'block' != e.style.display ? (e.style.display = 'block') : (e.style.display = 'none');
                        }),
                            i.getElement('textarea', o).focus();
                    }
                }),
                n.delegate('.replied', 'click', function (t) {
                    e.delegates.activeBtn_click(this, t);
                }),
                n.delegate('.replied', 'mouseup', function (e) {
                    (e.cancelBubble = !0), e.preventDefault(), e.stopPropagation();
                }),
                n.delegate('.replied', 'mousedown', function (e) {
                    (e.cancelBubble = !0), e.preventDefault(), e.stopPropagation();
                }),
                n.delegate('.event-info .with-more', 'click', function () {
                    var e = i.wrap(this),
                        t = i.wrap(this.parentNode);
                    'none' == t.nextSibling.style.display
                        ? ((e.innerHTML = '<<收起'), (t.nextSibling.style.display = 'block'))
                        : ((e.innerHTML = '更多>>'), (t.nextSibling.style.display = 'none'));
                }),
                n.delegate('.highlight-btn', 'click', function () {
                    i.wrap(this);
                    var e = i.wrap(this.parentNode);
                    e.hasClass('highlighted') ? e.removeClass('highlighted') : e.addClass('highlighted');
                }),
                n.delegate('menu .edit-this', 'click', function () {
                    var e = i.wrap(this);
                    e.toggleClass('edit-this-clicked');
                }),
                n.delegate('menu .edit-only', 'click', function () {
                    var e = i.wrap(this);
                    e.toggleClass('edit-this-clicked');
                }),
                n.delegate('.movie-btn1', 'click', function () {
                    var e = this;
                    XN.loadFiles(['http://s.xnimg.cn/apps/wiki/css/wiki-card-all-min.css'], function () {
                        XN.loadFiles(['http://s.xnimg.cn/apps/wiki/js/wiki_model.js'], function () {
                            object.use('xn/wiki/ue', function (t) {
                                new XN.net.xmlhttp({
                                    url: 'http://wiki.renren.com/ajax/card/' + e.getAttribute('wikiid'),
                                    method: 'get',
                                    onSuccess: function (e) {
                                        var i = JSON.parse(e.responseText);
                                        t.showCommentBox('wish', i.data, !1, 'minifeed');
                                    },
                                    onError: function (e) {
                                        XN.DO.showError('网络错误，请重试。');
                                    },
                                });
                            });
                        });
                    }),
                        new XN.net.xmlhttp({
                            url: 'http://wiki.renren.com/ajax/click_log',
                            method: 'post',
                            data: 'tag=minifeed_wish&ref=minifeed&wikiId=' + e.getAttribute('wikiid'),
                            onSuccess: function () {},
                            onError: function () {},
                        });
                }),
                n.delegate('.movie-btn2', 'click', function () {
                    var e = this;
                    XN.loadFiles(['http://s.xnimg.cn/apps/wiki/css/wiki-card-all-min.css'], function () {
                        XN.loadFiles(['http://s.xnimg.cn/apps/wiki/js/wiki_model.js'], function () {
                            object.use('xn/wiki/ue', function (t) {
                                new XN.net.xmlhttp({
                                    url: 'http://wiki.renren.com/ajax/card/' + e.getAttribute('wikiid'),
                                    method: 'get',
                                    onSuccess: function (e) {
                                        var i = JSON.parse(e.responseText);
                                        t.showCommentBox('collect', i.data, !1, 'minifeed');
                                    },
                                    onError: function (e) {
                                        XN.DO.showError('网络错误，请重试。');
                                    },
                                });
                            });
                        });
                    }),
                        new XN.net.xmlhttp({
                            url: 'http://wiki.renren.com/ajax/click_log',
                            method: 'post',
                            data: 'tag=minifeed_collect&ref=minifeed&wikiId=' + e.getAttribute('wikiid'),
                            onSuccess: function () {},
                            onError: function () {},
                        });
                }),
                t.init({
                    onadd: function (e) {
                        for (var t = e.data, n = 0; n < t.buttons.length; n++) {
                            var o = t.buttons[n];
                            if (o.hasClass('like')) {
                                o.addClass('liked');
                                var a = parseInt(o.innerHTML.match(/\d+/));
                                isNaN(a) && (a = 0), (o.innerHTML = '赞(' + (a + 1) + ')');
                            } else
                                o.hasClass('to-like') &&
                                    (o.removeClass('to-like'),
                                    o.addClass('cancel-liked'),
                                    (o.innerHTML = '赞'),
                                    i.wrap(o.parentNode).addClass('liked-this'));
                        }
                        delete t;
                    },
                    onremove: function (e) {
                        for (var t = e.data, n = 0; n < t.buttons.length; n++) {
                            var o = t.buttons[n];
                            if (o.hasClass('liked')) {
                                o.removeClass('liked');
                                var a = parseInt(o.innerHTML.match(/\d+/));
                                isNaN(a) && (a = 1),
                                    (o.innerHTML = '赞(' + (a - 1) + ')'),
                                    '赞(0)' == o.innerHTML && (o.innerHTML = '赞');
                            } else
                                o.hasClass('cancel-liked') &&
                                    (o.removeClass('cancel-liked'),
                                    o.addClass('to-like'),
                                    (o.innerHTML = '赞'),
                                    i.wrap(o.parentNode).removeClass('liked-this'));
                        }
                        delete t;
                    },
                });
        });
    }),
    object.use('dom', function (e) {
        function t(e, t, i) {
            for (var n = [], o = e; t > o && void 0 != i[o]; o++)
                n = n.concat([
                    '<li><a class="picbox" href="http://www.renren.com/profile.do?id=',
                    i[o].id,
                    '" target="_blank"><span class="pic" style="background-image:url(',
                    i[o].head,
                    ');"></span></a><h4><a href="http://www.renren.com/profile.do?id=',
                    i[o].id,
                    '" target="_blank">',
                    i[o].name,
                    '</a></h4></li>',
                ]);
            return n.join('');
        }
        window.moreTLFriend = function (e) {
            var i = e.getAttribute('data-friend'),
                n = XN.json.parse(i),
                o = n.length,
                a = 30;
            XN.Do.alert({
                title: '添加的好友',
                message: [
                    '<div id="more_tl_friend">',
                    '<div class="more_tl_friend">',
                    '<ul id="get_friend_list" class="clearfix">',
                    t(0, o > a ? a : o, n),
                    '</ul>',
                    '</div>',
                    '<div id="friendsWrapper" class="friends-page clearfix">',
                    '<ol id="friendsPager" class="list"></ol>',
                    '</div>',
                    '</div>',
                ].join(''),
                width: 500,
                button: '取消',
                showCloseButton: !0,
            }),
                o > a &&
                    XN.loadFile('http://s.xnimg.cn/a13589/jspro/xn.ui.pager.js', function () {
                        setTimeout(function () {
                            var e = new XN.ui.pager({
                                showCount: 5,
                                container: $('friendsPager'),
                            });
                            e.setPageCount(parseInt((o - 1) / a + 1)),
                                e.setCurrentPage(1),
                                e.addEvent('pageChange', function (e) {
                                    $('get_friend_list').innerHTML = t((e - 1) * a, e * a, n);
                                });
                        }, 0);
                    });
        };
    }),
    (window.socialFeedStats = function (e) {
        XN.net.sendStats('http://friend.' + XN.env.domain + '/ajaxHomeReconnectStat?' + e + '&t=' + Math.random());
    }),
    XN.dom.readyDo(function () {
        showAppsCard();
    }),
    (XN.app.ILikeShowPlayer = function () {}),
    (XN.app.ILikeShowPlayer.prototype = {
        init: function () {
            var e = this,
                t = $('newsfeed-module-box'),
                i = '',
                n = 480,
                o = 360,
                a = '';
            this.oDialogBodys = {};
            var r;
            t &&
                t.delegate('a[data-flash-box=true]', 'click', function (t) {
                    t.preventDefault();
                    try {
                        for (
                            r = this.parentNode;
                            'article' != r.nodeName.toLowerCase() && ((r = r.parentNode), r != document.body);

                        );
                    } catch (s) {
                        console.log(s);
                    }
                    try {
                        (i = r.getAttribute('data-movie-url')),
                            (n = r.getAttribute('data-movie-width')),
                            (o = r.getAttribute('data-movie-height')),
                            (a = r.getAttribute('data-movie-keyset')),
                            e.alert(i, n, o, a);
                    } catch (s) {
                        throw new Error(s.name + ' : ' + s);
                    }
                });
        },
        close: function () {
            this.iLikeWindow.remove(), (this.iLikeWindow = void 0);
        },
        alert: function (e, t, i, n) {
            var o = window.scrollY ? window.scrollY : document.documentElement.scrollTop,
                a = document.all ? document.getElementsByTagName('html')[0].offsetHeight : window.innerHeight,
                r = o;
            if ((a > i && (r += (a - i) / 2), this.iLikeWindow)) this.iLikeWindow.show();
            else {
                (this.iLikeWindow = new XN.ui.dialog({
                    width: parseInt(t) + 22,
                    body: '<div id="iLikeMovieHolder"></div>',
                    modal: !0,
                })),
                    this.iLikeWindow.header.hide(),
                    this.iLikeWindow.footer.hide(),
                    this.iLikeWindow.setY(r),
                    (this.oDialogBodys = Sizzle('.dialog_body'));
                for (var s = 0, l = this.oDialogBodys.length; l > s; s++)
                    (this.oDialogBodys[s].style.padding = '0'),
                        (this.oDialogBodys[s].style.height = parseInt(i) - 1 + 'px');
            }
            XN.loadFile('http://s.xnimg.cn/jspro/lib/swfobject.js', function () {
                swfobject.embedSWF(
                    'http://a.xnimg.cn/swf/feed-ilike-player-new.swf',
                    'iLikeMovieHolder',
                    t,
                    i,
                    '9',
                    '',
                    {
                        tvURL: e,
                        urlSet: escape(n),
                    },
                    {
                        allowscriptaccess: 'always',
                        wmode: 'window',
                        allowfullscreen: 'true',
                        quality: 'high',
                    },
                );
            });
        },
    });
var iLikePlayerShow = new XN.app.ILikeShowPlayer();
if (
    (XN.dom.readyDo(function () {
        iLikePlayerShow.init();
    }),
    XN.browser.IE)
)
    try {
        window.external.msIsSiteMode() &&
            (window.external.msSiteModeClearIconOverlay(), window.external.msSiteModeClearJumpList());
    } catch (e) {}
XN.page.home && XN.event.enableCustomEvent(XN.page.home),
    XN.dom.ready(function () {
        if (window.asyncHTMLManager && $('newsfeed-module-box')) {
            var e = Sizzle('#newsfeed-module-box .feed-list')[0],
                t = Sizzle('.a-feed', e)[0],
                i = Sizzle('.new-feed-tip', e)[0];
            if ((e && t) || XN.newsfeed.isFeedException) {
                var n = $('newFeedsCount'),
                    o = Sizzle('.show-new-feed', e)[0],
                    a = Sizzle('.show-new-feed-loading', e)[0];
                if ('undefined' != typeof isNewFeedNum && isNewFeedNum && (XN.browser.IE6 || XN.browser.IE7)) {
                    var r;
                    object.use('xn/feed/feedNums', function (e) {
                        r = new e.feedNums();
                    });
                } else {
                    var s, l, d;
                    object.use('xn/feed/act361', function (e) {
                        s = new e.Activity361();
                    }),
                        object.use('xn/feed/shareNum', function (e) {
                            l = new e.ShareNum();
                        }),
                        object.use('xn/feed/likeNum', function (e) {
                            d = new e.likeNum();
                        });
                }
                var c = function () {
                    var c = function (i) {
                            (t = Sizzle('.a-feed', e)[0]),
                                e.insertBefore(i, t),
                                XN.element.eval_inner_JS(i),
                                'undefined' != typeof isNewFeedNum && isNewFeedNum && (XN.browser.IE6 || XN.browser.IE7)
                                    ? r.markFeedNums([i])
                                    : (s.markAppendUserFeed([i]), l.markShareNumFeed([i]), d.markLikeNumFeed([i]));
                        },
                        u = function (i) {
                            (t = Sizzle('.a-feed', e)[0]),
                                (i.style.display = 'none'),
                                e.insertBefore(i, t),
                                jxn(i).fadeIn(600),
                                XN.element.eval_inner_JS(i);
                            var n;
                            object.use('xn/feed/firstfeeddel', function (e) {
                                n = new e.findfirst();
                            }),
                                n.asyncfind([i]);
                        },
                        p = function () {
                            (o.style.display = 'none'), (a.style.display = 'block');
                        },
                        h = function () {
                            (i.style.display = 'none'), (n.innerHTML = '0'), o.setAttribute('data-fids', '');
                        },
                        m = function () {
                            (a.style.display = 'none'),
                                (o.style.display = 'block'),
                                (i.style.display = 'block'),
                                $('returnhome') && ((o.style.display = 'none'), (i.style.display = 'none'));
                        },
                        f = function () {
                            return o.getAttribute('data-fids');
                        },
                        g = function () {
                            if (
                                (document.getElements('.new-feed-tip-miss')[0] &&
                                    (document.getElements('.new-feed-tip-miss')[0].style.display = 'none'),
                                document.getElements('.pageshowtip')[0] &&
                                    document.getElements('.pageshowtip')[0].remove(),
                                (i = Sizzle('#newsfeed-module-box .new-feed-tip')[0]),
                                (e = Sizzle('#newsfeed-module-box .feed-list')[0]),
                                !i)
                            ) {
                                var r = $element('div');
                                (r.innerHTML =
                                    '<div style="display:none;" class="new-feed-tip"> <a data-fids="" class="show-new-feed" onclick="return false;" href="#">有<span id="newFeedsCount">0</span>条新鲜事，点击显示</a> <span style="display:none" class="show-new-feed-loading">新鲜事读取中...</span> </div>'),
                                    (i = Sizzle('.new-feed-tip', r)[0]),
                                    (t = Sizzle('#newsfeed-module-box .a-feed')[0]),
                                    e.insertBefore(i, t),
                                    (n = $('newFeedsCount')),
                                    (o = Sizzle('#newsfeed-module-box .show-new-feed')[0]),
                                    (a = Sizzle('#newsfeed-module-box .show-new-feed-loading')[0]),
                                    v();
                            }
                            if (n) {
                                var s = parseInt(n.innerHTML);
                                if (
                                    ((n.innerHTML = s >= 99 ? '99+' : s + 1),
                                    $('returnhome') &&
                                        (($('attentionCounts').innerHTML = s >= 99 ? '99+' : s + 1),
                                        ($('attentionCounts').title = (s >= 99 ? '99+' : s + 1) + '条新的新鲜事')),
                                    XN.browser.IE)
                                )
                                    try {
                                        if (window.external.msIsSiteMode()) {
                                            var l = parseInt(n.innerHTML) > 9 ? '9+' : n.innerHTML;
                                            window.external.msSiteModeClearIconOverlay(),
                                                window.external.msSiteModeSetIconOverlay(
                                                    'http://a.xnimg.cn/imgpro/icons/' + l + '.ico',
                                                    '新增' + n.innerHTML + '条新鲜事',
                                                ),
                                                window.external.msSiteModeClearJumpList(),
                                                window.external.msSiteModeCreateJumpList('提醒'),
                                                window.external.msSiteModeAddJumpListItem(
                                                    '新增' + n.innerHTML + '条新鲜事',
                                                    'http://www.renren.com/',
                                                    'http://a.xnimg.cn/n/res/icons/newsfeed.ico',
                                                    'self',
                                                ),
                                                window.external.msSiteModeActivate();
                                        }
                                    } catch (d) {}
                                m();
                            }
                        },
                        v = function () {
                            o &&
                                XN.event.addEvent(o, 'click', function () {
                                    if ((w(), XN.browser.IE))
                                        try {
                                            window.external.msIsSiteMode() &&
                                                (window.external.msSiteModeClearJumpList(),
                                                window.external.msSiteModeClearIconOverlay());
                                        } catch (e) {}
                                });
                        },
                        y = function (e) {
                            object.use('dom', function (t) {
                                e.forEach(function (e) {
                                    var i = t.wrap(e).getElement('.newsfeed-user');
                                    if (
                                        null !== i.getData('sourcecontrol') &&
                                        '' !== i.getData('sourcecontrol') &&
                                        99 != i.getData('sourcecontrol')
                                    ) {
                                        var n;
                                        (n = e.getElement('.share_new_ui') || e.getElement('.share_new')),
                                            n && n.hide();
                                    }
                                });
                            });
                        },
                        w = function () {
                            var e = f().split(',').length,
                                t = [];
                            return e > 20
                                ? void window.newsfeed.reload()
                                : (p(),
                                  new XN.net.xmlhttp({
                                      url: 'http://www.renren.com/requestfeedbyid.do?ref=notifyfeed',
                                      data: 'id=' + f(),
                                      onSuccess: function (e) {
                                          var i = $element('div');
                                          XN.browser.IE && ((i.style.display = 'none'), document.body.appendChild(i)),
                                              (i.innerHTML = e.responseText);
                                          var n = Sizzle('.a-feed', i);
                                          (n[0].style.cssText = 'border-bottom-width:3px;'), y(n);
                                          for (var o = 0; o < n.length; o++) c(n[o]), t.push(n[o]);
                                          h(),
                                              XN.browser.IE && i.remove(),
                                              window.newsfeedImgLazyLoaded &&
                                                  window.newsfeedImgLazyLoaded.appendLazyloadImg(t),
                                              window.wikiHighlight && window.wikiHighlight();
                                      },
                                  }),
                                  void (
                                      COMSCORE &&
                                      COMSCORE.beacon({
                                          c1: 2,
                                          c2: 6934070,
                                          c3: '',
                                          c4: '',
                                          c5: '',
                                          c6: '',
                                          c15: '',
                                      })
                                  ));
                        },
                        b = function (e) {
                            if ($('newsfeed-module-box')) {
                                g();
                                var t = f();
                                o.setAttribute('data-fids', t + ('' == t ? '' : ',') + e);
                            }
                        },
                        _ = function (e) {
                            if ($('newsfeed-module-box')) {
                                var t = [];
                                new XN.net.xmlhttp({
                                    url: 'http://www.renren.com/requestfeedbyid.do?ref=notifyfeed',
                                    data: 'id=' + e,
                                    onSuccess: function (e) {
                                        var i = $element('div');
                                        XN.browser.IE && ((i.style.display = 'none'), document.body.appendChild(i)),
                                            (i.innerHTML = e.responseText);
                                        var n = Sizzle('.a-feed', i);
                                        if ((y(n), !$('returnhome') && 9 != window.setpvlogtab)) {
                                            for (var o = 0; o < n.length; o++) u(n[o]), t.push(n[o]);
                                            XN.browser.IE && i.remove(),
                                                window.newsfeedImgLazyLoaded &&
                                                    window.newsfeedImgLazyLoaded.appendLazyloadImg(t),
                                                window.wikiHighlight && window.wikiHighlight();
                                        }
                                    },
                                });
                            }
                        },
                        k = function (e, t) {
                            var i = $('change-word'),
                                n = document.createElement('div');
                            (n.className = 'isBubble'), i.appendChild(n);
                        };
                    webpager.addEvent('other_got', function (e) {
                        if (window.asyncHTMLManager) {
                            var t = !0;
                            if ($('group-focus2')) {
                                var i = Sizzle('.feed_type', $('newsfeed-module-box'))[0],
                                    n = $(Sizzle('.item', i)[1]);
                                if (n.hasClassName('selected')) var t = !1;
                            }
                            var o = !0;
                            object.use('dom', function (e) {
                                var t = $('friend-content');
                                if ((e.wrap(t), t)) {
                                    var i = jxn('#change-word').text(),
                                        n = t.getParent('.item');
                                    n && n.hasClassName('selected') && '关注内容' == i && (o = !1);
                                }
                            });
                            var a = !0;
                            object.use('dom', function (e) {
                                var t = $('group-focus');
                                if ((e.wrap(t), t)) {
                                    var i = t.getParent('.item');
                                    i && i.hasClassName('selected') && (a = !1);
                                }
                            });
                            var r = !0;
                            object.use('dom', function (e) {
                                $('feed_type_title') && '关注' == $('feed_type_title').innerHTML && (r = !1);
                            });
                            var i = Sizzle('.feed_type', $('newsfeed-module-box'))[0],
                                s = $(Sizzle('.item', i)[0]);
                            if (s.hasClassName('selected')) var l = !0;
                            try {
                                if (
                                    ('' == window.feedGroupNum &&
                                        0 == e.mtype.indexOf('feed_') &&
                                        (!window.newsfeed.currentType ||
                                            'attention' == window.newsfeed.currentType.id ||
                                            'old' == window.newsfeed.currentType.id ||
                                            'originalUgcnew' == window.newsfeed.currentType.id) &&
                                        (!window.newsfeed.currentCategory ||
                                            -1 == window.newsfeed.currentCategory.id) &&
                                        (!XN.cookie.get('feedType') ||
                                            'live' != XN.cookie.get('feedType').split('_')[1]) &&
                                        r) ||
                                    $('returnhome')
                                ) {
                                    var d = XN.json.parse(e.content).feed_stype,
                                        c = XN.json.parse(e.content).feed_id;
                                    if (
                                        2005 == d ||
                                        2006 == d ||
                                        2007 == d ||
                                        2008 == d ||
                                        2012 == d ||
                                        2013 == d ||
                                        2015 == d ||
                                        2016 == d ||
                                        2032 == d ||
                                        2035 == d ||
                                        2036 == d ||
                                        2038 == d ||
                                        2039 == d ||
                                        3709 == d ||
                                        3710 == d ||
                                        3711 == d ||
                                        3712 == d ||
                                        3713 == d ||
                                        3714 == d ||
                                        3730 == d ||
                                        3731 == d ||
                                        3732 == d ||
                                        3733 == d ||
                                        3734 == d ||
                                        3735 == d ||
                                        3741 == d ||
                                        3742 == d ||
                                        3743 == d
                                    ) {
                                        if (
                                            XN.newsfeed.redbubble &&
                                            o &&
                                            '关注内容' == jxn('#change-word').text() &&
                                            !jxn('#friend-content').children('.isBubble').length
                                        )
                                            return void k();
                                        if (o) return;
                                    } else {
                                        if (
                                            102 != d &&
                                            103 != d &&
                                            104 != d &&
                                            107 != d &&
                                            110 != d &&
                                            1101 != d &&
                                            1205 != d &&
                                            217 != d &&
                                            1206 != d &&
                                            2003 != d &&
                                            2004 != d &&
                                            2009 != d &&
                                            801 != d &&
                                            808 != d &&
                                            9801 != d &&
                                            9802 != d &&
                                            9803 != d &&
                                            501 != d &&
                                            502 != d &&
                                            503 != d &&
                                            504 != d &&
                                            505 != d &&
                                            601 != d &&
                                            602 != d &&
                                            701 != d &&
                                            702 != d &&
                                            708 != d &&
                                            709 != d &&
                                            713 != d &&
                                            714 != d &&
                                            3801 != d &&
                                            3802 != d &&
                                            3803 != d &&
                                            3804 != d &&
                                            8201 != d &&
                                            8210 != d &&
                                            8211 != d &&
                                            3720 != d &&
                                            3722 != d &&
                                            3723 != d &&
                                            3724 != d &&
                                            3725 != d &&
                                            2043 != d &&
                                            2044 != d &&
                                            2001 != d &&
                                            2002 != d &&
                                            1208 != d &&
                                            2037 != d &&
                                            2040 != d &&
                                            2041 != d &&
                                            3706 != d &&
                                            3707 != d
                                        )
                                            return;
                                        if (!(l && t && a)) return;
                                        if (XN.json.parse(e.content).feed_actor == XN.user.id && 3721 != d && 3803 != d)
                                            return void _(c);
                                    }
                                    b(c), XN.page.home && XN.page.home.fireEvent('getNewFeed', c);
                                }
                            } catch (u) {}
                        }
                    }),
                        v();
                };
                XN.webpager
                    ? c()
                    : window.addEvent &&
                      window.addEvent('webpagerReady', function (e) {
                          c();
                      });
            }
        }
    }),
    (window.playFeedAudio = function (e, t, i) {
        e = $('newsfeed-' + e);
        var n = $element('div');
        (n.className = 'media-player'),
            'mp3' == t
                ? (n.innerHTML = XN.Template.flashPlayer({
                      filename: i,
                  }))
                : (n.innerHTML = XN.Template.mediaPlayer({
                      filename: i,
                  })),
            e.addClass('playing');
        var o = XN.DOM.getElementsByClassName('audio', e)[0];
        o.parentNode.insertBefore(n, o.nextSibling), (o.style.display = 'none');
    }),
    (window.playIntelAudio = function (e, t, i) {
        window.playFeedAudio(e, t, {
            filename: i,
            width: 360,
            allowScriptAccess: 'sameDomain',
        });
    }),
    (window.playFeedOgg = function (e, t) {
        XN && XN.vip && XN.vip.voiceFeed && XN.vip.voiceFeed.playOgg
            ? XN.vip.voiceFeed.playVoice(e, t)
            : XN.loadFiles(['http://s.xnimg.cn/xnapp/vip/home/yuyin/js/feed.13363.js'], function () {
                  XN.vip.voiceFeed.playVoice(e, t);
              });
    }),
    (window.play = function (e, t, i) {
        (e = $(e + '')),
            'mp3' == t
                ? (e.innerHTML = XN.Template.flashPlayer({
                      filename: i,
                  }))
                : (e.innerHTML = XN.Template.mediaPlayer({
                      filename: i,
                  }));
    }),
    (window.playswf = function (e, t, i) {
        var n, o;
        (e = $(e + '')),
            (n = e.parentNode.offsetWidth - 24),
            n > 450 && (n = 450),
            (o = parseInt(n / i)),
            (e.innerHTML = XN.Template.flash({
                width: n,
                height: o,
                filename: t,
            })),
            (e.onclick = null);
    });
var SiteFeedRec = function (e) {
    this.init(e);
};
(SiteFeedRec.prototype = {
    init: function (e) {
        (this.box = Sizzle('#newsfeed-' + e + ' .site-list')[0]), (this.current = 0), this.bindEvents();
    },
    bindEvents: function () {
        var e = this,
            t = Sizzle('.new-site-btn', e.box.parentNode)[0];
        this.bindLiEvent(),
            XN.event.addEvent(t, 'click', function (i) {
                XN.event.stop(i || window.event), (e.box.style.height = 'auto'), (t.style.display = 'none');
            });
    },
    bindLiEvent: function () {
        for (var e = Sizzle('li', this.box), t = this.current; t < e.length; t++) {
            var i = $(e[t]);
            this.current++, this.hoverLi(i), this.bindFollow(i);
        }
    },
    bindFollow: function (e) {
        var t = Sizzle('.site-btn a', e)[0],
            i = this;
        XN.event.addEvent(t, 'click', function (n) {
            XN.event.stop(n || event);
            var o = t.getAttribute('data-uri');
            if ('' != o) {
                var a = t.getAttribute('requesting');
                1 != a &&
                    (t.setAttribute('requesting', 'true'),
                    i.followAction(o, function () {
                        e.setAttribute('followed', 'true'),
                            t.setAttribute('requesting', 'false'),
                            $(Sizzle('.site-btn', e)[0]).hide();
                    }));
            }
        });
    },
    hoverLi: function (e) {
        XN.event.addEvent(e, 'mouseover', function (t) {
            for (var i = XN.event.element(t); 'li' != i.nodeName.toLowerCase(); ) i = i.parentNode;
            'true' == e.getAttribute('followed')
                ? ((Sizzle('.site-btn-followed', e)[0].style.visibility = 'visible'),
                  (Sizzle('.site-btn-followed', e)[0].style.display = 'block'))
                : ((Sizzle('.site-btn', e)[0].style.visibility = 'visible'),
                  (Sizzle('.site-btn', e)[0].style.display = 'block'));
        }),
            XN.event.addEvent(e, 'mouseout', function (t) {
                for (var i = XN.event.element(t); 'li' != i.nodeName.toLowerCase(); ) i = i.parentNode;
                'true' == e.getAttribute('followed')
                    ? ((Sizzle('.site-btn-followed', e)[0].style.visibility = 'hidden'),
                      (Sizzle('.site-btn-followed', e)[0].style.display = 'none'))
                    : ((Sizzle('.site-btn', e)[0].style.visibility = 'hidden'),
                      (Sizzle('.site-btn', e)[0].style.display = 'none'));
            });
    },
    followAction: function (e, t) {
        new XN.net.xmlhttp({
            url: 'http://zhan.renren.com/' + e + '/followfeed',
            method: 'post',
            onSuccess: function (e) {
                var i = XN.json.parse(e.responseText);
                0 == i.code ? t && t() : alert(i.msg || '服务器繁忙，请稍后再试！');
            },
        });
    },
}),
    XN.event.enableCustomEvent(SiteFeedRec.prototype),
    (window.SiteFeedRec = SiteFeedRec),
    XN.namespace('app'),
    (XN.app.ILike = function (e) {
        $extend(this, e);
    }),
    (function (e) {
        var t,
            i = {};
        (getILike = function (e) {
            return i[e];
        }),
            (getActiveILike = function () {
                return getILike(t);
            });
        var n = function (e) {
            var t = e.url,
                i = e.method || 'GET',
                n = e.callback,
                o = e.errorMsg || '未知错误，请稍后重试',
                a = e.data,
                r = this;
            try {
                new XN.net.xmlhttp({
                    url: t,
                    data: a,
                    method: i,
                    onSuccess: function (e) {
                        var t = XN.JSON.parse(e.responseText);
                        return 0 != t.code ? void XN.DO.alert(t.msg) : void n.call(r, t);
                    },
                    onError: function () {
                        XN.DEBUG_MODE && XN.DO.showError(o);
                    },
                });
            } catch (s) {
                XN.log('数据发送失败');
            }
        };
        (e.prototype = {
            gid: 0,
            uid: 0,
            userLike: !1,
            likeCount: null,
            likeList: [],
            ilikeButton: null,
            ilikeBox: null,
            ilikeHeader: null,
            ilikeDetailBox: null,
            baseUrl: 'http://like.' + XN.env.domain,
            addUrl: '/addlike',
            removeUrl: '/removelike',
            viewCountUrl: '/showlike',
            veiwDetailUrl: '/showlikedetail',
            urlProfile: 'http://www.' + XN.env.domain + '/profile.do',
            loadingStr:
                '<span id="temp-loading">加载中&nbsp;<img src="' +
                XN.env.staticRoot +
                'imgpro/bg/indicator_blue_small.gif" /></span>',
            isDetailShow: !1,
            oldDetailShow: null,
            guestName: null,
            ownerId: null,
            itemName: null,
            cookieNameHour: null,
            cookieNameDay: null,
            maxHourLikeCounts: 30,
            maxDayLikeCounts: 80,
            hourAlertMsg: '您赞的次数太多了，请休息一小时再赞吧！',
            dayAlertMsg: '您今天赞的次数太多了，请明天再赞吧！',
            lastLikeTime: null,
            limitInteval: 3,
            limitAlertMsg: '您的操作太快了，请稍后再重试',
            init: function () {
                return isUndefined(this.type) || isUndefined(this.id) || isUndefined(this.userId)
                    ? (XN.log('type|id|userId must needed!!'), !1)
                    : ((this.gid = this.type + '_' + this.id),
                      (this.uid = this.userId),
                      (this.params = {
                          gid: this.gid,
                          uid: this.uid,
                      }),
                      (i[this.gid] = this),
                      (t = this.gid),
                      (this.cookieNameHour = 'IL_H'),
                      void (this.cookieNameDay = 'IL_D'));
            },
            commentInit: function () {
                var e;
                switch (
                    ((this.commentUrl = {
                        add: this.baseUrl + '/comment' + this.addUrl,
                        remove: this.baseUrl + '/comment' + this.removeUrl,
                    }),
                    (this.gid = this.stype + 'comment_' + this.cid),
                    this.stype)
                ) {
                    case 'status':
                        e = 12;
                        break;
                    case 'blog':
                        e = 9;
                        break;
                    case 'share':
                        e = 11;
                }
                (this.params = {
                    gid: this.gid,
                    resource: this.rid,
                    uid: this.uid,
                    owner: this.oid,
                    resourceownerid: this.roid,
                    url: this.url,
                    type: e,
                    name: this.name,
                }),
                    (i[this.gid] = this),
                    (t = this.gid),
                    (this.cookieNameHour = 'IL_H'),
                    (this.cookieNameDay = 'IL_D');
            },
            commentAdd: function () {
                this.fireEvent('startAdd');
                var e = this.checkHasLiked();
                return e.alreadyMax
                    ? (XN.DO.alert(e.msg), !1)
                    : this.checkActionInteval()
                    ? void n.call(this, {
                          url: this.commentUrl.add + '?' + XN.array.toQueryString(this.params),
                          callback: this.addCallback,
                      })
                    : (this.actionIntevalCallBack ? this.actionIntevalCallBack() : XN.DO.showError(this.limitAlertMsg),
                      !1);
            },
            commentRemove: function () {
                this.fireEvent('remove');
                var e = this.checkHasLiked();
                return e.alreadyMax
                    ? (XN.DO.alert(e.msg), !1)
                    : this.checkActionInteval()
                    ? void n.call(this, {
                          url: this.commentUrl.remove + '?' + XN.array.toQueryString(this.params),
                          callback: this.removeCallback,
                      })
                    : (this.actionIntevalCallBack ? this.actionIntevalCallBack() : XN.DO.showError(this.limitAlertMsg),
                      !1);
            },
            add: function () {
                var e;
                switch (this.type) {
                    case 'blog':
                        e = 0;
                        break;
                    case 'album':
                        e = 1;
                        break;
                    case 'photo':
                        e = 2;
                        break;
                    case 'share':
                        e = 3;
                        break;
                    case 'edm':
                        e = 4;
                        break;
                    case 'video':
                        e = 5;
                        break;
                    case 'status':
                        e = 6;
                }
                var t = $extend(this.params, {
                        owner: this.ownerId,
                        type: e,
                        name: this.guestName,
                    }),
                    i = this.getUrl(this.addUrl, t);
                this.fireEvent('startAdd');
                var o = this.checkHasLiked();
                return o.alreadyMax
                    ? (XN.DO.alert(o.msg), !1)
                    : this.checkActionInteval()
                    ? void n.call(this, {
                          url: i,
                          callback: this.addCallback,
                      })
                    : (this.actionIntevalCallBack ? this.actionIntevalCallBack() : XN.DO.showError(this.limitAlertMsg),
                      !1);
            },
            addCallback: function (e) {
                XN.log(e),
                    (this.likeCount = e.likeCount),
                    (this.userLike = e.ownerLike),
                    (this.likeList = e.likeList),
                    this.setCheckCookie(),
                    this.fireEvent('addSuccess');
            },
            remove: function () {
                var e;
                switch (this.type) {
                    case 'blog':
                        e = 0;
                        break;
                    case 'album':
                        e = 1;
                        break;
                    case 'photo':
                        e = 2;
                        break;
                    case 'share':
                        e = 3;
                        break;
                    case 'edm':
                        e = 4;
                        break;
                    case 'video':
                        e = 5;
                        break;
                    case 'status':
                        e = 6;
                }
                var t = $extend(this.params, {
                        owner: this.ownerId,
                        type: e,
                        name: this.guestName,
                    }),
                    i = this.getUrl(this.removeUrl, t);
                this.fireEvent('remove');
                var o = this.checkHasLiked();
                return o.alreadyMax
                    ? (XN.DO.alert(o.msg), !1)
                    : this.checkActionInteval()
                    ? void n.call(this, {
                          url: i,
                          callback: this.removeCallback,
                      })
                    : (this.actionIntevalCallBack ? this.actionIntevalCallBack() : XN.DO.showError(this.limitAlertMsg),
                      !1);
            },
            removeCallback: function (e) {
                XN.log(e),
                    (this.likeCount = e.likeCount),
                    (this.userLike = e.ownerLike),
                    (this.likeList = e.likeList),
                    this.setCheckCookie(),
                    this.fireEvent('removeSuccess');
            },
            viewCount: function () {
                var e = this.getUrl(this.viewCountUrl, this.params);
                return (
                    this.fireEvent('getViewCount'),
                    null != getILike(this.gid).likeCount
                        ? (this.fireEvent('getViewCountSuccess'), !1)
                        : void n.call(this, {
                              url: e,
                              callback: this.viewCountCallback,
                          })
                );
            },
            viewCountCallback: function (e) {
                XN.log(e),
                    (this.likeCount = e.likeCount),
                    (this.userLike = e.ownerLike),
                    this.fireEvent('getViewCountSuccess');
            },
            viewDetail: function () {
                var e = this.getUrl(this.veiwDetailUrl, this.params);
                return (
                    this.fireEvent('getViewDetail'),
                    0 != this.likeList.length
                        ? void this.fireEvent('getViewDetailSuccess')
                        : (n.call(this, {
                              url: e,
                              callback: this.veiwDetailCallback,
                          }),
                          void this.addLoading())
                );
            },
            veiwDetailCallback: function (e) {
                XN.log(e),
                    (this.likeCount = e.likeCount),
                    (this.userLike = e.ownerLike),
                    (this.likeList = e.likeList),
                    this.removeLoading(),
                    this.fireEvent('getViewDetailSuccess');
            },
            getUrl: function (e, t) {
                return (
                    $extend(t, {
                        t: Math.random(),
                    }),
                    this.baseUrl + e + '?' + XN.array.toQueryString(t)
                );
            },
            setCheckCookie: function () {
                this.setHourLiked(), this.setDayLiked();
            },
            setCookie: function (e, t, i, n, o, a) {
                var r;
                if (isNumber(i)) {
                    var s = new Date(),
                        l = new Date(s.getTime() + 1e3 * i);
                    r = l.toGMTString();
                } else r = isString(i) ? i : !1;
                (o = o || XN.env.domain),
                    (n = '/'),
                    (document.cookie =
                        e +
                        '=' +
                        encodeURIComponent(t) +
                        (r ? ';expires=' + r : '') +
                        (n ? ';path=' + n : '') +
                        (o ? ';domain=' + o : '') +
                        (a ? ';secure' : ''));
            },
            setHourLiked: function () {
                var e = 60 - new Date().getMinutes();
                if (XN.cookie.get(this.cookieNameHour)) {
                    var t = parseInt(XN.cookie.get(this.cookieNameHour));
                    this.setCookie(this.cookieNameHour, t + 1, 60 * e);
                } else this.setCookie(this.cookieNameHour, 1, 60 * e);
            },
            setDayLiked: function () {
                var e = new Date();
                e.setDate(e.getDate() + 1), e.setHours(0), e.setMinutes(0), e.setSeconds(0), e.setMilliseconds(0);
                var t = e.getTime() - new Date().getTime();
                if (XN.cookie.get(this.cookieNameDay)) {
                    var i = parseInt(XN.cookie.get(this.cookieNameDay));
                    this.setCookie(this.cookieNameDay, i + 1, t / 1e3);
                } else this.setCookie(this.cookieNameDay, 1, t / 1e3);
            },
            checkHourLiked: function () {
                var e = parseInt(XN.cookie.get(this.cookieNameHour));
                return e > this.maxHourLikeCounts;
            },
            chekcDayLiked: function () {
                var e = parseInt(XN.cookie.get(this.cookieNameDay));
                return e > this.maxDayLikeCounts;
            },
            checkHasLiked: function () {
                return this.checkHourLiked()
                    ? {
                          alreadyMax: !0,
                          msg: this.hourAlertMsg,
                      }
                    : this.chekcDayLiked()
                    ? {
                          alreadyMax: !0,
                          msg: this.dayAlertMsg,
                      }
                    : {
                          alreadyMax: !1,
                      };
            },
            checkActionInteval: function () {
                if (this.lastLikeTime) {
                    var e = new Date().getTime(),
                        t = (e - this.lastLikeTime) / 1e3;
                    return (this.lastLikeTime = e), t > this.limitInteval;
                }
                return (this.lastLikeTime = new Date().getTime()), !0;
            },
            addLoading: function () {
                $('temp-loading') || this.ilikeHeader.appendHTML(this.loadingStr);
            },
            removeLoading: function () {
                var e = this.ilikeHeader.getElementsByTagName('span')[0];
                e && this.ilikeHeader.removeChild(e);
            },
            elShow: function (e) {
                e.style.display = '';
            },
            elHide: function (e) {
                e.style.dispay = 'none';
            },
        }),
            XN.EVENT.enableCustomEvent(e.prototype);
    })(XN.app.ILike);
var ILike = {
    ilike: null,
    init: function (e) {
        var t = this,
            i = e.type + '_' + e.id;
        getILike(i) ? (this.ilike = getILike(i)) : (this.ilike = new XN.app.ILike(e)),
            XN.log(this.ilike.likeCount),
            this.ilike.init(),
            this.ilike.addEvent('getViewCountSuccess', function () {
                t.renderButton(), t.renderHeaderBox();
            }),
            this.ilike.ilikeBox && delete this.ilike.ilikeBox,
            this.createBox(),
            (this.ilike.isDetailShow = !1),
            (this.ilike.guestName = $('guestName') ? $('guestName').value : e.guestName ? e.guestName : XN.user.name),
            this.ilike.viewCount(),
            (this.inputParams = e);
        try {
            Blog &&
                Blog.addEvent('onShowMoreComments', function () {
                    ILike.patchShowMoreComments();
                });
        } catch (n) {}
        try {
            AlbumComments &&
                AlbumComments.albumId &&
                AlbumComments.addEvent('onShowMoreComments', function () {
                    ILike.patchShowMoreComments();
                });
        } catch (n) {}
        try {
            XN.PAGE.albumPhoto &&
                XN.PAGE.albumPhoto.currentPhotoId &&
                (XN.PAGE.albumPhoto.addEvent('onShowMoreComments', function () {
                    ILike.patchShowMoreComments();
                }),
                XN.PAGE.albumPhoto.addEvent('onPhotoRefresh', ILike.patchPhotoRefresh));
        } catch (n) {}
    },
    toggleUserLike: function () {
        var e = this.ilike,
            t = this;
        0 == e.userLike
            ? (e.addEvent('addSuccess', function () {
                  t.renderAll();
              }),
              e.add())
            : (e.addEvent('removeSuccess', function () {
                  t.renderAll();
              }),
              e.remove());
    },
    toggleShowDetail: function () {
        var e = this.ilike,
            t = this;
        e.isDetailShow === !0
            ? (e.ilikeDetailBox.style.display = 'none')
            : (e.addEvent('getViewDetailSuccess', function () {
                  t.renderLikeList();
              }),
              e.viewDetail()),
            (e.isDetailShow = e.isDetailShow === !0 ? !1 : !0);
    },
    renderAll: function () {
        var e = this,
            t = this.ilike;
        e.renderButton(), e.renderHeaderBox(), t.isDetailShow && e.renderLikeList();
    },
    renderButton: function () {
        var e = this.ilike;
        1 == e.userLike ? (e.ilikeButton.innerHTML = '赞') : (e.ilikeButton.innerHTML = '赞'),
            e.ilikeButtonAddtional &&
                (1 == e.userLike
                    ? (e.ilikeButtonAddtional.innerHTML = '赞')
                    : (e.ilikeButtonAddtional.innerHTML = '赞'));
    },
    renderHeaderBox: function () {
        var e,
            t = this.ilike,
            i = 'ILike.toggleShowDetail();return false;';
        t.likeCount > 0 &&
            (t.userLike === !0
                ? (t.likeCount - 1 > 0 &&
                      (e = '<a onclick="' + i + '" href="javascript:;">我和' + (t.likeCount - 1) + '个人觉得赞！</a>'),
                  t.likeCount - 1 == 0 && (e = '我觉得赞！'))
                : (e = '<a onclick="' + i + '" href="javascript:;">' + t.likeCount + '个人觉得赞！</a>')),
            e
                ? ((t.ilikeHeader.parentNode.style.display = 'block'), (t.ilikeHeader.innerHTML = e))
                : (t.ilikeHeader.parentNode.style.display = 'none');
    },
    renderLikeList: function () {
        for (var e = this.ilike, t = e.likeList, i = '<ul class="figures">', n = 0, o = t.length; o > n; n++) {
            t[n].keepUse ? ' lively-user' : '', t[n].keepUse ? '连续登录7天, 即可获得橙名特权' : t[n].name;
            i += [
                '<li><div class="figure">',
                '<a namecard="' + t[n].id + '" href="' + e.urlProfile + '?id=' + t[n].id + '" target="_blank">',
                '<img src="' + t[n].headUrl + '" alt="' + t[n].name + '" />',
                '</div></li>',
            ].join('');
        }
        (i += '</ul>'), (e.ilikeDetailBox.innerHTML = i), (e.ilikeDetailBox.style.display = 'block');
    },
    createBox: function () {
        $('ILike_Box') && $('ILike_Box').parentNode.removeChild($('ILike_Box')),
            (this.ilike.ilikeBox = document.createElement('dl')),
            (this.ilike.ilikeBox.id = 'ILike_Box');
        var e = [
            '<dt class = "digged" style="display:none;">',
            '<span  id="ILike_Text_' + this.ilike.id + '">',
            '</span>',
            '</dt>',
            '<dd id="ILike_Detail_' + this.ilike.id + '" class = "diggers" style="display:none;"></dd>',
        ].join('');
        (this.ilike.ilikeBox.innerHTML = e), (this.ilike.ilikeBox.className = 'replies  with-arrow');
        var t = XN.dom.getElementsByClassName('replies', 'document', 'dl')[0];
        if (void 0 != t)
            (t.className = t.className.replace(/\swith-arrow/gi, '')),
                t.parentNode.insertBefore(this.ilike.ilikeBox, t);
        else if (XN.dom.getElementsByClassName('replies', 'document', 'div').length)
            XN.dom.getElementsByClassName('replies', 'document', 'div')[0].appendChild(this.ilike.ilikeBox);
        else if ($('commentCenter')) {
            var i = $('commentCenter');
            (this.ilike.ilikeBox.className += ' mincmt-diggers'), i.parentNode.insertBefore(this.ilike.ilikeBox, i);
        }
        this.getHTMLhandles();
    },
    getHTMLhandles: function () {
        (this.ilike.ilikeButton = $('ILike_UserLike_Handle')),
            $('photoGood') && (this.ilike.ilikeButtonAddtional = $('photoGood')),
            (this.ilike.ilikeHeader = $('ILike_Text_' + this.ilike.id)),
            (this.ilike.ilikeDetailBox = $('ILike_Detail_' + this.ilike.id));
    },
    patchShowMoreComments: function () {
        this.createBox(), this.renderAll();
    },
    patchPhotoRefresh: function (e) {
        XN.page.albumPhoto.delEvent('onPhotoRefresh', ILike.patchPhotoRefresh),
            (ILike.inputParams.id = e),
            ILike.init(ILike.inputParams);
    },
};
!(function () {
    function e(e) {
        var t = e;
        if (1e4 > e);
        else {
            var i = Math.floor(e / 1e4),
                n = Math.floor((e / 1e3) % 10);
            t = 1e5 > e ? (0 != n ? i + '.' + n + 'w' : i + 'w') : parseInt(e) < 1e7 ? i + 'w' : '999w';
        }
        return t;
    }
    var t = function (e) {
            for (var t = getILike(e), i = t.likeList, n = '', o = 0, a = i.length; a > o; o++) {
                i[o].keepUse ? ' lively-user' : '', i[o].keepUse ? '连续登录7天, 即可获得橙名特权' : i[o].name;
                n += [
                    '<li>',
                    '<a namecard="' + i[o].id + '" href="' + t.urlProfile + '?id=' + i[o].id + '" target="_blank">',
                    '<img src="' + i[o].headUrl + '" alt="' + i[o].name + '" />',
                    '</a>',
                    '</li>',
                ].join('');
            }
            t.ilikeDetailBox.forEach(function (e) {
                (e.innerHTML = n), (e.style.display = 'block');
            });
        },
        i = !!object._loader.getModule('xn/feed/likeNum'),
        n = function (t, i, n) {
            var o;
            return (o = n ? '赞(' + e(i) + ')' : i > 0 ? '赞(' + e(i) + ')' : '赞');
        },
        o = function (e) {
            var t = getILike(e);
            1 == t.userLike
                ? t.ilikeButton.forEach(function (e) {
                      i && 'undefined' != typeof e._num ? (e.innerHTML = n(e, t.likeCount, !0)) : (e.innerHTML = '赞');
                  })
                : t.ilikeButton.forEach(function (e) {
                      i && 'undefined' != typeof e._num ? (e.innerHTML = n(e, t.likeCount, !1)) : (e.innerHTML = '赞');
                  });
        },
        a = function (e) {
            var t,
                i = getILike(e);
            i.likeCount > 0 &&
                (i.userLike === !0
                    ? (i.likeCount - 1 > 0 &&
                          (t =
                              '<a href="javascript:;" onclick="ILike_toggleShow(\'' +
                              i.type +
                              "'," +
                              i.id +
                              ',' +
                              i.userId +
                              ')" href="javascript:;">我和' +
                              (i.likeCount - 1) +
                              '个人觉得赞！</a>'),
                      i.likeCount - 1 == 0 && (t = '我觉得赞！'))
                    : (t =
                          '<a onclick="ILike_toggleShow(\'' +
                          i.type +
                          "','" +
                          i.id +
                          "'," +
                          i.userId +
                          ')" href="javascript:;">' +
                          i.likeCount +
                          '个人觉得赞！')),
                t
                    ? i.ilikeHeader.forEach(function (e) {
                          (e.parentNode.style.display = 'block'), (e.innerHTML = t);
                      })
                    : i.ilikeHeader.forEach(function (e) {
                          e.parentNode.style.display = 'none';
                      });
        },
        r = function (e, i) {
            var n = getILike(e);
            i || o(e), a(e), n.isDetailShow && t(e);
        };
    (ILike_createBox = function (e) {
        var t = '',
            i = 'none',
            n = '';
        if (
            ((e.digged = isNaN(e.digged) ? 0 : e.digged),
            e.digged && !e.userDigged
                ? (t =
                      '<a href="javascript:;" onclick="ILike_toggleShow(\'' +
                      e.type +
                      "','" +
                      e.id +
                      "','" +
                      e.userId +
                      '\')">' +
                      e.digged +
                      '个人觉得赞！</a>')
                : e.digged && e.userDigged
                ? (t =
                      '<a href="javascript:;" onclick="ILike_toggleShow(\'' +
                      e.type +
                      "','" +
                      e.id +
                      "','" +
                      e.userId +
                      '\')">我和' +
                      e.digged +
                      '个人觉得赞！</a>')
                : !e.digged && e.userDigged && (t = '我觉得赞！'),
            (e.digged || e.userDigged) && (i = 'block'),
            (n += '<div class="mincmt-diggers statuscmtitem" style="display:' + i + '">'),
            (n += '<p>' + t + '</p>'),
            (n += '<ul id="diggers' + e.id + '" class="digger"></ul>'),
            (n += '</div>'),
            !getILike(e.type + '_' + e.id))
        ) {
            var o = XN.cookie.get('id'),
                a = new XN.app.ILike({
                    type: e.type,
                    id: e.id,
                    ownerId: e.ownerId,
                    likeCount: e.digged,
                    userLike: !!e.userDigged,
                    userId: o,
                });
            a.init();
        }
        return n;
    }),
        (iLike_init_n = function (e, t) {
            var i,
                n = document.getElementById('get-params-for-ilike-' + e);
            if (
                (object.use('dom', function (e) {
                    i = e;
                }),
                n)
            ) {
                var o = n.getElementsByTagName('div')[0],
                    a = JSON.parse(o.innerHTML),
                    r = o.id.split('-')[2],
                    s = 'share_edm' == a.type ? 'edm' : a.type;
                if (
                    ('page' == s && (s = t),
                    !document.getElementById('get-params-for-ilike-' + e).ilikeInited && !getILike(s + '_' + e))
                ) {
                    var l = isNaN(a.digged) ? 0 : a.digged,
                        d = {
                            type: s,
                            id: e,
                            ownerId: a.oid,
                            likeCount: l,
                            userLike: !!a.userDigged,
                            userId: XN.user.id,
                        },
                        c = new XN.app.ILike(d);
                    c.init();
                    var u = i.getElements('[id=get-params-for-ilike-' + e + ']');
                    u.forEach(function (e) {
                        e.ilikeInited = !0;
                    });
                }
                var p = $('newsfeed-' + r) ? $('feedbody' + e) : $('ilikebody' + e);
                if (!p) {
                    var h = $('newsfeed-' + r) ? $('feedbody' + r) : $('ilikebody' + r);
                    if ((h || (h = $('get-params-for-ilike-' + e)), i.wrap(h), h.getParent('.a-feed')))
                        var m = h.getParent('.a-feed').getElement('.reply-new-body'),
                            f = h.getParent('.a-feed').getElement('.next-reply');
                    var g = $('newsfeed-' + r) ? $('newsfeed-' + r) : $('status-' + r);
                    Sizzle('.details', g)[0];
                    (p = $element('div')),
                        (p.id = $('newsfeed-' + r) ? 'feedbody' + e : 'ilikebody' + e),
                        (p.className = 'ilike-body'),
                        !$('newsfeed-' + r) && Sizzle('.legend', g).length > 0
                            ? XN.dom.insertAfter(p, Sizzle('.legend', g)[0])
                            : m
                            ? m.parentNode.insertBefore(p, m)
                            : f
                            ? f.parentNode.insertBefore(p, f)
                            : h.parentNode.insertBefore(p, h),
                        (p.innerHTML =
                            '<div class="min-cmtbox statustab"><div class="mincmt-body"><div style="display:none" class="mincmt-diggers statuscmtitem"><p></p><ul class="digger" id="diggers' +
                            e +
                            '"></ul></div></div></div>');
                }
                return !0;
            }
            return !1;
        }),
        (ILike_toggleUserLike = function (e, t, i, n, o, a) {
            var s;
            object.use('dom', function (e) {
                s = e;
            }),
                iLike_init_n(t, e);
            var e = 'share_edm' == e ? 'edm' : e,
                l = getILike(e + '_' + t),
                d = [];
            return (
                s.getElements('[id=ilikebody' + t + ']').length >= 1
                    ? (d = s.getElements('[id=ilikebody' + t + ']'))
                    : s.getElements('[id=feedbody' + t + ']').length >= 1
                    ? (d = s.getElements('[id=feedbody' + t + ']'))
                    : s.getElements('[id=share_ilike_' + t + ']').length >= 1 &&
                      (d = s.getElements('[id=share_ilike_' + t + ']')),
                (l.ilikeButton = s.getElements('[id=ILike' + t + ']')),
                (l.ilikeHeader = []),
                d.forEach(function (e) {
                    var i = XN.dom.getElementsByClassName('mincmt-diggers', e);
                    i.length
                        ? l.ilikeHeader.push(i[0].getElementsByTagName('p')[0])
                        : l.ilikeHeader.push(
                              Sizzle(
                                  '.mincmt-diggers',
                                  $('get-params-for-ilike-' + t).parentNode,
                              )[0].getElementsByTagName('p')[0],
                          );
                }),
                (l.ilikeDetailBox = s.getElements('[id=diggers' + t + ']')),
                (l.ownerId = n),
                (l.guestName = o),
                a
                    ? ((l.likeCount = a.likeCount),
                      (l.userLike = a.ownerLike),
                      (l.likeList = a.likeList),
                      void r(l.gid, !0))
                    : void (1 == l.userLike
                          ? (l.bindRemove ||
                                ((l.bindRemove = !0),
                                l.addEvent('removeSuccess', function () {
                                    r(l.gid),
                                        $('XILike' + t) &&
                                            (($('XILike' + t).className = 'ilike-link'),
                                            ($('XILike' + t).innerHTML = '赞'));
                                })),
                            l.remove())
                          : (l.bindAdd ||
                                ((l.bindAdd = !0),
                                l.addEvent('addSuccess', function () {
                                    r(l.gid), $('XILike' + t) && ($('XILike' + t).innerHTML = '赞');
                                })),
                            l.add()))
            );
        }),
        (ILike_toggleShow = function (e, i, n) {
            iLike_init_n(i, e);
            var o;
            object.use('dom', function (e) {
                o = e;
            });
            var e = 'share_edm' == e ? 'edm' : e,
                a = getILike(e + '_' + i),
                r = $('ilikebody' + i) ? $('ilikebody' + i) : $('feedbody' + i);
            (a.ilikeButton = $('ILike' + i)),
                (a.ilikeHeader = XN.dom.getElementsByClassName('mincmt-diggers', r)[0].getElementsByTagName('p')[0]),
                (a.ilikeDetailBox = o.getElements('[id=diggers' + i + ']')),
                a.isDetailShow === !0
                    ? a.ilikeDetailBox.forEach(function (e) {
                          e.style.display = 'none';
                      })
                    : (a.addEvent('getViewDetailSuccess', function () {
                          t(a.gid);
                      }),
                      a.viewDetail()),
                (a.isDetailShow = a.isDetailShow === !0 ? !1 : !0);
        }),
        XN.dom.ready(function () {
            function e(e, t) {
                var i = $(e).getParent('.a-reply');
                i && (t.likeCount > 0 ? i.addClass('showlike') : i.delClass('showlike'));
            }
            if (!window.__delegateLike) {
                var t;
                (window.__delegateLike = !0),
                    object.use('dom', function (e) {
                        t = e;
                    }),
                    t.getElement('body').delegate(
                        '.ilike_comment',
                        'click',
                        function (t) {
                            XN.event.stop(t);
                            var i,
                                n,
                                o,
                                a = XN.JSON.parse(this.getAttribute('comment-data')),
                                r = ['stype', 'cid', 'rid', 'uid', 'oid', 'roid', 'name', 'url', 'liked'],
                                s = this,
                                l = a.stype + 'comment_' + a.cid,
                                d = '';
                            for (n in r)
                                if (r.hasOwnProperty(n) && 'undefined' == typeof a[r[n]])
                                    return XN.Do.alert('缺少必要参数：' + r[n]), !1;
                            getILike(l)
                                ? ((i = getILike(l)), (o = i.userLike))
                                : ((i = new XN.app.ILike(a)), i.commentInit(), (o = a.liked)),
                                o
                                    ? (i.addEvent('removeSuccess', function () {
                                          $(s).delClass('ilike_comment_liked'),
                                              (d = i.likeCount > 0 ? i.likeCount + ' ' : ''),
                                              (s.innerHTML = d + '赞'),
                                              e(s, i);
                                      }),
                                      i.commentRemove())
                                    : (i.addEvent('addSuccess', function () {
                                          $(s).addClass('ilike_comment_liked'),
                                              (d = i.likeCount > 0 ? i.likeCount + ' ' : ''),
                                              (s.innerHTML = d + '赞'),
                                              e(s, i);
                                      }),
                                      i.commentAdd());
                        },
                        2,
                    );
            }
        }),
        XN.dom.ready(function () {
            if (!window.__delegateLikeIcon) {
                window.__delegateLikeIcon = !0;
                var e;
                object.use('dom', function (t) {
                    e = t;
                }),
                    e.getElement('body').delegate(
                        '.ilike_comment_icon',
                        'click',
                        function (e) {
                            XN.event.stop(e);
                            var t,
                                i,
                                n,
                                o = XN.JSON.parse(this.getAttribute('comment-data')),
                                a = ['stype', 'cid', 'rid', 'uid', 'oid', 'roid', 'name', 'url', 'liked'],
                                r = this,
                                s = o.stype + 'comment_' + o.cid,
                                l = '';
                            for (i in a)
                                if (a.hasOwnProperty(i) && 'undefined' == typeof o[a[i]])
                                    return XN.Do.alert('缺少必要参数：' + a[i]), !1;
                            getILike(s)
                                ? ((t = getILike(s)), (n = t.userLike))
                                : ((t = new XN.app.ILike(o)), t.commentInit(), (n = o.liked)),
                                n
                                    ? (t.addEvent('removeSuccess', function () {
                                          $(r).delClass('ilike_comment_liked'),
                                              (l = t.likeCount > 0 ? t.likeCount + ' ' : ''),
                                              (r.innerHTML = l);
                                      }),
                                      t.commentRemove())
                                    : (t.addEvent('addSuccess', function () {
                                          $(r).addClass('ilike_comment_liked'),
                                              (l = t.likeCount > 0 ? t.likeCount + ' ' : ''),
                                              (r.innerHTML = l);
                                      }),
                                      t.commentAdd());
                        },
                        2,
                    );
            }
        });
})();
try {
    XN.APP.status &&
        !window.ilike_listen_status &&
        (XN.APP.status.addEvent('ILikeInit', function (e, t, i, n, o, a, r) {
            if ('blog' == t || 'album' == t || 'photo' == t || 'share' == t || 'edm' == t) {
                var s = t;
                r && 'share_edm' == r && (s = 'edm');
                var l = ILike_createBox({
                    type: s,
                    id: i,
                    ownerId: n,
                    digged: o,
                    userDigged: a,
                });
                e.push(l);
            }
        }),
        (window.ilike_listen_status = !0));
} catch (e) {}
if (
    (XN.namespace('config.status'),
    (XN.config.status.enableMedia = !1),
    (XN.config.status.enableReplyAll = !1),
    (XN.config.status.params = ''),
    XN.namespace('app.status'),
    XN.event.enableCustomEvent(XN.app.status),
    (XN.app.status.crossDomain = 1),
    (setCursor2Start = function (e) {
        if (e.setSelectionRange) e.setSelectionRange(0, 0);
        else if (e.createTextRange) {
            var t = e.createTextRange();
            t.collapse(!0), t.moveEnd('character', 0), t.moveStart('character', 0), t.select();
        }
        try {
            e.focus();
        } catch (i) {}
    }),
    (XN.APP.status.getVideoScale = function (e) {
        return /tudou/i.test(e)
            ? [400, 300]
            : /youtube/i.test(e)
            ? [425, 355]
            : /youku/i.test(e)
            ? [480, 400]
            : /sina/i.test(e)
            ? [480, 370]
            : /qq/i.test(e)
            ? [456, 362]
            : /mofile/i.test(e)
            ? [480, 395]
            : /ku6/i.test(e)
            ? [460, 390]
            : /openv/i.test(e)
            ? [500, 460]
            : void 0;
    }),
    (function (e) {
        XN.ENV.staticRoot;
        (e._errors = {
            1: '请不要从站外提交',
            2: '该状态不存在',
            6: '对不起，请重试。',
            3: '抱歉，您不能发布空状态',
            4: '抱歉，某些信息是不能发布的哦：）谢谢您的谅解。',
            5: '你短时间内发表了太多相同的内容',
            9: '你还不是TA的好友，不能使用“回复所有人”',
            11: '该用户不是您的好友, 不能转发其状态',
            12: '参数不完整, 提交失败, 请联系客服',
            15: '请激活账号',
            16: '抱歉，由于对方的隐私设置，你无法进行该操作',
            100: '本公共主页管理员关闭了该公共主页，请稍后再试',
            101: '你现在不是该公共主页的粉丝，成为粉丝后才可回复',
            102: '此公共主页的主人关闭了回复功能，目前不能回复',
            103: '检测到异常无法发布，请尝试刷新页面或重新登录',
            105: '你现在不是该情侣空间的关注者，加入后才可回复',
            106: '该报到不存在',
            107: '回复失败',
            301: '请您不要频繁发布相同内容',
            407: '抱歉，某些信息是不能发布的哦：）谢谢您的谅解',
            998: '输入不能为空',
            999: '发生异常，请尝试刷新页面后再试',
            1030: '抱歉，某些信息是不能发布的哦：）',
            1031: '请您不要频繁发布相同内容。',
            1020: '您没有权限发布。',
            1021: '发布内容太长',
            1052: '该状态不存在，或者已经被删除！',
            10: '系统繁忙,请您稍候再试。',
            6010014: '获取日志失败，请您稍后再试。',
            6020109: '该日志不存在！',
            6030110: '由于对方的隐私设置，您不能留言。',
            6030101: '您的留言权限被暂时封禁，请联系管理员。',
            6030107: '抱歉，您已超过每日的评论限额！（<a href=""+ DomainUtil.getUrlMain()+ "/notselectuser.do?action=no">成为星级用户</a>）可继续评论。',
            6030103: '抱歉，某些信息是不能发布的哦：）',
            6010106: '请您不要频繁发布相同内容。',
            6030104: '评论内容不能为空',
            6030105: '评论内容不能长于500个字符',
            601e4: '系统繁忙,请您稍候再试。',
            1201: '由于对方的隐私设置，您不能进行此操作。',
            201: '该分享不存在，或者已经被删除！',
            901: '请您不要频繁发布相同内容。',
            501: '抱歉，某些信息是不能发布的哦：）',
            1001: '系统繁忙,请您稍候再试。',
            6030108: '查询评论出错',
            2001: '服务器忙,请稍候重试',
            2002: '未知错误',
            2003: '获取用户信息失败',
            2004: '删除评论失败，请您稍候再试。',
        }),
            (e.getError = function (e) {
                return this._errors[e] || !1;
            }),
            (e.getProfileRef = function () {
                if (arguments.callee.ref) return arguments.callee.ref;
                var e = window.location.href + '',
                    t = '';
                return (t = -1 !== e.indexOf('Home.do') ? 'newsfeed' : 'minifeed'), (arguments.callee.ref = t), t;
            });
    })(XN.APP.status),
    (function (e) {
        var t = XN.STRING;
        e.updateAction = function (e) {
            $extend(this, e);
        };
        var i = '';
        (e.fwdRef = ''),
            (e.setForwardTrue = function (e, t, n, o, a) {
                (this.fwdid = e || null),
                    (this.fwdOwner = t || null),
                    (this.fwdRef = 'fwdRef=' + n),
                    (i = '&fwdId=' + this.fwdid + '&fwdOwner=' + this.fwdOwner + '&statID=' + o + '&level=' + a);
            }),
            (e.getForwardParam = function () {
                return i;
            }),
            (e.setForwardNull = function () {
                (i = ''), (this.fwdRef = '');
            }),
            (e.updateAction.prototype = {
                maxLength: 240,
                requestURI: 'http://status.' + XN.env.domain + '/doing/update.do',
                parseMediaURI: 'http://share.' + XN.env.domain + '/share/GetUrlInfo.do',
                enableMedia: !1,
                _tscCode: null,
                _postRequest: null,
                _getMediaRequest: null,
                addOnsParam: {},
                abort: function () {
                    try {
                        this._postRequest.abort();
                    } catch (e) {}
                    try {
                        this._getMediaRequest.abort();
                    } catch (e) {}
                },
                update: function (e) {
                    if (((e = t.trim(e)), '' === e))
                        return void this.fireEvent('postError', '抱歉，您不能发布空状态', e);
                    if (e.length > this.maxLength)
                        return void this.fireEvent('postError', '您最多能够输入' + this.maxLength + '个字符', e);
                    var i = /@\S.+\(\d+\)$/;
                    i.test(e) && (e += ' '),
                        this.fireEvent('beforePost'),
                        this.enableMedia && XN.config.status.enableMedia ? this._parseMedia(e) : this._updateStatus(e);
                },
                _parseMedia: function (e) {
                    var t = this,
                        i = /http:\/\/[A-Za-z0-9\%\-\:\+\#\.\?=&_~\/]+[^\:\(\s\u0391-\uFFE5]/i.exec(e);
                    if (!i) return void this._updateStatus(e);
                    var n,
                        o,
                        a = i[0];
                    return /(mp3|wma)$/i.test(a)
                        ? ((n = {
                              type: 2,
                              link: a,
                          }),
                          (o = e.replace(a, '[audio]')),
                          void this._updateStatus(e, o, n))
                        : void new XN.NET.xmlhttp({
                              url: t.parseMediaURI + '?link=' + encodeURIComponent(a),
                              method: 'get',
                              onSuccess: function (i) {
                                  try {
                                      var r = XN.JSON.parse(i.responseText);
                                  } catch (s) {
                                      return void t._updateStatus(e);
                                  }
                                  switch (r.type) {
                                      case 10:
                                          (n = {
                                              type: 3,
                                              link: r.url,
                                          }),
                                              (o = e.replace(a, '[video]'));
                                          break;
                                      case 6:
                                          (n = {
                                              type: 1,
                                              link: a,
                                          }),
                                              (o = e.replace(a, '[link]'));
                                  }
                                  t._updateStatus(e, o, n);
                              },
                              onError: function () {
                                  t._updateStatus(e);
                              },
                          });
                },
                _updateStatus: function (e, t, n) {
                    var o = this,
                        a = {};
                    (a.c = t || e), n && (a.media = XN.json.build(n)), (a.raw = e);
                    var r = XN.array.toQueryString(a);
                    (r += '&' + XN.config.status.params), (r += i);
                    for (var s in this.addOnsParam) r += '&' + s + '=' + this.addOnsParam[s];
                    var l = $('publisher_form_ticket');
                    l && (r += '&' + l.id + '=' + l.value);
                    var d = this.requestURI + '?' + XN.app.status.fwdRef;
                    this._postRequest = new XN.NET.xmlhttp({
                        url: d,
                        data: r,
                        onComplete: function () {
                            o.fireEvent('postComplete');
                        },
                        onSuccess: function (t) {
                            try {
                                (t = XN.JSON.parse(t.responseText)),
                                    0 == t.code
                                        ? (XN.STRING.isBlank(t.msg) &&
                                              (t.msg = '你可以更新状态，让朋友们知道你在做什么...'),
                                          o.fireEvent('postSuccess', t.msg, e, t),
                                          XN.app.status.fireEvent('postSuccess', t.msg, e, t),
                                          XN.app.status.setForwardNull())
                                        : (o.fireEvent('postError', XN.APP.status.getError(t.code), t.msg, t.code),
                                          XN.app.status.fireEvent(
                                              'postError',
                                              XN.APP.status.getError(t.code),
                                              t.msg,
                                              t.code,
                                          ));
                            } catch (i) {
                                o.fireEvent('postError');
                            }
                        },
                        onError: function () {
                            o.fireEvent('postError');
                        },
                    });
                },
            }),
            XN.EVENT.enableCustomEvent(e.updateAction.prototype);
    })(XN.APP.status),
    (function (e) {
        (e.Publicer = function (e) {
            $extend(this, e), this.init();
        }),
            (e.Publicer.prototype = {
                IDinput: 'publicer_input',
                IDsubmit: 'publicer_submit',
                TIPinputDefault: '你正在干嘛',
                maxLength: 140,
                checkers: {
                    isOK: !0,
                    list: [],
                    msg: {},
                },
                init: function () {
                    this.checkers.list.push(this.emptyCheck),
                        this.checkers.list.push(this.wordNumCheck),
                        this.checkers.list.push(this.defaultTextCheck),
                        (this.action = this.postAction || new XN.APP.status.updateAction()),
                        this.getUIRef(),
                        this.UIInit(),
                        this.bindEvent();
                },
                getUIRef: function () {
                    (this.input = $(this.IDinput)), (this.submitBtn = $(this.IDsubmit));
                },
                UIInit: function () {
                    (this._inputHelper = new XN.FORM.inputHelper(this.input)),
                        this._inputHelper.setDefaultValue(this.TIPinputDefault);
                },
                bindEvent: function () {
                    var e = this;
                    this.submitBtn.addEvent('click', function () {
                        e.update(e.input.value);
                    }),
                        this.action.addEvent('postError', function (t) {
                            e.fireEvent('publicer_update_error', t);
                        }),
                        this.action.addEvent('postSuccess', function (t, i, n) {
                            e.fireEvent('publicer_update_success', t, i, n);
                        }),
                        this.input.addEvent('keydown', function (t) {
                            if (((t = t || window.event), 13 == t.keyCode)) {
                                if (e.input.mention && e.input.mention.selectorShow && !e.input.mention.noMatch) return;
                                e.update(e.input.value), e.input.blur();
                            }
                        }),
                        object.use('xn.mention', function (t) {
                            t.mention.Mention.init([
                                {
                                    obj: e.input,
                                    ugcId: '',
                                    ugcType: 'status',
                                    ownerId: XN.user.id,
                                },
                            ]);
                        });
                },
                check: function (e) {
                    for (
                        var t = {
                                isOk: !0,
                                msg: 'ok',
                            },
                            i = this.checkers.list.length,
                            n = 0;
                        i > n;
                        n++
                    )
                        if ((this.checkers.list[n].call(this, e, t), !t.isOk)) return t;
                    return t;
                },
                emptyCheck: function (t, i) {
                    return t ? void 0 : ((i.isOk = !1), void (i.msg = e._errors[3]));
                },
                wordNumCheck: function (e, t) {
                    e &&
                        XN.string.trim(e).length > this.maxLength &&
                        ((t.isOk = !1), (t.msg = '抱歉,留言长度不能超过140字'));
                },
                defaultTextCheck: function (t, i) {
                    t == this.TIPinputDefault && ((i.isOk = !1), (i.msg = e._errors[3]));
                },
                update: function (e) {
                    var t = this.check(e);
                    t.isOk
                        ? ((this.action.addOnsParam = this.addOnsParam),
                          this.fireEvent('publicer_before_post', e),
                          this.action.update(e),
                          this.fireEvent('publicer_after_post', e))
                        : this.fireEvent('publicer_check_error', t.msg);
                },
            }),
            XN.event.enableCustomEvent(e.Publicer.prototype);
    })(XN.APP.status),
    (function (e) {
        var t = XN.STRING;
        XN.EVENT.addEvent;
        (e.editor = function (e) {
            $extend(this, e), this.init();
        }),
            (e.editor.prototype = {
                IDsubmit: 'publisher_statusSubmit',
                IDinput: 'publisher_statusInput',
                IDcounter: 'statusCount',
                IDinputContent: 'statusContent',
                IDcurrentStatus: 'currentStatus',
                IDoriginalStatus: 'currentStatus_bak',
                IDupdateTime: 'statusUpdateTime',
                IDemotion: 'status_emotion',
                IDemoPan: 'status_emotions',
                IDemoBtn: 'status_emotion_legend',
                IDmentionBtn: 'status_mention_button',
                IDspecial: 'commendStatus',
                IDtools: 'publisher_tools',
                IDerr: 'publisher_err',
                IDmsg: 'publisher_msg',
                TIPinputDefault: '你可以更新状态，让好友们知道你在做什么...',
                TIPonPostError: '状态更新失败,请刷新页面或重新登录',
                TIPupdateTime: '刚刚更新',
                TIPnewUser: '你可以更新状态，让朋友们知道你在做什么...',
                CFGshowError: !0,
                CFGmaxLength: 240,
                CFGspCookieName: 'sta1',
                CFGshowMax: !0,
                action: null,
                _lastStatus: null,
                actionParam: null,
                _uiType: 'home',
                getConfig: function (e) {
                    return this['CFG' + e];
                },
                getEl: function (e) {
                    return $(this['ID' + e]);
                },
                getTip: function (e) {
                    return this['TIP' + e];
                },
                init: function () {
                    var e,
                        t = this;
                    this._patchForNewUser(),
                        (this.action = e = new XN.APP.status.updateAction(
                            $extend(
                                {
                                    maxLength: this.getConfig('maxLength'),
                                    enableMedia: !0,
                                },
                                this.actionParam,
                            ),
                        )),
                        e.addEvent('beforePost', function () {
                            t._beforePost();
                        }),
                        e.addEvent('postSuccess', function (e, i, n) {
                            t._onPostSuccess(e), t.fireEvent('updateSuccess', e, i, n);
                        }),
                        e.addEvent('postError', function (e, i, n) {
                            t._onPostError(e, i, n), t.fireEvent('updateError', e, i, n);
                        }),
                        this._disableSubmit();
                    var i = this.getEl('input');
                    i.addEvent(
                        'focus',
                        function (e) {
                            t._onInputFocus(e), t.fireEvent('inputFocus', i.value);
                        },
                        !1,
                    ),
                        i.addEvent('blur', function (e) {
                            t._onBlur(), t.fireEvent('inputBlur', i.value);
                        }),
                        (this._inputHelper = new XN.FORM.inputHelper(this.getEl('input'))
                            .limit(this.getConfig('maxLength'), !1)
                            .count(this.getEl('counter'), !1)
                            .setDefaultValue(this.getTip('inputDefault'))),
                        XN.EVENT.addEvent(this.getEl('input'), 'keydown', function (e) {
                            if (13 == e.keyCode) {
                                if (
                                    t.getEl('input').mention &&
                                    t.getEl('input').mention.selectorShow &&
                                    !t.getEl('input').mention.noMatch
                                )
                                    return;
                                t.fireEvent('beforeUpdate'), t.getEl('input').blur(), t.update(t.getEl('input').value);
                            }
                        }),
                        object.use('xn.mention', function (e) {
                            e.mention.Mention.init([
                                {
                                    obj: t.getEl('input'),
                                    ugcId: '',
                                    ugcType: 'status',
                                    ownerId: XN.user.id,
                                    button: t.getEl('mentionBtn'),
                                },
                            ]);
                        }),
                        this.getEl('emotion')
                            .addEvent('click', function (e) {
                                t._parseEmotionEvent(e), XN.EVENT.stop(e || window.event);
                            })
                            .addEvent('mouseover', function (e) {
                                t._overEmotion = !0;
                            })
                            .addEvent('mouseleave', function () {
                                t._overEmotion = !1;
                            })
                            .addEvent('mousedown', function (e) {
                                t.getInputPos(), XN.event.stop(e || window.event);
                            }),
                        this.getEl('special') &&
                            this.getEl('special').addEvent('mousedown', function () {
                                t.getInputPos();
                            }),
                        this.getEl('emoBtn')
                            ? ((this._uiType = 'other'),
                              (this.showEmotion = function () {
                                  var e = this.getEl('emoPan'),
                                      t = this.getEl('emoBtn');
                                  e && e.show(), t && t.hide();
                              }),
                              (this.hideEmotion = function () {
                                  var e = this.getEl('emoPan'),
                                      t = this.getEl('emoBtn');
                                  e && e.hide(), t && t.show();
                              }),
                              (this.getEl('emoBtn').onclick = function (e) {
                                  var i = t._inputHelper.cursorPosition();
                                  t._inputHelper.focus(i.start), t.showEmotion(), XN.event.stop(e || window.event);
                              }))
                            : ((this.showEmotion = function () {
                                  this.getEl('emotion').show();
                              }),
                              (this.hideEmotion = function () {
                                  this.getEl('emotion').hide();
                              })),
                        this._enableSubmit();
                },
                showErr: function (e) {
                    if (this.IDerr) {
                        var t = $(this.IDerr);
                        t && ((t.innerHTML = e), t.show());
                    }
                },
                hideErr: function () {
                    if (this.IDerr) {
                        var e = $(this.IDerr);
                        e && e.hide();
                    }
                },
                showMsg: function (e) {
                    if (this.IDmsg) {
                        var t = $(this.IDmsg);
                        t && ((t.innerHTML = e), t.show());
                    }
                },
                hideMsg: function () {
                    if (this.IDmsg) {
                        var e = $(this.IDmsg);
                        e && e.hide();
                    }
                },
                addOnsParam: function (e) {
                    $extend(this.action.addOnsParam, e);
                },
                getInputPos: function () {
                    this._currentInputPos = $CursorPosition(this.getEl('input'));
                },
                showEmotion: XN.func.empty,
                hideEmotion: XN.func.empty,
                _patchForNewUser: function () {
                    var e = this.getEl('currentStatus'),
                        i = this.getEl('updateTime');
                    e && t.isBlank(e.innerHTML) && ((e.innerHTML = this.getTip('newUser')), i && (i.innerHTML = ''));
                },
                _parseEmotionEvent: function (e) {
                    var t = XN.EVENT.element(e);
                    'a' == t.tagName.toLowerCase() && (t = t.getElementsByTagName('img')[0]),
                        'img' == t.tagName.toLowerCase() &&
                            t.getAttribute('emotion') &&
                            this.addEmotion(t.getAttribute('emotion'));
                },
                _forSpecial: !1,
                addEmotion: function (e, t) {
                    t &&
                        (XN.Cookie.set(this.getConfig('spCookieName'), '1', 1e4, '/', '.' + XN.env.domain),
                        (this._forSpecial = !0));
                    var i = this;
                    this.forSpecial && (e = this.forSpecial(e));
                    var n = this.getEl('input');
                    this.getTip('inputDefault') == n.value && (n.value = '');
                    var o = this._currentInputPos;
                    (n.value = n.value.slice(0, o.start) + e + n.value.slice(o.end)),
                        n.blur(),
                        setTimeout(function () {
                            i._inputHelper.focus(o.start + e.length);
                        }, 10);
                },
                update: function (e) {
                    var t = XN.STRING.trim(e);
                    if (this.getTip('inputDefault') == t)
                        return void this.fireEvent('updateError', '抱歉，您不能发布空状态');
                    if ('' == t)
                        return (
                            (this.getEl('input').value = ''),
                            void this.fireEvent('updateError', XN.APP.status.getError(3))
                        );
                    var i = this.getEl('currentStatus');
                    i && (this._lastStatus = XN.STRING.trim(i.innerHTML)), this.action.update(e);
                },
                _disableSubmit: function () {
                    this.getEl('submit').addClass('disabled'),
                        (this.getEl('submit').onclick = null),
                        (this.getEl('input').disalbe = !0);
                },
                _enableSubmit: function () {
                    var e = this,
                        t = this.getEl('submit');
                    setTimeout(function () {
                        e.getEl('submit').delClass('disabled');
                    }, 1e3),
                        (t.onclick = function (t) {
                            XN.EVENT.stop(t || window.event),
                                e.fireEvent('beforeUpdate'),
                                e.update(e.getEl('input').value);
                        }),
                        (this.getEl('input').disabled = !1),
                        (this.getEl('submit').disabled = !1);
                },
                _resetInput: function () {
                    var e = this.getEl('input');
                    (e.value = this.getTip('inputDefault')), (e.style.color = '#888'), e.blur();
                },
                advancedMode: function () {
                    if (
                        (this._modeTimer && (clearTimeout(this._modeTimer), (this._modeTimer = null)),
                        'home' == this._uiType)
                    ) {
                        var e = this.getEl('inputContent'),
                            t = this.getEl('submit'),
                            i = this.getEl('counter'),
                            n = this.getEl('special');
                        e && e.addClass('inputactve'), t && t.show(), i && i.show(), n && n.hide();
                    }
                    this.showEmotion(), (this.getEl('input').style.color = '#333');
                    var o = $('statusEdit');
                    o && (o.style.backgroundPosition = '0 0'), this.fireEvent('advancedMode'), this._patchForIE();
                },
                simpleMode: function () {
                    if ('home' == this._uiType) {
                        var e = this.getEl('inputContent'),
                            t = this.getEl('counter'),
                            i = this.getEl('special');
                        e && e.delClass('inputactve'),
                            'home' == this._uiType && t && t.hide(),
                            i && !this._forSpecial && i.show();
                    }
                    var n = $('statusEdit');
                    n && (n.style.backgroundPosition = '0 -58px'), this.hideEmotion(), this.fireEvent('simpleMode');
                },
                _resetInputCounter: function (e) {
                    var t = this.getEl('counter');
                    if (t) {
                        this.getEl('input').value;
                        e && (t.innerHTML = 0),
                            t.delClass('full'),
                            'home' == this._uiType && t.hide(),
                            this.fireEvent('resetCounter');
                    }
                },
                _onBlur: function () {
                    var e = this,
                        t = this.getEl('input');
                    $(t).delClass('focus');
                    var i = t.value;
                    ('' === i || i == this.getTip('inputDefault')) && (this._overEmotion || e.simpleMode());
                },
                _patchForIE: function () {
                    XN.BROWSER.IE7 && ((document.body.style.zoom = 1.1), (document.body.style.zoom = ''));
                },
                _onInputFocus: function () {
                    var e = this.getEl('input');
                    e.value == this.getTip('inputDefault') && (e.value = ''),
                        this._resetInputCounter(),
                        this.advancedMode(),
                        $(e).addClass('focus'),
                        this.fireEvent('inputFocus');
                },
                _beforePost: function () {
                    this._disableSubmit(),
                        this.getEl('currentStatus') &&
                            (this.getEl('currentStatus').innerHTML =
                                '<img class="loading-img" src="' +
                                XN.ENV.staticRoot +
                                'img/upload_progress.gif"/>更新中，请稍候..');
                },
                _onPostSuccess: function (e) {
                    this._specialCode && -1 !== e.indexOf(this._specialCode) && XN.COOKIE.set('sta1', '1', 1e4),
                        this._enableSubmit(),
                        this._resetInput(),
                        this._resetInputCounter(!0),
                        this.simpleMode();
                    var t = this.getEl('updateTime');
                    t && (t.innerHTML = this.getTip('updateTime'));
                    var i = this.getEl('currentStatus');
                    i &&
                        ((i.innerHTML = e),
                        (i.style.backgroundColor = 'rgb(255,255,150)'),
                        setTimeout(function () {
                            XN.Effect.gradient(i, 255, 255, 150, function () {
                                i.style.backgroundColor = 'transparent';
                            });
                        }, 50));
                },
                _onPostError: function (e) {
                    this._enableSubmit(),
                        this.advancedMode(),
                        this.getEl('currentStatus') && (this.getEl('currentStatus').innerHTML = this._lastStatus),
                        this.getEl('updateTime') && (this.getEl('updateTime').innerHTML = ''),
                        this.getConfig('showError') && XN.DO.showError(e || this.getTip('onPostError'));
                },
            }),
            XN.EVENT.enableCustomEvent(e.editor.prototype);
    })(XN.APP.status),
    XN.dom.ready(function () {
        var e = '(home|www|guide)\\.' + XN.env.domain_reg;
        if (
            ((window.asyncHTMLManager &&
                new RegExp('status.' + XN.env.domain).test(window.asyncHTMLManager.location)) ||
                !new RegExp(e).test(window.location.href + '')) &&
            ($('statusEdit') || $('publisher_statusInput'))
        ) {
            var t = {};
            /status\.renren\.com/.test(window.location.href + '') && (XN.config.status.params = 'statusPage=1'),
                (t.TIPinputDefault = '你正在干嘛?');
            var i = new XN.APP.status.editor(t);
            (i.forSpecial = function (e) {
                return e;
            }),
                (window.statusEditor = i);
        }
    }),
    XN.dom.ready(function () {
        $('pageStatus') && XN.BROWSER.IE && ((document.body.style.zoom = 1.1), (document.body.style.zoom = ''));
    }),
    (function (e) {
        (e.miniFeed = function (e) {
            e || (e = {}),
                e.IDframe ||
                    ((e = {
                        IDtools: 'mini_tools',
                        IDmeta: 'mini_meta',
                        IDform: 'mini_upload_form',
                        IDsubmit: 'mini_submit',
                        IDinput: 'mini_statusInput',
                        IDinputContent: 'mini_statusInput',
                        IDcurrentStatus: 'mini_currentFeed',
                        IDupdateTime: 'mini_statusUpdateTime',
                        IDspecial: 'mini_commendStatus',
                        IDemotion: 'mini_emotion',
                        IDcommentTo: 'mini_comment_to',
                        IDcommentToAuthor: 'mini_comment_to_author',
                        IDcommentToSpan: 'mini_comment_to_span',
                        IDcommentToAuthorSpan: 'mini_comment_to_author_span',
                        IDfwdRoot: 'mini_fwd_root',
                        IDfwdStatus: 'mini_fwd_status',
                        IDemoPan: 'mini_emotions',
                        IDemoBtn: 'mini_emo_btn',
                        IDframe: 'mini_frame',
                        IDcounter: 'mini_statusCount',
                        IDerr: 'mini_err',
                        IDmsg: 'mini_msg',
                        CFGshowMax: !1,
                        TIPinputDefault: '你正在干嘛?',
                        CFGshowError: !1,
                    }),
                    (this.params = e)),
                $extend(this, e);
        }),
            (e.miniFeed.prototype = {
                skin: 'http://s.xnimg.cn/csspro/module/status-pop.css',
                action: 'http://status.' + XN.env.domain + '/publisher/minifeed.do',
                msg: {
                    mfBuildFail: '抱歉，服务出错，请刷新页面后再试。',
                },
                block: [],
                init: function (e) {
                    var t = this;
                    this.initialized ||
                        ((this.initialized = !0),
                        this.standAlong
                            ? (this.addEvent('skinLoaded', function () {
                                  t._loadSkeleton();
                              }),
                              this._loadSkin())
                            : t._loadSkeleton(),
                        t.addEvent('skeletonLoaded', function () {
                            $(this.params.IDemotion).delClass('emotions'),
                                (t.statusEditor = new XN.APP.status.editor(t.params)),
                                t.getUIRef(),
                                t.bindEvent(),
                                t.fireEvent('miniInitOver');
                        }));
                },
                bindEvent: function () {
                    var e = this;
                    (this.statusEditor._onInputFocus = function () {
                        var e = this.getEl('input');
                        (e.style.color = '#333'),
                            e.value == this.getTip('inputDefault') && (e.value = ''),
                            this._resetInputCounter(),
                            $(e).addClass('focus'),
                            this.fireEvent('inputFocus');
                    }),
                        (this.statusEditor._onBlur = function () {
                            var e = this,
                                t = this.getEl('input');
                            $(t).delClass('focus');
                            t.value;
                            this._overEmotion || e.simpleMode();
                        }),
                        this.statusEditor &&
                            (this.statusEditor.addEvent('beforeUpdate', function () {
                                e._beforeUpdate();
                            }),
                            this.statusEditor.addEvent('updateSuccess', function (t, i, n) {
                                e._updateSuccess(t, i, n), e.fireEvent('miniUpdateSus', n);
                            }),
                            this.statusEditor.addEvent('updateError', function (t) {
                                e._updateError(), e.fireEvent('miniUpdateError', t);
                            }));
                },
                _loadSkeleton: function () {
                    var e = this,
                        t = {
                            useCache: !0,
                        };
                    new XN.net.xmlhttp({
                        url: this.action,
                        data: XN.array.toQueryString(t),
                        onSuccess: function (t) {
                            var i = $(e.IDframe);
                            i ||
                                ((i = $element('div')),
                                (i.id = e.IDframe),
                                (i.className = 'publisher'),
                                document.body.appendChild(i));
                            var n = t.responseText;
                            XN.string.isJSON(n) && (n = '我勒个去，加载失败了。重试一下或者刷新页面看看行不^_^'),
                                (i.innerHTML = n),
                                e.initPopup(),
                                e.fireEvent('skeletonLoaded');
                        },
                    });
                },
                _beforeUpdate: function () {
                    this._disable();
                    var e = {
                        commentTo: this.commentTo.checked,
                        commentToAuthor: this.commentToAuthor.checked,
                    };
                    this.statusEditor.addOnsParam(e);
                },
                _updateSuccess: function (e, t, i) {
                    this._reset();
                    var n,
                        o = t.indexOf('转自');
                    if ((n = -1 != o ? t.slice(0, o) : t)) {
                        if (this.commentTo.checked) {
                            var a = {
                                c: n,
                                source: this.fwd.statusId,
                                t: 3,
                                owner: this.fwd.ownerId,
                            };
                            setTimeout(function () {
                                new XN.net.xmlhttp({
                                    url: 'http://status.' + XN.env.domain + '/feedcommentreply.do?from=wp',
                                    data: XN.array.toQueryString(a),
                                });
                            }, 2e3);
                        }
                        if (this.commentToAuthor.checked) {
                            var r = {
                                c: n,
                                source: this.fwd.fwdRootDoingId,
                                t: 3,
                                owner: this.fwd.fwdRootId,
                            };
                            setTimeout(function () {
                                new XN.net.xmlhttp({
                                    url: 'http://status.' + XN.env.domain + '/feedcommentreply.do?from=wp',
                                    data: XN.array.toQueryString(r),
                                });
                            }, 13e3);
                        }
                    }
                },
                _updateError: function () {
                    this._reset();
                },
                _reset: function () {
                    var e = $(this.IDsubmit);
                    e.delClass('disabled');
                },
                _disable: function () {
                    var e = $(this.IDsubmit);
                    e.addClass('disabled'), (e.disable = !1);
                    var t = $(this.IDinput);
                    t.disable = !1;
                },
                initPopup: function () {
                    this.popInited = !0;
                    var e = $element('div'),
                        t = $element('div');
                    (t.id = 'mini_meta'),
                        XN.browser.IE6 && (t.style.cssText = 'margin-top:-20px;padding-left:66px;'),
                        (t.innerHTML = [
                            '<p><a target="_blank" href="#" id="mini_fwd_root"></a> : <span id="mini_fwd_status"></span></p>',
                            '<div id="mini_target"><label><input checked="checked" id="mini_comment_to" type="checkbox"/>同时评论给<span id="mini_comment_to_span"></span></label></div>',
                            '<div style="height:16px;margin-top:7px"><div id="mini_author" style="margin-top:0px"><label><input checked="checked" id="mini_comment_to_author" type="checkbox"/>同时评论给原作者<span id="mini_comment_to_author_span"></span></label></div></div>',
                        ].join('')),
                        e.appendChild($(this.IDframe)),
                        e.appendChild(t),
                        XN.event.addEvent(document, 'keydown', function (e) {
                            (e = e || window.event), 27 == e.keyCode && XN.APP.status.setForwardNull();
                        });
                    try {
                        window.currentDialog.remove();
                    } catch (i) {}
                    this.pan = new XN.ui.dialog({
                        title: '分享',
                        width: 475,
                        height: 100,
                        body: e.innerHTML,
                        showCloseButton: !0,
                    })
                        .addButton({
                            text: '确定',
                            onclick: function () {
                                this.preventHide(), $('mini_submit').click();
                            },
                        })
                        .addButton({
                            text: '取消',
                            className: 'gray',
                            onclick: function () {
                                this.hide();
                            },
                        })
                        .show();
                    this.pan;
                    (window.currentDialog = this.pan),
                        ($(this.IDsubmit).style.display = 'none'),
                        ($(this.IDinput).style.height = '58px'),
                        ($(this.IDform).style.paddingRight = '0px'),
                        ($(this.IDmeta).style.paddingRight = '0px'),
                        ($(this.IDemoPan).style.right = '15px'),
                        ($(this.IDemoPan).style.top = '58px'),
                        ($(this.IDmeta).style.marginTop = '10px'),
                        ($(this.IDinput).style.width = $(this.IDtools).style.width = $(this.IDmeta).style.width =
                            '350px'),
                        XN.browser.IE &&
                            (($(this.IDform).style.width = '373px'),
                            ($(this.IDemoPan).style.top = '67px'),
                            XN.browser.IE6
                                ? ($(this.IDmeta).style.marginTop = '-20px')
                                : ($(this.IDmeta).style.marginTop = '15px'));
                },
                getUIRef: function () {
                    (this.commentTo = $(this.IDcommentTo)),
                        (this.commentToSpan = $(this.IDcommentToSpan)),
                        (this.commentToAuthor = $(this.IDcommentToAuthor)),
                        (this.commentToAuthorSpan = $(this.IDcommentToAuthorSpan)),
                        (this.fwdRoot = $(this.IDfwdRoot)),
                        (this.fwdStatus = $(this.IDfwdStatus)),
                        (this.authorDiv = $('mini_author')),
                        (this.targetDiv = $('mini_target'));
                },
                _skeleton: function (e) {},
                show: function () {
                    if (
                        this.popInited &&
                        (this.pan.show(), $(this.IDframe) && $(this.IDframe).show(), this.statusEditor)
                    ) {
                        (this.statusEditor.getEl('input').disabled = !1),
                            this.statusEditor.hideErr(),
                            this.statusEditor.hideMsg(),
                            (this.commentTo.checked = !0),
                            (this.commentToAuthor.checked = !1);
                        var e = this.fwd;
                        e.fwdRoot
                            ? (this.targetDiv.show(), this.readonly ? this.authorDiv.hide() : this.authorDiv.show())
                            : this.readonly
                            ? (this.targetDiv.hide(), this.authorDiv.hide())
                            : (this.targetDiv.show(), this.authorDiv.hide()),
                            (this.commentToSpan.innerHTML = e.fwdTarget),
                            (this.commentToAuthorSpan.innerHTML = e.fwdRoot || e.fwdTarget),
                            (this.fwdRoot.innerHTML = e.fwdRoot || e.fwdTarget),
                            (this.fwdRoot.href =
                                'http://www.' + XN.env.domain + '/profile.do?id=' + (e.fwdRootId || e.fwdTargetId)),
                            (this.fwdStatus.innerHTML = e.fwdRootStatus || e.status);
                    }
                },
                hide: function () {
                    this.pan && this.pan.hide();
                },
                setStatus: function (e, t) {
                    var i = this;
                    (this.readonly = t.readonly), (this.fwd = $extend({}, t));
                    this.statusEditor.getEl('input');
                    (this.statusEditor.getEl('input').value = e), this.statusEditor._inputHelper.limitCheck();
                    var n = $(this.statusEditor.IDemoBtn);
                    n && n.show(),
                        setTimeout(function () {
                            setCursor2Start(i.statusEditor.getEl('input'));
                        }, 0);
                },
                _loadSkin: function () {
                    var e = this;
                    XN.loadFile(this.skin, function () {
                        e.fireEvent('skinLoaded');
                    });
                },
                _standAlong: function (e) {},
            });
    })(XN.widgets),
    XN.event.enableCustomEvent(XN.widgets.miniFeed.prototype),
    (function (e) {
        var t = 240;
        e.FowardManager = {
            fowardThis: function (e, t, i, n) {
                if (((i = i || 'status'), !XN.string.isBlank(e) || !XN.string.isBlank(t))) {
                    var o = [];
                    (o.id = e), (o.owner = t), (o.ref = i);
                    var a = arguments.callee;
                    try {
                        a.request.abort();
                    } catch (r) {}
                    this.fireEvent('beforeFwd');
                    var s = this;
                    XN.dom.ready(function () {
                        a.request = new XN.net.xmlhttp({
                            url: 'http://status.' + XN.env.domain + '/doing/fwdinfo.do',
                            data: XN.array.toQueryString(o),
                            method: 'get',
                            onSuccess: function (e) {
                                n && n.call(s, e);
                            },
                            onError: function () {
                                XN.DO.showError('加载失败');
                            },
                        });
                    });
                }
            },
            fowardDoing: function (e, i, n, o) {
                var a = 'status';
                if (!XN.string.isBlank(e) || !XN.string.isBlank(i)) {
                    var r = [];
                    (r.id = e), (r.owner = i), (r.ref = a);
                    var s = arguments.callee;
                    try {
                        s.request.abort();
                    } catch (l) {}
                    this.fireEvent('beforeFwd');
                    var d = this;
                    XN.dom.ready(function () {
                        s.request = new XN.net.xmlhttp({
                            url: 'http://status.' + XN.env.domain + '/doing/fwdinfo.do',
                            data: XN.array.toQueryString(r),
                            method: 'get',
                            onSuccess: function (r) {
                                var s = XN.json.parse(r.responseText);
                                if (0 == s.code) {
                                    if (void 0 == s.userName) return void XN.DO.showError('转发失败，请稍候重试');
                                    var l = '转自';
                                    (l +=
                                        void 0 === s.fwdRootStatus ? s.userName : s.userName + ': ' + s.statusContent),
                                        l.length > t && (l = l.slice(0, t - 3) + '...'),
                                        XN.APP.status.setForwardTrue(e, i, a, n, o),
                                        (s.ownerId = i),
                                        (s.statusId = e),
                                        (s.statID = n),
                                        (s.level = o),
                                        d.fireEvent('fwdSus', l, s);
                                } else 10 == s.code ? XN.DO.showError('不能转发自己的状态') : XN.DO.showError(s.msg);
                            },
                            onError: function () {
                                XN.DO.showError('加载失败');
                            },
                        });
                    });
                }
            },
        };
    })(XN.widgets),
    XN.event.enableCustomEvent(XN.widgets.FowardManager),
    XN.dom.ready(function () {
        var e = /http:\/\/status\.renren\.com/,
            t = document.location.href + '',
            i = !1;
        e.test(t) && (i = !0);
        var n = new XN.widgets.miniFeed();
        i || (n.standAlong = !0),
            (window.fwdmgr = XN.widgets.FowardManager),
            fwdmgr.addEvent('fwdSus', function (e, t) {
                n.initialized
                    ? (n.setStatus(e, t), n.show())
                    : (n.addEvent('miniInitOver', function () {
                          n.setStatus(e, t), n.show();
                      }),
                      n.init());
            }),
            n.addEvent('miniUpdateSus', function () {
                var e = n.statusEditor;
                n.fwd.statID &&
                    -1 != n.fwd.statID.indexOf('page') &&
                    jxn.get(
                        'http://page.renren.com/' + n.fwd.ownerId + '/fdoing/doingforwardlog',
                        'ugcid=' + n.fwd.statusId,
                    );
                var t,
                    i = new Date().getTime();
                e.showMsg('<span id="mini_msg_ok" style="background:rgb(255,255,150);">发布成功!</span>');
                var o = $('mini_msg_ok');
                setTimeout(function () {
                    XN.Effect.gradient(o, 255, 255, 150, function () {
                        (o.style.backgroundColor = 'transparent'),
                            e.hideMsg(),
                            setTimeout(function () {
                                n.hide(),
                                    (t = new Date().getTime() - i),
                                    new XN.net.xmlhttp({
                                        url: 'http://status.renren.com/statistics/fwdWindow/cost?costtime=' + t,
                                        method: 'GET',
                                    });
                            }, 500);
                    });
                }, 500);
            }),
            n.addEvent('miniUpdateError', function (e) {
                var t = n.statusEditor;
                t.getEl('submit').addClass('disabled'),
                    t.simpleMode(),
                    t.showErr(e),
                    n.readonly &&
                        (t.getEl('submit').delClass('disabled'),
                        (t.getEl('submit').disabled = !1),
                        (t.getEl('input').disabled = !0),
                        setTimeout(function () {
                            t.hideErr();
                        }, 2e3)),
                    setTimeout(function () {
                        t.getEl('submit').delClass('disabled'),
                            (t.getEl('submit').disabled = !1),
                            (t.getEl('input').disabled = !1),
                            t._inputHelper.focus();
                    }, 2e3);
            }),
            (window.a_fowardDoing = function (e, t, i, n) {
                fwdmgr.fowardDoing(e, t);
            });
    }),
    (forwardDoing = function (e, t, i, n) {
        fwdmgr.fowardDoing(e, t, i, n);
    }),
    (function () {
        if (!XN.vocalPlayer) {
            XN.namespace('XN.vocalPlayer');
            var e = {
                flashSource: '',
                flashUrl: 'http://s.xnimg.cn/n/apps/status/module/vocal/swf/player_v1.0.swf?t=' + new Date().getTime(),
                swfobjectUrl: 'http://s.xnimg.cn/xnapp/common/js/swfobjectv2.js',
                flashReady: !1,
                flashId: 'vocalPlayerEl',
                flashvars: {},
                flashParams: {
                    wmode: 'transparent',
                    allowscriptaccess: 'always',
                },
                start: function (t) {
                    var i = this;
                    t && (this.flashSource = t),
                        this.flashReady
                            ? (this.flashPlayerObj.setFileUrl(this.flashSource), this.play())
                            : XN.loadFiles([this.swfobjectUrl], function () {
                                  (e.flashReady = !0), i.initFlash();
                              });
                },
                initFlash: function () {
                    if (!swfobject.ua.pv[0])
                        return (
                            XN.Do.alert({
                                msg:
                                    '您未安装flash播放器，请<a href="http://www.adobe.com/go/getflash/" target="_blank">点击下载</a>安装最新的flash后刷新页面',
                            }),
                            this.fireEvent('flashFailed'),
                            (this.flashReady = !1),
                            (this.flashFailed = !0),
                            !1
                        );
                    var e = document.createElement('div');
                    (e.style.cssText = 'position:absolute;left:0;top:0;width:1px;height:1px'),
                        e.setAttribute('id', this.flashId),
                        document.body.appendChild(e),
                        swfobject.embedSWF(
                            this.flashUrl,
                            this.flashId,
                            '1',
                            '1',
                            '10.0.0',
                            '',
                            this.flashvars,
                            this.flashParams,
                        ),
                        XN.browser.IE6 &&
                            (($(this.flashId).style.position = 'absolute'),
                            ($(this.flashId).style.top = document.documentElement.scrollTop + 'px'));
                },
                play: function () {
                    this.flashFailed || this.flashPlayerObj.fl_play();
                },
                pause: function () {
                    this.flashFailed || this.flashPlayerObj.fl_pause();
                },
            };
            (XN.vocalPlayer = e),
                (XN.vocalPlayer.flashAdded = function () {
                    (e.flashPlayerObj = $(XN.vocalPlayer.flashId)), e.start(), e.fireEvent('flashReady');
                }),
                (XN.vocalPlayer.mp3Added = function () {
                    e.fireEvent('videoReady');
                }),
                (XN.vocalPlayer.playEnd = function () {
                    e.fireEvent('videoEnd');
                }),
                XN.event.enableCustomEvent(XN.vocalPlayer),
                (XN.vocalPlayer.on = XN.vocalPlayer.addEvent);
        }
    })(),
    object.add('xn.vocalPlayer', 'dom, events', function (e, t, i) {
        var n = new Class({
            initialize: function (e, i) {
                object.extend(e, i),
                    e.total &&
                        e.trigger &&
                        e.url &&
                        (t.wrap(e.trigger),
                        e.bindClick(),
                        n.instances.push(e),
                        Sizzle('.vocal-count', e.trigger.parentNode).length > 0 &&
                            (e.counter = Sizzle('.vocal-count', e.trigger.parentNode)[0]),
                        Sizzle('.num', e.trigger).length > 0 && (e.numer = Sizzle('.num', e.trigger)[0]),
                        null != e.trigger.hideFocus && (e.trigger.hideFocus = !0));
            },
            bindClick: function (e) {
                (e.running = !1),
                    (e.lastPauseAt = 0),
                    XN.vocalPlayer.addEvent('videoReady', function () {
                        e.endLoading(),
                            e.isCurrent && (e.run(), (e.running = !0), XN.element.addClass(e.trigger, 'vocal-running'));
                    }),
                    XN.vocalPlayer.addEvent('flashFailed', function () {
                        e.end(), e.endLoading();
                    }),
                    e.trigger.addEvent(
                        'click',
                        function (t) {
                            if ((XN.event.stop(t), n.setCurrent(e), e.running))
                                XN.vocalPlayer.pause(),
                                    e.pause(),
                                    (e.running = !1),
                                    $(e.trigger).delClass('vocal-running');
                            else {
                                if (
                                    (0 === e.lastPauseAt
                                        ? (e.startLoading(), XN.vocalPlayer.start(e.url))
                                        : XN.vocalPlayer.play(),
                                    XN.vocalPlayer.flashFailed)
                                )
                                    return;
                                e.addCount();
                            }
                        },
                        i.HOLD,
                    );
            },
            addCount: function (e) {
                if (e.ownerId && e.voiceId) {
                    e.psource || (e.psource = '10001');
                    var t,
                        i = '';
                    if (
                        (e.trigger.hasClassName('vocal-player-tiny')
                            ? ((t = 'http://voice.renren.com/comment/incPlayCount'),
                              (i =
                                  'replyer=' +
                                  e.ownerId +
                                  '&commentId=' +
                                  e.voiceId +
                                  '&owner=' +
                                  e.sourceOwner +
                                  '&source=' +
                                  e.sourceId +
                                  '&ugcType=' +
                                  e.ugcType))
                            : (t = e.photoId
                                  ? 'http://photo.renren.com/photo/' +
                                    e.ownerId +
                                    '/photo-' +
                                    e.photoId +
                                    '/addPlayCount?voiceId=' +
                                    e.voiceId +
                                    '&psource=' +
                                    e.psource
                                  : 'http://voice.renren.com/' + e.ownerId + '/' + e.voiceId + '/addVC'),
                        new XN.net.xmlhttp({
                            url: t,
                            method: 'POST',
                            data: i,
                        }),
                        e.counter)
                    ) {
                        var n = e.counter.innerHTML.match(/\d+/)[0];
                        e.counter.innerHTML = e.counter.innerHTML.replace(n, parseInt(n) + 1);
                    }
                }
            },
            startLoading: function (e) {
                if (
                    (Sizzle('.time', e.trigger).length > 0 && (Sizzle('.time', e.trigger)[0].style.display = 'none'),
                    Sizzle('.loading', e.trigger).length > 0)
                )
                    Sizzle('.loading', e.trigger)[0].style.display = 'block';
                else {
                    var i = t.getDom('<div class="loading">···</div>');
                    e.trigger.appendChild(i);
                }
                e.loadChange();
            },
            loadChange: function (e) {
                var t = 0,
                    i = ['', '·', '··', '···'],
                    n = Sizzle('.loading', e.trigger)[0];
                n &&
                    (e.loadTimer = setInterval(function () {
                        n.innerHTML = i[t++ % 4];
                    }, 400));
            },
            endLoading: function (e) {
                Sizzle('.time', e.trigger).length > 0 && (Sizzle('.time', e.trigger)[0].style.display = 'block'),
                    Sizzle('.loading', e.trigger).length > 0 &&
                        ((Sizzle('.loading', e.trigger)[0].style.display = 'none'), clearInterval(e.loadTimer));
            },
            run: function (e) {
                var t,
                    i,
                    n,
                    o = new Date().getTime();
                'undefined' == typeof e.lastPauseAt && (e.lastPauseAt = 0),
                    (e.runner = setInterval(function () {
                        return (
                            (t = new Date().getTime()),
                            (e.percent = e.lastPauseAt + (t - o) / e.total / 1e3),
                            (i = 12 - Math.floor(12 * e.percent)),
                            e.numer && ((n = Math.round(e.total * (1 - e.percent))), (e.numer.innerHTML = n)),
                            e.percent >= 1 ? (e.end(), !1) : void 0
                        );
                    }, 1e3));
            },
            pause: function (e) {
                (e.lastPauseAt = e.percent), clearInterval(e.runner);
            },
            end: function (e) {
                e.pause(),
                    clearInterval(e.runner),
                    (e.running = !1),
                    (e.lastPauseAt = e.percent = 0),
                    $(e.trigger).delClass('vocal-running'),
                    e.endLoading(),
                    (e.isCurrent = !1),
                    e.numer && (e.numer.innerHTML = e.total);
            },
            reset: function (e, t) {
                e.end(),
                    object.extend(e, t),
                    $(XN.vocalPlayer.flashId) && ($(XN.vocalPlayer.flashId).remove(), (XN.vocalPlayer.flashReady = !1));
            },
        });
        (n.instances = []),
            (n.setCurrent = function (e) {
                for (var t = n.instances.indexOf(e), i = n.instances.length, o = 0; i > o; o++)
                    o != t ? n.instances[o].end() : (n.instances[o].isCurrent = !0);
            }),
            (e.Player = n);
    }),
    object.use('xn/vocalPlayer, dom, events', function (e, t, i) {
        t.ready(function () {
            t.wrap(document.body).delegate(
                '.vocal-player',
                'mouseover',
                function (t) {
                    if (!this.playerInited) {
                        this.playerInited = !0;
                        var i = XN.JSON.parse(this.getAttribute('data-vocal')),
                            n = this;
                        (this.player = new e.Player({
                            total: i.time,
                            trigger: this,
                            url: i.url,
                            ownerId: i.ownerId,
                            voiceId: i.voiceId,
                            photoId: i.photoId || '',
                            psource: i.psource || '',
                            sourceOwner: i.sourceOwner || '',
                            sourceId: i.sourceId || '',
                            ugcType: i.ugcType || 0,
                        })),
                            window.asyncHTMLManager &&
                                !e.Player.asyncInited &&
                                ((e.Player.asyncInited = !0),
                                asyncHTMLManager.addEvent('beforeload', function () {
                                    e.Player.instances.forEach(function (e) {
                                        e.reset();
                                    }),
                                        (n.playerInited = !1);
                                })),
                            window.newsfeed &&
                                !e.Player.feedInited &&
                                ((e.Player.feedInited = !0),
                                newsfeed.addEvent('beforereload', function () {
                                    e.Player.instances.forEach(function (e) {
                                        e.reset();
                                    });
                                }));
                    }
                },
                i.HOLD,
            );
        });
    }),
    object.use('dom', function (e) {
        e.ready(function () {
            var t = Sizzle('.feed-list')[0] || Sizzle('#timeline')[0];
            t &&
                (t.profile_delegateLock ||
                    ((t.profile_delegateLock = !0),
                    $(t).delegate('.reply', 'click', function () {
                        var t,
                            i = e.wrap(this).getParent('.reply-content'),
                            n = this.getAttribute('data-fid'),
                            o = '',
                            a = '',
                            r = Sizzle('#newsfeed-' + n)[0];
                        if (r) {
                            var s = e.wrap(r).getElement('textarea');
                            if (!s) return;
                            s.pre_reply = '';
                        }
                        if (i) {
                            if ((t = i.getElement('.text'))) {
                                o = t.innerHTML.replace(/[\r\n]/g, '');
                                var l,
                                    d,
                                    c = /<[^>]+>/g,
                                    u = /\s+/g,
                                    p = /^(.*?[^:]?)\/\/[^\/]+\:/;
                                if (((a = o.replace(c, '').replace(/&nbsp;/g, '')), p.test(a))) {
                                    var h = e.wrap(r).getElement('h3') || e.wrap(r).getElement('.tl-share-title');
                                    if (h) {
                                        var m = h.innerHTML;
                                        (m = m.replace(c, '').replace(/&nbsp;/g, '')),
                                            (m = m.replace(u, '')),
                                            (l = a.replace(u, ''));
                                    }
                                    if (l.indexOf(m) > -1) return;
                                    a = a.match(p)[1];
                                }
                            }
                            '' != a &&
                                ((d = a.length),
                                (l = a.replace(u, '')),
                                d > 0 && ':' !== l.charAt(d - 1) && (s.pre_reply = '//' + a + ' '));
                        }
                    }),
                    $(t).delegate('.submit', 'mousedown', function () {
                        var t = e.wrap(this).getParent('.comment-box');
                        if (t) {
                            var i = t.getElement('textarea'),
                                n = i.getAttribute('data-fid'),
                                o = Sizzle('#shareThis_' + n)[0];
                            if ((void 0 == i.pre_reply && (i.pre_reply = ''), o && o.checked)) {
                                var a,
                                    r = i.value + i.pre_reply,
                                    s = e.wrap(o).getParent('.action'),
                                    l = 0;
                                s &&
                                    e.wrap(s).getElement('.maxlength') &&
                                    (l = parseInt(e.wrap(s).getElement('.maxlength').innerHTML)),
                                    (a = r.length),
                                    l >= a && (i.value += i.pre_reply);
                            }
                            i.pre_reply = '';
                        }
                    })));
        });
    }),
    object.add('guideRight', 'dom, events, net, ua', function (e, t, i, n, o) {
        (window.TLGuide = e),
            (this.menuShow = function () {
                var t = $('tl-guide-help');
                e._hideTimeout && clearInterval(e._hideTimeout),
                    (e._showInterval = setInterval(function () {
                        var i = parseInt(t.style.width);
                        return 120 == i ? void clearInterval(e._showInterval) : void (t.style.width = i + 10 + 'px');
                    }, 10));
            }),
            (this.menuHidd = function () {
                var t = $('tl-guide-help');
                e._showInterval && clearInterval(e._showInterval),
                    (e._hideTimeout = setTimeout(function () {
                        var i = parseInt(t.style.width);
                        return 30 >= i ? void clearInterval(e._hideInterval) : void (t.style.width = '30px');
                    }, 25));
            }),
            XN.DOM.ready(function () {
                6 == o.ua.ie &&
                    ($('tl-guide-title') && ($('tl-guide-title').style.height = '115px'),
                    window.addEvent(
                        'scroll',
                        function () {
                            $('tl-guide-help').style.top = document.documentElement.scrollTop + 185 + 'px';
                        },
                        !1,
                    ));
            });
    }),
    object.execute('guideRight'),
    'undefined' == typeof deconcept)
)
    var deconcept = new Object();
'undefined' == typeof deconcept.util && (deconcept.util = new Object()),
    'undefined' == typeof deconcept.SWFObjectUtil && (deconcept.SWFObjectUtil = new Object()),
    (deconcept.SWFObject = function (e, t, i, n, o, a, r, s, l, d) {
        if (document.getElementById) {
            (this.DETECT_KEY = d ? d : 'detectflash'),
                (this.skipDetect = deconcept.util.getRequestParameter(this.DETECT_KEY)),
                (this.params = new Object()),
                (this.variables = new Object()),
                (this.attributes = new Array()),
                e && this.setAttribute('swf', e),
                t && this.setAttribute('id', t),
                i && this.setAttribute('width', i),
                n && this.setAttribute('height', n),
                o && this.setAttribute('version', new deconcept.PlayerVersion(o.toString().split('.'))),
                (this.installedVer = deconcept.SWFObjectUtil.getPlayerVersion()),
                !window.opera && document.all && this.installedVer.major > 7 && (deconcept.SWFObject.doPrepUnload = !0),
                a && this.addParam('bgcolor', a);
            var c = r ? r : 'high';
            this.addParam('quality', c),
                this.setAttribute('useExpressInstall', !1),
                this.setAttribute('doExpressInstall', !1);
            var u = s ? s : window.location;
            this.setAttribute('xiRedirectUrl', u),
                this.setAttribute('redirectUrl', ''),
                l && this.setAttribute('redirectUrl', l);
        }
    }),
    (deconcept.SWFObject.prototype = {
        useExpressInstall: function (e) {
            (this.xiSWFPath = e ? e : 'expressinstall.swf'), this.setAttribute('useExpressInstall', !0);
        },
        setAttribute: function (e, t) {
            this.attributes[e] = t;
        },
        getAttribute: function (e) {
            return this.attributes[e];
        },
        addParam: function (e, t) {
            this.params[e] = t;
        },
        getParams: function () {
            return this.params;
        },
        addVariable: function (e, t) {
            this.variables[e] = t;
        },
        getVariable: function (e) {
            return this.variables[e];
        },
        getVariables: function () {
            return this.variables;
        },
        getVariablePairs: function () {
            var e,
                t = new Array(),
                i = this.getVariables();
            for (e in i) t[t.length] = e + '=' + i[e];
            return t;
        },
        getSWFHTML: function () {
            var e = '';
            if (navigator.plugins && navigator.mimeTypes && navigator.mimeTypes.length) {
                this.getAttribute('doExpressInstall') &&
                    (this.addVariable('MMplayerType', 'PlugIn'), this.setAttribute('swf', this.xiSWFPath)),
                    (e =
                        '<embed type="application/x-shockwave-flash" src="' +
                        this.getAttribute('swf') +
                        '" width="' +
                        this.getAttribute('width') +
                        '" height="' +
                        this.getAttribute('height') +
                        '" style="' +
                        this.getAttribute('style') +
                        '"'),
                    (e += ' id="' + this.getAttribute('id') + '" name="' + this.getAttribute('id') + '" ');
                var t = this.getParams();
                for (var i in t) e += [i] + '="' + t[i] + '" ';
                var n = this.getVariablePairs().join('&');
                n.length > 0 && (e += 'flashvars="' + n + '"'), (e += '/>');
            } else {
                this.getAttribute('doExpressInstall') &&
                    (this.addVariable('MMplayerType', 'ActiveX'), this.setAttribute('swf', this.xiSWFPath)),
                    (e =
                        '<object id="' +
                        this.getAttribute('id') +
                        '" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="' +
                        this.getAttribute('width') +
                        '" height="' +
                        this.getAttribute('height') +
                        '" style="' +
                        this.getAttribute('style') +
                        '">'),
                    (e += '<param name="movie" value="' + this.getAttribute('swf') + '" />');
                var t = this.getParams();
                for (var i in t) e += '<param name="' + i + '" value="' + t[i] + '" />';
                var n = this.getVariablePairs().join('&');
                n.length > 0 && (e += '<param name="flashvars" value="' + n + '" />'), (e += '</object>');
            }
            return e;
        },
        write: function (e) {
            if (this.getAttribute('useExpressInstall')) {
                var t = new deconcept.PlayerVersion([6, 0, 65]);
                this.installedVer.versionIsValid(t) &&
                    !this.installedVer.versionIsValid(this.getAttribute('version')) &&
                    (this.setAttribute('doExpressInstall', !0),
                    this.addVariable('MMredirectURL', escape(this.getAttribute('xiRedirectUrl'))),
                    (document.title = document.title.slice(0, 47) + ' - Flash Player Installation'),
                    this.addVariable('MMdoctitle', document.title));
            }
            if (
                this.skipDetect ||
                this.getAttribute('doExpressInstall') ||
                this.installedVer.versionIsValid(this.getAttribute('version'))
            ) {
                var i = 'string' == typeof e ? document.getElementById(e) : e;
                return (i.innerHTML = this.getSWFHTML()), !0;
            }
            return (
                '' != this.getAttribute('redirectUrl') &&
                    (document.location.href = (document.location.href + '').replace(this.getAttribute('redirectUrl'))),
                !1
            );
        },
    }),
    (deconcept.SWFObjectUtil.getPlayerVersion = function () {
        var e = new deconcept.PlayerVersion([0, 0, 0]);
        if (navigator.plugins && navigator.mimeTypes.length) {
            var t = navigator.plugins['Shockwave Flash'];
            t &&
                t.description &&
                (e = new deconcept.PlayerVersion(
                    t.description
                        .replace(/([a-zA-Z]|\s)+/, '')
                        .replace(/(\s+r|\s+b[0-9]+)/, '.')
                        .split('.'),
                ));
        } else if (navigator.userAgent && navigator.userAgent.indexOf('Windows CE') >= 0)
            for (var i = 1, n = 3; i; )
                try {
                    n++,
                        (i = new ActiveXObject('ShockwaveFlash.ShockwaveFlash.' + n)),
                        (e = new deconcept.PlayerVersion([n, 0, 0]));
                } catch (o) {
                    i = null;
                }
        else {
            try {
                var i = new ActiveXObject('ShockwaveFlash.ShockwaveFlash.7');
            } catch (o) {
                try {
                    var i = new ActiveXObject('ShockwaveFlash.ShockwaveFlash.6');
                    (e = new deconcept.PlayerVersion([6, 0, 21])), (i.AllowScriptAccess = 'always');
                } catch (o) {
                    if (6 == e.major) return e;
                }
                try {
                    i = new ActiveXObject('ShockwaveFlash.ShockwaveFlash');
                } catch (o) {}
            }
            null != i && (e = new deconcept.PlayerVersion(i.GetVariable('$version').split(' ')[1].split(',')));
        }
        return e;
    }),
    (deconcept.PlayerVersion = function (e) {
        (this.major = null != e[0] ? parseInt(e[0]) : 0),
            (this.minor = null != e[1] ? parseInt(e[1]) : 0),
            (this.rev = null != e[2] ? parseInt(e[2]) : 0);
    }),
    (deconcept.PlayerVersion.prototype.versionIsValid = function (e) {
        return this.major < e.major
            ? !1
            : this.major > e.major
            ? !0
            : this.minor < e.minor
            ? !1
            : this.minor > e.minor
            ? !0
            : this.rev < e.rev
            ? !1
            : !0;
    }),
    (deconcept.util = {
        getRequestParameter: function (e) {
            try {
                var t = document.location.search || document.location.hash;
                if (null == e) return t;
            } catch (i) {
                return '';
            }
            if (t)
                for (var n = t.substring(1).split('&'), o = 0; o < n.length; o++)
                    if (n[o].substring(0, n[o].indexOf('=')) == e) return n[o].substring(n[o].indexOf('=') + 1);
            return '';
        },
    }),
    (deconcept.SWFObjectUtil.cleanupSWFs = function () {
        for (var e = document.getElementsByTagName('OBJECT'), t = e.length - 1; t >= 0; t--) {
            e[t].style.display = 'none';
            for (var i in e[t]) 'function' == typeof e[t][i] && (e[t][i] = function () {});
        }
    }),
    deconcept.SWFObject.doPrepUnload &&
        (deconcept.unloadSet ||
            ((deconcept.SWFObjectUtil.prepUnload = function () {
                (__flash_unloadHandler = function () {}),
                    (__flash_savedUnloadHandler = function () {}),
                    window.attachEvent('onunload', deconcept.SWFObjectUtil.cleanupSWFs);
            }),
            window.attachEvent('onbeforeunload', deconcept.SWFObjectUtil.prepUnload),
            (deconcept.unloadSet = !0))),
    !document.getElementById &&
        document.all &&
        (document.getElementById = function (e) {
            return document.all[e];
        });
var getQueryParamValue = deconcept.util.getRequestParameter,
    FlashObject = deconcept.SWFObject,
    SWFObject = deconcept.SWFObject;
object.define('xn/profile/brithdayStep', 'dom, events', function (require, e) {
    require('dom'), require('events');
    e.brithdayStep = new Class(function () {
        (this.lastPage = 1e5),
            (this.initialize = function (e) {
                e.bindNext(), e.bindPre(), e.hide(), e.bindSmallNext(), e.bindSmallPre();
            }),
            (this.bindNext = function (e) {
                var t = jxn('#brith_next_btn'),
                    i = jxn('#brith_pre_btn');
                t.click(function () {
                    var n = jxn('.brithday-wall ul li'),
                        o = jxn('.brithday-wall ul'),
                        a = n.last().data('id'),
                        r = parseInt(o.data('page')),
                        s = parseInt(o.data('curpage'));
                    'next-btn-disable' != t[0].className &&
                        ('pre-btn-disable' == i[0].className && (i[0].className = 'pre-btn-normal'),
                        s == r && 'true' == n.last().data('more')
                            ? e.getMore(
                                  function (e) {
                                      var i = jxn(e),
                                          n = i.last().data('more');
                                      'false' == n && (t[0].className = 'next-btn-disable'),
                                          o.append(e),
                                          o.animate(
                                              {
                                                  marginLeft: '-=648px',
                                              },
                                              500,
                                              'easeIn',
                                          ),
                                          o.attr('data-page', r + 1),
                                          o.attr('data-curpage', s + 1);
                                  },
                                  a,
                                  3,
                              )
                            : (o.animate(
                                  {
                                      marginLeft: '-=648px',
                                  },
                                  500,
                                  'easeIn',
                              ),
                              o.attr('data-curpage', s + 1),
                              s + 1 == e.lastPage &&
                                  'false' == n.last().data('more') &&
                                  (t[0].className = 'next-btn-disable')));
                });
            }),
            (this.bindPre = function (e) {
                var t = jxn('#brith_pre_btn');
                t.click(function () {
                    var i = jxn('#brith_next_btn'),
                        n = jxn('.brithday-wall ul'),
                        o = parseInt(n.data('curpage'));
                    (e.lastPage = parseInt(n.data('page'))),
                        'pre-btn-disable' != t[0].className &&
                            ('next-btn-disable' == i[0].className && (i[0].className = 'next-btn-normal'),
                            n.attr('data-curpage', o - 1),
                            o - 1 == '0' && (t[0].className = 'pre-btn-disable'),
                            n.animate(
                                {
                                    marginLeft: '+=648px',
                                },
                                500,
                                'easeIn',
                            ));
                });
            }),
            (this.hide = function (e) {
                jxn('.brithday-wall').delegate('.brith-hide', 'click', function (t) {
                    var i = jxn(this).parent('li'),
                        n = i.data('id'),
                        o = jxn('.brithday-wall ul li'),
                        a = jxn('.brithday-wall ul'),
                        r = o.last().data('id');
                    e.hideContent(
                        function (e) {
                            i.remove(), a.append(e);
                        },
                        r,
                        n,
                    );
                });
            }),
            (this.getMore = function (e, t, i, n) {
                new XN.net.xmlhttp({
                    url: 'http://www.' + XN.env.domain + '/profile_bday_wall/profile_bday_data_right',
                    method: 'get',
                    data: 'ownerId=' + profileOwnerId + '&sourceId=' + i + '&limit=' + n,
                    onSuccess: function (e) {
                        t && t(e.responseText);
                    },
                    onError: function () {
                        new XN.DO.showMsg('网络异常，请稍后再试！');
                    },
                });
            }),
            (this.hideContent = function (e, t, i, n) {
                new XN.net.xmlhttp({
                    url: 'http://www.' + XN.env.domain + '/profile_bday_wall/profile_bday_hide',
                    method: 'post',
                    data: 'bdayId=' + n + '&offsetId=' + i,
                    onSuccess: function (e) {
                        t && t(e.responseText);
                    },
                    onError: function () {
                        new XN.DO.showMsg('网络异常，请稍后再试！');
                    },
                });
            }),
            (this.bindSmallNext = function (e) {
                var t = jxn('#next_btn_small'),
                    i = jxn('#pre_btn_small');
                t.click(function () {
                    var e = jxn('.brithday-wall ul');
                    'next-btn-disable' != t[0].className &&
                        (e.animate(
                            {
                                marginLeft: '-=210px',
                            },
                            500,
                            'easeIn',
                        ),
                        (i[0].className = 'pre-btn-normal'),
                        (t[0].className = 'next-btn-disable'));
                });
            }),
            (this.bindSmallPre = function (e) {
                var t = jxn('#next_btn_small'),
                    i = jxn('#pre_btn_small');
                i.click(function () {
                    var e = jxn('.brithday-wall ul');
                    'pre-btn-disable' != i[0].className &&
                        (e.animate(
                            {
                                marginLeft: '+=210px',
                            },
                            500,
                            'easeIn',
                        ),
                        (i[0].className = 'pre-btn-disable'),
                        (t[0].className = 'next-btn-normal'));
                });
            });
    });
}),
    object.use('xn/profile/brithdayStep', function (e) {
        XN.dom.ready(function () {
            new e.brithdayStep();
        });
    }),
    define('nx/profile/previewskin', function (require, e) {
        var t = require('jquery'),
            i = require('mustache.js');
        require('ui/renren/addfriend'),
            require('ui/dialog'),
            t.widget('dialog.skinOpenVip', t.ui.dialog, {
                _createWidget: function (e) {
                    this._super(
                        {
                            buttons: [
                                {
                                    text: '取消',
                                    click: function () {
                                        t(this).dialog('instance').destroy();
                                    },
                                },
                                {
                                    text: '开通VIP',
                                    class: 'vip-skin-open-btn',
                                    click: function () {
                                        t(this).dialog('instance').destroy(),
                                            window.open('http://i.renren.com/pay/pre?wc=syhf');
                                    },
                                },
                            ],
                            dialogClass: 'ui-dialog-confirm',
                            width: 500,
                        },
                        '<div>' + e + '</div>',
                    );
                },
            });
        var n =
                '<div class="skinLayer">		<div class="layerBg"></div>		<div class="skinBox">			<a href="javascript:void(0)" class="closeBtn"><div></div></a>			<div class="skinDetail">				<span class="imgTitle">装扮缩略图</span>				<div class="skinImg">					<span class="tag">个性皮肤</span>					<img id="thumbnail" src="{{thumbnail}}"/>				</div>				<ul class="detailBox">					<li class="name"><span>装扮名称</span><span id="name" class="content">{{name}}</span></li>					<li><span>装扮价格</span><span id="price" class="content">{{price}}</span></li>					<li class="price"><span>会员价格</span><span id="_vipprice" class="content">{{_vipprice}}</span></li>					<li><span>有效期</span><span id="expireDay" class="content">{{expireDay}}天</span></li>				</ul>				<button data-cgids="{{cgids}}" data-skinid="{{goods_id}}" data-name="{{name}}" id="previewskinApply" class="applyBtn skin-save-btn">应用</button>				<button id="previewskinCancel" class="backBtn">返回</button>			</div>			<div class="selectSkin">				<ul>					<li data-skinid="{{goods_id}}" class="active"><div class="border_content"></div><img src="{{thumbnail}}"/><img class="selectedTag"src="http://s.xnimg.cn/apps/profile2/res/previewskin/selectedTag.png"/></li>',
            o =
                '<li><div class="border_content"></div><img class="thumbnails" src=""/><img class="selectedTag"src="http://s.xnimg.cn/apps/profile2/res/previewskin/selectedTag.png"/></li>					<li><div class="border_content"></div><img class="thumbnails" src=""/><img class="selectedTag"src="http://s.xnimg.cn/apps/profile2/res/previewskin/selectedTag.png"/></li>					<li><div class="border_content"></div><img class="thumbnails" src=""/><img class="selectedTag"src="http://s.xnimg.cn/apps/profile2/res/previewskin/selectedTag.png"/></li>				</ul>				<a href="http://i.renren.com/store/index/tpl" target="_blank" class="more">更多</a>			</div>		</div>	</div>',
            a = [
                '<div class="vip-mall-buy">',
                ' <div class="vip-mall-buy-info clearfix">',
                ' <img src="' + nx.user.tinyPic + '" alt="' + nx.user.name + '">',
                ' <span class="vip-mall-buy-user">' + nx.user.name + '</span>',
                ' <span class="vip-mall-buy-num">账户余额：{{xnb}}人人豆</span>{{^canBuy}}<span class="not-have-en">(余额不足，请充值人人豆)</span>{{/canBuy}}',
                ' </div>',
                ' <div class="clearfix">',
                ' <b>选择支付方式</b>',
                ' <input type="radio" name="payType" id="renpay" checked="checked"><label for="renpay" class="vip-mall-label" id="renpay-label">人人豆支付</label>',
                ' <input type="radio" name="payType" id="mobpay"><label for="mobpay" id="mobpay-label" class="vip-mall-label" >手机话费支付</label>',
                ' </div>',
                ' <div class="clearfix">',
                ' <b>确认装扮信息</b>',
                ' <table class="vip-mall-goods-info">',
                ' <tr>',
                ' <th class="text-left">装扮名称</th><th>装扮类型</th><th>装扮价格</th><th>会员价格</th><th>有效期</th>',
                ' </tr>',
                ' <tr>',
                ' <td class="text-left"><img src="{{thumbnail}}" alt="{{name}}"><span class="vip-mall-goods-name">{{name}}</span></td>',
                ' <td>{{type}}</td><td><div id="goods-renren">{{price}}人人豆</div><div id="goods-mob">{{mobilePrice}}元</div></td><td class="vip-mall-red">VIP免费</td><td>{{expireDay}}天</td>',
                ' </tr>',
                ' </table>',
                ' </div>',
                ' <div class="clearfix" id="mobpay-box">',
                ' <b>确认支付信息</b>',
                ' <table class="buy-info"><tr><th>手机号码：</th><td><input type="text" class="mobile-num"/><span class="mob-tips">（仅支持移动手机号）</span><span class="mobile-error"></span></td></tr>',
                ' <tr><th>验证码：</th><td><input type="text" class="yanzheng-text"><img src="#" alt="loading" id="pay-catc"/><span class="yanzheng-error"></span></td></tr></table>',
                ' </div>',
                ' </div>',
            ].join(''),
            r = ['<div class="ui-mall-checkbox">发布到新鲜事</div>'].join(''),
            s = {
                'offline': '该商品已下架',
                'disneyonly': '仅迪斯尼会员可用',
                'yearpayonly': '仅年付会员可用',
                'viponly': '仅vip可用',
                'highschonly': '仅高中用户可用',
                '非法！': '非法！',
                '没有选中物品': '没有选中物品',
            },
            l = {
                init: function (e) {
                    var a = this,
                        r = {
                            goods_id: e,
                            kind: 17,
                        };
                    t.post(
                        'http://i.renren.com/store/cart/buyoneinfo',
                        r,
                        function (e) {
                            e._vipprice = e.vipFree ? 'VIP免费' : e.vipPrice;
                            var r = i.render(n, e);
                            t('body').append(r + o);
                            var s = {
                                kind: 17,
                                tagId: 207,
                                curpage: 0,
                                pagesize: 4,
                            };
                            t.post(
                                'http://i.renren.com/store/view/dataJson',
                                s,
                                function (e) {
                                    t.each(e.goods.list, function (e) {
                                        if (0 != e) {
                                            var i = t('.selectSkin>ul>li').eq(e);
                                            i.attr('data-skinid', this.id)
                                                .find('.thumbnails')
                                                .attr('src', this.newThumbnail1);
                                        }
                                    }),
                                        t('.selectSkin').on('click', 'li', function () {
                                            var e = t(this).attr('data-skinid');
                                            t('.selectSkin>ul>li').removeClass('active'),
                                                t(this).addClass('active'),
                                                a.previewSkin(e);
                                        });
                                },
                                'json',
                            );
                        },
                        'json',
                    ),
                        t('body').on('click', '.skinLayer .closeBtn', function () {
                            t('.skinLayer').hasClass('fold')
                                ? t('.skinLayer').removeClass('fold')
                                : t('.skinLayer').addClass('fold');
                        }),
                        t('body').delegate('.vip-mall-label', 'click', function (e) {
                            var t;
                            return (t = e.currentTarget.id), a.toggleMob(t);
                        }),
                        t('body').on('click', '#pay-catc', function () {
                            a.catc();
                        }),
                        t('body').on('click', '#previewskinApply', function () {
                            a.isSave(t(this).attr('data-name'), t(this).attr('data-skinid'));
                        }),
                        t('body').on('click', '.ui-mall-checkbox', function () {
                            t(this).hasClass('ui-mall-checkbox-checked')
                                ? t(this).removeClass('ui-mall-checkbox-checked')
                                : t(this).addClass('ui-mall-checkbox-checked');
                        }),
                        t('body').on('click', '#previewskinCancel', function () {
                            window.opener
                                ? (window.location.href = window.opener.location.href)
                                : (window.location.href = 'http://i.renren.com/store/index/home');
                        });
                },
                previewSkin: function (e) {
                    var i = this;
                    t.post(
                        'http://i.renren.com/store/cart/buyoneinfo',
                        {
                            goods_id: e,
                            kind: 17,
                        },
                        function (e) {
                            t('.skinLayer #thumbnail').attr('src', e.thumbnail),
                                t('.skinLayer #name').html(e.name),
                                t('.skinLayer #price').html(e.price),
                                (e._vipprice = e.vipFree ? 'VIP免费' : e.vipPrice),
                                t('.skinLayer #_vipprice').html(e._vipprice),
                                t('.skinLayer #expireDay').html(e.expireDay + '天'),
                                t('.skinLayer #previewskinApply').attr('data-name', e.name),
                                t('.skinLayer #previewskinApply').attr('data-skinid', e.goods_id);
                        },
                        'json',
                    ),
                        t.post(
                            'http://i.renren.com/store/view/v7TemplateJson',
                            {
                                templateId: e,
                                kind: 17,
                            },
                            function (e) {
                                i.viewSkinAction(e);
                            },
                            'json',
                        );
                },
                isSave: function (e, i) {
                    var n,
                        o = this;
                    return (
                        (n = t.dialog.confirm(
                            '<div id="vip-mall-no-vip">确定要应用装扮“' + e + '”吗？</div>',
                            function () {
                                var e = t('.ui-mall-checkbox').hasClass('ui-mall-checkbox-checked');
                                return o.saveSkin(e, i), t(this).trigger('close');
                            },
                            function () {
                                return t(this).trigger('close');
                            },
                        )),
                        (n.options.close = function () {
                            return t(this).dialog('destroy');
                        }),
                        t('.ui-dialog-confirm').find('.ui-widget-footer').prepend(r),
                        t('.ui-mall-checkbox').trigger('click')
                    );
                },
                saveSkin: function (e, i) {
                    var n = this;
                    t.ajax({
                        url: 'http://i.renren.com/shop/op/buy2',
                        data: {
                            sendFeed: e,
                            goods_id: i,
                            kind: 17,
                        },
                        type: 'post',
                        dataType: 'json',
                        success: function (e) {
                            return e.result
                                ? void t.dialog.success('装扮应用成功！')
                                : 'other' === e.reason
                                ? ((e.id = i), n.notVipCtrl(e))
                                : t.dialog.error(n.setErrorText(e));
                        },
                        error: function () {
                            t.dialog.error('网络服务异常，请稍后再试。');
                        },
                    });
                },
                toggleMob: function (e) {
                    var i = this;
                    return (
                        (showBox = t('#mobpay-box')),
                        'mobpay-label' === e && showBox.is(':hidden')
                            ? (showBox.show(),
                              t('#goods-renren').hide(),
                              t('#goods-mob').show(),
                              t('.vip-mall-go-to').length && t('.vip-mall-go-to').html('确认购买'),
                              i.catc())
                            : 'renpay-label' === e && showBox.is(':visible')
                            ? (showBox.hide(),
                              t('#goods-mob').hide(),
                              t('#goods-renren').show(),
                              t('.vip-mall-go-to').html('充值并支付'))
                            : void 0
                    );
                },
                catc: function () {
                    return t('#pay-catc').attr({
                        src: 'http://icode.renren.com/getcode.do?t=vipopen&rnd=' + +new Date(),
                    });
                },
                setErrorText: function (e) {
                    return e.msg ? e.msg : e.reason ? s[e.reason] : '装扮应用失败！';
                },
                notVipCtrl: function (e) {
                    var i,
                        n,
                        o = this;
                    (i = t.dialog.confirm(
                        '<div id="vip-mall-no-vip">您还不是VIP会员，无法免费应用装扮</div>',
                        function () {
                            return (location.href = 'http://i.renren.com/pay/pre');
                        },
                        function () {
                            return t(this).trigger('close'), o.getUserVipData(e);
                        },
                    )),
                        (i.options.close = function () {
                            return t(this).dialog('destroy');
                        });
                    var n = t('.ui-dialog-buttonset').find('button');
                    return (
                        n.eq(0).addClass('ui-button-blue').children().html('购买装扮'),
                        n.eq(1).children().html('开通VIP')
                    );
                },
                getUserVipData: function (e) {
                    var i,
                        n = this;
                    return (
                        (i = {
                            goods_id: e.id,
                            kind: 17,
                        }),
                        t.getJSON('http://i.renren.com/store/cart/buyoneconfirm', i, function (e) {
                            return n.setHaveTpl(e);
                        })
                    );
                },
                setHaveTpl: function (e) {
                    var n = this;
                    return (
                        (e.canBuy = e.xnb ? !0 : !1),
                        t(i.render(a, e)).dialog({
                            autoOpen: !0,
                            modal: !0,
                            width: '650px',
                            close: function () {
                                return t(this).dialog('destroy');
                            },
                            buttons: [
                                {
                                    text: '返回',
                                    click: function () {
                                        return t(this).dialog('close');
                                    },
                                },
                                {
                                    text: e.canBuy ? '确认购买' : '充值并支付',
                                    id: 'vip-mall-buy',
                                    class: e.canBuy ? 'ui-button-blue' : 'ui-button-blue vip-mall-go-to',
                                    click: function (i) {
                                        var o, a;
                                        return (
                                            (o = this),
                                            (a = t(i.currentTarget)),
                                            '充值并支付' !== a.html() && '充值并支付' !== a.children().html()
                                                ? n.payIt(e, o)
                                                : void (location.href =
                                                      'http://i.renren.com/storage/pay/tozhichongCart?cgids=' + e.cgids)
                                        );
                                    },
                                },
                            ],
                        }),
                        n.toggleMob('renpay-label'),
                        t('.vip-mall-buy input:radio').button()
                    );
                },
                chekMob: function () {
                    var e, i, n, o;
                    return (
                        (i = t('.mobile-num').val()),
                        (e = /^\d{11}$/.test(i)),
                        (o = t('.yanzheng-text').val().trim()),
                        (n = o.length ? !0 : !1),
                        e ||
                            (t('.mobile-num').addClass('error-input'),
                            t('.mobile-error').html('请填写正确的手机号'),
                            t('.mob-tips').hide()),
                        o || (t('.yanzheng-text').addClass('error-input'), t('.yanzheng-error').html('请填写验证码')),
                        e && n
                    );
                },
                payIt: function (e, i) {
                    var n,
                        o,
                        a = this;
                    if (((n = t('.vip-mall-buy input:radio:checked')[0].id), 'mobpay' === n)) {
                        if (a.chekMob())
                            return (
                                (o = {
                                    cgids: e.cgids,
                                    phone: t('.mobile-num').val(),
                                    checkcode: t('.yanzheng-text').val(),
                                    key_id: 'vipopen',
                                }),
                                t.post(
                                    'http://i.renren.com/store/cart/buy',
                                    o,
                                    function (n) {
                                        return n.r
                                            ? n.result
                                                ? (window.open(n.returl), t(i).dialog('close'))
                                                : void (location.href =
                                                      'http://i.renren.com/storage/pay/tozhichongCart?cgids=' + e.cgids)
                                            : (a.setErrorBuy(n.msg), a.catc());
                                    },
                                    'json',
                                )
                            );
                    } else if ('renpay' === n)
                        return (
                            (o = {
                                cgids: e.cgids,
                            }),
                            t.post(
                                'http://i.renren.com/store/cart/buy',
                                o,
                                function (n) {
                                    return n.r
                                        ? n.result
                                            ? (t(i).dialog('close'), t.dialog.success('购买成功！'))
                                            : void (location.href =
                                                  'http://i.renren.com/storage/pay/tozhichongCart?cgids=' + e.cgids)
                                        : (a.setErrorBuy(n.msg), a.catc());
                                },
                                'json',
                            )
                        );
                },
                setErrorBuy: function (e) {
                    switch (e) {
                        case 'phoneerror':
                            return (
                                t('.mobile-num').addClass('error-input'),
                                t('.mobile-error').html('请填写正确的手机号'),
                                t('.mob-tips').hide()
                            );
                        case 'checkerror':
                            return (
                                t('.yanzheng-text').addClass('error-input'), t('.yanzheng-error').html('请填写验证码')
                            );
                        default:
                            return t.dialog.error(s[e]);
                    }
                },
                saveResult: function (e, i) {
                    e.r
                        ? e.result
                            ? t.dialog.success('皮肤保存成功')
                            : (window.location.href = 'http://i.renren.com/storage/pay/tozhichongCart?cgids=' + i)
                        : 'viponly' === e.msg
                        ? t.dialog.skinOpenVip(
                              '<div class="vip-skin-tip">您还不是尊贵的<a href="http://i.renren.com/pay/pre?wc=syhf" target="_blank">VIP会员</a>,无法使用此套皮肤</div>',
                          )
                        : 'offline' === e.msg
                        ? t.dialog.alert('该商品已下架')
                        : 'disneyonly' === e.msg
                        ? t.dialog.alert('仅迪斯尼会员可用')
                        : 'yearpayonly' === e.msg
                        ? t.dialog.alert('仅年付会员可用')
                        : 'highschonly' === e.msg
                        ? t.dialog.alert('仅高中用户可用')
                        : t.dialog.alert(e.msg);
                },
                viewSkinAction: function (e) {
                    var i = t('#skin_cover_wrap'),
                        n = t('#hometpl_style'),
                        o = t('#skin_cover_image'),
                        a = t('#skin_profile_view'),
                        r = '<br /><style>' + e.vipStyle + '</style>',
                        s = 'http://www.renren.com/' + nx.user.id + '/profile?vipTplV7Id=' + e.id;
                    n.html(r),
                        e.vipStyle
                            ? (o.attr('src', e.coverImgUrl),
                              a.attr('href', s),
                              i.css({
                                  display: 'block',
                              }))
                            : i.css({
                                  display: 'none',
                              });
                },
            };
        e.module = l;
    }),
    jQuery(function () {
        define(function (require, e) {
            var t = document.createElement('a');
            t.href = window.location.href;
            var i = null,
                n = function (e) {
                    if (!e) return !1;
                    e = e.slice(1).split('&');
                    for (var t, n = 0; n < e.length; n++)
                        if (((t = e[n].split('=')), 'vipTplV7Id' == t[0])) return (i = t[1]), !0;
                    return !1;
                };
            if (n(t.search)) {
                var o = require('nx/profile/previewskin');
                o.module.init(i);
            }
        });
    }),
    object.define('privacy/seed/publisher-timeline', 'dom', function (require, e) {
        var t,
            i = require('dom');
        if (
            !object.privacySeedTimelineLoaded &&
            ((object.privacySeedTimelineLoaded = !0),
            (t = function (e) {
                try {
                    var t = (e.id.split('_'), JSON.parse(e.getData('option'))),
                        i = JSON.parse(e.getData('disabled')),
                        n = {};
                    return (
                        object.extend(n, t),
                        i &&
                            object.extend(n, {
                                disabled: !0,
                                disabledMsg: i.msg,
                            }),
                        n
                    );
                } catch (o) {
                    return !1;
                }
            }),
            !window.__privacyPublisherDelegate)
        ) {
            var n = i.getElement('.status-global-publisher'),
                o = i.getElement('textarea', n);
            n &&
                n.delegate('.privacy-trigger', 'click', function (e) {
                    if (this.hasClass('active') || this.locked) this.privacy && this.privacy.destroy();
                    else {
                        var i,
                            n = t(this),
                            a = this;
                        (this.locked = !0),
                            n &&
                                require.async('privacy', function (e) {
                                    setTimeout(function () {
                                        (i = new e.Privacy(a, n)),
                                            (a.locked = !1),
                                            i.addEvent('destroy', function () {
                                                setTimeout(function () {
                                                    o && o.removeClass('holdInput'), o && o.focus();
                                                }, 0);
                                            }),
                                            o && o.addClass('holdInput');
                                    }, 100);
                                });
                    }
                }),
                (window.__privacyPublisherDelegate = !0);
            var a = i.getElements('.global-publisher-selector a'),
                r = Sizzle('.privacy-trigger', n)[0];
            a.forEach(function (e, t) {
                0 != t &&
                    e.addEvent('click', function () {
                        r && r.privacy && r.privacy.destroy();
                    });
            });
        }
    }),
    XN.dom.ready(function () {
        object.execute('privacy/seed/publisher-timeline');
    });
