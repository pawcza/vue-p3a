<template>
    <p class="text_note">
        Hello, I'm a passion driven, music infused front-end developer building eye satisfying, minimalistic websites & user-friendly experiences
    </p>
</template>
<style lang="scss" scoped>
    @import '../../scss/plugins/include-media';

    .text_note{
        font-size: 1.5em;
        padding: 10px 15px;
        line-height: 1.66em;
        max-width: 900px;
        position: relative;
        text-align: center;
        color: #373737;
        font-weight: 300;
        @include media('<phone'){
            font-size: 1.25em;
        }
    }
</style>
