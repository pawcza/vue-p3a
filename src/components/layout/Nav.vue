<template>
    <transition-group tag="nav" name="navigation-on-load" @enter="enter">
        <a v-for="(section, index) in sections"
           v-if="ready"
           :key="section.name"
           :class="{ active: section.isActive }"
           :data-index="index"
           :data-text="section.name"
           @click="goSection('#' + section.name, index)">
            {{section.name}}
            <span class="nav-shadow">{{section.name}}</span>
        </a>
    </transition-group>
</template>
<script>
    export default {
        data: function () {
            return {
                ready: false
            }
        },
        props: ['sections'],
        methods: {
            scrollNav(){
                let targets = document.querySelectorAll('.nav-shadow'), sections = document.querySelectorAll('section'), i;
                for (i = 0; i < sections.length; ++i){
                    let transform = (window.pageYOffset - sections[i].offsetTop) / sections[i].offsetHeight * 100;
                    if(transform >= -100 && transform <= 100) {
                        targets[i].style.transform = `translateX(${transform}%)`;
                        targets[i].style.opacity = '1';
                    } else{
                        targets[i].style.opacity = '0';

                    }
                }
            },
            goSection(target, index){
                this.$emit('goSection', target, index);
            },
            enter(el, done){
                let index = el.dataset.index;
                setTimeout(function(){
                    Velocity(
                        el,
                        { translateY: [0, '-50px'], opacity: [1, 0]},
                        { complete: done }
                    )
                }, 50 * index);
            }
        },
        mounted(){
            this.ready = true;
        }
    }
</script>
<style lang="scss" scoped>
    @import '../../scss/plugins/include-media';
    nav{
        position: fixed;
        left: 50%;
        transform: translateX(-50%);
        top: 10px;
        display: flex;
        justify-content: center;
        z-index: 99;
        border-radius: 5px;
        overflow: hidden;
        a{
            cursor: pointer;
            color: #373737;
            padding: 10px;
            position: relative;
            text-transform: capitalize;
            text-decoration: none;
            overflow: hidden;
            background: rgba(255,255,255,.25);
            font-weight: 700;
            transform: translateY(-50px);
            opacity: 0;
            .nav-shadow{
                background: #373737;
                position: absolute;
                color: white;
                opacity: 0;
                z-index: 2;
                left: 0;
                border-radius: 5px;
                will-change: transform;
                top: 0;
                padding: 10px;
            }
            &:first-of-type{
                .nav-shadow{
                    opacity: 1;
                }
            }
        }
        @include media('<phone'){
            left: 0;
            transform: none;
            width: 100%;
            top: 0;
            border-radius: 0;
            padding: 0;
            overflow: visible;
            &:before{
                bottom: -5px;
                box-shadow: inset 0px 4px 8px -3px rgba(17, 17, 17, .16);
                content: "";
                height: 5px;
                left: 0px;
                opacity: 1;
                pointer-events: none;
                position: absolute;
                right: 0px;
                width: 100%;
                z-index: 2050;
            }
            a{
                flex-grow:1;
                text-align: center;
                border-radius: 0;
                background: white;
                .nav-shadow{
                    border-radius: 0;
                    box-sizing: border-box;
                    width: 100%;
                    text-align: center;
                }
            }
        }
    }
</style>
