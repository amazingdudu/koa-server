const connection = require('../app/connect');

class PostService {
    async create(userId, content) {
        const sql = `INSERT INTO post (user_id, content) VALUES (?,?);`;

        const result = await connection.execute(sql, [userId, content]);

        return result;
    }

    async remove(postId) {
        console.log(postId);

        const sql = `DELETE FROM post WHERE id = ?;`;

        const result = await connection.execute(sql, [postId]);

        return result;
    }

    async update({id, content}) {
        console.log(id);

        const sql = `UPDATE post SET content = ? WHERE id = ?;`;

        const result = await connection.execute(sql, [content, id]);

        console.log(result);
        return result;
    }

    async checkPermission(userId, postId) {
        const querySql = `SELECT * FROM post WHERE user_id = ? AND id = ?;`;

        const result = (await connection.execute(querySql, [userId, postId]))[0][0];

        return !!result;
    }
}

module.exports = new PostService();
