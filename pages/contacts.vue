<template>
    <kih-conte slug="contacts" 
               v-on:load="onload" />
</template>
<script>
import KihConte from "~/components/KihConte";
import { WpComp } from "~/plugins/wp-comp";
    
export default {
    name: 'KihContactsPage',
    components: {
        KihConte
    },
    mixins: [WpComp]
}    
</script>

