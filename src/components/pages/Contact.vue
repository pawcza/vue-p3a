<template>
    <section>
        <div class="container">
            <h2 v-scroll-reveal="{ delay: 150, beforeReveal: playText }" class="title-wrapper" ref="title">
                <span v-for="letter in text" :data-letter="letter"
                      :class="{break : letter === ' '}">{{letter}}
                </span>
            </h2>
            <div class="contact-wrapper">
                <article class="contact-article">
                        <img class="contact-img" title='Me!' v-scroll-reveal="{ delay: 300, origin: 'left', distance: '50px' }" v-lazy="require('../../assets/img/me.png')">
                </article>
                <article class="contact-article"
                         v-for="block in info">
                    <span class="contact-quest"
                          v-scroll-reveal="{ delay: 350, origin: 'right', distance: '50px'}"
                          v-if="block.quest">{{block.quest}}</span>
                    <span class="contact-ans"
                          v-scroll-reveal="{ delay: 400, origin: 'right', distance: '50px' }"
                          v-html="block.ans"></span>
                </article>
            </div>
            <div class="social-wrapper">
                <a v-scroll-reveal="{ delay: index * 150 }"
                   v-for="(social, index) in socials"
                   :key="index"
                   :href="social.link"
                   :class="social.name"
                   :data-cta="social.cta"
                   :title="social.cta"
                   rel="noopener"
                   target="_blank"></a>
            </div>
        </div>
    </section>
</template>
<script>
    export default {
        data(){
            return{
                text: 'Get in touch',
                runningTime: 0,
                info: [
                    {
                        quest: "That's all great but where do we start?",
                        ans: "Did you like my work? Do you have any questions? Feel free to <a class='contact-link' href='mailto:hello@pawcza.codes?Subject=New%20Exciting%20Opportunity%21%20&Body=Hello%2C%0A'>contact me here</a> or using any of the social sites below.</br></br>Let's create something awesome together :-)"
                    }
                ],
                socials: [
                    {
                        link: 'http://github.com/pawcza',
                        name: 'github',
                        cta: 'Check out my GitHub!'
                    },
                    {
                        link: 'https://uk.linkedin.com/in/paweł-czarniecki-612230140',
                        name: 'linkedin',
                        cta: 'LinkedIn profile'
                    },
                    {
                        link: 'mailto:hello@pawcza.codes',
                        name: 'mail',
                        cta: 'Email me'
                    },
                    {
                        link: 'tel:+447577125400',
                        name: 'phone',
                        cta: 'Call me'
                    }
                ]
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
          }
        },
        created () {
            this.chars = this.text + '#!£$&2345678<>/<>/<>/';
        },
        mounted(){
            let targetWidth = this.$refs.title.children[0].offsetWidth
            for (let i = 0; i < this.text.length; ++i) {
            this.$refs.title.children[i].style.width = `${targetWidth}px`
            }
        }
    }
</script>
<style scoped lang="scss">
    @import '../../scss/plugins/include-media';
    #contact{
        .container{
            display: flex;
            flex-direction: column;
            top: 10vh;
            position: relative;
            max-height: 80vh;
            justify-content: space-between;
            .contact-wrapper{
                display: flex;
                .contact-article{
                    flex-basis: 50%;
                    padding: 10px 15px;
                    font-size: 1.25em;
                    &:first-of-type{
                        flex-basis: 33%;
                    }
                    .contact-img{
                        max-width: 300px;
                        height: auto;
                        border: 10px solid #373737;
                        position: relative;
                        z-index: 1;
                    }
                    .contact-quest{
                        display: block;
                        font-weight: 700;
                        font-size: 1em;
                        margin-bottom: 5px;
                        padding-bottom: 10px;
                    }
                    .contact-ans{
                        font-weight: 400;
                        padding: 20px 25px;
                        margin-left: -20px;
                        background: #373737;
                        color: white;
                        display: inline-block;
                        position: relative;
                        line-height: 1.25em;
                        font-size: .85em;
                        /deep/ .contact-link{
                            text-decoration: none;
                            color: white;
                            border-bottom: 1px dotted;
                            transition: .2s ease-out;
                            &:hover{
                                border-bottom-style: solid;
                            }
                        }
                        &:before{
                            content: '';
                            left: 25px;
                            position: absolute;
                            top: -10px;
                            border-left: 10px solid transparent;
                            border-right: 10px solid transparent;
                            border-bottom: 10px solid lighten(#373737, 5%);
                        }
                    }
                }
            }
            .social-wrapper{
                display: flex;
                justify-content: center;
                a{
                    position: relative;
                    width: 42px;
                    height: 42px;
                    margin: 3px;
                    transition: .2s ease-out;
                    background-size: 20px;
                    background-position: center;
                    background-repeat: no-repeat;
                    &.github{
                        background-image: url('../../assets/img/github_icon.svg');
                    }
                    &.linkedin{
                        background-image: url('../../assets/img/linkedin_icon.svg');
                    }
                    &.mail{
                        background-image: url('../../assets/img/mail_icon.svg');
                    }
                    &.phone{
                        background-image: url('../../assets/img/phone_icon.svg');
                    }
                    &:before{
                        content: attr(data-cta);
                        position: absolute;
                        top: -10px;
                        left: 50%;
                        transition: opacity .25s ease-out, transform .5s ease-in;
                        width: max-content;
                        width: -moz-max-content;
                        transform: translate(-50%, -10px);
                        padding: 10px;
                        font-family: 'Share Tech Mono';
                        color: white;
                        font-size: .85em;
                        background: #373737;
                        opacity: 0;
                        pointer-events: none;
                    }
                    &:hover{
                        background-color: #dadada;
                        &:before{
                            transition: .25s cubic-bezier(0.19, 1, 0.22, 1);
                            transform: translate(-50%, -30px);
                            opacity: 1;
                            pointer-events: all;
                        }
                    }
                }
            }
            @include media('<phone'){
                max-height: 90vh;
                .contact-wrapper{
                    flex-direction: column;
                    align-items: center;
                    text-align: center;
                    .contact-article{
                        span{
                            font-size: .85em;
                        }
                        .contact-quest{
                            padding-bottom: 10px;
                            margin-bottom: 10px;
                        }
                        .contact-ans{
                            margin-left: -15px;
                            padding: 15px;
                            border-radius: 0;
                            width: 100%;
                            transform: none;
                            background: rgba(31, 31, 31, 0.75);
                            /deep/ .contact-link{
                                border: none;
                                font-weight: 700;
                            }
                            &:before{
                                left: 50%;
                                transform: translateX(-50%);
                                border-bottom-color: rgba(31,31,31,.75);
                            }
                        }
                        .contact-img{
                            max-width: 200px;
                        }
                    }
                }
                .social-wrapper{
                    bottom: 0;
                    margin: 20px 10px;
                }
            }
            @include media('<350px'){
                .contact-wrapper{
                    .contact-article{
                        .contact-img{
                            max-width: 125px!important;
                        }
                    }
                }
            }
        }
    }
</style>
