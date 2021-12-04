const jwt = require('jsonwebtoken');
const {TEXT} = require ("../helpers/text");

/**
 *
 * @param {Request} request
 * @param {Response} response
 * @param {Function} next
 */
const validarJWT =(request,response,next)=>{
    const token = request.header('x-token');
    if(!token){
        return response.status(401).json({
            ok : false,
            msg: TEXT.NO_TOKEN
        });
    }
    try{
        const {uid,name} = jwt.verify(token, process.env.SECRET);

        request.uid = uid;
        request.name = name;

    }catch (err) {
        return response.status(401).json({
            ok : false,
            msg: TEXT.INVALID_TOKEN
        });
    }
    next();
};

module.exports = validarJWT;