<template>
    <section @mousemove="moveText($event)">
        <intro-text-component class="load-hidden" v-scroll-reveal="{ delay: 250 }" ></intro-text-component>
        <intro-copy-component class="load-hidden" v-scroll-reveal="{ delay: 300 }" ></intro-copy-component>
        <button-component class="load-hidden" v-scroll-reveal="{ delay: 350 }" @goSection="goSection('#projects')"></button-component>
    </section>
</template>
<script>
    import ButtonComponent from './ButtonComponent.vue'
    import IntroTextComponent from './IntroTextComponent.vue'
    import IntroCopyComponent from './IntroCopyComponent.vue'
    export default {
        data(){
            return{
                done: false
            }
        },
        components: {
            ButtonComponent,
            IntroTextComponent,
            IntroCopyComponent
        },
        methods:{
            moveText(e){
              this.$emit('mousemove', e);
            },
            goSection(target){
                this.$parent.goSection(target);
            }
        }
    }
</script>