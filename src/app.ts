import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { Button, Icon } from '@nutui/nutui-taro';
// 定制化主题必须使用 scss
import '@nutui/nutui-taro/dist/styles/themes/default.scss';
import 'uno.css';

import './app.scss';

const App = createApp({
    onShow(options) {},
    // 入口组件不需要实现 render 方法，即使实现了也会被 taro 所覆盖
});

App.use(Button).use(Icon);

App.use(createPinia());

export default App;
