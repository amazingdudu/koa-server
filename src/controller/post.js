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

    async list(ctx) {
       const data = await service.list(ctx.user.id);

        ctx.body = {
            code: 0,
            message: '动态列表',
            data
        };
    }

    async detail(ctx) {
        const data = await service.detail(ctx.params.id);
 
         ctx.body = {
             code: 0,
             message: '动态详情',
             data
         };
     }
}

module.exports = new PostController();
