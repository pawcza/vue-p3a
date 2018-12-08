<template>
    <section>
        <div class="container">
            <h2>My Recent Projects</h2>
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
    import rh_thumb from '../assets/img/rh_thumb.png'
    import ak_thumb from '../assets/img/ak_thumb.png'
    import rem_thumb from '../assets/img/rem_thumb.png'
    import cg_thumb from '../assets/img/cg_thumb.png'
    import cm_thumb from '../assets/img/cm_thumb.png'
    import zb_thumb from '../assets/img/zb_thumb.png'
    import rh_logo from '../assets/img/rh_logo.png'
    import ak_logo from '../assets/img/ak_logo.png'
    import rem_logo from '../assets/img/rem_logo.png'
    import cg_logo from '../assets/img/cg_logo.png'
    import cm_logo from '../assets/img/cm_logo.png'
    import zb_logo from '../assets/img/zb_logo.png'
    export default{
        components: {
            ProjectComponent
        },
        data: function() {
            return {
                initial: false,
                projects: [
                    {
                        style: {}, classy:[], active: false, width: null, index: 'first', background: 'url(' + rh_thumb + ')', logo: rh_logo,
                        content: {
                            name: 'Russell Hobbs',
                            date: '2018',
                            tech: 'Laravel 5.2, Vue.js, jQuery, VanillaJS, PHP 7, Sass, isotope.js',
                            desc: "Household appliances manufacturer website with e-commerce, multi language support and a in-house built CMS. I've worked closely with the back-end team to ensure delivery of a high quality product",
                            btn: "<a target='_blank' href='https://uk.russellhobbs.com'>See it online</a>"
                        }
                    },
                    {
                        style: {}, classy:[], active: false, width: null, background: 'url(' + ak_thumb + ')', logo: ak_logo,
                        content: {
                            name: 'Aleksandra Koleśniak',
                            date: '2018',
                            tech: 'VanillaJS, Sass, isotope.js',
                            desc: 'Minimalistic graphics design portfolio to display arts in a grid with images being lazy-loaded',
                            btn: "<a target='_blank' href='http://aleksandrakolesniak.com'>See it online</a>"
                        }
                    },
                    {
                        style: {}, classy:[], active: false, width: null, background: 'url(' + rem_thumb + ')', logo: rem_logo,
                        content: {
                            name: 'Remington',
                            date: '2017-2018',
                            tech: 'jQuery, Sass',
                            desc: "Personal care products manufacturer. I've worked with the web development team at Spectrum Brands on their Remington website",
                            btn: "<a target='_blank' href='https://uk.remington-europe.com'>See it online</a>"
                        }
                    },
                    {
                        style: {}, classy:[], active: false, width: null, background: 'url(' + zb_thumb + ')', logo: zb_logo,
                        content: {
                            name: 'Zoo Bedding',
                            date: '2017',
                            tech: 'Bootstrap 4, jQuery, Sass, velocity.js, Adobe Photoshop & Illustrator',
                            desc: "Organic wildlife bedding manufacturer, I've worked on the website as well as all the marketing materials, graphics and logos",
                            btn: "<a target='_blank' href='http://zoobedding.com'>See it online</a>"
                        }
                    },
                    {
                        style: {}, classy:[], active: false, width: null, background: 'url(' + cm_thumb + ')', logo: cm_logo,
                        content: {
                            name: 'Cantaramusic',
                            date: '2017',
                            tech: 'Bootstrap 4, PHP, jQuery',
                            desc: "Music news portal. I was revamping current website to be responsive and match today's web standards",
                            btn: "<a target='_blank' href='https://cantaramusic.pl'>See it online</a>"
                        }
                    },
                    {
                        style: {}, classy:[], active: false, width: null, index: 'last', background: 'url(' + cg_thumb + ')', logo: cg_logo,
                        content: {
                            name: 'Cocogreen',
                            date: '2016-2017',
                            tech: 'jQuery, velocity.js, CSS3, Adobe Photoshop & Illustrator',
                            desc: 'Leading brand of speciality coir substrates for edible crops. I was working on their website and all the marketing graphics needed for the brand',
                            btn: "<a target='_blank' href='http://cocogreen.co.uk'>See it online</a>"
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
            enterAnim(){
                Velocity(
                    this.$el.children,
                    'transition.slideDownIn',
                    {stagger: 100, display: 'flex'}
                )
            },
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
            leftovers(target, index, boxes = this.$el.children){
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