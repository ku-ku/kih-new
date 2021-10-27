<template>
    <kih-conte slug="main-main" 
               v-on:load="onload" />
</template>
<script>
import KihConte from "~/components/KihConte";
import { WpComp } from "~/plugins/wp-comp";

export default {
    name: 'KihIndexPage',
    scrollToTop: false,
    mixins: [WpComp],
    components: {
        KihConte
    }
}
</script>