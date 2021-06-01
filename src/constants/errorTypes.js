const ErrorTypes = {
    userOrPassnameRequired: {
        status: 400,
        message: '用户名，密码不能为空'
    },
    userIsExists: {
        status: 409,
        message: '用户名已存在'
    }
};

module.exports = ErrorTypes;
