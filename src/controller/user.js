const service = require('../service/user');

class UserController {
    async create(ctx, next) {
        const result = await service.create();

        ctx.body = '注册成功';
    }
}

module.exports = new UserController();
