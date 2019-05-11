/**
 * 开发环境配置  development
 */
'use strict';

module.exports = {
    name: 'admin-backend-development',
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
}
