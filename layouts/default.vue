<template>
  <v-app class="app">
    <kih-app-bar />
    <v-main v-scroll="onscroll">
        <Nuxt />
    </v-main>
    <kih-conte slug="footer" />
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
    methods: {
        onscroll(e){
            console.log('onscroll', e);
        }
    }
}
</script>
