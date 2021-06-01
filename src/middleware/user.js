const service = require('../service/user');

// const Joi = require('joi');

// const schema = Joi.object({
//     username: Joi.string().alphanum().min(3).max(30).required(),
//     password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
// });

async function validate(ctx, next) {
    const { username, password } = ctx.request.body;

    // const { error } = schema.validate({ username: 'abc', password: '19uuiu94' });

    if (!username || !password) {
        ctx.throw(400, '用户名，密码不能为空');
        return;
    }

    const user = await service.getUserByName(username);

    if (user) {
        ctx.throw(409, '用户名已存在');
        return;
    }

    await next();
}

module.exports = {
    validate
};
