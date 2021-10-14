const MODES = {
    "none":     0,
    "default":  1,
    "loading":  2,
    "saving":   3,
    "success":  4,
    "payment":  5,
    "search":   6,
    "mysearch": 7,
    "error":    9
};

const DISP_MODES = {
    "none": 0,
    "list": 1,
    "cards": 2
};

/**
 * 
 * Need`s masks for toolbar actions (see provide on layouts/default.vue)
 */
const NEEDS = {
    none: 0,
    back:   1,
    search: 2,
    myonly: 4
};

/**
 * @param {Sting} val
 * @return {Boolean}
 */
function isEmpty(val) {
    if (!!val){
        return /^$/.test(val);
    }
    return true;
}


function tod(){
    var s, h = (new Date()).getHours();
    if (((h >= 21)&&(h<24)) || ((h >= 0)&&(h<5))){
        s = 'Доброй ночи';
    } else if ((h>=5) && (h<12)){
        s = 'Доброе утро';
    } else if ((h>=12) && (h<18)){
        s = 'Добрый день';
    } else if ((h>=18) && (h<21)){
        s = 'Добрый вечер';
    }
    return s;
}   //tod


function short(s){
    var res, n = s.indexOf(' ');
    if ( n > 0 ){
        res = s.charAt(0) + s.charAt(n + 1);
    } else if (s.length > 2){
        res = s.substr(0, 2);
    } else {
        res = s;
    }
    return res.toUpperCase();
}

function fmtCurrency(n){
    if (!!n) {
        return Number(n).toFixed(n < 100 ? 2 : 0).replace(/\d(?=(\d{3})+$)/g, '$& ');
    }
    return '0';
}

export {
    MODES,
    DISP_MODES,
    NEEDS,
    isEmpty,
    tod,
    short,
    fmtCurrency
};
