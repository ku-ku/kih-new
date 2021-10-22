export default async function( ctx ){
    const { app } = ctx;
    
    if (!app.mixins) {
        app.mixins = [];
    }
    app.mixins.push({
        fetchOnServer: false,
        beforeMount(){
            (async ()=>{
                try {
                    const meta = await this.$store.dispatch("meta/read");
                    $.ajax({
                        url: meta.ajax,
                        headers: {"X-WP-Nonce": meta.nonce},
                        data: {action: "user"}
                    }).then((resp)=>{
                        if (!!resp.success){
                            this.$store.commit("meta/set", {user: resp.data});
                        }
                    })
                } catch(e){
                    console.log("ERR (on meta/user)", e);
                }
            })();
        },
        methods: {
            /**
             * Ajax-quering by env URL
             * @param {Object} opts see jQuery.ajax
             * @return {Promise}
             */
            async "$ajax"(opts){
                opts = opts || {};
                opts.url = `${this.context.env.apiUrl}${opts.url || ''}`;
                return $.ajax(opts);
            },
            /**
             * Call US dialog show (see layouts/default.vue)
             */
            callUs(inf){
                var calling = ("object" === typeof inf) ? inf : true;
                this.$store.commit("active/set", {calling});
            },
            ready(){
                const _head = document.getElementsByTagName("head")[0];
                const _s = document.createElement('script');
                _s.type = "text/javascript";
                _s.src = "/scripts/app.min.js";
                _head.appendChild(_s);
            }
        }
    });
};