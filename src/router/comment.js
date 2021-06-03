const Router = require('@koa/router');
const controller = require('../controller/comment');

const authMiddleware = require('../middleware/auth');

const router = new Router({ prefix: '/comment' });

router.post('/create', authMiddleware.checkLogin, controller.create);

router.post('/replay', authMiddleware.checkLogin, controller.replay);

router.post(
    '/update',
    authMiddleware.checkLogin,
    authMiddleware.checkAuth('comment'),
    controller.update
);

router.post(
    '/remove',
    authMiddleware.checkLogin,
    authMiddleware.checkAuth('comment'),
    controller.remove
);

router.get('/list/:id', authMiddleware.checkLogin, controller.list);

module.exports = router;
