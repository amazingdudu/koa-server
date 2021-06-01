const service = require('../service/user');
const cryptoPassword = require('../utils/cryptoPassword');

async function loginValidate(ctx, next) {
    const { username, password } = ctx.request.body;

    if (!username || !password) {
        ctx.throw(400, '用户名或密码不能为空');
        return;
    }

    const user = await service.getUserByName(username);

    if (!user) {
        ctx.throw(400, '用户不存在');
        return;
    }

    if (cryptoPassword(password) !== user.password) {
        ctx.throw(400, '密码错误');
        return;
    }

    await next();
}

module.exports = {
    loginValidate
};
