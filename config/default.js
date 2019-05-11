/**
 * 默认配置
 */
'use strict';

module.exports ={
    name: 'admin-backend',
    port: 5858,

    /** mysql settings */
    mysql: {
        host: 'localhost',
        port: 3306,
        user: 'root',
        db: 'admin-backend',
        pass: '',
        char: 'utf8mb4'
    },
    debug: true
};
