<template>
    <div class="intro_btn" @click="goSection()">
        Checkout my projects
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