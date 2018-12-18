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
                    <span class="contact-ans">
                        <img title='Me!' v-lazy="require('../assets/img/me.png')">
                    </span>
                </article>
                <article class="contact-article"
                         v-for="block in info"
                         v-scroll-reveal="{ delay: 300 }">
                    <span class="contact-quest"
                          v-scroll-reveal="{ delay: 350 }"
                          v-if="block.quest">{{block.quest}}</span>
                    <span class="contact-ans"
                          v-scroll-reveal="{ delay: 400 }"
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
                info: [
                    {
                        quest: "That's all great so where do we start?",
                        ans: "If you liked my work or you have any questions feel free to <a href='mailto:paw.czarniecki@gmail.com'>contact me here</a> or using any of the social sites below.</br>Let's create something awesome together :-)"
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
                        link: 'mailto:paw.czarniecki@gmail.com',
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
            }
        },
        created () {
            this.chars = this.text + '#!£$&2345678<>/<>/<>/';
        },
        mounted(){
            for (let i = 0; i < this.text.length; ++i) {
                this.$refs.title.children[i].style.width = this.$refs.title.children[i].offsetWidth + 'px'
            }
        }
    }
</script>
<style scoped lang="scss">
    @import '../scss/plugins/include-media';
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
                >.contact-article{
                    flex-basis: 50%;
                    padding: 10px 15px;
                    font-size: 1.25em;
                    &:first-of-type{
                        flex-basis: 33%;
                    }
                    >span{
                        font-weight: 300;
                        /deep/ img{
                            max-width: 300px;
                            border-radius: 50%;
                            height: auto;
                        }
                        >p{
                            margin-top: 10px;

                        }
                        line-height: 1.25em;
                        &:first-of-type{
                            display: block;
                            font-weight: 700;
                            font-size: 1em;
                            margin-bottom: 10px;
                            padding-bottom: 10px;
                        }
                        /deep/ a{
                            text-decoration: none;
                            color: #373737;
                            border-bottom: 1px dotted;
                            transition: .2s ease-out;
                            &:hover{
                                border-bottom-style: solid;
                            }
                        }
                    }
                    &:first-of-type{
                        >span{
                            border: none;
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
                    border-radius: 50%;
                    &.github{
                        background-image: url('../assets/img/github_icon.svg');
                    }
                    &.linkedin{
                        background-image: url('../assets/img/linkedin_icon.svg');
                    }
                    &.mail{
                        background-image: url('../assets/img/mail_icon.svg');
                    }
                    &.phone{
                        background-image: url('../assets/img/phone_icon.svg');
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
                        font-family: 'Montserrat';
                        color: white;
                        font-size: .85em;
                        background: #373737;
                        opacity: 0;
                        border-radius: 30px;
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
                            &:first-of-type{
                                padding-bottom: 5px;
                                margin-bottom: 5px;
                            }
                            /deep/ img{
                                max-width: 150px;
                            }
                        }
                    }
                }
                .social-wrapper{
                    bottom: 0;
                    margin: 20px 10px;
                }
            }
            @include media('<350px'){
                /deep/ img{
                    max-width: 125px!important;
                }
            }
        }
    }
</style>
