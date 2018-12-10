<template>
    <section>
        <intro-text-component class="load-hidden" v-scroll-reveal="{ delay: 250, beforeReveal: playText}" ></intro-text-component>
        <intro-copy-component class="load-hidden" v-scroll-reveal="{ delay: 300 }" ></intro-copy-component>
        <button-component class="load-hidden" v-scroll-reveal="{ delay: 350 }" @goSection="goSection('#projects')"></button-component>
    </section>
</template>
<script>
    import ButtonComponent from './ButtonComponent.vue'
    import IntroTextComponent from './IntroTextComponent.vue'
    import IntroCopyComponent from './IntroCopyComponent.vue'
    export default {
        components: {
            ButtonComponent,
            IntroTextComponent,
            IntroCopyComponent
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