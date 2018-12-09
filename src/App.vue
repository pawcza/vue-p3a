<template>
    <div class="app_container">
        <nav-component v-on:scroll.native="scrollNav($event)" :sections="sections" @goSection="goSection"></nav-component>
        <div class="puzzle_container" @mousewheel="wheel($event)">
            <intro-component class="active" id="intro"></intro-component>
            <projects-component id="projects"></projects-component>
            <contact-component id="contact"></contact-component>
        </div>
    </div>
</template>
<script>
    import NavComponent from './components/NavComponent.vue'
    import IntroComponent from './components/IntroComponent.vue'
    import ProjectsComponent from './components/ProjectsComponent.vue'
    import ContactComponent from './components/ContactComponent.vue'
    import Velocity from 'velocity-animate'
    import 'velocity-animate/velocity.ui.min.js'
    export default {
        components: {
            NavComponent,
            IntroComponent,
            ProjectsComponent,
            ContactComponent
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
            scrollNav(event){
//                console.log(event);
            },
            goSection(target, index = ''){
                let _this = this;
                // If target is a string then select it's element based on ID from target
                (typeof target === 'string') ? target = document.querySelectorAll(target)[0] : '';
                Velocity(
                    document.body, 'scroll',
                    {
                        offset: target.offsetTop,
                        easing: 'easeInOutExpo',
                        duration: 500,
                        begin: function(){
                            _this.active = target;
                        },
                        complete: function(){
                            // Set location hash to target ID
                            window.location.hash = target.id;
                            document.title = 'Pawel Czarniecki - ' + target.id.charAt(0).toUpperCase() + target.id.slice(1);
                        }
                    }
                )
            },
            wheel: function(e){
                (e.deltaY > 0) ? console.log('down') : '';
                (e.deltaY < 0) ? console.log('up') : '';
            }
        },
        mounted() {
            let _this = this;
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

            document.addEventListener('DOMContentLoaded', function(){
                document.querySelectorAll('.loader')[0].classList.add('loaded');
                console.log(_this);
            });

            window.addEventListener('scroll', this.scrollNav, true);

            // Set active section in case of page being loaded with id in the slug
            (window.location.hash != '') ? this.goSection(window.location.hash) : '';

        }
    }
</script>
