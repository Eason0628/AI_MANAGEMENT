<template>
    <div class="user-layout">
        <div class="title">{{ $t("login.title") }}</div>
        <a-row class="formRow">
            <a-col :offset="16" :span="8">
                <div class="login-panel-form">
                    <div class="topTitle">{{ $t("login.userLogin") }}</div>
                    <a-form :model="user" :rules="rules" ref="formRef" layout="vertical">
                        <a-form-item>
                            <a-input v-model:value="user.username" :placeholder="$t('login.inputUserName')">
                                <template #prefix>
                                    <Icon icon="UserOutlined" />
                                    <a-divider type="vertical" />
                                </template>
                            </a-input>
                        </a-form-item>
                        <a-form-item class="rememberMeBefore">
                            <a-input-password v-model:value="user.password" :placeholder="$t('login.inputPassWord')">
                                <template #prefix>
                                    <Icon icon="LockOutlined" />
                                    <a-divider type="vertical" />
                                </template>
                            </a-input-password>
                        </a-form-item>
                        <a-form-item name="rememberMe" class="rememberMe">
                            <a-checkbox v-model:checked="rememberMe">{{ $t("login.remeberPass") }}</a-checkbox>
                        </a-form-item>
                        <a-form-item>
                            <a-button class="commitButton" block @click="onSubmit">{{ $t("login.login") }}</a-button>
                        </a-form-item>
                    </a-form>
                </div>
            </a-col>
        </a-row>
    </div>
</template>

<script>
import { loginApi } from "@/service/auth";
import { reactive, toRefs, ref } from "vue";
import { useI18n } from "vue-i18n";
import { Icon } from "@/common/icons"
import { encrypt, decrypt } from "@/service/utils/aes";
import { useRouter } from "vue-router";

export default {
    name: "Login",
    components: {
        Icon,
    },
    setup() {
        const { t } = useI18n();
        const formRef = ref();
        const router = useRouter();

        let state = reactive({
            imgSrc: "/images/login_logo.png",
            user: {
                username: "admin",
                password: "",
            },
            rememberMe: false,
            rules: {
                username: [{ required: true, message: t("login.inputUserNameCheck"), trigger: "blur", },],
                password: [{ required: true, message: t("login.inputPassWordCheck"), trigger: "blur", },],
            },
        });

        const onSubmit = () => {
            formRef.value.validate().then(() => {
                loginApi(state.user).then((res) => {
                    if (state.rememberMe)
                        setCookit(state.user.username, state.user.password, 7);
                    else setCookit("", "", -1);
                    // if (router.currentRoute.value.query.redirect)
                    //     router.push(router.currentRoute.value.query.redirect);
                    // else router.push("/");
                    // sessionStorage.removeItem("ROUTES");
                });
            }).catch(() => { });
        };

        const getCookie = () => {
            if (document.cookie.length > 0) {
                let arr = document.cookie.split("; ");
                for (let i = 0; i < arr.length; i++) {
                    let arr2 = arr[i].split("=");
                    if (arr2[0] === "username") state.user.username = arr2[1];
                    else if (arr2[0] === "password")
                        state.user.password = decrypt(arr2[1]);
                }
                state.rememberMe = true;
            }
        };

        const setCookit = (name, password, exdays) => {
            let exDate = new Date();
            exDate.setTime(exDate.getTime() + 24 * 60 * 60 * 1000 * exdays);
            document.cookie = `username=${name};path=/;expires=${exDate.toGMTString()}`;
            document.cookie = `password=${encrypt(password)};path=/;expires=${exDate.toGMTString()}`;
        };

        getCookie();
        return {
            ...toRefs(state),
            formRef,
            onSubmit,
        }
    },
}
</script>

<style lang="less" scoped>
.user-layout {
    display: flex;
    flex-direction: column;
    background: url(/images/login_background.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    width: 100%;
    height: 100%;

    .title {
        flex: 2;
        color: #fff;
        font-size: 60px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .formRow {
        flex: 3;

        .login-panel-form {
            border-radius: 4px;
            box-shadow: 0 0 16px rgba(0, 0, 0, 0.3);
            padding: 16px;
            width: 340px;
            height: 360px;
            background: #fff;

            .titlePic {
                height: 10px;
                margin-bottom: 10px;
            }

            .topTitle {
                font-size: 18px;
                margin: 30px 0 10px 0;
                text-align: center;
                letter-spacing: 2px;
                font-weight: 600;
            }

            .ant-form {
                margin: 0 20px;

                .ant-input-affix-wrapper {
                    // border-color: var(--primary-color);
                    border-color: #1f9cdc;
                    border-radius: 2px;
                }


                .rememberMeBefore {
                    margin-bottom: 5px;
                }

                .rememberMe {
                    .ant-checkbox-wrapper {
                        color: #aaa;
                    }

                    margin-bottom: 10px;
                }

                .ant-input-prefix {
                    .anticon {
                        // color: var(--primary-color);
                        color: #1f9cdc;
                    }
                }

                :deep(.ant-input) {
                    height: 30px;
                }
            }

            .commitButton {
                width: 100%;
                background-image: linear-gradient(to right, #589eff, #7bc1ff) !important;
                border-radius: 4px;
                height: 40px;
                font-size: 16px;
                color: #fff !important;
                border-color: #ccc;
            }

            .commitButton:hover {
                background-image: linear-gradient(to right, #589eff, #7bc1ff) !important;
                color: #fff !important;
                border-color: #ccc;
            }
        }
    }
}
</style>