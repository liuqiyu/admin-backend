/**
 * 登录接口
 * @param req
 * @param res
 * @param next
 */
import mysql from './../../utils/mysql';

const login = (req, res, next) => {
    // const username = req.body.username;
    // const password = req.body.password;
    const { username, password } = req.body;
    const sql = "SELECT * FROM user where username = '" + username + "'";
    console.log(sql)
    mysql.query(sql, (err, rows) => {
        if (err) {
            return res.send({
                code: 500,
                status: 'error',
                message: '登录失败！',
                data: err,
            });
        }
        if (rows.length > 0) {
            if (rows[0].password == password) {
                req.session.regenerate((err) => {
                    if(err) {
                        return res.send({
                            code: 500,
                            status: 'error',
                            message: '登录失败！！',
                        });
                    }
                    req.session.user = rows[0];
                    console.log(req.session.sessionID)
                    console.log(req.session.user)
                    console.log(req.sessionID)
                    res.send({
                        code: 200,
                        status: 'success',
                        message: '登录成功！',
                        data: {
                            sessionID: req.sessionID,
                            data: rows[0]
                        },
                    });
                });
            } else {
                res.send({
                    code: 500,
                    status: 'error',
                    message: '账号或者密码错误！',
                });
            }
        } else {
            res.send({
                code: 500,
                status: 'error',
                message: '用户不存在！',
            });
        }
    })
};

export default login;
