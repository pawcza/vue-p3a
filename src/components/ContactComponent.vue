<template>
    <section>
        <div class="container">
            <h2 class="contact-animateable" v-scroll-reveal="{ delay: 250 }" data-title="Get in touch">Get in touch</h2>
            <div class="contact-wrapper">
                <article class="contact-animateable" v-for="block in info" v-scroll-reveal="{ delay: 300 }">
                    <span v-scroll-reveal="{ delay: 350 }" v-if="block.quest">{{block.quest}}</span>
                    <span v-scroll-reveal="{ delay: 400 }" v-html="block.ans"></span>
                </article>
            </div>
            <div class="social-wrapper">
                <a class="contact-animateable" v-scroll-reveal="{ delay: index * 150 }" v-for="(social, index) in socials" :key="index" :href="social.link" :class="social.name" :data-cta="social.cta" target="_blank"></a>
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
                        ans: "Yes! Let's create something awesome together. Feel free to contact me <a href='mailto:hello@pawcza.dev'>here</a>."
                    },
                    {
                        quest: 'How much does a chicken nugget cost?',
                        ans: "According to the newest independent study conducted by the moon people it would be around the half of the distance from here to Saturn. Gofrow ile tylko chcesz!!!"
                    }
                ],
                socials: [
                    {
                        link: 'http://github.com/pawcza',
                        name: 'github',
                        cta: 'Check out my GitHub!'
                    },
                    {
                        link: 'http://linkedin.com/pawcza',
                        name: 'linkedin',
                        cta: 'My LinkedIn profile'
                    }
                ]
            }
        },
        components: {
        },
        methods: {
        }
//        ,
//        props: {
//            name: {
//                type: String,
//                required: true
//            }
//        }
    }
</script>
