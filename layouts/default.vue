<template>
  <div class="app">
    <kih-app-bar />
    <main>
        <Nuxt />
    </main>
    <kih-conte slug="footer" 
               nostore
               class="footer" />
  </div>
</template>

<script>
import KihAppBar from "~/components/KihAppBar";

export default {
    components: {
        KihAppBar
    }
}
</script>
