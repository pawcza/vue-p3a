<template>
    <section>
        <div class="container">
            <h2 class="contact-animateable"
                v-scroll-reveal="{ delay: 250 }"
                data-title="Get in touch">Get in touch</h2>
            <div class="contact-wrapper">
                <article class="contact-animateable contact-article"
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
                <a class="contact-animateable"
                   v-scroll-reveal="{ delay: index * 150 }"
                   v-for="(social, index) in socials"
                   :key="index"
                   :href="social.link"
                   :class="social.name"
                   :data-cta="social.cta"
                   target="_blank"></a>
            </div>
        </div>
    </section>
</template>
<script>
    export default {
        data(){
            return{
                info: [
                    {
                        ans: "<img title='Me!' src=" + require('../assets/img/me.png') + ">"
                    },
                    {
                        quest: "Are you currently available for work?",
                        ans: "Yes! Let's create something awesome together. Feel free to contact me <a href='mailto:paw.czarniecki@gmail.com'>here</a>"
                    },
                    {
                        quest: 'How much does a chicken nugget cost?',
                        ans: "According to the newest independent study conducted by the moon people it would be around the half of the distance from here to Saturn"
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
                    flex-basis: 33.3%;
                    padding: 10px 15px;
                    >span{
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
                            color: #bbbbbb;
                            display: block;
                            font-weight: 700;
                            font-size: 1em;
                            margin-bottom: 10px;
                            padding-bottom: 10px;
                            border-bottom: 1px solid #ebebeb;
                        }
                        /deep/ a{
                            text-decoration: none;
                            color: #222;
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
                        background: #222;
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
