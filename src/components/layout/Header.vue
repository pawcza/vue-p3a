<template>
    <div id="text_container" ref="title">
        <div class="text_loader" ref="loader"></div>
        <div v-for="letter in text" class="letter_container" :data-letter="letter"
             :class="{break : letter === ' '}">
            {{ letter }}
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
            let targetWidth = this.$refs.title.children[1].offsetWidth
            for (let i = 0; i < this.text.length; ++i) {
               this.$refs.title.children[i].style.width = `${targetWidth}px`
            }
        },
        methods: {
            playText () {
                let matched = 0
                let letterInterval = setInterval(() => {
                    for (let x = 0; x < this.text.length; ++x) {
                        let random = Math.floor(Math.random() * this.chars.length)
                        let target = this.$el.children[x + 1]
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
                    this.$refs.loader.style.width = matched / this.text.length * 100 + '%'
                    this.runningTime += 50
                }, 50)
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
            top: 50%;
            left: 50%;
            height: 100%;
            transform: translate(-50%, -50%);
            transition: 230ms width cubic-bezier(0.75, 0, 0, 1);
            mask-image: linear-gradient(to right, transparent, black, transparent);
            -webkit-mask-image: linear-gradient(to right, transparent, black, transparent);
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
