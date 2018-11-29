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
                        name: 'Project 1', style: {}, classy:[], active: false, width: null, index: 'first',
                        content: {
                            date: '2018',
                            tech: 'Laravel 5.2, Vue.js, jQuery, vanilla js, PHP 7, SCSS, isotope.js',
                            desc: 'This is a dummy text for one of the projects. Something more interesting is very very likely to appear here in the future. I reckon 3 sentences is a good grasp of what it is.',
                            btn: "<a target='_blank' href='http://google.com'>See it online</a>"
                        }
                    },
                    {
                        name: 'Project 1', style: {}, classy:[], active: false, width: null,
                        content: {
                            date: '2018',
                            tech: 'Laravel 5.2, Vue.js, jQuery, vanilla js, PHP 7, SCSS, isotope.js',
                            desc: 'This is a dummy text for one of the projects. Something more interesting is very very likely to appear here in the future. I reckon 3 sentences is a good grasp of what it is.',
                            btn: "<a target='_blank' href='http://google.com'>See it online</a>"
                        }
                    },
                    {
                        name: 'Project 1', style: {}, classy:[], active: false, width: null,
                        content: {
                            date: '2018',
                            tech: 'Laravel 5.2, Vue.js, jQuery, vanilla js, PHP 7, SCSS, isotope.js',
                            desc: 'This is a dummy text for one of the projects. Something more interesting is very very likely to appear here in the future. I reckon 3 sentences is a good grasp of what it is.',
                            btn: "<a target='_blank' href='http://google.com'>See it online</a>"
                        }
                    },
                    {
                        name: 'Project 1', style: {}, classy:[], active: false, width: null,
                        content: {
                            date: '2018',
                            tech: 'Laravel 5.2, Vue.js, jQuery, vanilla js, PHP 7, SCSS, isotope.js',
                            desc: 'This is a dummy text for one of the projects. Something more interesting is very very likely to appear here in the future. I reckon 3 sentences is a good grasp of what it is.',
                            btn: "<a target='_blank' href='http://google.com'>See it online</a>"
                        }
                    },
                    {
                        name: 'Project 1', style: {}, classy:[], active: false, width: null,
                        content: {
                            date: '2018',
                            tech: 'Laravel 5.2, Vue.js, jQuery, vanilla js, PHP 7, SCSS, isotope.js',
                            desc: 'This is a dummy text for one of the projects. Something more interesting is very very likely to appear here in the future. I reckon 3 sentences is a good grasp of what it is.',
                            btn: "<a target='_blank' href='http://google.com'>See it online</a>"
                        }
                    },
                    {
                        name: 'Project 1', style: {}, classy:[], active: false, width: null, index: 'last',
                        content: {
                            date: '2018',
                            tech: 'Laravel 5.2, Vue.js, jQuery, vanilla js, PHP 7, SCSS, isotope.js',
                            desc: 'This is a dummy text for one of the projects. Something more interesting is very very likely to appear here in the future. I reckon 3 sentences is a good grasp of what it is.',
                            btn: "<a target='_blank' href='http://google.com'>See it online</a>"
                        }
                    }
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
                this.positions = [];
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
            leftovers(target, index, boxes){
                let activeIndex = Array.from(boxes).findIndex(box => box.classList.contains('active')), _this = this;
                if(activeIndex !== index && this.active){
                    Velocity(
                        boxes[activeIndex],
                        this.positions[activeIndex],
                        {
                            duration: 420,
                            easing: 'easeOutQuart',
                            queue: false,
                            complete: function(){
                                setTimeout(function(){
                                    _this.projects[activeIndex].classy = [];
                                }, 420);
                            }
                        }
                    );
                    _this.projects[activeIndex].active = false;
                    this.active = !this.active;
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
            resize(target, index, size, boxes = ''){
                this.playing = true;
                let values, style, _this = this, easing;
                if(size === 'small'){
                    style = this.positions[index];
                    values = {
                        left: [this.positions[index].left, target.$el.style.left],
                        top: [this.positions[index].top, target.$el.style.top],
                        width: [this.positions[index].width, target.$el.style.width],
                        height: [this.positions[index].height, target.$el.style.height]
                    };
                    easing = 'easeOutQuart';
                } else {
                    style = this.positions[index];
                    values = {
                        left: [this.$data.big.left, target.$el.style.left],
                        top: [this.$data.big.top, target.$el.style.top],
                        width: [this.$data.big.width, target.$el.style.width],
                        height: [this.$data.big.height, target.$el.style.height]
                    };
                    easing = 'easeOutQuart';
                }
                Velocity(
                    target.$el,
                    values,
                    {
                        duration: 420,
                        easing: easing,
                        queue: false,
                        complete: function(){
                            _this.playing = false;
                            target.project.style = style;
                        }
                    }
                );
            },
            transform(index, boxes){
                for(let x = 0; x < boxes.length; ++x){
                    let forcefeed = boxes[x].style.transform, tx = 0, ty = 0, easing = 'easeOutQuart';
                    if (Math.floor(index / this.rowSize) > 0 && this.active && x !== index) {
                        ty = -1;
                    } else if (this.active && x !== index) {
                        ty = 1;
                    } else if(x !== index){
                        easing = 'easeOutQuart';
                        ty = 0;
                    }
                    if(Math.floor(index / this.rowSize) === Math.floor(x / this.rowSize) && x !== index && this.active){
                        ty = 0;
                        if(Math.floor(index % this.rowSize) === 1){
                            (x > index) ? tx = 1 : tx = -1;
                        } else {
                            (x > index) ? tx = 2 : tx = -2;
                        }
                    }

                    (forcefeed === '') ? forcefeed = 'translateX(0%) translateY(0%)' : '';

                    Velocity(
                        boxes[x],
                        {
                            translateX: [tx * 100 + '%', forcefeed.split(' ')[0].split('(')[1].split(')')[0]],
                            translateY: [ty * 100 + '%', forcefeed.split(' ')[1].split('(')[1].split(')')[0]]
                        },
                        {duration: 420, easing: easing}
                    )
                }
            }
        },
        mounted(){
            this.setBoxValues();

            let _this = this, doit;
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
            };

            function resizedw(){
                _this.setBoxValues();
            }

            window.onresize = function(){
                clearTimeout(doit);
                doit = setTimeout(resizedw, 100);
            };
        }
    }
</script>