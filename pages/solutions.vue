<template>
    <div>
        <section class="first-screen first-screen--color-brand" data-scroll="Y">
            <div class="first-screen__lines">
                <div class="lines"></div>
            </div>
            <div class="first-screen__container">
                <div class="container">
                    <div class="first-screen__content-container">
                        <div class="first-screen__content">
                            <div class="first-screen__title-container">
                                <div class="first-screen__title">
                                    <h1 data-animation="fadeInUp">Наши решения для бизнеса и государства</h1>
                                </div>
                            </div>
                            <div class="first-screen__buttons-container">
                                <div class="first-screen__buttons first-screen__buttons--size-1">
                                    <div class="first-screen__button">
                                        <button class="button button--size-xl button--line button--color-white" type="button">
                                            <span class="button__text">Обсудить проект</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div class="first-screen__scroll-btn-container">
                                <div class="first-screen__scroll-btn">
                                    <button class="scroll-button" data-parent="first-screen">
                                        <span class="scroll-button__container">
                                            <span class="scroll-button__icon"></span>
                                            <span class="scroll-button__text">Скрольте<br />вниз</span>
                                        </span>
                                    </button>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <kih-conte slug="solutions" />
    </div>
</template>
<script>
import KihConte from "~/components/KihConte";
    
export default {
    name: 'KihSolutionsPage',
    components: {
        KihConte
    },
}    
</script>