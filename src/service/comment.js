const connection = require('../app/connect');

class CommentService {
    async create(userId, postId, content) {
        const sql = `INSERT INTO comment (user_id, post_id, content) VALUES (?,?,?);`;

        const result = await connection.execute(sql, [userId, postId, content]);

        return result;
    }

    async replay(userId, postId, commentId, content) {
        const sql = `INSERT INTO comment (user_id, post_id,comment_id, content) VALUES (?,?,?,?);`;

        const result = await connection.execute(sql, [userId, postId, commentId, content]);

        return result;
    }

    async remove(id) {
        const sql = `DELETE FROM comment WHERE id = ?;`;

        const result = await connection.execute(sql, [id]);

        return result;
    }

    async update({ id, content }) {
        const sql = `UPDATE comment SET content = ? WHERE id = ?;`;

        const result = await connection.execute(sql, [content, id]);

        return result;
    }

    async list(postId) {
        const sql = `SELECT * FROM comment WHERE post_id = ?;`;

        const result = await connection.execute(sql, [postId]);

        return result[0];
    }
}

module.exports = new CommentService();
