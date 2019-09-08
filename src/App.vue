<template>
    <div class="app_container">
        <nav-component v-on:scroll.native="scrollNav($event)" :sections="sections" @goSection="goSection"></nav-component>
        <div class="puzzle_container">
            <intro ref="intro" class="active" id="intro"></intro>
            <projects ref="projects" id="projects"></projects>
            <contact ref="contact" id="contact"></contact>
        </div>
    </div>
</template>
<script>
    import Velocity from 'velocity-animate'
    import 'velocity-animate/velocity.ui.min.js'

    import NavComponent from './components/layout/Nav.vue'
    import Intro from './components/pages/Intro.vue'
    import Projects from './components/pages/Projects.vue'
    import Contact from './components/pages/Contact.vue'

    export default {
        components: {
            NavComponent,
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
            goSection(target){
                // If target is a string then select it's element based on ID from target
                typeof target === 'string' ? target = this.$refs[target].$el : '';
                window.scrollTo({
                    top: target.offsetTop,
                    behavior: 'smooth'
                })
            }
        },

        mounted() {
            this.$data.active = Object.keys(this.$refs).filter(section => {
                return this.$refs[section].$el.classList.contains('active');
            });

            document.querySelectorAll('.loader')[0].classList.add('loaded');

            window.addEventListener('scroll', this.$children[0].scrollNav, true);

            // window.addEventListener('resize', this.$children[2].resizeHandler, true);

            // Set active section in case of page being loaded with id in the slug
            (window.location.hash !== '') ? this.goSection(window.location.hash) : '';
        }
    }
</script>
