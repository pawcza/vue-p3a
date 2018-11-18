<template>
    <section>
        <div class="container">
            <div class="project-wrapper" :class="{initial: initial}">
                <project-component
                        v-for="project in projects"
                        :project="project">
                </project-component>
            </div>
        </div>
    </section>
</template>
<script>
    import ProjectComponent from './ProjectComponent.vue'
    export default{
        components: {
            ProjectComponent
        },
        data: function() {
            return {
                initial: false,
                projects: [
                    {name: 'Project 1', style: {}, classy:[], active: false},
                    {name: 'Project 2', style: {}, classy:[], active: false},
                    {name: 'Project 3', style: {}, classy:[], active: false},
                    {name: 'Project 4', style: {}, classy:[], active: false},
                    {name: 'Project 5', style: {}, classy:[], active: false},
                    {name: 'Project 6', style: {}, classy:[], active: false}
                ],
                positions: [],
                small: null,
                big: null,
                active: false,
                rowSize: null
            }
        },
        template: "#project-template",
        methods: {
            setBoxValues(){
                this.initial = true;
                let boxes = this.$el.querySelectorAll('.project-container');
                for (let x = 0; x<boxes.length; ++x){
                    this.projects[x].style = {
                        left: boxes[x].offsetLeft + 'px',
                        top: boxes[x].offsetTop + 'px',
                        width: boxes[x].offsetWidth + 'px',
                        height: boxes[x].offsetHeight + 'px',
                        position: 'absolute'
                    };
                    this.positions.push(this.projects[x].style);
                }
                this.initial = false;
            },
            leftovers(target, index){
                if(this.active){
                    target.project.classy = [];
                    for(let x=0; x<this.projects.length; ++x){
                        (index !== x) ? this.projects[x].style = this.positions[x] : '';
                    }
                }
            },
            toggleActive(target){
                if(target.project.classy.indexOf('active') !== -1){
                    target.project.active = false;
                    this.active = false;
                    let _target = target;
                    setTimeout(function(){
                        _target.project.classy = _target.project.classy.filter(function(value){
                            return value !== 'active';
                        })
                    }, 340);
                } else {
                    this.active = true;
                    target.project.active = true;
                    target.project.classy.push('active');
                }
            },
            resize(target, index, size){
                if(size === 'small'){
                    target.project.style = this.positions[index];
                } else {
                    target.project.style = this.$data.big
                }
            },
            transform(index){
                if(Math.floor(index / this.rowSize) > 0 && this.active){
                    for(let x = 0; x < this.projects.length; ++x){
                        (x !== index) ? this.projects[x].classy = ['transformUp'] : '';
                    }
                } else if (this.active){
                    for(let x = 0; x < this.projects.length; ++x){
                        (x !== index) ? this.projects[x].classy = ['transformDown'] : '';
                    }
                } else {
                    for(let x = 0; x < this.projects.length; ++x){
                        (x !== index) ? this.projects[x].classy = [''] : '';
                    }
                }
            }
        },
        mounted(){
            if(window.innerWidth < 768){
                this.$data.rowSize = 2;
            } else {
                this.$data.rowSize = 3;
            }
            this.$data.small = this.$el.querySelectorAll('.project-container')[0].getBoundingClientRect();
            this.$data.big = {
                width: this.$el.querySelectorAll('.project-wrapper')[0].offsetWidth + 'px',
                height: this.$el.querySelectorAll('.project-wrapper')[0].offsetHeight + 'px',
                left: 0,
                top: 0,
                position: 'absolute'
            }
        }
    }
</script>