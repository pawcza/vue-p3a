<template>
    <div class="intro_btn_container" @click="window.scrollTo({top: document.querySelectorAll('#projects').offsetTop, behavior: 'smooth'})">
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
        }
    }
</script>