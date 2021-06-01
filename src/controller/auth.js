const jwt = require('jsonwebtoken');

class AuthController {
    async login(ctx) {
        const { username, id } = ctx.user;
        const token = jwt.sign(
            {
                id,
                username
            },
            process.env.TOKEN_SECRET,
            {
                expiresIn: '7d'
            }
        );

        ctx.body = {
            code: 0,
            message: `登录成功${username}`,
            token
        };
    }
}

module.exports = new AuthController();
