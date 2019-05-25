'use strict';

import fs from 'fs';
import express from 'express';
import multer from 'multer';
import path from 'path';
import configLite from 'config-lite';

const config = configLite(__dirname);

const router = express.Router();

const createFolder = (folder) =>{
    try {
        fs.accessSync(folder);
    } catch (e) {
        fs.mkdirSync(folder);
    }
};

var uploadFolder = 'public/upload/';

createFolder(uploadFolder);

// 通过 filename 属性定制
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadFolder);    // 保存的路径，备注：需要自己创建
    },
    filename: function (req, file, cb) {
        const extname = path.extname(file.originalname);// 获取文件扩展名
        // 将保存文件名设置为 字段名 + 时间戳+文件扩展名，比如 logo-1478521468943.jpg
        cb(null, file.fieldname + '-' + Date.now() + extname);
    }
});

const upload = multer({ storage: storage });

router.post('/image', upload.array('file', 3), function(req, res, next) {
    console.log(req.files)
    const data = [];
    for (let i = 0; i < req.files.length; i ++) {
        const path = config.host + req.files[i].path.replace(/\\/g,"\/").replace('public', '');
        data.push({
            url: path,
            name: req.files[i].filename,
        });
    }
    // console.log(data)
    return res.send({
        code: 200,
        status: 'success',
        data: data,
    });
});

export default router;
