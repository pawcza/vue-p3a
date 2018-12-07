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
                let _this = this, _target = target, prevSection = _this.active;
                // If target is a string then select it's element based on ID from target
                (typeof target === 'string') ? target = document.querySelectorAll(target)[0] : '';
                (index === '') ? index = Array.prototype.slice.call(document.querySelectorAll('section')).indexOf(target) : '';
                // If animation is not playing and target is not currently active then start playing
                if(!this.playing && target !== this.active){
                    // Disable active state on all navigation elements
                    for(let x=0; x<this.sections.length; ++x){
                        this.sections[x].isActive = false;
                    }
                    // Handle active toggle for sections
                    this.active.classList.remove('active');
                    this.playing = true;
                    Velocity(
                        document.body, 'scroll',
                        {
                            offset: target.offsetTop,
                            easing: 'easeInOutExpo',
                            duration: 500,
                            begin: function(){
                                _this.sections[index].isActive = true;
                                _this.active = target;
                                _this.active.__vue__.enterAnim();
                            },
                            complete: function(){
                                _this.playing = false;
                                target.classList.add('active');
                                // Set location hash to target ID
                                window.location.hash = target.id;
                                document.title = 'Pawel Czarniecki - ' + target.id.charAt(0).toUpperCase() + target.id.slice(1);
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

            window.addEventListener('load', function(){
                document.querySelectorAll('.app_container')[0].classList.add('loaded');
                _this.$children[0].enterAnim();
                _this.$children[1].enterAnim();
            });

            // Set active section in case of page being loaded with id in the slug
            (window.location.hash != '') ? this.goSection(window.location.hash) : '';

        }
    }
</script>
