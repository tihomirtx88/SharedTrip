function isUser(){
    return function(req, res, next){
        if (req.session.user) {
            next();
        }else{
            res.redirect(`/login`);
        }
    }
}

function isGuest(){
    return function(req, res, next){
        if (req.session.user) {
            res.redirect(`/`);
        }else{
            next();
        }
    }
}

function isOwner(){
    return async function(req, res, next){
        const userId = req.session.user?._id;
        //Todo change the propery name to match collection
        if (res.locals.trip.owner == userId) {
            next();
        }else{
            res.redirect(`/login`);
        }       
    }
}

module.exports = {
    isGuest,
    isUser,
    isOwner
}