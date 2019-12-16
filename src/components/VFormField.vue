<template>
    <van-field
            ref="field"
            :value="value"
            :required="isRequired"
            :error-message="errorMsg"
            v-bind="$attrs"
            v-on="events"
    >
        <template slot="input">
            <slot/>
        </template>
    </van-field>
</template>

<script>
    /* 必须搭配VForm使用，优化性能不验证了 */
    import Schema from 'async-validator';

    export default {
        name: 'VFormField',
        inject: ['$form'],
        props: {
            value: '',
            prop: String,
            trigger: {
                type: String,
                default: 'input', // input（即时验证） or none（表单提交时验证） -- 暂时实现不了了，只能表单提交时验证
            },
        },
        data() {
            const filedName = this.prop;
            const rules = this.$form.getFieldRules(filedName);
            this.validator = !rules
                ? null
                : new Schema({ [filedName]: rules });

            return {
                isRequired: this.$form.getIsRequired(this.prop),
                errorMsg: '',
            };
        },
        computed: {
            events() {
                const events = { ...this.$listeners };

                // 是否使用 v-model
                if (events.input) {
                    if (this.trigger === 'input') {
                        events.input = v => {
                            this.$listeners.input(v);
                            this.$nextTick(() => {
                                this.validate();
                            });
                        };
                    }
                    if (this.trigger === 'blur') {
                        events.blur = () => {
                            this.validate();
                        };
                    }
                }

                return events;
            },
        },
        methods: {
            validate() {
                if (!this.validator) {
                    return;
                }

                return new Promise(done => {
                    const fieldName = this.prop;
                    this.validator.validate({ [fieldName]: this.$form.getFieldValue(fieldName) }, (errors, errorMap) => {
                        if (errors) {
                            this.errorMsg = errors[0].message;
                        } else {
                            this.errorMsg = '';
                        }

                        done(errorMap);
                    });
                });
            },
        },
        created() {
            this.$form.addField(this);
        },
        mounted() {
            this.$on(`validEvent:${this.trigger}`, () => {
                this.validate();
            });
        },
        beforeDestroy() {
            this.$form.removeField(this);
        },
    };
</script>

<style lang="scss" scoped>
</style>
