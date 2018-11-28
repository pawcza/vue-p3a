<template>
    <div class="puzzle_container" @mousewheel="wheel($event)">
        <intro-component class="active" id="intro"></intro-component>
        <projects-component id="projects"></projects-component>
        <contact-component id="contact"></contact-component>
    </div>
</template>
<script>
    import IntroComponent from './components/IntroComponent.vue'
    import ProjectsComponent from './components/ProjectsComponent.vue'
    import ContactComponent from './components/ContactComponent.vue'
    import Velocity from 'velocity-animate'
    import 'velocity-animate/velocity.ui.min.js'
    export default {
        components: {
            IntroComponent,
            ProjectsComponent,
            ContactComponent
        },
        data: function() {
            return {
                playing: false,
                active: null
            }
        },
        methods: {
            goSection(target){
                let _this = this, _target = target;
                (typeof target === 'string') ? target = document.querySelectorAll(target)[0] : '';
                if(!this.playing && target !== this.active){
                    this.active.classList.remove('active');
                    target.classList.add('active');
                    this.playing = true;
                    Velocity(
                        document.body, 'scroll',
                        {
                            offset: target.offsetTop,
                            easing: 'easeOutExpo',
                            duration: 500,
                            begin: function(){
                                if(_target.id === 'projects'){
                                    _this.$children[1].setBoxValues();
                                }
                            },
                            complete: function(){
                                _this.active = target;
                                _this.playing = false;
                            }
                        }
                    )
                }
            },
            nextSection: function(){
                let target = this.active.nextElementSibling;
                if(target !== null){
                    this.goSection(target);
                }
            },
            prevSection: function(){
                let target = this.active.previousElementSibling;
                if(target !== null){
                    this.goSection(target);
                }
            },
            wheel: function(e){
                (e.deltaY > 0) ? this.nextSection() : '';
                (e.deltaY < 0) ? this.prevSection() : '';
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
        }
    }
</script>
