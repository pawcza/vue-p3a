<template>
    <div class='project-container' :style="project.style" :class='project.classy'>
        <div class='project-box' @click='resizeProject($event)'>
            <div class='project-hover'>
                <h5>{{ project.name }}</h5>
                <div class="btn">
                    <p>collapse</p>
                    <transition name='fade'>
                        <p key='1' v-if='project.active'>collapse</p>
                        <p key='2' v-else> expand </p>
                    </transition>
                </div>
            </div>
            <div class="project-content">
                <div class="swiper-container">
                    <div class="swiper-wrapper">
                        <div class="swiper-slide">Slide 1</div>
                        <div class="swiper-slide">Slide 2</div>
                        <div class="swiper-slide">Slide 3</div>
                    </div>
                    <div class="swiper-pagination"></div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data: function() {
            return {
            }
        },
        props: ['project'],
        methods: {
            resizeProject: function(){
                let boxes = this.$el.parentNode.children,
                    targetIndex = Array.prototype.indexOf.call(boxes, this.$el);
                if(this.$el.classList.contains('active')){
                    this.$parent.resize(this, targetIndex, 'small');
                } else {
                    this.$parent.resize(this, targetIndex, 'big');
                    this.$parent.leftovers(this, targetIndex);
                }
                this.$parent.toggleActive(this);
                this.$parent.transform(targetIndex);
            }
        }
    }
</script>