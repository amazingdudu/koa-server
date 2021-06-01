const service = require('../service/user');

class UserController {
    async create(ctx) {
        const result = await service.create(ctx.request.body);
        ctx.body = {
            code: 0,
            message: '注册成功'
        };
    }
}

module.exports = new UserController();
