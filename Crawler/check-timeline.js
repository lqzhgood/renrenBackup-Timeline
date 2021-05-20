const fs = require('fs');
const path = require('path');

const { OUT_DIR_TIME_LINE, LIMIT } = require('./config.js');

const { MAKE_TIME, READ_HTML_LENGTH, READ_TIME_TOTAL, contrastExcludeMs } = require('./utils.js');

const list = MAKE_TIME();

const dirs = list.map(t => {
    return path.join(OUT_DIR_TIME_LINE, `${t.y}/${t.m}/`);
});

const check_list = [];

dirs.forEach(d => {
    const files = fs
        .readdirSync(d)
        .sort((a, b) => {
            const { name: na } = path.parse(a);
            const { name: nb } = path.parse(b);
            return na - nb;
        })
        .map(f => path.join(d, f));

    // 最后几个是空  其余全部不为空 检查模式
    const filesArr = [...files];
    const emptyFiles = filesArr.splice(-3, 3);
    for (let i = 0; i < emptyFiles.length; i++) {
        const ef = emptyFiles[i];
        const data = fs.readFileSync(ef, 'utf-8').trim();
        if (data) console.log(`${ef} 有内容`);
    }

    for (let i = 0; i < filesArr.length; i++) {
        const f = filesArr[i];
        const data = fs.readFileSync(f, 'utf-8').trim();
        if (!data) console.log(`${f} 无内容`);
    }
    // 跟上面的检查模式类似，只是上面的方式写死了后面3个是空文件
    let isEmptyBegin = false;
    for (let i = files.length - 1; i >= 0; i--) {
        const f = files[i];
        const data = fs.readFileSync(f, 'utf-8').trim();
        if (data) {
            isEmptyBegin = true;
        } else {
            if (isEmptyBegin) {
                console.warn('isEmptyBegin', f);
            }
        }
    }

    // 按每月数量检查模式 html有重复引用评论的部分 除非去重 所以这里无效
    // merger 里面也有验证 所以这里不需要了 [本地评论数量与读取过的评论数量应该一致]
    // let total = 0;
    // let count = 0;

    // for (let i = 0; i < files.length; i++) {
    //     const f = files[i];
    //     if (i == 0) total = READ_TIME_TOTAL(f);
    //     count += READ_HTML_LENGTH(f);
    //     const data = fs.readFileSync(f, 'utf-8').trim();
    //     if (!data) {
    //         const tDir = f.replace(OUT_DIR_TIME_LINE, '').replace('.html', '');
    //         const [y, m, begin] = tDir.split('\\');
    //         check_list.push({
    //             begin,
    //             y,
    //             m,
    //         });
    //         // console.warn('tArr 无内容');
    //     }
    // }
    // if (total != count) console.log(d, total, count);

    // 检查前后两者是否一样的
    for (let i = 1; i < files.length; i++) {
        const f1 = files[i - 1];
        const f2 = files[i];
        const d1 = fs.readFileSync(f1, 'utf-8').trim();
        const d2 = fs.readFileSync(f2, 'utf-8').trim();

        if (!d1 && !d2) continue;

        const re = contrastExcludeMs(d1, d2);

        if (re) {
            console.warn(`文件内容一致 ${f1} ${f2}`);
        }
    }
});

// fs.writeFileSync('./check_list.json', JSON.stringify(check_list, null, 4));

console.log('ok');
