<template>
    <div class="intro_btn" @click="goSection()">
        Check my projects out
    </div>
</template>
<script>
    export default {
        methods:{
            goSection(target){this.$emit('goSection', target)}
        }
    }
</script>
<style lang="scss" scoped>
    @import '../scss/plugins/include-media';
    .intro_btn{
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        border-radius: 30px;
        padding: 15px 20px;
        font-weight: 300;
        border: 1px solid #373737;
        background: #373737;
        color: white;
        transition: background .2s ease-in-out, color .1s ease-out;
        bottom: 50px;
        cursor: pointer;
        text-align: center;
        &:hover{
             background: transparent;
             color: #373737;
        }
        @include media('<phone'){
            position: relative;
            left: initial;
            transform: none;
            bottom: 0;
            margin-top: 40px;
            background: #373737;
            color: white;
        }
    }
</style>