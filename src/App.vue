<template>
    <div class="app_container">
        <nav-component :sections="sections" @goSection="goSection"></nav-component>
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
            goSection(target, index = ''){
                let _this = this, _target = target;
                // If target is a string then select it's element based on ID from target
                (typeof target === 'string') ? target = document.querySelectorAll(target)[0] : '';
                (index === '') ? index = Array.prototype.slice.call(document.querySelectorAll('section')).indexOf(target) : '';
                // If animation is not playing and target is not currently active then start playing
                if(!this.playing && target !== this.active){

                    // Disable active state on all navigation elements
                    for(let x=0; x<this.sections.length; ++x){
                        this.sections[x].isActive = false;
                    };
                    // Handle active toggle for sections
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
                                    _this.$children[2].setBoxValues();
                                }
                                _this.sections[index].isActive = true;

                            },
                            complete: function(){
                                _this.active = target;
                                _this.playing = false;
                                // Set location hash to target ID
                                window.location.hash = target.id;
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
                if(target !== null && target.tagName !== 'NAV'){
                    this.goSection(target);
                }
            },
            wheel: function(e){
                (e.deltaY > 0) ? this.nextSection() : '';
                (e.deltaY < 0) ? this.prevSection() : '';
            },
            setActiveNav(){

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

            this.setActiveNav();

        }
    }
</script>
