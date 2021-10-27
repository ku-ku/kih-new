export const state = ()=>({
    page: null,
    cats: null
});

export const mutations = {
    set(state, payload) {
        if (payload.hasOwnProperty("page")){
            state.page = payload.page;
        }
    }
};

export const actions = {
    async readConte({commit}, payload){
        return new Promise((resolve, reject)=>{
            (async()=>{
                try {
                    var res = await $nuxt.$ajax({
                        url: (!!payload.slug)
                                ? `/wp/v2/pages/?slug=${payload.slug}`
                                : `/wp/v2/pages/${payload.id}/`,
                        cache: true,
                        ifModified: true,
                        headers: {
                            "Cache-Control": "public, max-age=" + 24*3600
                            //TODO: "If-Modified-Since": "Wed, 07 Jul 2021 15:20:30 GMT"  //TODO:
                        }
                    });
                    
                    if (Array.isArray(res)) {
                        if (res.length < 1){
                            throw {message: `No page ${payload.slug || payload.id} found`};
                        }
                        res = res[0];
                    }
                    
                    const page = {
                        id: res.id,
                        modified: res.modified,
                        slug: res.slug,
                        title: res.title.rendered,
                        conte: res.content.rendered
                    };
                    
                    commit("set", {id: page.id});
                    
                    resolve(page);
                } catch(e){
                    commit("set", {page: null});
                    console.log('ERR (on readConte)', e);
                    reject(e);
                }
            })();
        });
    }   //read
};
