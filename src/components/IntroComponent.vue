<template>
    <section @mousemove="moveText($event)">
        <intro-text-component></intro-text-component>
        <intro-copy-component></intro-copy-component>
        <button-component @goSection="goSection('#projects')"></button-component>
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
        props: {
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