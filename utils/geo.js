function a2s(a){
    var _a = [];
    if (!!a){
        if (!!a.city){
            _a.push(a.city.name || a.city);
        }
        if (!!a.street){
            _a.push(a.street.name);
        } else if (!!a.road){
            _a.push(a.road);
        }
        if (!!a.number){
            _a.push(a.number);
        } else if (!!a.house_number){
            _a.push(a.house_number);
        }
    }
    return _a.join(', ');
}

function lookup(a){
    const p = (resolve, reject) => {
        if (!a){
            reject('no-addr');
        }
        const params = (withNum)=>{
            const _params = new URLSearchParams();
            _params.append('country', 'Россия');
            if (!!a.city){
                _params.append('city', a.city.name);
            }
            if (!!a.street){
                _params.append('street', a.street.name);
                if ((!!a.number)&&(withNum)){
                    _params.set('street', a.street.name + ' ' + a.number);
                }
            }
            _params.append('format', 'json');
            _params.append('limit', '3');
            return _params.toString();
        };
        
        $.getJSON('https://nominatim.openstreetmap.org/search?' + params(true), {timeout:5000})
            .then((data)=>{resolve(data);})
            .catch(()=>{
                $.getJSON('https://nominatim.openstreetmap.org/search?' + params(false), {timeout:5000})
                    .then((data)=>{resolve(data);})
                    .catch(()=>{reject('no-addr searching:' + params(false));});
        });
    };
    return new Promise(p);
}   //lookup

function addr(ll){
    if (!!ll){
        return $.getJSON('https://nominatim.openstreetmap.org/reverse?format=json&lat=' + ll.lat + '&lon=' + ll.lon + '&zoom=18&addressdetails=1');
    } else {
        return new Promise((resolve, reject) => {
            reject('no-coords');
        });
    }
}   //addr

function distance(ll1, ll2){
/*http://www.movable-type.co.uk/scripts/latlong-vincenty.html*/
    const a = 6378137, b = 6356752.3142,  f = 1/298.257223563;  // WGS-84 ellipsiod
    if (  
            (!ll1) 
         || (!ll2)
         || !(!!ll1.lat) 
         || !(!!ll2.lat) 
        ){
        return a;
    }
    
    const k = 0.01745;
    const lon1 = ll1.lon * k, lon2 = ll2.lon * k, lat1 = ll1.lat * k, lat2 = ll2.lat * k;
    var L = lon2-lon1;
    var U1 = Math.atan((1-f) * Math.tan(lat1));
    var U2 = Math.atan((1-f) * Math.tan(lat2));
    var sinU1 = Math.sin(U1), cosU1 = Math.cos(U1);
    var sinU2 = Math.sin(U2), cosU2 = Math.cos(U2);

    var lambda = L, lambdaP, iterLimit = 100;
    do {
        var sinLambda = Math.sin(lambda), cosLambda = Math.cos(lambda);
        var sinSigma = Math.sqrt((cosU2*sinLambda) * (cosU2*sinLambda) + 
            (cosU1*sinU2-sinU1*cosU2*cosLambda) * (cosU1*sinU2-sinU1*cosU2*cosLambda));
        if (sinSigma==0) return 0;  // co-incident points
        var cosSigma = sinU1*sinU2 + cosU1*cosU2*cosLambda;
        var sigma = Math.atan2(sinSigma, cosSigma);
        var sinAlpha = cosU1 * cosU2 * sinLambda / sinSigma;
        var cosSqAlpha = 1 - sinAlpha*sinAlpha;
        var cos2SigmaM = cosSigma - 2*sinU1*sinU2/cosSqAlpha;
        if (isNaN(cos2SigmaM)) cos2SigmaM = 0;  // equatorial line: cosSqAlpha=0 (§6)
        var C = f/16*cosSqAlpha*(4+f*(4-3*cosSqAlpha));
        lambdaP = lambda;
        lambda = L + (1-C) * f * sinAlpha *
            (sigma + C*sinSigma*(cos2SigmaM+C*cosSigma*(-1+2*cos2SigmaM*cos2SigmaM)));
    } while (Math.abs(lambda-lambdaP) > 1e-12 && --iterLimit>0);

    if (iterLimit==0) return NaN  // formula failed to converge

    var uSq = cosSqAlpha * (a*a - b*b) / (b*b);
    var A = 1 + uSq/16384*(4096+uSq*(-768+uSq*(320-175*uSq)));
    var B = uSq/1024 * (256+uSq*(-128+uSq*(74-47*uSq)));
    var deltaSigma = B*sinSigma*(cos2SigmaM+B/4*(cosSigma*(-1+2*cos2SigmaM*cos2SigmaM)-
        B/6*cos2SigmaM*(-3+4*sinSigma*sinSigma)*(-3+4*cos2SigmaM*cos2SigmaM)));
    var s = b*A*(sigma-deltaSigma);
    return Math.round(s);    
}   //distance

export default{
    a2s,
    addr,
    distance,
    lookup
}