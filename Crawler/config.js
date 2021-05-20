const path = require('path');

module.exports = {
    ID: 123,
    YEAR_RANGE: [2008, 2015],
    COOKIE: '',
    LIMIT: 30,
    OUT_DIR_TIME_LINE: path.join(__dirname, '../Pages/TimeLine'),
    OUT_DIR_COMMENTS: path.join(__dirname, '../Pages/Comments'),
    OUT_DIR_MERGER: path.join(__dirname, '../Pages/Merger'),
    COMMENT: {
        requestToken: 123,
        _rtk: '123',
    },
    FIX_REPLYER_TINYURL: [
        {
            ownerId: 123,
            replyer_tinyurl: 'http://hdn.xnimg.cn/photos/123.jpg',
        },
    ],
};
