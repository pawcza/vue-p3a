<template>
    <section>
        <header-component class="load-hidden" v-scroll-reveal="{ delay: 250, beforeReveal: playText}" ></header-component>
        <copy class="load-hidden" v-scroll-reveal="{ delay: 300, scale: .5 }" ></copy>
        <button-component class="load-hidden" v-scroll-reveal="{ delay: 350, distance: '50px'}" @goSection="goSection('projects')"></button-component>
    </section>
</template>
<script>
    import ButtonComponent from '../buttons/Button.vue'
    import HeaderComponent from '../layout/Header.vue'
    import Copy from '../layout/Copy.vue'
    export default {
        components: {
            ButtonComponent,
            HeaderComponent,
            Copy
        },

        methods:{
            playText(){
                this.$children[0].playText();
            },

            goSection(target){
                this.$parent.goSection(target);
            }
        }
    }
</script>
<style lang="scss" scoped>
    #intro{
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
    }
</style>
