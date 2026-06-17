export default [
    {
        url: "/api/login",
        method: "post",
        response: (options) => {
            console.log("mock收到请求：", options.body);
            const { username, password } = options.body;
            if (username === "admin" && password === "admin123123") {
                return {
                    code: 200,
                    data: {
                        token: "mock-token-123456",
                    },
                    message: "success",
                };
            }

            return {
                code: 401,
                message: "账号或密码错误",
            };
        },
    },
];