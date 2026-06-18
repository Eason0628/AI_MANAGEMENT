export default [
    {
        url: "/api/login",
        method: "post",
        response: (options) => {
            console.log("mock收到请求：", options.body);
            const { username, password } = options.body;
            if (username === "admin" && password === "123456") {
                return {
                    "success": true,
                    "data": {
                        "access_token": "pilotai_access_xxx",
                        "expires_in": 7200,
                        "user": {
                            "user_id": "user_001",
                            "username": "lisi",
                            "display_name": "李四",
                            "org_unit_id": "team_a1",
                            "managed_org_unit_id": null
                        },
                        "tenant": {
                            "tenant_id": "tenant_acme",
                            "tenant_name": "ACME Demo"
                        },
                        "roles": ["USER"]
                    }
                };
            }

            return {
                code: 401,
                message: "账号或密码错误",
            };
        },
    },
];