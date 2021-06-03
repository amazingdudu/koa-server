const Router = require('@koa/router');
const controller = require('../controller/post');

const authMiddleware = require('../middleware/auth');

const router = new Router({ prefix: '/post' });

router.post('/create', authMiddleware.checkLogin, controller.create);
router.post(
    '/remove',
    authMiddleware.checkLogin,
    authMiddleware.checkAuth('post'),
    controller.remove
);
router.post(
    '/update',
    authMiddleware.checkLogin,
    authMiddleware.checkAuth('post'),
    controller.update
);

router.get('/list', authMiddleware.checkLogin, controller.list);

router.get('/detail/:id', authMiddleware.checkLogin, controller.detail);

module.exports = router;
