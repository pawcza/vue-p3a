<template>
    <div class="intro_btn" @click="handleClick()">
        My recent work
    </div>
</template>
<script>
    export default {
        methods:{
            handleClick() {
                this.$emit('goSection')
            }
        }
    }

</script>
<style lang="scss" scoped>
    @import '../../scss/plugins/include-media';
    .intro_btn{
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        padding: 15px 20px;
        font-weight: 700;
        background: #373737;
        color: white;
        transition: background .2s ease-in-out, color .1s ease-out;
        bottom: 50px;
        cursor: pointer;
        border: 1px solid #373737;
        text-align: center;
        &:after{
            position: absolute;
            content: 'Check it out';
            vertical-align: middle;
            color: #373737;
            text-align: center;
            width: 100%;
            height: 100%;
            border: 1px solid #373737;
            top: 8px;
            padding: 15px 20px;
            box-sizing: border-box;
            transition: .2s ease-out;
            left: 8px;
        }
        &:before{
            position: absolute;
            content: '';
            bottom: -18px;
            border-left: 10px solid transparent;
            border-right: 10px solid transparent;
            border-top: 10px solid #373737;
            transition: .2s ease-out;
            left: 50%;
            transform: translateX(-50%);
        }
        &:hover{
            background: transparent;
            color: transparent;
            &:after{
                background: #373737;
                color: white;
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
