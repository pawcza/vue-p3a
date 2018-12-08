<template>
    <section>
        <div class="container">
            <h2 class="contact-animateable" data-title="Get in touch">Get in touch</h2>
            <div class="contact-wrapper">
                <article class="contact-animateable" v-for="block in info">
                    <span v-if="block.quest">{{block.quest}}</span>
                    <span v-html="block.ans"></span>
                </article>
            </div>
            <div class="social-wrapper">
                <a class="contact-animateable" v-for="social in socials" :href="social.link" :class="social.name" :data-cta="social.cta" target="_blank"></a>
            </div>
        </div>
    </section>
</template>
<script>
    import photo from '../assets/img/me.jpg';
    export default {
        data(){
            return{
                info: [
                    {
                        ans: "<img title='Me!' src=" + photo + ">"
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
            enterAnim(){
                Velocity(
                    document.querySelectorAll('.contact-animateable'),
                    'transition.slideLeftIn',
                    {stagger: 200, easing: [500, 20]}
                )
            },
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
