const jwt = require('jsonwebtoken');

const userService = require('../service/user');
const authService = require('../service/auth');
const cryptoPassword = require('../utils/cryptoPassword');

async function loginValidate(ctx, next) {
    const { username, password } = ctx.request.body;

    if (!username || !password) {
        ctx.throw(400, '用户名或密码不能为空');
        return;
    }

    const user = await userService.getUserByName(username);

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
    } catch (err) {
        console.log(err);
        ctx.throw(401, '未登录!');
        return;
    }
    // 不要放在try里面，会捕获next异常
    await next();
}

function checkAuth(tableName) {
    return async function checkAuth(ctx, next) {
        const permission = await authService.checkAuth(tableName, ctx.request.body.id, ctx.user.id);

        if (!permission) {
            ctx.throw(403, '无权限');
        } else {
            await next();
        }
    };
}

module.exports = {
    loginValidate,
    checkLogin,
    checkAuth
};
