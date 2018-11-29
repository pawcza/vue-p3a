<template>
    <div class='project-container' :style="project.style" :class='project.classy'>
        <div class='project-box' @click='resizeProject()'>
            <div class='project-hover'>
                <h5>{{ project.name }}</h5>
                <div class="full-screen-btn">
                    <span></span><span></span><span></span><span></span>
                </div>
            </div>
            <transition-group name="staggered-fade" tag="ul" class="project-content" :style="project.width" @click.prevent="" @before-enter="beforeEnter" @enter="enter" @leave="leave">
                <li v-for="(content, index) in project.content" :key="index" v-html="content" v-if="project.active" :class="index" :data-index="Object.keys(project.content).indexOf(index)">
                    {{content}}
                </li>
            </transition-group>
            <div class="project-controls">
                <span class="prev" v-if="project.index !== 'first'" @click="prevProject($event)"> Previous</span>
                <span class="next" v-if="project.index !== 'last'" @click="nextProject($event)">Next </span>
            </div>
        </div>
    </div>
</template>
<script>
    import Velocity from 'velocity-animate'
    import 'velocity-animate/velocity.ui.min.js'
    export default {
        data: function() {
            return {
            }
        },
        props: ['project'],
        methods: {
            preventClicks(e){
              console.log(e, this);
              e.stopPropagation();
            },
            resizeProject(){
                if(!this.$parent.playing){
                    let boxes = this.$el.parentNode.children,
                        targetIndex = Array.prototype.indexOf.call(boxes, this.$el);
                    this.$parent.leftovers(this, targetIndex, boxes);
                    if(this.$parent.active){
                        this.$parent.resize(this, targetIndex, 'small');
                    } else {
                        this.$parent.resize(this, targetIndex, 'big', boxes);
                    }
                    this.$parent.toggleActive(this);
                    this.$parent.transform(targetIndex, boxes);
                }
            },
            prevProject(e){
                e.stopPropagation();
                this.$el.previousElementSibling.__vue__.resizeProject()
            },
            nextProject(e){
                e.stopPropagation();
                this.$el.nextElementSibling.__vue__.resizeProject()
            },
            beforeEnter: function (el) {
                el.style.opacity = 0;
            },
            enter: function (el, done) {
                let delay = el.dataset.index * 150;
                if(el.dataset.index === '0'){
                    Velocity(
                        el.parentNode,
                        { translateX: [0, '-100%']},
                        { duration: 350, easing: 'easeOutQuad', delay: 400}
                    );
                }
                setTimeout(function () {
                    Velocity(
                        el,
                        { opacity: [1,0], translateX: [0, '-50px']},
                        { duration: 200, easing: 'easeOutQuad', complete: done, delay: 400}
                    )
                }, delay)
            },
            leave: function (el, done) {
                console.log('cos sie dzieje');
                if(el.dataset.index === '0'){
                    Velocity(
                        el.parentNode,
                        { translateX: ['-100%', 0]},
                        { duration: 200, easing: 'easeOutQuad'}
                    );
                }

            }
        }
    }
</script>