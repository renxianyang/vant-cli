<template>
    <div class="home" style="height: 1920px;">
        <h1>
            CLI-MOBILE
        </h1>
        <van-sticky>
            <van-button type="info">吸顶距离</van-button>
            {{model}}
            <VForm ref="form" :model="model" :rules="rules">
                <VFormField label="姓名" placeholder="请输入姓名" prop="name" v-model="model.name" trigger="blur"/>
                <VFormField label="开关" prop="switch">
                    <van-switch v-model="model.switch"/>
                </VFormField>
                <VFormField label="test" prop="aaa" trigger="blur">
                    <van-search placeholder="请输入搜索关键词" v-model="model.aaa"/>
                </VFormField>
            </VForm>
            <van-button type="info" @click="handleSubmit">提交</van-button>
        </van-sticky>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                model: {
                    name: '',
                    switch: '',
                },
                rules: {
                    switch: {
                        required: true,
                        message: '请选择',
                    },
                    name: [
                        {
                            required: true,
                            message: '请输入姓名',
                        },
                        // {
                        //     message: '???',
                        //     validator(a, b, c) {
                        //         c(new Error('test'));
                        //     },
                        // }
                    ],
                    aaa: {
                        required: true,
                        message: '请填写内容',
                    },
                },
            };
        },
        methods: {
            handleSubmit() {
                this.$refs.form.validate().then(valid => {
                    console.log(valid);
                });
            },
        },
    };
</script>
