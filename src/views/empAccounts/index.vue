<template>
    <div class="layout">
        <div class="title">
            <h1>员工账号</h1>
            <p>最高层级管理员</p>
        </div>
        <a-row :gutter="16">
            <a-col :span="12">
                <a-card title="创建员工账号" class="left-card" :bordered="false">
                    <template #extra>
                        <a-button>最高层级</a-button>
                    </template>

                    <a-card class="employee-card">
                        <div class="employee-info">
                            <div>
                                <h2>集团管理员</h2>
                                <p>可配置员工账号</p>
                            </div>
                            <div>
                                <a-button>可编辑</a-button>
                            </div>
                        </div>
                    </a-card>

                    <a-form ref="formRef" :model="formState" name="basic" layout="vertical" autocomplete="off"
                        :rules="rules">
                        <a-form-item :label="$t('employeeAccounts.account')" name="account">
                            <a-input v-model:value="formState.account" />
                        </a-form-item>

                        <a-form-item :label="$t('employeeAccounts.password')" name="password">
                            <a-input-password v-model:value="formState.password" />
                        </a-form-item>

                        <a-form-item :label="$t('employeeAccounts.username')" name="username">
                            <a-input v-model:value="formState.username" />
                        </a-form-item>

                        <a-form-item :label="$t('employeeAccounts.role')" name="role">
                            <a-select v-model:value="formState.role" :options="roleOptions" />
                        </a-form-item>

                        <a-form-item :label="$t('employeeAccounts.level')" name="level">
                            <a-select v-model:value="formState.level" :options="levelOptions" />
                        </a-form-item>

                        <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
                            <a-button type="primary" @click="onSubmit">{{ $t('employeeAccounts.button') }}</a-button>
                        </a-form-item>
                    </a-form>
                </a-card>

            </a-col>
            <a-col :span="12">
                <a-card title="账号列表" class="right-card" :bordered="false">
                    <template #extra>
                        <a-button>权限</a-button>
                    </template>

                    <a-list item-layout="horizontal" :data-source="data">
                        <template #renderItem="{ item }">
                            <a-list-item>
                                <a-list-item-meta
                                    description="Ant Design, a design language for background applications, is refined by Ant UED Team">
                                    <template #title>
                                        <a href="https://www.antdv.com/">{{ item.title }}</a>
                                    </template>
                                    <!-- <template #avatar>
                                        <a-avatar src="https://joeschmoe.io/api/v1/random" />
                                    </template> -->
                                </a-list-item-meta>
                            </a-list-item>
                        </template>
                    </a-list>
                </a-card>
            </a-col>
        </a-row>
    </div>
</template>

<script>
import { reactive, toRefs, ref } from 'vue';
import { useI18n } from 'vue-i18n';
const data = [
    {
        title: 'Ant Design Title 1',
    },
    {
        title: 'Ant Design Title 2',
    },
    {
        title: 'Ant Design Title 3',
    },
    {
        title: 'Ant Design Title 4',
    },
    {
        title: 'Ant Design Title 5',
    },
    {
        title: 'Ant Design Title 6',
    },
    {
        title: 'Ant Design Title 7',
    },
];

const roleOptions = [
    {
        label: '普通用户',
        value: '1',
    },
    {
        label: '管理员',
        value: '2',
    },
]
const levelOptions = [
    {
        label: '无',
        value: '0',
    },
    {
        label: '集团管理员',
        value: '1',
    },
    {
        label: '事业部管理员',
        value: '2',
    },
    {
        label: '部门管理员',
        value: '3',
    },
    {
        label: '小组管理员',
        value: '4',
    },
]
export default {
    name: 'EmpAccounts',
    setup() {
        const fromRef = ref()
        const { t } = useI18n();
        const state = reactive({
            formState: {
                account: '',
                username: '',
                password: '',
                role: '2',
                level: '0',
                remember: false,
            },
            rules: {
                account: [{ required: true, message: t("employeeAccounts.inputAccountCheck"), trigger: 'blur' }],
                password: [{ required: true, message: t("employeeAccounts.inputPasswordCheck"), trigger: 'blur' }],
                username: [{ required: true, message: t("employeeAccounts.inputUsernameCheck"), trigger: 'blur' }],
                role: [{ required: true, message: t("employeeAccounts.selectRoleCheck"), trigger: 'change' }],
                level: [{ required: true, message: t("employeeAccounts.selectLevelCheck"), trigger: 'change' }],
            },
        })

        const onSubmit = () => {
            alert('onSubmit')
        }

        return {
            ...toRefs(state),
            data,
            roleOptions,
            levelOptions,
            onSubmit,
            fromRef
        }
    }
}
</script>

<style lang="less" scoped>
.layout {
    background-color: #ececec;
    width: 100%;
    padding: 24px;

    .title {
        padding-left: 5px;

        h1 {
            margin-bottom: 0px;
        }

        p {
            color: #9fa8b7;
        }
    }

    .left-card {
        height: 100%;

        .employee-info {
            display: flex;
            justify-content: space-between;

            p {
                margin-bottom: 3px;
            }
        }

        .employee-card {
            background-color: var(--primary-1);
            border-radius: 15px;
            margin-bottom: 15px;

            ::v-deep .ant-card-body {
                padding: 9px 15px;
            }
        }
    }

    .right-card {
        height: 100%;
    }
}
</style>
