<template>
    <kih-conte slug="solutions" 
               v-on:load="onload" />
</template>
<script>
import KihConte from "~/components/KihConte";
import { WpComp } from "~/plugins/wp-comp";
    
export default {
    name: 'KihSolutionsPage',
    components: {
        KihConte
    },
    mixins: [WpComp]
}    
</script>