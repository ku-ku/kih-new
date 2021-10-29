<template>
    <div class="app">
        <kih-app-bar></kih-app-bar>
        <main>
            <Nuxt keep-alive />
        </main>
        <kih-conte slug="footer" 
                   nostore
                  class="footer" />
    </div>
</template>

<script>
import KihAppBar from "~/components/KihAppBar";
import KihConte from "~/components/KihConte";

export default {
    components: {
        KihAppBar,
        KihConte
    }
}
</script>
