<template>
    <kih-conte :slug="id" 
               :key="'solution-'+id"
               :class="'solution-'+id" 
               v-on:load="onload" />
</template>
<script>
import KihConte from "~/components/KihConte";
import { WpComp } from "~/plugins/wp-comp";

export default {
    name: 'KihSolutionPage',
    mixins: [WpComp],
    async asyncData({params}){
        return {
            id: params.id
        };
    }
}
</script>
