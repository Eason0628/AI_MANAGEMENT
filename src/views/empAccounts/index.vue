<template>
    <div style="background-color: #ececec; width: 100%">
        <div>
            <h1>员工账号</h1>
        </div>
        <a-row :gutter="16">
            <a-col :span="8">
                <a-card title="创建员工账号" :bordered="false">
                    <p>card content</p>
                </a-card>
            </a-col>
            <a-col :span="16">
                <a-card title="账号列表" :bordered="false">
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

<script setup>
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
</script>