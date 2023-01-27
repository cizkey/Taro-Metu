import UnoCSS from 'unocss/webpack';
const AutoImport = require('unplugin-auto-import/webpack');
const Components = require('unplugin-vue-components/webpack');

const config = {
    projectName: 'MatrixCross-Taro-Admin',
    date: '2023-1-27',
    designWidth: 750,
    deviceRatio: {
        640: 2.34 / 2,
        750: 1,
        828: 1.81 / 2,
    },
    sourceRoot: 'src',
    outputRoot: 'dist',
    plugins: [],
    defineConstants: {},
    copy: {
        patterns: [],
        options: {},
    },
    sass: {
        data: `@import "@nutui/nutui-taro/dist/styles/variables.scss";`,
    },
    framework: 'vue3',
    compiler: 'webpack5',
    cache: {
        enable: false, // Webpack 持久化缓存配置，建议开启。默认配置请参考：https://docs.taro.zone/docs/config-detail#cache
    },
    plugin: ['@tarojs/plugin-mock'],
    mini: {
        webpackChain(chain) {
            // 添加自动引入
            // https://github.com/antfu/unplugin-auto-import
            chain.plugin('unplugin-auto-import').use(
                AutoImport({
                    include: [
                        // 扫描范围
                        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
                        /\.vue$/,
                        /\.vue\?vue/, // .vue
                        /\.md$/, // .md
                    ],
                    imports: [
                        'vue',
                        // 注意: 针对可能出现的 `$` 和 `$$`，手动排除
                        // https://vuejs.org/guide/extras/reactivity-transform.html#refs-vs-reactive-variables
                        {
                            'vue/macros': [
                                '$ref',
                                '$shallowRef',
                                '$toRef',
                                '$customRef',
                                '$computed',
                            ],
                        },
                    ],
                    dts: 'src/auto-imports.d.ts',
                    dirs: ['src/stores'],
                    vueTemplate: true,
                    eslintrc: {
                        enabled: true,
                        filepath: 'src/.eslintrc-auto-import.json',
                        globalsPropValue: true,
                    },
                }),
            );

            // 添加组件按需引入, 自动引入 `src/components` 目录下的组件
            // https://github.com/antfu/unplugin-vue-components
            chain.plugin('unplugin-vue-components').use(
                Components({
                    dts: 'src/components.d.ts',
                    dirs: ['src/components'],
                    extensions: ['vue'], //  // 组件的有效文件扩展名
                    include: [/\.vue$/, /\.vue\?vue/], // 扫描范围
                    resolvers: [],
                }),
            );
            chain.plugin('unocss').use(UnoCSS());
            chain.merge({
                module: {
                    rule: {
                        mjsScript: {
                            test: /\.mjs$/,
                            include: [/pinia/],
                            use: {
                                babelLoader: {
                                    loader: require.resolve('babel-loader'),
                                },
                            },
                        },
                    },
                },
            });
        },
        postcss: {
            pxtransform: {
                enable: true,
                config: {},
            },
            url: {
                enable: true,
                config: {
                    limit: 1024, // 设定转换尺寸上限
                },
            },
            cssModules: {
                enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
                config: {
                    namingPattern: 'module', // 转换模式，取值为 global/module
                    generateScopedName: '[name]__[local]___[hash:base64:5]',
                },
            },
        },
    },
    h5: {
        publicPath: '/',
        staticDirectory: 'static',
        postcss: {
            autoprefixer: {
                enable: true,
                config: {},
            },
            cssModules: {
                enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
                config: {
                    namingPattern: 'module', // 转换模式，取值为 global/module
                    generateScopedName: '[name]__[local]___[hash:base64:5]',
                },
            },
        },
    },
};

module.exports = (merge) => {
    if (process.env.NODE_ENV === 'development') {
        return merge({}, config, require('./dev'));
    }
    return merge({}, config, require('./prod'));
};
