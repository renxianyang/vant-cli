import '@public/flexible.js';

import Vue from 'vue';

import * as vantComponents from 'vant';
import 'vant/lib/index.css';
import http from '@utils/http';
import api from '@utils/api';

initVant();
Vue.prototype.$http = http;
Vue.prototype.$api = api;

function VModelAop(Component) {
    /**
     * 此高阶函数不完整，DEMO使用
     * */
    return {
        name: Component.name + '-wrapped',
        data() {
            return {
                container: null,
            };
        },
        methods: {
            findVFromField() {
                /* 随便实现一下，不严谨 */
                let parent = this.$parent, total = 10;
                while (total--) {
                    if (!parent) {
                        break;
                    }

                    if (parent.$options.name === 'VFormField') {
                        break;
                    }

                    parent = parent.$parent;
                }

                return parent;
            },
        },
        mounted() {
            this.container = this.findVFromField();
        },
        render(h) {
            const props = {
                attrs: this.$attrs,
                on: this.$listeners,
                scopedSlots: this.scopedSlots,
            };

            if (props.on.input) {
                const o = props.on.input;
                props.on.input = v => {
                    o(v);
                    if (this.container) {
                        this.container.$emit('validEvent:input', v);
                    }
                };
            }

            if (props.on.blur) {
                const o = props.on.blur;
                props.on.blur = (...args) => {
                    o(...args);
                    if (this.container) {
                        this.container.$emit('validEvent:blur');
                    }
                };
            } else {
                props.on.blur = v => {
                    if (this.container) {
                        this.container.$emit('validEvent:blur', v);
                    }
                };
            }

            return <Component {...props}/>;
        },
    };
}

function initVant() {
    const aopMap = {
        Switch: 1,
        Search: 1,
        // 其它需要配合的组件
    };

    const components = { ...vantComponents };
    delete components.install;
    delete components.version;
    delete components.default;

    for (let k in components) {
        const Component = components[k];
        if (aopMap[k]) {
            const componentName = Component.name;
            Vue.component(componentName, VModelAop(Component));
        } else {
            Vue.use(Component);
        }
    }
}
