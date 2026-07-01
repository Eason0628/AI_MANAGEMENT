<template>
    <div class="layout">
        <div class="title">
            <h1>员工账号管理</h1>
            <p>管理员专用・仅用于创建、维护普通员工账号</p>
        </div>
        <a-row :gutter="16">
            <a-col :span="11">
                <a-card class="left-card" :bordered="false">
                    <h2>员工账号维护</h2>
                    <a-card class="employee-card">
                        <div class="employee-info">
                            <div>
                                <p>从右侧列表选择账号后，信息将自动填充到表单中，可进行密码重置或状态更新。</p>
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

                        <a-form-item :label="$t('employeeAccounts.status')">
                            <a-radio-group v-model:value="formState.status">
                                <a-radio value="1">{{ $t('employeeAccounts.statusActive') }}</a-radio>
                                <a-radio value="2">{{ $t('employeeAccounts.statusInactive') }}</a-radio>
                            </a-radio-group>
                        </a-form-item>

                        <div class="button-container">
                            <a-button type="primary" @click="onSubmit">{{
                                $t('employeeAccounts.createButton') }}</a-button>
                            <a-button @click="onReset" style="margin-left: 15px;">{{
                                $t('employeeAccounts.resetButton')
                                }}</a-button>
                        </div>
                    </a-form>
                </a-card>

            </a-col>
            <a-col :span="13">
                <a-card class="right-card" :bordered="false">
                    <h2>账号列表</h2>
                    <a-table :columns="columns" :data-source="data">
                        <template #headerCell="{ column }">
                            <template v-if="column.key === 'name'">
                                <span>
                                    <smile-outlined />
                                    Name
                                </span>
                            </template>
                        </template>

                        <template #bodyCell="{ column, record }">
                            <template v-if="column.key === 'name'">
                                <a>
                                    {{ record.name }}
                                </a>
                            </template>
                            <template v-else-if="column.key === 'tags'">
                                <span>
                                    <a-tag v-for="tag in record.tags" :key="tag"
                                        :color="tag === 'loser' ? 'volcano' : tag.length > 5 ? 'geekblue' : 'green'">
                                        {{ tag.toUpperCase() }}
                                    </a-tag>
                                </span>
                            </template>
                            <template v-else-if="column.key === 'action'">
                                <span>
                                    <a>Invite 一 {{ record.name }}</a>
                                    <a-divider type="vertical" />
                                    <a>Delete</a>
                                    <a-divider type="vertical" />
                                    <a class="ant-dropdown-link">
                                        More actions
                                        <down-outlined />
                                    </a>
                                </span>
                            </template>
                        </template>
                    </a-table>
                </a-card>
            </a-col>
        </a-row>
    </div>
</template>

<script>
import { reactive, toRefs, ref } from 'vue';
import { useI18n } from 'vue-i18n';

const columns = [
    {
        name: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
    },
    {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
    },
    {
        title: 'Tags',
        key: 'tags',
        dataIndex: 'tags',
    },
    {
        title: 'Action',
        key: 'action',
    },
];
const data = [
    {
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
        tags: ['nice', 'developer'],
    },
    {
        key: '2',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
        tags: ['loser'],
    },
    {
        key: '3',
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
        tags: ['cool', 'teacher'],
    },
];
export default {
    name: 'EmpAccounts',
    setup() {
        const formRef = ref()
        const { t } = useI18n();
        const state = reactive({
            formState: {
                account: '',
                username: '',
                password: '',
                role: '2',
                level: '0',
                remember: false,
                status: '1',
            },
            rules: {
                account: [{ required: true, message: t("employeeAccounts.inputAccountCheck"), trigger: 'blur' }],
                password: [{ required: true, message: t("employeeAccounts.inputPasswordCheck"), trigger: 'blur' }],
                username: [{ required: true, message: t("employeeAccounts.inputUsernameCheck"), trigger: 'blur' }],
            },
        })

        const onSubmit = () => {
            formRef.value.validate().then(() => {
                alert('onSubmit')
            })
        }

        return {
            ...toRefs(state),
            onSubmit,
            columns,
            data,
            formRef,
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

            :deep(.ant-card-body) {
                padding: 9px 15px;
            }
        }

    }

    .right-card {
        height: 100%;
    }
}
</style>
