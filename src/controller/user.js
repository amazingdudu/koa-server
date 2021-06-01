const service = require('../service/user');

class UserController {
    async create(ctx) {
        const result = await service.create(ctx.request.body);
        console.log(result);
        ctx.body = {
            code: 0,
            message: '注册成功'
        };
    }

    async getUserInfo(ctx) {
        console.log(ctx.user);
        const user = await service.getUserInfoByName(ctx.user.username);

        ctx.body = {
            code: 0,
            data: user,
            message: '获取用户信息成功'
        };
    }
}

module.exports = new UserController();
