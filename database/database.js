import mysql from 'mysql';
import dbConfig from '../config/db.config'

const connection = mysql.createConnection(dbConfig);

export default connection;