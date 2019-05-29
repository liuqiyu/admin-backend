import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import logger from 'morgan';
import configLite from 'config-lite';

const config = configLite(__dirname);

console.log(config.name);
console.log(config.port);

import router from './routes/index'

const app = express();

/**
 * cors 解决跨越
 */
app.use('*',function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*'); // 这个表示任意域名都可以访问，这样写不能携带cookie了。
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');// 设置方法
    if (req.method == 'OPTIONS') {
        res.send(200); // 意思是，在正常的请求之前，会发送一个验证，是否可以请求。
    }
    else {
        next();
    }
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

/**
 * session验证
 */
app.use(cookieParser('liuqiyu'));
app.use(session({
    secret: 'liuqiyu', // 与cookieParser中的一致
    resave: true, // (是否允许)当客户端并行发送多个请求时，其中一个请求在另一个请求结束时对session进行修改覆盖并保存。
    rolling: true, // 强制在每个响应中重设cookie的过期时间，并重新开始计时
    saveUninitialized: true, // 初始化session时是否保存到存储。默认为true， 但是(后续版本)有可能默认失效，所以最好手动添加。
    cookie: {
        maxAge: 60 * 1000  // 过期时间，单位毫秒
    }
}));

/**
 * 资源请求拦截器
 * 用户端若登录状态过期或未登录则自动抛出错误
 */
app.use((req, res, next) => {
    let url = req.originalUrl;
    req.session.touch();  //刷新session过期时间
    if (url !== '/login' && !req.session.user) {
        res.status(401).send('登录状态已过期');
        return
    }
    next();
});

router(app);

module.exports = app;
