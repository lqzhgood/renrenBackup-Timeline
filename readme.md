# 人人网爬虫

### 鸣谢

renrenBackup
https://github.com/whusnoopy/renrenBackup

### 补充

2021 年 5 月 18 日 8:00~14:00 维护,维护完以后人人已经面目全非, `www.renren.com/${id}/profile` 返回页面不存在. <br /><br />
也就是说刚写完这个程序还未开源就已失效。。。。不过 downImg 还是可以配合 `renrenBackup` 使用的 <br />
代码很乱 也没整理, 还是先放出来吧 <br />

### 说明

主要是人人网快挂了吧,想存起来, 大部分数据可以通过 `https://github.com/whusnoopy/renrenBackup` 爬取，但是由于 `状态` 信息因为人人网关闭接口的关系无法通过 `renrenBackup` 获取。 <br /><br />
经过观察，自己的状态可以在 `人人网`- `个人主页` 中看到，但是不会 Python， 没法去 `renrenBackup` pr[https://github.com/whusnoopy/renrenBackup/issues/52#issuecomment-828892614] <br /><br />
想到最简单的办法是通过浏览器浏览（展开）全部 `个人主页`，然后通过工具保存截图/pdf/页面等形式保存下载。 <br /><br />
但是人人网已经极其不稳定,页面逻辑对比错误也没有太多额外处理,导致很难在人人网上一次性浏览全部`个人主页`不报错的。所以想的是通过爬虫爬取相关信息，再通过 chrome 插件重定向官方请求到本地抓取的页面。这样就能保证能一次性浏览全部`个人主页`不报错了。然后再去截图、导出 pdf、导出页面等。<br /><br />
哎，本来只想爬时间线，后来评论也爬了~~ 基本全部个人`状态`信息都爬下来了，好像自己根据爬取的数据重写页面效果好些…… 算了，页面不想写了<br /><br />

### 使用

-   填写 config.js
-   Crawler 目录
    -   timeline
        -   执行 `node timeLine.js` 将会生成并下载时间线
        -   执行 `node down-timeline.js` 将会根据上面生成的时间线文件（下载失败或为空的）逐个补全
        -   执行 `node check-timeline.js` 会有若干种方式确保 timeline 是下载完整的, 如果 check 没通过, 重复 timeLine / down-timeline
    -   comment
        -   执行 `node common.js` 将会根据上面下载的时间线 html 分析出需要下载的评论
    -   Merger
        -   执行 `node merger.js` 将会把上面下载的 comment 合并到下载的 timeline html 中，这样劫持后就直接是全部评论，不需要再请求加载更多评论
-   Server 目录
    -   执行 `node .\bin\www`
-   Chrome 浏览器劫持
    -   ReRes (https://chrome.google.com/webstore/detail/reres/gieocpkbblidnocefjakldecahgeeica) 按如下规则劫持
    -   http://www.renren.com/${id}/profile 打开这个链接然

##### downImg

`renrenBackup` 下载的图片因为 cdn 的问题有些不全, (cdn 没有图片直接返回 404,稍等回源拿到图片以后就能打开了), `config.js target` 中填写 `renrenBackup img`的绝对路径, 然后执行多次 `node index.js` 就会下载完毕 404 的图片了

### ReRes 规则

导入 `Server\ReResSetting.json` 文件

### config.js

```js
module.exports = {
    ID: 123, // id
    YEAR_RANGE: [2008, 2015], // 抓取范围
    COOKIE: '', // COOKIE
    LIMIT: 30, // time line 每次数量 (不要修改 官方好像是硬编码的 修改也没用)
    OUT_DIR_TIME_LINE: path.join(__dirname, '../Pages/TimeLine'), // 不要修改 爬取的 timeline 目录
    OUT_DIR_COMMENTS: path.join(__dirname, '../Pages/Comments'), // 不要修改 爬取的 commit 目录
    OUT_DIR_MERGER: path.join(__dirname, '../Pages/Merger'), // 不要修改 合并 commit 目录
    COMMENT: {
        // 从 http://status.renren.com/feedcommentretrieve.do 请求的 api 获取
        requestToken: '',
        _rtk: '',
    },
    FIX_REPLYER_TINYURL: [
        // 有些评论未包含 replyer_tinyurl 会导致程序错误 手动补全
        {
            ownerId: id,
            replyer_tinyurl: '', // 头像 url
        },
    ],
};
```

### server list

文件直接访问经常 404,但是过阵子刷新又有了。 感觉是前台有若干服务器做 cdn，访问 cdn 上没有的文件会直接先返回 404，然后回源拿文件。这时候就会有了。当然也可以替换域名尝试看看其他的 cdn 服务器上有文件不，一下提供若干服务器列表

```
a_xnimg_cn
fmn001_xnimg_cn
fmn_rrfmn_com
fmn_rrimg_com
fmn_xnpic_com
fmo_xnimg_cn
hd15_xiaonei_com
hd18_xiaonei_com
hd24_xiaonei_com
hd25_xiaonei_com
hd26_xiaonei_com
hd27_xiaonei_com
hd32_xiaonei_com
hd35_xiaonei_com
hd36_xiaonei_com
hd46_xiaonei_com
hdn611_xnimg_cn
hdn_xnimg_cn
head_xiaonei_com
```
