const connection = require('../app/connect');
const cryptoPassword = require('../utils/cryptoPassword');

class UserService {
    async create({ username, password }) {
        const sql = `INSERT INTO user (username, password) VALUES (?,?);`;

        const result = await connection.execute(sql, [username, cryptoPassword(password)]);
        return result;
    }

    async getUserByName(username) {
        const sql = `SELECT * FROM user WHERE username = ?;`;
        const result = await connection.execute(sql, [username]);
        return result[0][0];
    }

    async getUserInfoByName(username) {
        const sql = `SELECT id, username FROM user WHERE username = ?;`;
        const result = await connection.execute(sql, [username]);
        return result[0][0];
    }
}

module.exports = new UserService();
