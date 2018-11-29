<template>
    <div class="intro_btn_container" @click="goSection()">
        <div class="intro_btn">
            <div class="line"></div>
            <div class="line"></div>
        </div>
        <div class="intro_btn">
            <div class="line"></div>
            <div class="line"></div>
        </div>
    </div>
</template>
<script>
    export default {
        components: {
        },
        methods:{
            goSection: function(target){
                this.$emit('goSection', target);
            }
        }
    }
</script>