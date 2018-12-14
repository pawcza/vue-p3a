<template>
    <section style="background: #fbfbfb; z-index: 2;">
        <div class="container">
            <h2 v-scroll-reveal="{ delay: 150, beforeReveal: playText }" class="title-wrapper" ref="title">
                <span v-for="letter in text" :data-letter="letter"
                     :class="{break : letter === ' '}">{{letter}}
                </span>
            </h2>
            <div v-scroll-reveal="{ delay: 250, afterReveal: setBoxValues}" class="project-wrapper">
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
    export default{
        components: {
            ProjectComponent
        },
        data: function() {
            return {
                text: 'My recent projects',
                projects: [
                    {
                        style: {}, classy:[], active: false, width: null, index: 'first',
                        img: {
                            src: require('../assets/img/rh_thumb.png'), loading: require('../assets/img/rh_small.jpg'), logo: require('../assets/img/rh_logo.png')
                        },
                        content: {
                            name: 'Russell Hobbs',
                            desc: "Household appliances manufacturer website with e-commerce, multi language support and a in-house built CMS. I've worked closely with the back-end team to ensure delivery of a high quality product",
                            tech: ['Laravel 5.2', 'Vue.js', 'jQuery', 'VanillaJS', 'PHP 7', 'Sass', 'isotope.js'],
                            btn: "<a class='project-link' target='_blank' href='https://uk.russellhobbs.com'>uk.russellhobbs.com</a>"
                        }
                    },
                    {
                        style: {}, classy:[], active: false, width: null,
                        img: {
                            src: require('../assets/img/ak_thumb.png'), loading: require('../assets/img/ak_small.jpg'), logo: require('../assets/img/ak_logo.png')
                        },
                        content: {
                            name: 'Aleksandra Koleśniak',
                            desc: 'Minimalistic graphics design portfolio to display arts in a grid with images being lazy-loaded',
                            tech: ['VanillaJS', 'Sass', 'isotope.js'],
                            btn: "<a class='project-link' target='_blank' href='http://aleksandrakolesniak.com'>aleksandrakolesniak.com</a>"
                        }
                    },
                    {
                        style: {}, classy:[], active: false, width: null,
                        img: {
                            src: require('../assets/img/rem_thumb.png'), loading: require('../assets/img/rem_small.jpg'), logo: require('../assets/img/rem_logo.png')
                        },
                        content: {
                            name: 'Remington',
                            desc: "Personal care products manufacturer. I've worked with the web development team at Spectrum Brands on their Remington website",
                            tech: ['jQuery', 'Sass'],
                            btn: "<a class='project-link' target='_blank' href='https://uk.remington-europe.com'>uk.remington-europe.com</a>"
                        }
                    },
                    {
                        style: {}, classy:[], active: false, width: null,
                        img: {
                            src: require('../assets/img/zb_thumb.png'), loading: require('../assets/img/zb_small.jpg'), logo: require('../assets/img/zb_logo.png')
                        },
                        content: {
                            name: 'Zoo Bedding',
                            desc: "Organic wildlife bedding manufacturer, I've worked on the website as well as all the marketing materials, graphics and logos",
                            tech: ['Bootstrap 4', 'jQuery', 'Sass', 'velocity.js', 'Adobe Photoshop & Illustrator'],
                            btn: "<a class='project-link' target='_blank' href='http://zoobedding.com'>zoobedding.com</a>"
                        }
                    },
                    {
                        style: {}, classy:[], active: false, width: null,
                        img: {
                            src: require('../assets/img/cm_thumb.png'), loading: require('../assets/img/cm_small.jpg'), logo: require('../assets/img/cm_logo.png')
                        },
                        content: {
                            name: 'Cantaramusic',
                            desc: "Music news portal. I was revamping current website to be responsive and match today's web standards",
                            tech: ['Bootstrap 4', 'PHP', 'jQuery'],
                            btn: "<a class='project-link' target='_blank' href='https://cantaramusic.pl'>cantaramusic.pl</a>"
                        }
                    },
                    {
                        style: {}, classy:[], active: false, width: null, index: 'last',
                        img: {
                            src: require('../assets/img/cg_thumb.png'), loading: require('../assets/img/cg_small.jpg'), logo: require('../assets/img/cg_logo.png')
                        },
                        content: {
                            name: 'Cocogreen',
                            desc: 'Leading brand of speciality coir substrates for edible crops. I was working on their website and all the marketing graphics needed for the brand',
                            tech: ['jQuery', 'velocity.js', 'CSS3', 'Adobe Photoshop & Illustrator'],
                            btn: "<a class='project-link' target='_blank' href='http://cocogreen.co.uk'>cocogreen.co.uk</a>"
                        }
                    }
                ],
                positions: [],
                small: null,
                big: null,
                active: false,
                rowSize: (window.innerWidth < 768) ? 2 : 3,
                playing: false,
                delay: (window.innerWidth < 768) ? 0 : 420
            }
        },
        template: "#project-template",
        methods: {
            playText () {
                let that = this,
                    matched = 0,
                    letterInterval = setInterval(function () {
                        for (let x = 0; x < that.text.length; ++x) {
                            let random = Math.floor(Math.random() * that.chars.length),
                                target = that.$refs.title.children[x];

                            if (target.innerHTML === that.text[x]) {
                                if (!target.classList.contains('matched')) {
                                    matched++;
                                    target.classList.add('matched');
                                }
                            } else {
                                target.innerHTML = that.chars.substring(random, random + 1)
                            }
                        }
                        (matched === that.text.length) ? clearInterval(letterInterval) : '';
                    }, 50)
            },
            getResizeValues(){
                this.$data.small = this.$children[0].$el.getBoundingClientRect();
                this.$data.big = {
                    width: this.$el.querySelectorAll('.project-wrapper')[0].offsetWidth + 'px',
                    height: this.$el.querySelectorAll('.project-wrapper')[0].offsetHeight + 2 + 'px',
                    left: 0,
                    top: 0,
                    position: 'absolute'
                };
            },
            setBoxValues(){
                this.positions = [];
                for (let x = 0; x<this.$children.length; ++x){
                    this.projects[x].style = {
                        top: this.$children[x].$el.offsetTop + 'px',
                        left: this.$children[x].$el.offsetLeft + 'px',
                        width: this.$children[x].$el.offsetWidth + 'px',
                        height: this.$children[x].$el.offsetHeight + 'px',
                        position: 'absolute',
                        pointerEvents: 'all'
                    };
                    this.positions.push(this.projects[x].style);
                    this.projects[x].width = this.positions[x].width;
                }
            },
            leftovers(target, index, boxes = this.$el.children){
                let activeIndex = Array.from(boxes).findIndex(box => box.classList.contains('active'));
                if(activeIndex !== index && this.active){
                    this.projects[activeIndex].classy = [];
                    Velocity(
                        boxes[activeIndex],
                        this.positions[activeIndex],
                        {
                            duration: this.delay,
                            easing: 'easeOutQuart',
                            queue: false
                        }
                    );
                    this.projects[activeIndex].active = false;
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
                    }, this.delay);
                } else {
                    this.active = target.project;
                    target.project.active = true;
                    target.project.classy.push('active');
                }
            },
            resize(target, index, size){
                this.playing = true;
                let values, style, _this = this;
                if(size === 'small'){
                    style = this.positions[index];
                    values = {
                        left: [this.positions[index].left, target.$el.style.left],
                        top: [this.positions[index].top, target.$el.style.top],
                        width: [this.positions[index].width, target.$el.style.width],
                        height: [this.positions[index].height, target.$el.style.height],
                        translateZ: '0'
                    };
                } else {
                    style = this.positions[index];
                    values = {
                        left: [this.$data.big.left, target.$el.style.left],
                        top: [this.$data.big.top, target.$el.style.top],
                        width: [this.$data.big.width, target.$el.style.width],
                        height: [this.$data.big.height, target.$el.style.height],
                        translateZ: '0'
                    };
                }
                Velocity(
                    target.$el,
                    values,
                    {
                        duration: this.delay,
                        easing: 'easeOutQuart',
                        queue: false,
                        complete: function(){
                            _this.playing = false;
                        }
                    }
                );
            },
            transform(index, boxes){
                if(window.innerWidth > 768) {
                    for (let x = 0; x < boxes.length; ++x) {
                        let forcefeed = boxes[x].style.transform, tx = 0, ty = 0, easing = 'easeOutQuart';
                        if (Math.floor(index / this.rowSize) > 0 && this.active && x !== index) {
                            ty = -1;
                        } else if (this.active && x !== index) {
                            ty = 1;
                        } else if (x !== index) {
                            easing = 'easeOutQuart';
                            ty = 0;
                        }
                        if (Math.floor(index / this.rowSize) === Math.floor(x / this.rowSize) && x !== index && this.active) {
                            ty = 0;
                            if (Math.floor(index % this.rowSize) === 1) {
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
                            {duration: this.delay, easing: easing, queue: false}
                        )
                    }
                }
            }
        },
        created () {
            this.chars = this.text + '#!£$&2345678<>/<>/<>/';
        },
        mounted(){
            this.getResizeValues();
            for (let i = 0; i < this.text.length; ++i) {
                this.$refs.title.children[i].style.width = this.$refs.title.children[i].offsetWidth + 'px'
            }
        }
    }
</script>
<style scoped lang="scss">
    @import '../scss/plugins/include-media';
    #projects{
        .container{
            display: flex;
            flex-direction: column;
            top: 10vh;
            position: relative;
            max-height: 80vh;
            justify-content: space-around;
            .project-wrapper {
                position: relative;
                height: 100%;
                width: 100%;
                display: flex;
                flex-wrap: wrap;
                justify-content: space-around;
            }
            @include media('<phone'){
                max-height: 90vh;
                .project-wrapper{
                    max-height: inherit;
                    padding: 10px;
                    box-sizing: border-box;
                }
            }
        }
    }
</style>