const connection = require('../app/connect');

class AuthService {
    async checkAuth(tableName, id, userId) {
        const sql = `SELECT * FROM ${tableName} WHERE id = ? AND user_id = ?;`;

        const result = (await connection.execute(sql, [id, userId]))[0][0];

        return !!result;
    }
}

module.exports = new AuthService();
