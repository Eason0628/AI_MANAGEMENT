<template>
    <div class="layout">
        <div class="title">
            <h1>模型配置</h1>
            <p>统一配置平台模型能力</p>
        </div>
        <a-row :gutter="16">
            <a-col :span="11">
                <a-card class="left-card" :bordered="false">
                    <h2>新增/编辑模型</h2>
                    <a-card>
                        <a-form ref="formRef" :model="formState" name="basic" :label-col="{ span: 5 }"
                            :wrapper-col="{ span: 19 }" autocomplete="off" :rules="rules">

                            <a-form-item :label="$t('modelConfiguration.name')" name="name">
                                <a-input v-model:value="formState.name" />
                            </a-form-item>

                            <a-form-item :label="$t('modelConfiguration.modelType')" name="modelType">
                                <a-select v-model:value="formState.modelType">
                                    <a-select-option value="1">LLM</a-select-option>
                                    <a-select-option value="2">VLM</a-select-option>
                                    <a-select-option value="3">Embedding</a-select-option>
                                    <a-select-option value="4">Reranker</a-select-option>
                                </a-select>
                            </a-form-item>

                            <a-form-item :label="$t('modelConfiguration.provider')" name="provider">
                                <a-select v-model:value="formState.provider">
                                    <a-select-option value="1">OpenAI</a-select-option>
                                    <a-select-option value="2">Google</a-select-option>
                                    <a-select-option value="3">Deepseek</a-select-option>
                                </a-select>
                            </a-form-item>

                            <a-form-item :label="$t('modelConfiguration.baseURL')" name="baseURL">
                                <a-input v-model:value="formState.baseURL" />
                            </a-form-item>

                            <a-form-item :label="$t('modelConfiguration.BPI_Htn')" name="BPI_Htn">
                                <a-input v-model:value="formState.BPI_Htn" />
                            </a-form-item>

                            <a-form-item :label="$t('modelConfiguration.API_Key')" name="API_Key">
                                <a-input-password v-model:value="formState.API_Key" />
                            </a-form-item>

                            <template v-if="formState.modelType === '1'">
                                <div class="llm-card">
                                    <span class="title"><b>{{ $t('modelConfiguration.llmCard') }}</b></span>
                                    <a-card class="content">
                                        <a-form-item :label="$t('modelConfiguration.purpose')" name="purpose"
                                            :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
                                            <a-select v-model:value="formState.purpose">
                                                <a-select-option value="1">默认问答模型</a-select-option>
                                                <a-select-option value="2">Embedding</a-select-option>
                                            </a-select>
                                        </a-form-item>
                                        <a-form-item :label="$t('modelConfiguration.modelContextLimit')"
                                            name="contextLimit" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
                                            <a-input v-model:value="formState.contextLimit" />
                                        </a-form-item>
                                    </a-card>
                                </div>
                            </template>

                            <template v-if="formState.modelType === '3'">
                                <div class="embedding-card">
                                    <span class="title"><b>{{ $t('modelConfiguration.embeddingCard') }}</b></span>
                                    <a-card class="content">
                                        <a-form-item :label="$t('modelConfiguration.vector')" name="vector"
                                            :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
                                            <a-input v-model:value="formState.vector" />
                                        </a-form-item>
                                        <a-row>
                                            <a-col :span="3">

                                            </a-col>
                                            <a-col :span="21">
                                                表示模型输出的向量维度(dimension)，即每个文本对应的向量长度
                                            </a-col>
                                        </a-row>
                                    </a-card>
                                </div>
                            </template>

                            <a-form-item :label="$t('modelConfiguration.enabled')" name="enabled">
                                <a-switch v-model:checked="formState.enabled" />
                                启用
                            </a-form-item>

                            <div class="button-container">
                                <a-button type="primary" @click="onSubmit">{{
                                    $t('modelConfiguration.saveButton') }}</a-button>
                                <a-button @click="onReset">{{
                                    $t('modelConfiguration.resetButton')
                                }}</a-button>
                            </div>

                        </a-form>
                    </a-card>
                </a-card>
            </a-col>
            <a-col :span="13">
                <a-card class="right-card" :bordered="true">
                    <div class="title">
                        <h2>已配置模型</h2>
                        <div>
                            <a-button @clicks="onRefresh" type="primary">{{
                                $t('modelConfiguration.refreshButton') }}</a-button>
                            <a-button @click="onBatchDel" type="primary" danger style="margin-left: 5px;">{{
                                $t('modelConfiguration.batchDelButton') }}</a-button>
                        </div>
                    </div>

                    <a-row :gutter="[0, 16]">
                        <a-col :span="24" v-for="item in cardList" :key="item.id">
                            <a-card class="model-card" :bordered="true"
                                :class="{ active: selectedIds.includes(item.id) }">
                                <div class="content">
                                    <div class="left">

                                        <a-checkbox :checked="selectedIds.includes(item.id)"
                                            @change="onSelect(item.id, $event.target.checked)"
                                            style="margin-right:16px" />

                                        <img class="logo" :src="item.logo" />
                                        <div class="info">
                                            <div class="title">
                                                {{ item.name }}
                                            </div>
                                            <div class="tags">
                                                <!-- <a-tag v-for="tag in item.tags" :key="tag" color="blue">
                                                    {{ tag }}
                                                </a-tag> -->

                                                <!-- 模型类型 -->
                                                <a-tag color="blue">
                                                    {{ modelTypeMap[item.modelType] }}
                                                </a-tag>

                                                <!-- 提供商 -->
                                                <a-tag color="green">
                                                    {{ providerMap[item.provider] }}
                                                </a-tag>

                                                <!-- LLM -->
                                                <a-tag v-if="item.modelType === '1'" color="orange">
                                                    {{ item.purpose === '1'
                                                        ? '默认问答模型'
                                                        : 'Embedding' }}
                                                </a-tag>

                                                <!-- Embedding -->
                                                <a-tag v-if="item.modelType === '3'" color="Purple">
                                                    {{ item.vector }}维
                                                </a-tag>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="right">
                                        <a-switch v-model:checked="item.enabled" checked-children="启用"
                                            un-checked-children="停用" />
                                        <div class="actions">
                                            <a-button type="link" @click="onEdit(item)">
                                                编辑
                                            </a-button>
                                            <a-button danger type="link" @click="onDeleteDel(item)">
                                                删除
                                            </a-button>
                                        </div>
                                    </div>
                                </div>
                            </a-card>
                        </a-col>
                    </a-row>
                    <div class="pagination">
                        <a-pagination v-model:current="current" :page-size="pageSize" :total="cardList.length"
                            show-size-changer :page-size-options="['10', '20', '50']" :show-total="showTotal"
                            :locale="{ items_per_page: ' 条/页' }" />
                    </div>
                </a-card>
            </a-col>
        </a-row>
    </div>
</template>

<script>
import { reactive, toRefs, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { message } from "ant-design-vue";

const modelTypeMap = {
    "1": "LLM",
    "2": "VLM",
    "3": "Embedding",
    "4": "Reranker"
}

const providerMap = {
    "1": "OpenAI",
    "2": "Google",
    "3": "Deepseek"
}
const defaultFormState = {
    name: '',
    provider: '1',
    api_base: '',
    api_key: '',
    modelType: '1',
    usage: '',
    scope: '',
    baseURL: '',
    BPI_Htn: '',
    API_Key: '',
    enabled: true,
    purpose: '1',
    contextLimit: '128000',
    vector: '1536',
};

export default {
    name: 'EmpAccounts',
    setup() {
        const formRef = ref()
        const { t } = useI18n();
        const state = reactive({
            formState: {
                ...defaultFormState
            },
            cardList: [
                {
                    id: 1,
                    name: "gpt-4.1",

                    modelType: "1",
                    provider: "1",

                    baseURL: "https://api.openai.com/v1",

                    BPI_Htn: "gpt-4.1",

                    API_Key: "sk-xxxxxxxx",

                    enabled: true,

                    purpose: "1",

                    contextLimit: "128000",

                    vector: "",

                    logo: "https://placehold.co/60x60"
                },
                {
                    id: 2,
                    name: "qwen-max",

                    modelType: "1",

                    provider: "2",

                    baseURL: "https://dashscope.aliyuncs.com",

                    BPI_Htn: "qwen-max",

                    API_Key: "sk-qwen",

                    enabled: true,

                    purpose: "1",

                    contextLimit: "32000",

                    vector: "",

                    logo: "https://placehold.co/60x60"
                },
                {
                    id: 3,
                    name: "text-embedding-3-large",

                    modelType: "3",

                    provider: "1",

                    baseURL: "https://api.openai.com/v1",

                    BPI_Htn: "text-embedding-3-large",

                    API_Key: "sk-embedding",

                    enabled: true,

                    purpose: "",

                    contextLimit: "",

                    vector: "1536",

                    logo: "https://placehold.co/60x60"
                }
            ],
            current: 1,
            pageSize: 10,
            selectedIds: [], // 选中的id
            editingId: null,
            rules: {
                name: [{ required: true, message: t("modelConfiguration.inputModelNameCheck"), trigger: 'blur' }],
                modelType: [{ required: true, message: t("modelConfiguration.inputModelTypeCheck"), trigger: 'change' }],
                provider: [{ required: true, message: t("modelConfiguration.inputModelProviderCheck"), trigger: 'change' }],
                baseURL: [
                    { required: true, message: t("modelConfiguration.inputBaseURLCheck"), trigger: 'blur' },
                    { type: 'url', message: '请输入有效的URL地址', trigger: 'blur' }
                ],
                BPI_Htn: [{ required: true, message: t("modelConfiguration.inputBPI_HtnCheck"), trigger: 'blur' }],
                API_Key: [{ required: true, message: t("modelConfiguration.inputAPI_KeyCheck"), trigger: 'blur' }],
                purpose: [{ required: true, message: t("modelConfiguration.inputModelPurposeCheck"), trigger: 'change' }],
                contextLimit: [
                    { required: true, message: t("modelConfiguration.inputModelContextLimitCheck"), trigger: 'blur' },
                    { type: 'number', min: 1, message: '上下文长度必须大于0', trigger: 'blur' }
                ],
                vector: [
                    { required: true, message: t("modelConfiguration.inputModelVectorCheck"), trigger: 'blur' },
                    { type: 'number', min: 1, max: 10000, message: t("modelConfiguration.inputModelVectorCheck"), trigger: 'blur' }
                ]
            }
        })

        const showTotal = (total) => {
            return `${t('modelConfiguration.total')} ${total} ${t('modelConfiguration.strip')}`
        }
        const onSubmit = () => {
            formRef.value.validate().then(() => {
                if (state.editingId) {
                    // 编辑
                    const index = cardList.value.findIndex(
                        item => item.id === state.editingId
                    )

                    const newItem = cardList.value[index] = {
                        ...cardList.value[index],
                        ...state.formState
                    }
                    console.log(newItem);
                } else {
                    // 新增
                    console.log(state.formState);
                }

                onReset()
            })
        }
        const onSelect = (id, checked) => {
            if (checked) {
                if (!state.selectedIds.includes(id)) {
                    state.selectedIds.push(id)
                }

            } else {
                state.selectedIds = state.selectedIds.filter(item => item !== id)
            }

        }

        const onBatchDel = () => {
            if (state.selectedIds.length === 0) {
                message.warning("请先选择数据");
                return;
            }
            const ids = [...state.selectedIds];
            console.log(ids);
            /*
            await batchDelete({
                ids
            })
            */

        }

        const onReset = () => {
            formRef.value?.clearValidate();
            Object.assign(state.formState, defaultFormState);
        };

        const onEdit = (item) => {
            state.editingId = item.id
            Object.assign(
                state.formState,
                JSON.parse(JSON.stringify(item))
            )

        }
        const onDeleteDel = (item) => {
            console.log(item.id);
        }
        return {
            ...toRefs(state),
            onSubmit,
            formRef,
            showTotal,
            onSelect,
            onBatchDel,
            onReset,
            onEdit,
            modelTypeMap,
            providerMap,
            onDeleteDel,
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

        .llm-card,
        .embedding-card {
            :deep(.ant-card-body) {
                padding: 10px;
            }

            .content {
                background-color: var(--primary-1);

                :deep(.ant-form-item) {
                    margin-bottom: 10px;
                }

                :deep(.ant-form-item:last-child) {
                    margin-bottom: 0px;
                }
            }
        }

        .button-container {
            display: flex;
            justify-content: flex-end;
            gap: 10px;
        }
    }

    .right-card {
        height: 100%;

        .title {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .model-card {

            border-radius: 12px;
            transition: all .2s;

            &.active {
                border: 1px solid #1677ff;
                background: #f0f7ff;
            }

            .content {
                display: flex;
                justify-content: space-between;
                align-items: center;

                .left {
                    display: flex;
                    align-items: center;

                    .logo {
                        width: 56px;
                        height: 56px;
                        border-radius: 12px;
                        object-fit: cover;
                    }

                    .info {
                        margin-left: 18px;

                        .title {
                            font-size: 22px;
                            font-weight: 600;
                            margin-bottom: 10px;
                        }

                        .tags {
                            display: flex;
                            gap: 6px;
                        }
                    }
                }

                .right {
                    display: flex;
                    flex-direction: column;
                    align-items: flex-end;

                    .actions {
                        margin-top: 18px;
                    }
                }

            }

        }

        .pagination {
            position: fixed;
            bottom: 135px;
            right: 60px;
        }
    }
}
</style>
