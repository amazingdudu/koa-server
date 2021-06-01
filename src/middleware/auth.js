const jwt = require('jsonwebtoken');

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

    ctx.user = user;

    await next();
}

async function checkLogin(ctx, next) {
    const token = ctx.get('Authorization')?.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
        ctx.user = decoded;
        await next();
    } catch (err) {
        ctx.throw(401, '未登录');
    }
}

module.exports = {
    loginValidate,
    checkLogin
};
