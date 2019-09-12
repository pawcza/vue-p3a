<template>
    <section style="z-index: 2;">
        <div class="container">
            <h2 v-scroll-reveal="{ delay: 150, beforeReveal: playText }" class="title-wrapper" ref="title">
                <span v-for="letter in text" :data-letter="letter"
                     :class="{break : letter === ' '}">{{letter}}
                </span>
            </h2>
            <div v-scroll-reveal="{ delay: 250, afterReveal: setBoxValues}" class="project-wrapper">
                <project
                        v-for="(project, index) in projects"
                        :key="index"
                        :project="project">
                </project>
            </div>
        </div>
    </section>
</template>
<script>
    import Project from '../layout/Project.vue'
    export default{
        components: {
            Project
        },
        data: function () {
            return {
                text: 'Recent Projects',
                runningTime: 0,
                projects: [
                    {
                        style: {}, classy:[], active: false, width: null, index: 'first',
                        img: {
                            src: require('../../assets/img/rh_thumb.png'), loading: require('../../assets/img/rh_small.jpg'), logo: require('../../assets/img/rh_logo.png')
                        },
                        content: {
                            name: 'Russell Hobbs',
                            desc: "International household appliances manufacturer website with e-commerce solution. I've worked closely with the back-end team to ensure good understanding between front-end and back-end needs.",
                            tech: ['Laravel 5.2', 'Vue.js', 'jQuery', 'VanillaJS', 'SCSS', 'isotope.js'],
                            btn: "<a class='project-link' rel='noopener' target='_blank' href='https://uk.russellhobbs.com'>uk.russellhobbs.com</a>"
                        }
                    },
                    {
                        style: {}, classy:[], active: false, width: null,
                        img: {
                            src: require('../../assets/img/pt_thumb.png'), loading: require('../../assets/img/pt_small.png'), logo: require('../../assets/img/pt_logo.png')
                        },
                        content: {
                            name: 'PT41 Fitness',
                            desc: "High-end personal fitness provider. Build from scratch website. I was working closely with the graphics team to achieve the best looking results.",
                            tech: ['SCSS', 'Vue.js'],
                            btn: "<a class='project-link' rel='noopener' target='_blank' href='https://pt41fitness.co.uk'>pt41fitness.co.uk</a>"
                        }
                    },
                    {
                        style: {}, classy:[], active: false, width: null,
                        img: {
                            src: require('../../assets/img/rem_thumb.png'), loading: require('../../assets/img/rem_small.jpg'), logo: require('../../assets/img/rem_logo.png')
                        },
                        content: {
                            name: 'Remington',
                            desc: "Personal care products manufacturer website. I was a part of a bigger development team in Spectrum Brands with this project.",
                            tech: ['jQuery', 'Sass', 'Laravel 5.2'],
                            btn: "<a class='project-link' rel='noopener' target='_blank' href='https://uk.remington-europe.com'>uk.remington-europe.com</a>"
                        }
                    },
                    {
                        style: {}, classy:[], active: false, width: null,
                        img: {
                            src: require('../../assets/img/zb_thumb.png'), loading: require('../../assets/img/zb_small.jpg'), logo: require('../../assets/img/zb_logo.png')
                        },
                        content: {
                            name: 'Zoo Bedding',
                            desc: "Organic wildlife bedding manufacturer, I've created the website as well as all the marketing materials, graphics and logos",
                            tech: ['Bootstrap 4', 'jQuery', 'Sass', 'velocity.js', 'Adobe Photoshop & Illustrator'],
                            btn: "<a class='project-link' rel='noopener' target='_blank' href='http://zoobedding.com'>zoobedding.com</a>"
                        }
                    },
                    // {
                    //     style: {}, classy:[], active: false, width: null,
                    //     img: {
                    //         src: require('../../assets/img/cm_thumb.png'), loading: require('../../assets/img/cm_small.jpg'), logo: require('../../assets/img/cm_logo.png')
                    //     },
                    //     content: {
                    //         name: 'Cantaramusic',
                    //         desc: "Music news portal. I was revamping their old website to use a grid system and be responsive.",
                    //         tech: ['Bootstrap 4', 'PHP', 'jQuery'],
                    //         btn: "<a class='project-link' rel='noopener' target='_blank' href='https://cantaramusic.pl'>cantaramusic.pl</a>"
                    //     }
                    // },
                    {
                        style: {}, classy:[], active: false, width: null,
                        img: {
                            src: require('../../assets/img/ak_thumb.png'), loading: require('../../assets/img/ak_small.jpg'), logo: require('../../assets/img/ak_logo.png')
                        },
                        content: {
                            name: 'Aleksandra Koleśniak',
                            desc: 'Minimalistic graphics design portfolio website to display arts in a grid. Lazy-loading images and page load speed was a priority in this project',
                            tech: ['VanillaJS', 'SCSS', 'isotope.js', 'Wordpress'],
                            btn: "<a class='project-link' rel='noopener' target='_blank' href='http://aleksandrakolesniak.com'>aleksandrakolesniak.com</a>"
                        }
                    },
                    {
                        style: {}, classy:[], active: false, width: null, index: 'last',
                        img: {
                            src: require('../../assets/img/cg_thumb.png'), loading: require('../../assets/img/cg_small.jpg'), logo: require('../../assets/img/cg_logo.png')
                        },
                        content: {
                            name: 'Cocogreen',
                            desc: 'Leading brand of speciality coir substrates for edible crops. I have created their website and all the marketing graphics needed for the brand',
                            tech: ['jQuery', 'velocity.js', 'CSS3', 'Adobe Photoshop & Illustrator'],
                            btn: "<a class='project-link' rel='noopener' target='_blank' href='http://cocogreen.co.uk'>cocogreen.co.uk</a>"
                        }
                    }
                ],
                positions: [],
                small: null,
                big: null,
                active: false,
                rowSize: window.innerWidth < 768 ? 2 : 3,
                playing: false,
                delay: 420,
                transRegex: /\.*translateX\((.*)%\)/i,
            }
        },
        created () {
        this.chars = this.text + '#!£$&2345678<>/<>/<>///#######';
        },
        mounted () {
        this.getResizeValues()
        let targetWidth = this.$refs.title.children[0].offsetWidth
        for (let i = 0; i < this.text.length; ++i) {
          this.$refs.title.children[i].style.width = `${targetWidth}px`
        }
        window.addEventListener('keydown', e => {
          let index = this.projects.indexOf(this.active)
          if (e.key === 'ArrowRight' && index < this.projects.length - 1) {
            this.$children[index + 1].resizeProject()
          }
          if (e.key === 'ArrowLeft' && index > 0) {
            this.$children[index - 1].resizeProject()
          }
        })
        window.onpopstate = () => {
          if (window.location.hash === '') {
            let id = this.projects.map((project, index) => project.active === true ? index : '').filter(project => project !== '')[0]
            this.$children[id] ? this.$children[id].resizeProject() : ''
          } else if (this.projects.map((project, index) => {
            return project.content.name.toLowerCase().split(' ').join('-') === window.location.hash
          })) {
            let id = this.projects.map((project, index) => {
              return `#${project.content.name.toLowerCase().split(' ').join('-')}` === window.location.hash ? index : ''
            }).filter(project => project !== '')[0]
            this.$children[id].resizeProject()
          }
        }
        },
        methods: {
            playText () {
                let matched = 0
                let letterInterval = setInterval(() => {
                        for (let x = 0; x < this.text.length; ++x) {
                            let random = Math.floor(Math.random() * this.chars.length)
                            let target = this.$refs.title.children[x]
                            if (target.innerHTML === this.text[x]) {
                                if (!target.classList.contains('matched')) {
                                    ++matched
                                    target.classList.add('matched')
                                }
                            } else if (this.runningTime > 2500) {
                                target.innerHTML = this.text[x]
                                ++matched
                            } else {
                                target.innerHTML = this.chars.substring(random, random + 1)
                            }
                        }
                        if (matched === this.text.length) clearInterval(letterInterval)
                        this.runningTime += 50
                    }, 50)
            },
            getResizeValues () {
                let bounding = this.$el.querySelectorAll('.project-wrapper')[0].getBoundingClientRect()
                this.$data.small = this.$children[0].$el.getBoundingClientRect()
                this.$data.big = {
                    width: window.innerWidth < 768 ? `${bounding.width - 70}px` : `${bounding.width + 2}px`,
                    height: window.innerWidth < 768 ? `${bounding.height - 70}px` : `${bounding.height + 2}px`,
                    left: window.innerWidth < 768 ? 35 : 0,
                    top: window.innerWidth < 768 ? 35 : 0,
                    position: 'absolute'
                }
            },
            setBoxValues () {
                this.positions = []
                for (let x = 0; x < this.$children.length; ++x) {
                    this.projects[x].style = {
                        top: this.$children[x].$el.offsetTop + 'px',
                        left: this.$children[x].$el.offsetLeft + 'px',
                        width: this.$children[x].$el.offsetWidth + 'px',
                        height: this.$children[x].$el.offsetHeight + 'px',
                        position: 'absolute',
                        pointerEvents: 'all'
                    }
                    this.positions.push(this.projects[x].style)
                    this.projects[x].width = this.positions[x].width
                }
            },
            leftovers (target, index, boxes = this.$el.children) {
                let activeIndex = Array.from(boxes).findIndex(box => box.classList.contains('active'));
                if (activeIndex !== index && this.active) {
                    this.projects[activeIndex].classy = []
                    Velocity(
                        boxes[activeIndex],
                        this.positions[activeIndex],
                        {
                            duration: this.delay,
                            easing: 'easeOutQuart',
                            queue: false
                        }
                    )
                    this.projects[activeIndex].active = false
                    this.active = !this.active
                }
            },
            toggleActive (target) {
                if (target.project.classy.indexOf('active') !== -1) {
                    target.project.active = false
                    this.active = false
                    target.project.classy = target.project.classy.filter(value => value !== 'active')
                    if (history.pushState) {
                      history.pushState(null, null, `#`)
                    } else {
                      location.hash = ``
                    }
                } else {
                    this.active = target.project
                    target.project.active = true
                    target.project.classy.push('active')
                    if (history.pushState) {
                    history.pushState(null, null, `#${target.project.content.name.toLowerCase().split(' ').join('-')}`)
                    } else {
                    location.hash = `#${target.project.content.name.toLowerCase().split(' ').join('-')}`
                    }
                }
            },
            resize (target, index, size) {
                this.playing = true
                let values
                if (size === 'small') {
                    values = {
                        left: target.$el.style.left,
                        top: target.$el.style.top,
                        width: target.$el.style.width,
                        height: target.$el.style.height
                    }
                    target.$el.style.width = this.positions[index].width
                    target.$el.style.height = this.positions[index].height
                    if (window.innerWidth < 768) {
                        Velocity(
                            target.$el,
                            {
                                left: [this.positions[index].left, target.$el.style.left],
                                top: [this.positions[index].top, target.$el.style.top]
                            },
                            { duration: this.delay, easing: 'easeOutQuart' }
                        )
                    } else {
                        target.$el.style.left = this.positions[index].left
                        target.$el.style.top = this.positions[index].top
                    }
                } else {
                    values = {
                        left: target.$el.style.left,
                        top: target.$el.style.top,
                        width: target.$el.style.width,
                        height: target.$el.style.height
                    }
                    target.$el.style.width = this.$data.big.width
                    target.$el.style.height = this.$data.big.height
                    if (window.innerWidth < 768) {
                    Velocity(
                        target.$el,
                        {
                            left: [this.$data.big.left, target.$el.style.left],
                            top: [this.$data.big.top, target.$el.style.top]
                        },
                        { duration: this.delay, easing: 'easeOutQuart' }
                    )
                    } else {
                        target.$el.style.left = this.$data.big.left
                        target.$el.style.top = this.$data.big.top
                    }
                }

                let targetX, targetY
                Object.keys(values).forEach(value => {
                    if (value === 'width') {
                       targetX = parseInt(values[value]) / parseInt(target.$el.style.width)
                    }
                    if (value === 'height') {
                        targetY = parseInt(values[value]) / parseInt(target.$el.style.height)
                    }
                })
                target.$el.style.transform = `scaleX(${targetX}) scaleY(${targetY})`
                let origin = {
                    x: 'center',
                    y: 'center'
                }

                if (window.innerWidth < 768) {
                    if (Math.floor(index / this.rowSize) === 0) {
                        index % this.rowSize === 0 ? origin.x = 'left' : origin.x = 'right'
                        origin.y = 'top'
                    } else if (Math.floor(index / this.rowSize === 1)) {
                        index % this.rowSize === 0 ? origin.x = 'left' : origin.x = 'right'
                        origin.y = 'center'
                    } else {
                        index % this.rowSize === 0 ? origin.x = 'left' : origin.x = 'right'
                        origin.y = 'bottom'
                    }
                } else {
                    if (index % this.rowSize === 0) {
                        Math.floor(index / this.rowSize) === 0 ? origin.y = 'top' : origin.y = 'bottom'
                        origin.x = 'left'
                    } else if (index % this.rowSize === 1) {
                        Math.floor(index / this.rowSize) === 0 ? origin.y = 'top' : origin.y = 'bottom'
                        origin.x = 'center'
                    } else {
                        Math.floor(index / this.rowSize) === 0 ? origin.y = 'top' : origin.y = 'bottom'
                        origin.x = 'right'
                    }
                }
                target.$el.style.transformOrigin = `${origin.x} ${origin.y}`
                this.$parent.goSection('projects')
                Velocity(
                    target.$el,
                    {
                        scaleX: [1, targetX],
                        scaleY: [1, targetY]
                    },
                    {
                        duration: this.delay,
                        easing: 'easeOutQuart',
                        queue: false,
                        complete: () => {
                            this.playing = false
                            target.$el.style.transform = 'translateX(0%) translateY(0%)'
                        }
                    }
                )
            },
            transform (index, boxes) {
                for (let x = 0; x < boxes.length; ++x) {
                    let tx = 0
                    let ty = 0
                    if (window.innerWidth < 768) {
                      // TODO: Handle sideways boxes transform on mobile
                    } else {
                      if (Math.floor(index / this.rowSize) > 0 && this.active && x !== index) {
                        ty = -1
                      } else if (this.active && x !== index) {
                        ty = 1
                      } else if (x !== index) {
                        ty = 0
                      }
                      if (Math.floor(index / this.rowSize) === Math.floor(x / this.rowSize) && x !== index && this.active) {
                        ty = 0
                        if (Math.floor(index % this.rowSize) === 1) {
                          (x > index) ? tx = 1 : tx = -1
                        } else {
                          (x > index) ? tx = 2 : tx = -2
                        }
                      }
                    }
                    Velocity(
                        boxes[x],
                        {
                            translateX: tx * 100 + '%',
                            translateY: ty * 100 + '%'
                        },
                        {
                            duration: this.delay,
                            easing: 'easeOutQuart',
                            queue: false
                        }
                    )
                }
            }
        }
    }
</script>
<style scoped lang="scss">
    @import '../../scss/plugins/include-media';
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
