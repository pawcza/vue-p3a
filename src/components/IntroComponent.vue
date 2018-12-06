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
        data(){
            return{
            }
        },
        components: {
            ButtonComponent,
            IntroTextComponent,
            IntroCopyComponent
        },
        methods:{
            enterAnim(){
                Velocity(
                    this.$el.children,
                    'transition.slideDownIn',
                    {stagger: 100, display: 'flex', delay: 150}
                )
            },
            moveText(e){
              this.$emit('mousemove', e);
            },
            goSection(target){
                this.$parent.goSection(target);
            }
        }
    }
</script>