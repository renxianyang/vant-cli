import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

function lazyLoad(path) {
    if (path[0] === '/') {
        throw new Error(`性能原因，不支持绝对路径：${path}`);
    }
    return () => import('@views/' + path);
}


const routes = [
    {
        path: '/',
        name: 'home',
        component: lazyLoad('Home')
    },
    {
        path: '*',
        redirect: '/',
    },
];

const router = new VueRouter({
    scrollBehavior() {
        return { x: 0, y: 0 };
    },
    routes
});

export default router;
