<template>
<div class="blog">
    <div class="blog__container">
        <div class="container">
            <div class="blog__content-container">
                <div class="blog__content">
                    <div class="blog__title-container">
                        <h1 class="blog__title">НОВОСТИ</h1>
                    </div>
                    <div class="blog__items" v-if="has('news')">
                        <div v-for="item in news" 
                             class="blog__item" 
                             :key=" 'news-' + item.id">
                            <article class="article">
                                <div class="article__container">
                                    <div class="article__picture-container" v-if="has('image', item)">
                                        <div class="article__picture">
                                            <picture class="picture picture--cover">
                                                <img :src="item.src" :alt="item.title.rendered" />
                                            </picture>
                                        </div>
                                    </div>
                                    <div class="article__title-container">
                                        <h2 class="article__title">{{ item.title.rendered }}</h2>
                                    </div>
                                    <div class="article__meta-container">
                                        <div class="article__date">
                                            {{ dt(item.date) }}
                                        </div>
                                    </div>
                                    <div class="article__text-container">
                                        <div class="article__preview-text">
                                            <div class="text" v-html="item.excerpt.rendered"></div>
                                        </div>
                                        <div class="article__detail-text">
                                            <div class="text" v-html="item.content.rendered"></div>
                                        </div>
                                    </div>
                                    <div class="article__button" v-if="has('content', item)">
                                        <button class="button">
                                            <svg class="button__icon" width="12" height="12" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                                                <rect x="5" width="2" height="12" />
                                                <rect x="12" y="5" width="2" height="12" transform="rotate(90 12 5)" />
                                            </svg>
                                            <span class="button__text" data-hide-text="Кратко">
                                                Подробнее
                                            </span>
                                        </button>
                                    </div>
                                </div>
                            </article>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
    
</template>
<script>
import { WpComp } from "~/plugins/wp-comp";
import { isEmpty } from "~/utils";
const $moment = require('moment');
    
export default{
    name: "KihNews",
    mixins: [WpComp],
    async asyncData(ctx){
        console.log('NEWS', ctx);
        const res = await $nuxt.$ajax({
                        url: '/wp/v2/posts/?categories=223'
        });
        console.log('NEWS-2', res);
        return {
            news: res
        };
    },
    activated(){
        this.onload();
        $(".header").addClass("header--white");
    },
    methods: {
        has(q, v){
            switch(q){
                case "content":
                    return !isEmpty(v.content.rendered);
                case "image":
                    return (v.featured_media > 0);
                case "news":
                    return (this.news?.length > 0);
                default:
                    return false;
            }
        },
        dt(d){
            return $moment(d).format('DD.MM.YYYY');
        }
    }
};
</script>
<style lang="scss" scoped></style>
