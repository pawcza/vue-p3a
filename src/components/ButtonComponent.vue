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
        font-weight: 700;
        border: 1px solid #373737;
        background: #222;
        color: white;
        transition: background .2s ease-in-out, color .1s ease-out;
        bottom: 50px;
        cursor: pointer;
        text-align: center;
        &:after{
            position: absolute;
            content: '';
            width: calc(100% + 10px);
            height: calc(100% + 10px);
            border: 1px solid #222;
            border-radius: 30px;
            top: -7px;
            transition: .2s ease-out;
            left: -7px;
        }
        &:before{
            position: absolute;
            content: '';
            bottom: -15px;
            border-left: 10px solid transparent;
            border-right: 10px solid transparent;
            border-top: 10px solid #222222;
            transition: .2s ease-out;
            left: 50%;
            transform: translateX(-50%);
        }
        &:hover{
            background: transparent;
            color: #222;
            &:after{
                transform: scale(1.2);
                opacity: 0;
            }
            &:before{
                transform: translate(-50%, 5px);
                opacity: 0;
            }
        }
        @include media('<phone'){
            position: relative;
            left: initial;
            transform: none;
            bottom: 0;
            margin-top: 40px;
            color: white;
        }
    }
</style>