import { Uncle } from './index';
import AsyncComputed from 'vue-async-computed';

export default {
    install(Vue, options) {
        Vue.use(AsyncComputed);
        const uncle = new Uncle(Vue, options);
        Vue.prototype.$stateManager = uncle.getStateManager();
        Vue.prototype.$languageProvider = uncle.getLanguageProvider();
        Vue.prototype.$uncle = uncle;
    }
}