/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
const fs = require('fs');

function useRouters() {
    const files = fs.readdirSync(__dirname);

    files
        .filter(file => file !== 'index.js')
        .forEach(file => {
            const router = require(`./${file}`);

            this.use(router.routes()).use(router.allowedMethods());
        });
} 

module.exports = useRouters;
