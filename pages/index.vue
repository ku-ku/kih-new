<template>
    <div>
        <section class="first-screen" data-scroll="Y">
            <kih-conte slug="main-first" 
                       v-on:load="firstLoad" />
        </section>
        <section class="main-solutions">
            <kih-conte slug="main-solutions" />
        </section>
        <section class="possibility">
            <kih-conte slug="main-possibility" />
        </section>
        <section class="main-mission">
            <kih-conte slug="main-mission" />
        </section>
        <section class="main-history">
            <kih-conte slug="main-history" />
        </section>
        <section class="main-certificates">
            <kih-conte slug="main-certificates" />
        </section>
    </div>
</template>
<script>
import KihConte from "~/components/KihConte";
export default {
    name: 'KihIndexPage',
    components: {
        KihConte
    },
    methods: {
        firstLoad(){
            this.$nextTick(()=>{
                var Swiper = window.Swiper;
                var block = document.querySelector('.first-screen');
                if (!block || !Swiper) {
                  return;
                }

                var slider = block.querySelector('.first-screen__slider .swiper-container');

                if (!slider) {
                  return;
                }

                new Swiper(slider, {
                  effect: 'fade',
                  autoplay: {
                    delay: 8000
                  },
                  preloadImages: false,
                  lazy: {
                    loadPrevNext: true
                  }
                });
            });
        }
    }
}
</script>