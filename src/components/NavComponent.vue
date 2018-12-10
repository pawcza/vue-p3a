<template>
    <nav>
        <a v-for="(section, index) in sections"
           :class="{ active: section.isActive }"
           class="load-hidden"
           v-scroll-reveal="{ delay: index * 150 }"
           :key="index"
           :data-text="section.name"
           @click="goSection('#' + section.name, index)">
            {{section.name}}
            <span class="nav-shadow">{{section.name}}</span>
        </a>
    </nav>
</template>
<script>
    export default {
        data: function () {
            return {}
        },
        props: ['sections'],
        methods: {
            scrollNav(){
                let targets = document.querySelectorAll('.nav-shadow'), sections = document.querySelectorAll('section'), i;
                for (i = 0; i < sections.length; ++i){
                    let transform = (window.pageYOffset - sections[i].offsetTop) / sections[i].offsetHeight * 100;
                    if(transform >= -100 && transform <= 100) {
                        targets[i].style.transform = 'translateX(' + transform + '%)';
                        targets[i].style.opacity = '1';
                    } else{
                        targets[i].style.opacity = '0';

                    }
                }
            },
            goSection(target, index){
                this.$emit('goSection', target, index);
            }
        }
    }
</script>