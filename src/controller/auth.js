class AuthController {
    async login(ctx) {
        const { username, password } = ctx.request.body;

        ctx.body = '登录成功';
    }
}

module.exports = new AuthController();
