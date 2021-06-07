const connection = require('../app/connect');

class PostService {
    async create(userId, content) {
        const sql = `INSERT INTO post (user_id, content) VALUES (?,?);`;

        const result = await connection.execute(sql, [userId, content]);

        return result;
    }

    async remove(id) {
        const sql = `DELETE FROM post WHERE id = ?;`;

        const result = await connection.execute(sql, [id]);

        return result;
    }

    async update({ id, content }) {
        const sql = `UPDATE post SET content = ? WHERE id = ?;`;

        const result = await connection.execute(sql, [content, id]);

        return result;
    }

    async list(userId) {
        const sql = `SELECT
                        p.id id,
                        p.content content,
                        JSON_OBJECT(
                            'id',
                            u.id,
                            'username',
                            u.username 
                        ) author ,
                        (SELECT COUNT(*) FROM comment c WHERE c.post_id = p.id) commentCount
                    FROM
                        post p
                        LEFT JOIN user u ON p.user_id = u.id 
                    WHERE
                    p.user_id = ?`;

        const result = await connection.execute(sql, [userId]);

        return result[0];
    }

    async detail(id) {
        const sql = `SELECT
                        p.id id,
                        p.content content,
                        p.createAt createTime,
                        JSON_OBJECT(
                            'id',
                            u.id,
                            'username',
                            u.username 
                        ) author,
                      IF(COUNT(c.id), JSON_ARRAYAGG(
                            JSON_OBJECT(
                                'id',
                                c.id,
                                'content',
                                c.content 
                            )),NULL) comments 
                      FROM
                        post p
                        LEFT JOIN user u ON p.user_id = u.id
                        LEFT JOIN comment c ON p.id = c.post_id 
                      WHERE
                        p.id = ?
                      GROUP BY p.id;`;

        const result = await connection.execute(sql, [id]);

        return result[0];
    }
}

module.exports = new PostService();
