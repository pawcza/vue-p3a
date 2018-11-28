<template>
    <section>
        <div class="container">
            <div class="project-wrapper" :class="{initial: initial}">
                <project-component
                        v-for="(project, index) in projects"
                        :key="index"
                        :project="project">
                </project-component>
            </div>
        </div>
    </section>
</template>
<script>
    import ProjectComponent from './ProjectComponent.vue'
    import Velocity from 'velocity-animate'
    import 'velocity-animate/velocity.ui.min.js'
    export default{
        components: {
            ProjectComponent
        },
        data: function() {
            return {
                initial: false,
                projects: [
                    {
                        name: 'Project 1', style: {}, classy:[], active: false, width: null,
                        content: {
                            date: '2018',
                            tech: 'Laravel 5.2, Vue.js, jQuery, vanilla js, PHP 7, SCSS, isotope.js',
                            desc: 'This is a dummy text for one of the projects. Something more interesting is very very likely to appear here in the future. I reckon 3 sentences is a good grasp of what it is.',
                            btn: "<a target='_blank' href='http://google.com'>See it online</a>"
                        }
                    },
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
                rowSize: null,
                playing: false
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
                    this.projects[x].width = {width: this.positions[x].width};
                }
                this.initial = false;
            },
            leftovers(target, index){
                if(this.active){
                    target.project.classy = [];
                    for(let x=0; x<this.projects.length; ++x){
                        if(index !== x){
                            this.projects[x].style = this.positions[x];
                            this.projects[x].active = false;
                        }
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
                    this.active = target.project;
                    target.project.active = true;
                    target.project.classy.push('active');
                }
            },
            resize(target, index, size){
                if(size === 'small'){
                    let _this = this;
                    Velocity(
                        target.$el,
                        this.positions[index],
                        {duration: 340, easing: 'easeOutQuart', complete: function(){
                            target.project.style = _this.positions[index];
                        }}
                    );
                } else {
                    let _this = this;
                    Velocity(
                        target.$el,
                        _this.$data.big,
                        {duration: 340, easing: 'easeOutQuart',complete: function(){
                            target.project.style = _this.$data.big
                        }}
                    );
//                    target.project.style = this.$data.big
                }
            },
            transform(index, boxes){
                for(let x = 0; x < boxes.length; ++x){
                    let transform = [], forcefeed = boxes[x].style.transform, tx = 0, ty = 0;
                    if (Math.floor(index / this.rowSize) > 0 && this.active && x !== index) {
                        ty = 1;
                    } else if (this.active && x !== index) {
                        ty = -1;
                    } else if(x !== index){
                        ty = 0;
                    }
                    if(Math.floor(index / this.rowSize) === Math.floor(x / this.rowSize) && x !== index && this.active){
                        if(Math.floor(index % this.rowSize) === 1){
                            (x > index) ? tx = 1 : tx = -1;
                        } else {
                            (x > index) ? tx = 2 : tx = -2;
                        }
                    }
                    if (forcefeed === ''){
                        forcefeed = 'translate(0%, 0%)'
                    }
                    transform = ['translate(' + tx * 100 + '%, ' + ty * 100 + '%)', forcefeed];
                    console.log(transform);
                    Velocity(
                        boxes[x],
                        {transform: transform},
                        {duration: 340, easing: 'easeOutQuart'}
                    )
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
                height: this.$el.querySelectorAll('.project-wrapper')[0].offsetHeight + 2 + 'px',
                left: 0,
                top: 0,
                position: 'absolute'
            }
        }
    }
</script>