<template>
    <div class='project-container' :style="project.style" :class='project.classy'>
        <div class='project-box' @click='resizeProject()'>
            <div class='project-hover'>
                <h5>{{ project.name }}</h5>
                <div class="btn">
                    <p>collapse</p>
                    <transition name='fade'>
                        <p key='1' v-if='project.active'>Collapse</p>
                        <p key='2' v-else>Expand</p>
                    </transition>
                </div>
            </div>
            <transition-group name="staggered-fade" tag="ul" class="project-content" :style="project.width" @before-enter="beforeEnter" @enter="enter" @leave="leave">
                <li v-for="(content, index) in project.content" :key="index" v-html="content" v-if="project.active" :class="index" :data-index="Object.keys(project.content).indexOf(index)">
                    {{content}}
                </li>
            </transition-group>
            <div class="project-controls">
                <span @click="prevProject($event)"> Previous</span>
                <span @click="nextProject($event)">Next </span>
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
            resizeProject(){
                let boxes = this.$el.parentNode.children,
                    targetIndex = Array.prototype.indexOf.call(boxes, this.$el);
                if(this.$el.classList.contains('active')){
                    this.$parent.resize(this, targetIndex, 'small');
                } else {
                    this.$parent.resize(this, targetIndex, 'big');
                    this.$parent.leftovers(this, targetIndex);
                }
                this.$parent.toggleActive(this);
                this.$parent.transform(targetIndex, boxes);
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
                        { transform: ['translateX(0)', 'translateX(-100%)']},
                        { duration: 340, easing: 'easeOutQuad'}
                    );
                }
                setTimeout(function () {
                    Velocity(
                        el,
                        { opacity: [1,0], transform: ['translateX(0)', 'translateX(-50px)']},
                        { duration: 200, easing: 'easeOutQuad', complete: done, delay: 240}
                    )
                }, delay)
            },
            leave: function (el, done) {
                if(el.dataset.index === '0'){
                    Velocity(
                        el.parentNode,
                        { transform: ['translateX(-100%)', 'translateX(-0%)']},
                        { duration: 340, easing: 'easeInQuad'}
                    );
                }

            }
        }
    }
</script>