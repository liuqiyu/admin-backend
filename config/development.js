/**
 * 开发环境配置  development
 */
'use strict';

module.exports = {
    name: 'admin-backend-development',
    port: 5858,
    host: 'http://localhost:5858',

    /** mysql settings */
    mysql: {
        host: 'localhost',
        port: 3306,
        user: 'root',
        database: 'mysql',
        password: ''
    },
    debug: true
}
