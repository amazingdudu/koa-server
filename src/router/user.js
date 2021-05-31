const Router = require('@koa/router');
const controller = require('../controller/user');

const router = new Router({ prefix: '/user' });

router.post('/register', controller.create);

module.exports = router;
