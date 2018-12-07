<template>
    <nav>
        <a :href="'#' + section.name"
           v-for="(section, index) in sections"
           :class="{ active: section.isActive }"
           :key="index"
           :data-text="section.name"
           @click="goSection('#' + section.name, index)">
            {{section.name}}
            <transition @before-enter="beforeEnter" @enter="enter" @leave="leave" class="nav-shadow">
                <span class="nav-shadow" v-if="section.isActive">{{section.name}}</span>
            </transition>
        </a>
    </nav>
</template>
<script>
    import Velocity from 'velocity-animate'
    import 'velocity-animate/velocity.ui.min.js'
    export default {
        data: function () {
            return {}
        },
        props: ['sections'],
        methods: {
            enterAnim(){
                Velocity(
                    this.$el.childNodes,
                    'transition.bounceDownIn',
                    {stagger: 30, display: 'flex'}
                )
            },
            goSection(target, index){
                this.$emit('goSection', target, index);
            },
            beforeEnter(el){
              el.style.left = '-100%';
            },
            enter(el, done){
                Velocity(el, { left: 0 }, { easing: 'easeOutQuad', duration: 340, complete: done })
            },
            leave(el, done){
                Velocity(el, { left: '100%' }, { easing: 'easeOutQuad', duration: 340, complete: done })
            }
        }
    }
</script>