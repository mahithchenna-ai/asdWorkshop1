const cache = {};

const TTL = 60 * 1000;


function cacheMiddleware(req, res, next) {

    let key = req.originalUrl;


    if (cache[key]) {

        let currentTime = Date.now();

        let cacheAge = currentTime - cache[key].createdAt;


        if (cacheAge < TTL) {

            console.log("Cache HIT:", key);

            res.setHeader("X-Cache", "HIT");

            return res.json(cache[key].data);
        }


        console.log("Cache expired:", key);

        delete cache[key];
    }


    console.log("Cache MISS:", key);

    res.setHeader("X-Cache", "MISS");


    res.sendResponse = res.json;


    res.json = function(data) {

        cache[key] = {
            data: data,
            createdAt: Date.now()
        };

        res.sendResponse(data);
    };


    next();
}


function clearCache() {

    console.log("Clearing cache");

    for (let key in cache) {
        delete cache[key];
    }
}


module.exports = {
    cacheMiddleware,
    clearCache
};