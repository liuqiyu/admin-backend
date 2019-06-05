/**
 * 登录接口
 * @param req
 * @param res
 * @param next
 */
import mysql from './../../utils/mysql';

const add = (req, res, next) => {
    // const username = req.body.username;
    // const password = req.body.password;
    // const { username, password } = req.body;
    // console.log(req.body)
    // const sql = "SELECT * FROM canvas";
    // console.log(sql)
    // mysql.query(sql, (err, rows) => {
    //
    // })
    res.send({
        status: 1,
        count: 2,
        req2: 1321
    })
};

export default add;
