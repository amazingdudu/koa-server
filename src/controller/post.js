const service = require('../service/post');

class PostController {
    async create(ctx) {
        const result = await service.create(ctx.user.id, ctx.request.body.content);
        console.log(result);

        ctx.body = {
            code: 0,
            message: '发布成功',
            id: result[0].insertId
        };
    }

    async remove(ctx) {
        await service.remove(ctx.request.body.id);

        ctx.body = {
            code: 0,
            message: '删除成功'
        };
    }

    async update(ctx) {
        await service.update(ctx.request.body);

        ctx.body = {
            code: 0,
            message: '更新成功'
        };
    }
}

module.exports = new PostController();
