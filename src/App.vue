<template>
    <div class="app_container">
        <nav v-on:scroll.native="scrollNav($event)" :sections="sections" @goSection="goSection"></nav>
        <div class="puzzle_container">
            <intro class="active" id="intro"></intro>
            <projects id="projects"></projects>
            <contact id="contact"></contact>
        </div>
    </div>
</template>
<script>
    import Nav from './components/layout/Nav.vue'
    import Intro from './components/pages/Intro.vue'
    import Projects from './components/pages/Projects.vue'
    import Contact from './components/pages/Contact.vue'
    import Velocity from 'velocity-animate'
    import 'velocity-animate/velocity.ui.min.js'
    export default {
        components: {
            Nav,
            Intro,
            Projects,
            Contact
        },
        data: function() {
            return {
                sections: [
                    {name: 'intro', isActive: true},
                    {name: 'projects', isActive: false},
                    {name: 'contact', isActive: false}
                ],
                playing: false,
                active: null
            }
        },
        methods: {
            goSection(target, index = ''){
                // If target is a string then select it's element based on ID from target
                (typeof target === 'string') ? target = document.querySelectorAll(target)[0] : '';
                window.scrollTo({
                    top: target.offsetTop,
                    behavior: 'smooth'
                })
            }
        },
        mounted() {

            this.$data.active = this.$el.querySelectorAll('section.active')[0];
            window.addEventListener('keydown', function(e){
                let target = this.document.querySelectorAll('.project-container.active')[0];
                if(target !== undefined){
                    if(e.key === 'ArrowRight'){
                        (target.nextElementSibling !== null) ? target.nextElementSibling.__vue__.resizeProject() : '';
                    }
                    if(e.key === 'ArrowLeft'){
                        (target.previousElementSibling !== null) ? target.previousElementSibling.__vue__.resizeProject() : '';
                    }
                }

            });

            document.querySelectorAll('.loader')[0].classList.add('loaded');

            window.addEventListener('scroll', this.$children[0].scrollNav, true);

            // window.addEventListener('resize', this.$children[2].resizeHandler, true);

            // Set active section in case of page being loaded with id in the slug
            (window.location.hash != '') ? this.goSection(window.location.hash) : '';

        }
    }
</script>
