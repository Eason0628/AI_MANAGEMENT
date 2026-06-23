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
    {
        url: "/api/menus",
        method: "get",
        response: (options) => {
            return {
                "success": true,
                "data": [
                    {
                        "menuIcon": "AlignLeftOutlined",
                        "menuId": 1,
                        "menuName": "menu.publicLibrary",
                        "menuParentId": 0,
                        "menuType": 1,
                        "menuUrl": "/public/library",
                        "menuWinformName": "publicLibrary/index.vue",
                        "sortNum": 1,
                        "children": []
                    },
                    {
                        "menuIcon": "ApartmentOutlined",
                        "menuId": 2,
                        "menuName": "menu.toolManagement",
                        "menuParentId": 0,
                        "menuType": 1,
                        "menuUrl": "/tool/management",
                        "menuWinformName": "toolManagement/index.vue",
                        "sortNum": 2,
                        "children": []
                    },
                    {
                        "menuIcon": "ApartmentOutlined",
                        "menuId": 3,
                        "menuName": "menu.modelConfiguration",
                        "menuParentId": 0,
                        "menuType": 1,
                        "menuUrl": "/model/configuration",
                        "menuWinformName": "modelConfiguration/index.vue",
                        "sortNum": 3,
                        "children": []
                    },
                    {
                        "menuIcon": "ApartmentOutlined",
                        "menuId": 4,
                        "menuName": "menu.empAccounts",
                        "menuParentId": 0,
                        "menuType": 1,
                        "menuUrl": "/emp/accounts",
                        "menuWinformName": "empAccounts/index.vue",
                        "sortNum": 4,
                        "children": []
                    }

                ]
            };
        },
    },
    {
        url: "/api/auth/me",
        method: "get",
        response: (options) => {
            return {
                "success": true,
                "data": {
                    "success": true,
                    "data": {
                        "current_user": {
                            "user_id": "user_001",
                            "username": "lisi",
                            "display_name": "李四",
                            "roles": ["USER"],
                            "org_unit_id": "team_a1",
                            "managed_org_unit_id": null,
                            "organization": {
                                "org_unit_type": "TEAM",
                                "org_unit_name": "A1 团队",
                                "org_unit_path": "/company/dept_a/team_a1"
                            }
                        }
                    }
                }
            };
        },
    }

];