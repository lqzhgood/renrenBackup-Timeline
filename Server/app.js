const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const fs = require('fs');

const indexRouter = require('./routes/index');

const app = express();
console.warn('请记得更新 Crawler config 中的 cookies');

// 清空上一次的记录
const { DIR_CACHE_IN_PAGE } = require('./config.js');
if (fs.existsSync(DIR_CACHE_IN_PAGE)) fs.unlinkSync(DIR_CACHE_IN_PAGE);
console.warn(`上一次 DIR_CACHE_IN_PAGE 记录已清除`);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.all('*', (req, res, next) => {
    res.header('Access-Control-Allow-Credentials', 'true'); //服务端允许携带cookie
    res.header('Access-Control-Allow-Origin', req.headers.origin); //允许的访问域
    res.header('Access-Control-Allow-Headers', 'X-Requested-With'); //访问头
    res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS'); //访问方法
    if (req.method == 'OPTIONS') {
        res.sendStatus(204); //让options请求快速返回.
    } else {
        next();
    }
});
app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
    next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
