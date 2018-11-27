<template>
    <div id="text_container" ref="text">
        <div class="text_loader" ref="loader"></div>
        <div v-for="letter in text" class="letter_container">
            <p v-for="(color, index) in seq" :key="index" :style="{color:color}">x</p>
        </div>
    </div>
</template>
<script>
    export default{
        data(){
            return{
                text: 'I sell chicken nuggets',
                seq: ['#404040','#f00','#00f', '#0f0']
            }
        },
        methods: {
            playText: function(){
                let chars = this.text + '#!£$&1234567890<>/',
                    that = this,
                    matched = 0;
                let letterInterval = setInterval(function (e) {
                    for (let x = 0; x < that.text.length; ++x) {
                        let random = Math.floor(Math.random() * chars.length),
                            target = that.$el.children[x + 1];
                        for (let c = 0; c < target.children.length; ++c) {
                            if (target.children[c].innerHTML === that.text[x]) {
                                (!target.children[c].classList.contains('matched')) ? matched++ : '';
                                target.children[c].classList.add('matched');
                            } else {
                                target.children[c].innerHTML = chars.substring(random, random + 1);
                                // target.childNodes[c].style.background = '#' +  seq[Math.floor(Math.random() * Math.floor(seq.length))];
                            }
                            // target.style.transform = 'translate(' + (((e.clientX / window.outerWidth) - .5) * 10) * (c + 3) + 'px,' + (((e.clientY / window.outerHeight) - .5) * 10) * (c + 3) + 'px)';
                        }
                        (matched === that.text.length * that.seq.length) ? clearInterval(letterInterval) : '';
                        that.$refs.loader.style.width = (matched / (that.text.length * that.seq.length)) * 100 + '%';
                    }
                }, 50);
            },
            moveText: function(e){
                for (let x = 0; x < this.text.length; ++x) {
                    let children = this.$el.children[x + 1].children;
                    for (let y = 0; y < children.length; ++y) {
                        children[y].style.transform = 'translate(' + (((e.clientX / window.outerWidth) - .5) * 10) * (y + 3) + 'px,' + (((e.clientY / window.outerHeight) - .5) * 10) * (y + 3) + 'px)';
                    }
                }
            }
        },
        mounted(){
            this.playText();
            this.$parent.$on('mousemove', this.moveText);
        }
    }
</script>