import Vue from 'vue'
import App from './App.vue'
import './scss/main.scss'
import VueLazyLoad from 'vue-lazyload'
import VueScrollReveal from 'vue-scroll-reveal'

Vue.use(VueScrollReveal, {
    class: 'v-scroll-reveal', // A CSS class applied to elements with the v-scroll-reveal directive; useful for animation overrides.
    duration: 800,
    scale: 1,
    mobile: false
});

Vue.use(VueLazyLoad, {
    attempt: 1,
    listenEvents: ['scroll']
});

new Vue({
    el: '#app',
    render: h => h(App)
});
