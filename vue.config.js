const path = require('path');

function getPath(src) {
    return path.join(__dirname, src);
}

module.exports = {
    chainWebpack(config) {
        config.resolve.alias.merge({
            '@public': getPath('public'),
            '@components': getPath('src/components'),
            '@views': getPath('src/views'),
            '@utils': getPath('src/utils'),
        });
    },
    css: {
        loaderOptions: {
            postcss: {
                plugins: [
                    require('postcss-px2rem-exclude')({
                        remUnit: 75,
                        exclude: /node_modules/,
                    }),
                ]
            },
            sass: {
                prependData: '@import "src/app.scss";', // 直接引用app.scss，会有样式覆盖的问题（这个css会在最后载入。）
            },
        }
    }
};


if (process.env.ENV_CONFIG === 'sit') {
    console.log('集成测试环境');
}

if (process.env.ENV_CONFIG === 'dev') {
    console.log('开发环境');
}

if (process.env.ENV_CONFIG === 'prod') {
    console.log('生产环境');
}


