<template>
    <div class="kih-conte" 
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
                },
                nostore: {
                    type: Boolean,
                    required: true,
                    default: false
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
        try {
            this.p = await this.$store.dispatch("readConte", {slug: this.slug, nostore: this.nostore});
            this.$emit("load");
            this.$nextTick(()=>{
                $(this.$el).find("a[href]").on("click", this.refclick);
            });
        } catch(e){
            console.log('ERR (on load)', e);
        }
    }, 
    methods: {
        refclick(e){
            e.preventDefault();
            const ref = $(e.currentTarget).attr("href");
            if (
                    (ref.indexOf("#") < 0)
                  &&(ref.indexOf("script") < 0)
               ){
                this.$router.push({path: $(e.currentTarget).attr("href")});
            }
        }   //refclick
    }
}
</script>

