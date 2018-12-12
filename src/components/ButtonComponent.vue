<template>
    <div class="intro_btn" @click="goSection()">
        Checkout my projects
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
        border-radius: 2px;
        padding: 10px 15px;
        border: 1px solid #222;
        transition: background .2s ease-in-out, color .1s ease-out;
        bottom: 50px;
        cursor: pointer;
        text-align: center;
        &:hover{
             background: #222;
             color: white;
        }
        @include media('<phone'){
            position: relative;
            left: initial;
            transform: none;
            font-weight: 700;
            bottom: 0;
            padding: 15px 20px;
            margin-top: 40px;
            background: #222;
            color: white;
            border-width: 2px;
            border-radius: 30px;
        }
    }
</style>