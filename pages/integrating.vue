<template>
    <kih-conte slug="integrating" 
               v-on:load="onload" />
</template>
<script>
import KihConte from "~/components/KihConte";
import { WpComp } from "~/plugins/wp-comp";
    
export default {
    name: 'KihIntegratingPage',
    components: {
        KihConte
    },
    mixins: [WpComp]
}    
</script>
