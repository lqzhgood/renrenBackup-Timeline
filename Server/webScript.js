// 删除多余妨碍截屏的元素
document.querySelector('#nxContainer > div > div.bd-container > div.frame-nav-wrap').outerHTML = '';
document.querySelector('#nxHeader').outerHTML = '';
document.querySelector('#webpager').outerHTML = '';
document.querySelector('#time-machine-side').outerHTML = '';
document.querySelector('#nxContainer > div > div.nx-wraper.clearfix').outerHTML = '';
document.querySelector('#nxContainer > div > div.bd-container').style.marginLeft = 0;

// 增加 CSS 展开留言
function addNewStyle(newStyle) {
    let styleElement = document.getElementById('styles_js');

    if (!styleElement) {
        styleElement = document.createElement('style');
        styleElement.type = 'text/css';
        styleElement.id = 'styles_js';
        document.getElementsByTagName('head')[0].appendChild(styleElement);
    }

    styleElement.appendChild(document.createTextNode(newStyle));
}

addNewStyle('#timeline section .feed-replies {display:block !important;}');

let isTargetMoreTimer = null;

document.querySelector('#timeline_wrapper').addEventListener('DOMSubtreeModified', $event => {
    clearTimeout(isTargetMoreTimer);
    isTargetMoreTimer = setTimeout(async () => {
        const arr = Array.from(document.querySelectorAll('.feed-replies .more-reply .more'));
        for (let i = 0; i < arr.length; i++) {
            const n = arr[i];
            if (n.parentNode.innerText == '加载中...') {
                continue;
            }
            n.click();
            await sleep();
            console.log(`${i + 1}/${arr.length}`);
        }

        document.querySelectorAll('[src]').forEach(n => {
            const src = n.src;
            if (src.startsWith('http://head.xiaonei.com/photos/http://hdn')) {
                n.src = src.replace('http://head.xiaonei.com/photos/http://hdn.xnimg.cn', 'http://hdn.xnimg.cn');
            }
        });
        console.log('处理完毕');
    }, 2000);
});

document.querySelectorAll('.more-reply').forEach(n => console.log(n.textContent));
document.querySelectorAll('.show_more'); // 查看是否还有没点开的加载 timeLine

// .feed_loading

(async () => {
    // while (1) {
    //     const n = Array.from(document.querySelectorAll('.show_more'));
    //     if (n.length == 0) break;
    //     console.log('n.length', n.length);
    //     n[0].querySelector('span').click();
    //     await sleep(10_000);
    // }
    const n = Array.from(document.querySelectorAll('.show_more'));
    for (let i = 0; i < n.length; i++) {
        const node = n[i];
        node.scrollIntoView();
        await sleep(500);
        node.querySelector('span').click();

        console.log(document.querySelectorAll('.show_more').length);
        await sleep(10_000);
    }
})();

// 平滑滚动

let _scrollTop = 0;

let timer1 = setInterval(() => {
    if (_scrollTop >= document.body.clientHeight) {
        console.log('已经滚动到底了');
        clearInterval(timer1);
    }
    _scrollTop = document.body.clientHeight;
    window.scroll({ top: _scrollTop, left: 0, behavior: 'smooth' });
}, 5_000);

let timer2 = setInterval(async () => {
    let x = document.querySelector('.show_more');
    if (!x) {
        console.log('已经全部展开了');
        clearInterval(timer2);
    }
    x.scrollIntoView();
    await sleep(200);
    x.querySelector('span').click();
}, 100_000);

function sleep(t = 200) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, t);
    });
}

// 重新加载一下失败的图片  判断依据是未成功加载的图片高度会比较小 (16)
Array.from(document.querySelectorAll('img')).filter(n => n.naturalHeight == 0 && n.naturalWidth == 0);
Array.from(document.querySelectorAll('img'))
    .filter(n => n.height <= 20 && n.width > 100)
    .map(n => {
        n.src = n.src;
        return n;
    }).length;
