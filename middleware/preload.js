const tripService = require(`../services/tripService`);

function preload(){
    return async function(req, res, next){
        const id = req.params.id;
        //Todo change the propery name to match collection
        const trip = await tripService.getTripById(id);
        res.locals.trip = trip;
        next();
    }
}

module.exports = preload;