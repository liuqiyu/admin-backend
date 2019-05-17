// import fs from 'fs';
// import mysql from './../../utils/mysql';

export const image = (req, res, next) => {
    const data = [];
    for (let i = 0; i < req.files.length; i ++) {
        const path = host + req.files[i].path.replace(/\\/g,"\/").replace('public', '');
        data.push({
            url: path,
            name: req.files[i].filename,
        });
    }
    console.log(data)
    res.send({
        status: 1,
        count: 2,
        req2: 1321
    })
};

export default image;
