export const state = ()=>({
    meta: null,
    user: null
});

export const mutations = {
    set(state, payload) {
        if (!!payload.meta){
            state.meta = payload.meta;
        }
        if (payload.hasOwnProperty("user")){
            state.user = payload.user;
        }
    }
};

export const actions = {
    async read({state, commit}, payload){
        return new Promise((resolve,reject)=>{
            if (!!state.meta){
                resolve(state.meta);
                return;
            }
            (async()=>{
                try {
                    var res = await $nuxt.$ajax({
                        url: "/v1/kih/meta",
                        async: !(!!payload)
                    });
                    commit("set", { meta: res.meta  });
                    resolve(res.meta);
                } catch(e){
                    console.log('ERR (on meta)', e);
                    reject(e);
                }
            })();
        });
    }   //read
};

export const getters = {
    meta: state => {
            return 
                (async()=>{
                    return await $nuxt.$store.dispatch("meta/read", true);
               })();
    },
    has: state => q => {
        switch(q){
            case "user":
                return !!state.user;
            case "admin":
                //return true;
                return (!!state.user?.admin);
            default: 
                return false;
        }
    }
};      //getters