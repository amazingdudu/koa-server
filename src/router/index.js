const userRouter = require('./user');
const authRouter = require('./auth');

const routers = [userRouter, authRouter];

function useRouters() {
    routers.forEach(router => {
        this.use(router.routes());
        this.use(router.allowedMethods());
    });
}

module.exports = useRouters;
