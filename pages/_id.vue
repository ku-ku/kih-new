<template>
    <kih-conte :slug="id" 
               :key="'page-'+id"
               :class="'page-'+id" 
               v-on:load="onload" />
</template>
<script>
import { WpComp } from "~/plugins/wp-comp";
export default{
    name: "KihPage",
    mixins: [WpComp],
    async asyncData({params}){
        return {
            id: params.id
        };
    }
}    
</script>

