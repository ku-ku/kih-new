const _ready = function(window){
        // как работает плагин можно посмотреть тут https://github.com/bobrovsky-dev/modals
    var Modal = window.Modal;
    if (!Modal) {
        return;
    }
    var modal = new Modal({
        content: function() {
            const m = this;
            m._isAsyncContent = true;
            fetch("/html/modal-content.html")
                .then(function(response) {
                    response.text().then(function(html) {
                        m.setContent(html);
                    });
                });
            return false;
        },
        cacheContent: true,
        effect: 'modal-fade',
        contentEffect: 'modal-zoom-out'
    });

    $(".feedback").on("click", function(e){
        e.preventDefault();
        modal.show();
    });
/*
    // modal-success
    var modal2 = new Modal({
        content: function() {
            const m = this;
            m._isAsyncContent = true;
            fetch("/html/modal-success.html")
                .then(function(response) {
                    response.text().then(function(html) {
                        m.setContent(html);
                    });
                });
            return false;
        },
        cacheContent: true,
        effect: 'modal-fade',
        contentEffect: 'modal-zoom-out'
    });

    var btn2 = document.getElementById('btn2');
    btn2.addEventListener('click', function(e) {
        e.preventDefault();
        modal2.show();
    });
* 
*/
};


const WpComp = {
    methods: {
        onload(){
            $nuxt.ready().then(()=>{
                const hash = this.$route.hash;
                if ( /^(\#)+/.test(hash) ){
                    $('html, body').animate({
                        scrollTop: $(`a[name=${hash.substr(1)}]`).offset().top
                    }, 1000);
                }
                _ready((typeof global === "undefined") ? window : global);
            });
        }
    }
};

export {
    WpComp
};