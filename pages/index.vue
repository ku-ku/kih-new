<template>
    <kih-conte slug="main-main" v-on:load="conteload" />
</template>
<script>
import KihConte from "~/components/KihConte";

export default {
    name: 'KihIndexPage',
    components: {
        KihConte
    },
    methods: {
        conteload(){
            this.$nextTick(()=>{
                $nuxt.ready();
            });
        }
    }
}
</script>