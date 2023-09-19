
const { HttpError } = require("../utils/index");

const validateBody = schema => {
    const func = (req, res, next) =>{
        const {error} = schema.validate(req.body)
            if(error){
                next(HttpError (400, `missing required ${error.details[0].path[0]} field`))
            }
            next()
    }
    return func
}

const validateBodyFavorite = schema => {
    const func = (req, res, next) =>{
        const {error} = schema.validate(req.body)
            if(error){
                next(HttpError (400, `missing field favorite`))
            }
            next()
    }
    return func
}

module.exports = {validateBody, validateBodyFavorite}