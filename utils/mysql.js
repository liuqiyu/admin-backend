/**
 * 封装 mysql
 */
import mysql from 'mysql';
import configLite from 'config-lite';

const config = configLite(__dirname);

console.log(config.mysql)

// 创建mysql实例
const connection = mysql.createConnection(config.mysql);

connection.connect();

export default connection;
