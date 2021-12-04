const jwt = require('jsonwebtoken');
const {TEXT} = require('../helpers/text');
/**
 *
 * @param {String} uid
 * @param {String} name
 */
const generarJWT =(uid,name)=>{
    return new Promise(((resolve, reject) => {
        const payload = {uid,name};
        jwt.sign(payload,process.env.SECRET,{
            expiresIn: TEXT.TOKEN_EXPIRES
        },(err,token)=>{
            if(err){
                reject(TEXT.TOKEN_CREATION_FAIL);
            }
            resolve(token);
        });
    }));
};

module.exports = {
    generarJWT
};