const app = require('./app');

app.listen(process.env.APP_PORT, () => {
    console.log('Serve is listening on http://localhost:3000');
});
