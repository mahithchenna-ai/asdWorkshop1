const cache = {};

function cacheMiddleware(req, res, next) {

    let key = req.originalUrl;

    if (cache[key]) {
        console.log("Cache HIT:", key);

        res.setHeader("X-Cache", "HIT");

        return res.json(cache[key].data);
    }

    console.log("Cache MISS:", key);

    res.setHeader("X-Cache", "MISS");

    res.sendResponse = res.json;

    res.json = function(data) {
        cache[key] = {
            data: data
        };

        res.sendResponse(data);
    };

    next();
}

module.exports = cacheMiddleware;