/*
 * @Description:
 * @Author: lqzh
 * @Date: 2021-05-02 19:26:46
 * @LastEditTime: 2021-05-12 15:10:02
 */
let express = require('express');
let router = express.Router();
const RR = require('../server/renren.js');

/* GET home page. */
router.get('/', (req, res, next) => {
    res.render('index', { title: 'Express' });
});

router.get('/timelinefeedretrieve.do', RR.timeLine);
router.get('/timelineMerger', RR.timelineMerger);
router.post('/feedcommentretrieve.do', RR.comment);

module.exports = router;
