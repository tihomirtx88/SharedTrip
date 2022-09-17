function mapErrors(err){
    if (Array.isArray(err)) {
        return err;
    }else if(err.name == `ValidationError`){
        return Object.values(err.errror).map(e => ({msg: e.message}));
        //that is from mongoose
    }else if (typeof err.message == `string`){
        return [{msg: err.message}]
    }else {
        return [{msg: `Requiest error`}]
    }
}

module.exports = mapErrors;