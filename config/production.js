/**
 * 生产环境配置  production
 */
'use strict';

module.exports = {
    name: 'admin-backend-production',
    port: 5858,

    /** mysql settings */
    mysql: {
        host: 'localhost',
        port: 3306,
        user: 'root',
        database: 'admin-backend',
        password: '',
        char: 'utf8mb4'
    },
    debug: true
}
