const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
require('dotenv').config();

const userRouter = require('./router/user');

const app = new Koa();

app.use(bodyParser());

app.use(userRouter.routes());
app.use(userRouter.allowedMethods());

app.listen(process.env.PORT, () => {
    console.log('Serve is listening on http://localhost:3000');
});
