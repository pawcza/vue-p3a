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
            <transition-group name="fadeUp" tag="ul" class="project-content">
                <li v-for="(content, index) in project.content" :key="index" v-if="project.active" :class="index">
                    {{content}}
                </li>
            </transition-group>
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
                this.$parent.transform(targetIndex);
            }
        }
    }
</script>