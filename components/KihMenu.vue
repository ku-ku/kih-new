<template>
    <div class="header-menu" v-show="has('menu')">
        <ul class="header-menu__items">
            <li v-for="item in menu" 
                :key="'menu-item-' + item.id"
                class="header-menu__item"
                nuxt
                :to="{name:'conte-id', params:{id: item.oid}}"
                :value="item.id">
                <a class="header-menu__link" :href="item.url">
                    {{ item.title }}
                </a>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    name: "KihMenu",
    props: ['dark'],
    computed: { 
        menu(){
            return this.$store.state.meta.meta?.menu || [];
        }
    }, 
    methods: {
        has(q){
            switch(q){
                case 'menu':
                    return (this.menu.length > 0);
            }
        }   //has
    }
}    
</script>
<style lang="scss">
    .theme--light.v-list.msk-main-menu,
    .theme--dark.v-list.msk-main-menu{
        background: transparent;
    }
    .v-list.msk-main-menu{
        display: flex;
        align-items: center;
        flex-wrap: nowrap;
        & .v-list-item--link:before{
            background-color: transparent !important;
        }
        & .v-list-item{
            text-transform: uppercase;
            padding: 0 0.5rem;
            &:hover{
                color: $accent-color;
            }
            &:not(:last-child){
                margin-right: 1rem;
            }
            &.v-list-item--active{
                border-bottom: 2px solid $accent-color;
            }
        }
    }
</style>