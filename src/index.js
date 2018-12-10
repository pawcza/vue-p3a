import Vue from 'vue'
import App from './App.vue'
import './scss/main.scss'
import VueLazyLoad from 'vue-lazyload'
import VueScrollReveal from 'vue-scroll-reveal'

Vue.use(VueScrollReveal, {
    duration: 800,
    scale: .85
});

Vue.use(VueLazyLoad, {
    attempt: 1,
    listenEvents: ['scroll']
});

new Vue({
    el: '#app',
    render: h => h(App)
});
