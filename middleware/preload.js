//TODO with actual service 
const collexctionService = {};

function preload(){
    return async function(req, res, next){
        const id = req.params.id;
        //Todo change the propery name to match collection
        const data = await collexctionService.getById(id);
        res.locals.data = data;
        next();
    }
}

module.exports = preload;