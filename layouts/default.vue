<template>
  <v-app>
    <kih-app-bar />
    <v-main>
        <Nuxt />
    </v-main>
  </v-app>
</template>

<script>
import KihAppBar from "~/components/KihAppBar";

export default {
    components: {
        KihAppBar
    },
    data() {
      return {
      };
    },
    mounted(){
        this.$nextTick(()=>{
            const _head = document.getElementsByTagName("head")[0];
            const _s = document.createElement('script');
            _s.type = "text/javascript";
            _s.src = "/scripts/app.min.js";
            _head.appendChild(_s);
        });
    }
}
</script>
