<template>
    <div id="text_container" ref="text">
        <div class="text_loader" ref="loader"></div>
        <div v-for="letter in text" class="letter_container" :style="{width: letterWidth}" :class="{break : letter === ' '}">w</div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                text: 'Paweł Czarniecki',
                chars : '',
                letterWidth: undefined
            }
        },
        methods: {
            playText() {
                let that = this,
                    matched = 0,
                    interval = 50;
                let letterInterval = setInterval(function () {
                    for (let x = 0; x < that.text.length; ++x) {
                        let random = Math.floor(Math.random() * that.chars.length),
                            target = that.$el.children[x + 1];

                        if (target.innerHTML === that.text[x]) {
                            if(!target.classList.contains('matched')){
                                interval = interval + 10;
                                matched++;
                                target.classList.add('matched');
                            }
                        } else {
                            target.innerHTML = that.chars.substring(random, random + 1)
                        }
                    }
                    (matched === that.text.length) ? clearInterval(letterInterval) : '';
                    that.$refs.loader.style.width = matched / that.text.length * 100 + '%';
                }, interval);
            }
        },
        created() {
            this.chars = this.text + '#!£$&1234567890<>/';
        },
        mounted() {
            let letters = document.querySelectorAll('.letter_container');
            for(let i = 0; i < this.text.length; ++i){
                letters[i].style.width = letters[i].clientWidth + 'px';
            }
        }
    }
</script>
<style scoped lang="scss">
    @import '../scss/plugins/include-media';
    #text_container{
        display: flex;
        font-weight: 700;
        font-size: 3em;
        justify-content: center;
        flex-wrap: wrap;
        padding-bottom: 40px;
        margin-bottom: 40px;
        .text_loader{
            position: absolute;
            width: 0;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
            height: 1px;
            transition: 230ms width cubic-bezier(0.75, 0, 0, 1);
            background: #222;
        }
        .letter_container{
            position: relative;
            text-align: center;
            p{
                height: 100%;
                margin: 0;
                text-align: center;
                opacity: .5;
                position: absolute;
                left: 25%;
                box-sizing:border-box;
            }
        }
        @include media('<phone'){
            padding-bottom: 0;
            letter-spacing: -.5px;
            font-size: 2.25em;
            .text_loader{
                display: none;
            }
            .letter_container{
                &.break{
                    width: 100%;
                    height: 10px;
                    opacity: 0;
                }
            }
        }
    }
</style>