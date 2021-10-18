<template>
    <div class="msk-conte" 
         v-html="p.conte"
         :key="'conte-' + p.id">
    </div>
</template>
<script>

export default {
    name: "MskConte",
    props: {
                slug: {
                    type: String,
                    required: true,
                    default: 'unknown'
                } 
    },
    data(){
        return {
            p: {
                id: -1
            }
        };
    },
    async fetch(){
        this.p = await this.$store.dispatch("readConte", {slug: this.slug});
        this.$emit("load");
    }
}
</script>

