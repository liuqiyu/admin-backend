import mysql from './../../utils/mysql';

export const login = (req, res, next) => {
    const sql = 'SELECT * FROM db';
    mysql.query(sql, (err,result) => {
        if (err) {
            console.log('[SELECT ERROR]:', err.message);
        }
        res.send({
            status: 1,
            count: 2,
            data: result
        })
    })
};

export default login;
