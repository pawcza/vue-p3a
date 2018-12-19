<template>
    <div class='project-container'
         :style="project.style"
         :class='project.classy'
         v-touch:swipe.left="nextProject"
         v-touch:swipe.right="prevProject">
        <div class='project-box' v-touch="resizeProject" v-lazy:background-image="project.img">
            <img class="project-logo" :src="project.img.logo" alt="">
            <div class='project-hover' :style="{}">
                <div class="full-screen-btn">
                    <span></span><span></span><span></span><span></span>
                </div>
            </div>
            <transition-group name="staggered-fade" tag="ul" class="project-content" :style="{width: project.width}" @click.stop.prevent="" @before-enter="beforeEnter" @enter="enter" @leave="leave" v-touch.stop.prevent="">
                <li v-for="(content, index) in project.content" :key="'key_' + index" v-if="project.active" :class="index" :data-index="Object.keys(project.content).indexOf(index)">
                    <span v-if="index !== 'tech'" v-html="content"></span>
                    <span v-else v-for="elem in content">{{elem}}</span>
                </li>
            </transition-group>
            <div class="project-controls">
                <span class="prev" v-if="project.index !== 'first'" v-touch.stop="prevProject"> Previous</span>
                <span class="next" v-if="project.index !== 'last'" v-touch.stop="nextProject">Next </span>
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
      resizeProject(){
        if(!this.$parent.playing){
            console.log('hmmm');
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
      prevProject(){
        if(this.$el.previousElementSibling !== null){
          this.$el.previousElementSibling.__vue__.resizeProject()
        }
      },
      nextProject(){
        if(this.$el.nextElementSibling !== null){
          this.$el.nextElementSibling.__vue__.resizeProject()
        }
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
      leave: function (el) {
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
<style scoped lang="scss">
    @import '../scss/plugins/include-media';
    .project-container{
        padding: 10px;
        flex-basis: 33.3%;
        opacity: 1;
        left: 0;
        top: 0;
        pointer-events: none;
        box-sizing:border-box;
        transform: translateX(0) translateY(0);
        will-change: transform, opacity, width, height;
        .project-box{
            overflow: hidden;
            cursor: pointer;
            position: absolute;
            border-radius: 5px;
            width: calc(100% - 20px);
            outline: 1px solid #ebebeb;
            background-size: cover;
            background-position: center;
            height: calc(100% - 20px);
            will-change: box-shadow;
            transition: box-shadow .3s ease-out;
            .project-logo{
                position: absolute;
                max-height: 200px;
                left: 50%;
                top: 50%;
                fill: white;
                transform: translate(-50%, -50%);
            }
            .project-hover{
                position: absolute;
                width: 100%;
                z-index: 3;
                height: 100%;
                box-sizing: border-box;
                opacity: 0;
                display: flex;
                pointer-events: none;
                flex-direction: column;
                justify-content: space-between;
                align-items: flex-start;
                transition: 250ms ease-out;
                h5{
                    box-sizing: border-box;
                    font-weight: 700;
                    color: white;
                    padding: 25px;
                    transition: .2s ease-out;
                    font-size: 1.75em;
                    margin: 0;
                    text-align:left;
                    width: 100%;
                }
                .full-screen-btn{
                    position: absolute;
                    right: 25px;
                    top: 16px;
                    width: 36px;
                    height: 32px;
                    transition: .2s ease-out;
                    flex-wrap: wrap;
                    padding: 6px;
                    display: flex;
                    justify-content: space-between;
                    align-items: stretch;
                    &:hover{
                        transform: scale(1.2);
                    }
                    span{
                        height: 8px;
                        width: 8px;
                        box-sizing: border-box;
                        transition: .2s ease-out;
                        border: 2px solid #373737;
                        margin: 5px;
                        position: relative;
                        &:first-of-type{
                            border-width: 2px 0 0 2px;
                        }
                        &:nth-of-type(2){
                            border-width: 2px 2px 0 0;
                        }
                        &:nth-of-type(3){
                            border-width: 0 0 2px 2px;
                        }
                        &:last-of-type{
                            border-width: 0 2px 2px 0;
                        }
                    }
                }
            }
            .project-content{
                padding: 25px 75px 25px 25px;
                box-sizing: border-box;
                position: relative;
                height: calc(100% + 2px);
                top: -1px;
                opacity: 0;
                will-change: transform, opacity;
                transform: translateX(-100%);
                z-index: 2;
                background: white;
                /*background: linear-gradient(100deg, #ffffff, rgba(255,255,255,.5), transparent);*/
                -webkit-clip-path: polygon(0% 0%, 100% 0, 75% 100%, 0% 100%);
                clip-path: polygon(0% 0%, 100% 0, 75% 100%, 0% 100%);
                >*{
                    margin: .75em 0;
                    display: flex;
                    flex-direction: column;
                }
                li{
                    &:first-of-type{
                        font-weight: 700;
                        font-size: 1.75em;
                        margin: 0;
                    }
                }
                .tech, .desc, .btn{
                    font-size: .85em;
                    line-height: 1.66em;
                    &:before{
                        opacity: .65;
                        margin-right: 100%;
                        font-weight: 700;
                        padding-left: 20px;
                        content: 'Technologies: ';
                        background-size: 16px;
                        background-position: left center;
                        background-repeat: no-repeat;
                        margin-bottom: 10px;
                    }
                    &:first-of-type{
                        margin-top: 0;
                    }
                }
                .tech{
                    display: flex;
                    flex-wrap: wrap;
                    flex-direction: row;
                    span{
                        box-sizing: border-box;
                        margin: 3px 3px 0 0;
                        padding: 3px 10px;
                        border-radius: 5px;
                        transform: skewX(-15deg);
                        color: white;
                        background: #373737;
                        border: 1px solid #1f1f1f;
                    }
                    &:before{
                        background-image: url('../assets/img/tech_icon.svg');
                        content: 'Technologies: ';
                    }
                }
                .desc{
                    &:before{
                        background-image: url('../assets/img/about_icon.svg');
                        content: 'About: ';
                    }
                }
                .btn{
                    &:before{
                        background-image: url('../assets/img/link_icon.svg');
                        content: 'See it online: ';
                    }
                    display: inline-block;
                    span{
                        /deep/ .project-link{
                            transition: .2s ease-out;
                            color: #373737;
                            text-decoration: none;
                            border-bottom: 1px dashed #373737;
                        }
                        &:hover{
                            /deep/ .project-link{
                                border-bottom: 1px solid #373737;
                            }
                        }
                    }

                }
            }
            .project-controls{
                position: absolute;
                z-index: 15;
                box-sizing: border-box;
                bottom: 18px;
                width:100%;
                display: flex;
                justify-content: space-between;
                padding: 15px 30px;
                transition: .2s ease-out;
                opacity: 0;
                pointer-events: none;
                right: 0;
                span{
                    font-size: .85em;
                    letter-spacing: .1em;
                    transform: skewX(-10deg);
                    color: #373737;
                    &:before, &:after{
                        padding: 7px;
                        border: 1px solid #373737;
                        border-radius: 5px;
                        width: 32px;
                        display: inline-block;
                        box-sizing: border-box;
                        height: 32px;
                        text-align: center;
                        line-height: 16px;
                        background: #373737;
                        color: white;
                    }
                    &:before{
                        content: '\2190';
                    }
                    &.next{
                        color: white;
                        &:before{
                            display: none;
                        }
                        &:after{
                            content: '\2192';
                            border-color: white;
                            background: white;
                            color: #373737;
                        }
                    }
                }
            }
            &:hover{
                .project-hover{
                    opacity: 1;
                }
            }
        }
        &:hover{
            .project-box{
                /*box-shadow: 0 1px 6px 0 rgba(32,33,36,0.28);*/
            }
        }
        &.active{
            width: 100%;
            height: 100%;
            opacity: 1;
            z-index: 9;
            max-width: 100%;
            .project-hover{
                opacity: 1;
                pointer-events: none;
                h5,p{
                    color: #373737;
                }
                .full-screen-btn{
                    pointer-events: all;
                    span{
                        transform: rotate(180deg);
                    }
                    &:hover{
                        transform: scale(.8);
                    }
                }
            }
            .project-content{
                opacity: 1;
            }
            .project-controls{
                opacity: 1;
                pointer-events: all;
            }
            .btn{
                p{
                    transform: translate(20px, -50%) !important;
                    &:before, &:after{
                        content: '\2190' !important;
                        right: -20px!important;
                        position: absolute!important;
                    }
                    &:before{
                        transform: translateX(0px) !important;
                        opacity: 1!important;
                        right: initial!important;
                        left: -20px!important;
                    }
                    &:after{
                        transform: translateX(10px) !important;
                        opacity: 0!important;
                    }
                }
                &:hover{
                    p{
                        transform: translate(0, -50%)!important;
                        &:after{
                            transform: translateX(0)!important;
                            opacity: 1!important;
                        }
                        &:before{
                            transform: translateX(-10px)!important;
                            opacity: 0!important;
                        }
                    }
                }
            }
        }
        &:first-of-type{
            .project-controls{
                justify-content: flex-end;
            }
        }
        @include media('<tablet'){
            flex-basis: 50%;
            padding: 5px;
            .project-box{
                box-shadow: none!important;
                border-radius: 5px;
                height: calc(100% - 10px);
                width: calc(100% - 10px);
                outline: none;
                .project-hover{
                    .full-screen-btn{
                        right: 7px !important;
                        top: 15px !important;
                        width: 24px!important;
                        height: 24px!important;
                        span{
                            border-color: #373737!important;
                            height: 6px !important;
                            width: 6px !important;
                            margin: 3px !important;
                        }
                        z-index: 999;
                    }
                }
                .project-logo{
                    max-height: 75px;
                }
                .project-content{
                    padding: 20px 15px;
                    border-radius: 0;
                    width: 100% !important;
                    background: rgba(255,255,255,.75);
                    -webkit-clip-path: none;
                    clip-path: none;
                    /deep/ .project-link{
                        display: inline-block;
                        padding: 10px 0;
                    }
                    .tech{
                        span{
                            transform: none;
                        }
                    }
                    li:not(.name){
                        font-size: 1em!important;
                    }
                }
                .project-controls{
                    padding: 15px !important;
                    span{
                        transform: none!important;
                    }
                    .next{
                        color: #373737!important;
                        &:after{
                            border-color: #373737!important;
                            background: transparent!important;
                        }
                    }
                }
            }
        }
    }
</style>