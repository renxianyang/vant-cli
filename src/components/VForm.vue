<template>
    <form>
        <slot/>
    </form>
</template>

<script>
    export default {
        name: 'VForm',
        provide() {
            return {
                $form: this,
            };
        },
        props: {
            model: {
                type: Object,
                default: () => ({}),
            },
            rules: {
                type: Object,
                default: () => ({}),
            },
        },
        data() {
            return {
                fields: [],
            };
        },
        methods: {
            addField(VNode) {
                this.fields.push(VNode);
            },
            removeField(VNode) {
                const index = this.fields.findIndex(VNode);
                if (index === -1) {
                    return;
                }

                this.fields.splice(index, 1);
            },


            getFieldValue(fieldName) {
                return this.model[fieldName];
            },
            getFieldRules(fieldName) {
                return this.rules[fieldName]; // or undefined
            },
            getIsRequired(fieldName) {
                let rules = this.rules[fieldName] || [];

                if (!Array.isArray(rules)) {
                    rules = [rules];
                }

                return rules.some(item => item.required);
            },

            validate() {
                return new Promise(done => {
                    Promise.all(this.fields.map(item => item.validate())).then(allErrors => {
                        allErrors = allErrors.filter(Boolean);

                        // TODO allErrors转map
                        const isValid = allErrors.length;
                        done(isValid, allErrors);
                    });
                });

            },
        },
    };
</script>

<style lang="scss" scoped>

</style>
