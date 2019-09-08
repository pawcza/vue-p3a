<template>
    <div id="text_container" ref="title">
        <div class="text_loader" ref="loader"></div>
        <div v-for="letter in text" class="letter_container" :data-letter="letter"
             :class="{break : letter === ' '}">{{letter}}
        </div>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                text: 'Paweł Czarniecki',
                chars: '',
                runningTime: 0
            }
        },
        created () {
            this.chars = this.text + '#!£$&2345678<>/<>/<>/'
        },
        mounted () {
            for (let i = 0; i < this.text.length; ++i) {
//                this.$refs.title.children[i].style.width = this.$refs.title.children[i].offsetWidth + 'px'
            }
        },
        methods: {
            playText () {
                let that = this,
                    matched = 0,
                    letterInterval = setInterval(function () {
                    for (let x = 0; x < that.text.length; ++x) {
                        let random = Math.floor(Math.random() * that.chars.length),
                            target = that.$el.children[x + 1];

                        if (target.innerHTML === that.text[x]) {
                            if (!target.classList.contains('matched')) {
                                matched++;
                                target.classList.add('matched');
                            }
                        } else if(that.runningTime > 2500){
                            target.innerHTML = that.text[x];
                            matched++;
                        } else {
                            target.innerHTML = that.chars.substring(random, random + 1)
                        }
                    }
                    (matched === that.text.length) ? clearInterval(letterInterval) : ''
                    that.$refs.loader.style.width = matched / that.text.length * 100 + '%'
                    that.runningTime += 50;
                }, 50);
            }
        }
    }
</script>
<style scoped lang="scss">
    @import '../../scss/plugins/include-media';

    #text_container {
        display: flex;
        font-weight: 700;
        font-size: 3em;
        justify-content: center;
        flex-wrap: wrap;
        padding-bottom: 40px;
        position: relative;
        margin-bottom: 40px;
        letter-spacing: 1px;
        .text_loader {
            position: absolute;
            width: 0;
            bottom: 50px;
            left: 50%;
            transform: translateX(-50%);
            height: 10px;
            transition: 230ms width cubic-bezier(0.75, 0, 0, 1);
            background: #37373715;
        }
        .letter_container {
            position: relative;
            display: inline-block;
            text-align: center;
            margin: 0 5px;
            &.break{
                opacity: 0;
            }
        }
        @include media('<phone') {
            padding-bottom: 0;
            font-size: 2.25em;
            .text_loader {
                display: none;
            }
            .letter_container {
                margin: 0 2px;
                &.break {
                    width: 100%;
                    height: 10px;
                    margin: 0 auto;
                    flex-basis: 100%;
                    opacity: 0;
                }
            }
        }
    }
</style>
