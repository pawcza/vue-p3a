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
    export default {
        components: {
            IntroComponent,
            ProjectsComponent,
            ContactComponent
        },
        data: function() {
            return {
                sections: [
                    {name: 'intro'},
                    {name: 'projects'},
                    {name: 'contact'}
                ],
                playing: false,
                active: null
            }
        },
        methods: {
            goSection(target){
                if(this.playing === false){
                    this.playing = true;
                    (typeof target === 'string') ? target = document.querySelectorAll(target)[0] : '';
                    if(typeof target !== 'undefined'){
                        this.active.classList.remove('active');
                        this.active = target;
                        target.classList.add('active');
                        let index = Array.prototype.indexOf.call(this.$el.children, target),
                            transform = (index / this.$el.children.length) * 100;
                        this.$el.style.transform = 'translateY(-' + transform + '%)';
                    }
                    let that = this,
                        _target = target;
                    setTimeout(function(){
                        that.playing = false;
                        if(_target.id === 'projects'){
                            that.$children[1].setBoxValues();
                        }
                    }, 340);
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
