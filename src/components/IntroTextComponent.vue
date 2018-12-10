<template>
    <div id="text_container" ref="text">
        <div class="text_loader" ref="loader"></div>
        <div v-for="letter in text" class="letter_container" :style="{width: letterWidth}" :class="{break : letter === ' '}">W</div>
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
                    matched = 0;
                let letterInterval = setInterval(function () {
                    for (let x = 0; x < that.text.length; ++x) {
                        let random = Math.floor(Math.random() * that.chars.length),
                            target = that.$el.children[x + 1];

                        if (target.innerHTML === that.text[x] && !target.classList.contains('matched')) {
                            matched++;
                            target.classList.add('matched');
                        } else if (!target.classList.contains('matched')) {
                            target.innerHTML = that.chars.substring(random, random + 1);
                        }
                        (matched === that.text.length) ? clearInterval(letterInterval) : '';
                        that.$refs.loader.style.width = matched / that.text.length * 100 + '%';
                    }
                }, 50);
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