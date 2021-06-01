const Koa = require('koa');
const bodyParser = require('koa-bodyparser');

require('dotenv').config();

const useRouters = require('../router');

const app = new Koa();

app.useRouters = useRouters;

app.use(bodyParser());

app.use(async (ctx, next) => {
    try {
        await next();
    } catch (error) {
        console.log(error);
        // ctx.app.emit('error', error, ctx);

        ctx.status = error.status || 500;
        ctx.body = error.message;
    }
});

app.useRouters();

// app.on('error', (error, ctx) => {
//     ctx.status = error.status || 500;
//     ctx.body = error.message;
// });

module.exports = app;
