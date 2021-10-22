<template>
    <div class="header__menu">
        <div class="header-menu">
            <nav class="header-menu__menu">
                <ul class="header-menu__items">
                    <li v-for="item in menu" 
                        :key="'menu-item-' + item.id"
                        class="header-menu__item"
                        :to="{name:'conte-id', params:{id: item.oid}}"
                        :value="item.id">
                        <a class="header-menu__link" :href="item.url">
                            {{ item.title }}
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    </div>    
</template>
<script>
export default {
    name: "KihMenu",
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
