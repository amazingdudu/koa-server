const service = require('../service/comment');

class CommentController {
    async create(ctx) {
        const { content, postId } = ctx.request.body;

        console.log(content, postId);

        const result = await service.create(ctx.user.id, postId, content);
        console.log(result);

        ctx.body = {
            code: 0,
            message: '发布评论成功'
        };
    }

    async replay(ctx) {
        const { content, postId, commentId } = ctx.request.body;

        console.log(content, postId, commentId);

        const result = await service.replay(ctx.user.id, postId, commentId, content);
        console.log(result);

        ctx.body = {
            code: 0,
            message: '回复评论成功'
        };
    }

    async remove(ctx) {
        await service.remove(ctx.request.body.id);

        ctx.body = {
            code: 0,
            message: '删除评论成功'
        };
    }

    async update(ctx) {
        await service.update(ctx.request.body);

        ctx.body = {
            code: 0,
            message: '评论更新成功'
        };
    }

    async list(ctx) {
        console.log(ctx.params);
        const data = await service.list(ctx.params.id);

        ctx.body = {
            code: 0,
            message: '获取评论列表成功',
            data
        };
    }
}

module.exports = new CommentController();
