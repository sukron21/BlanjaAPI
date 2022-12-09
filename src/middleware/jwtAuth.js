const {JWT_SECRET}= require ('../helper/env');
const jwt = require ('jsonwebtoken');
const {failed}= require ('../helper/response')

module.exports=(req, res, next)=>{
    try {
        const {token} = req.headers;
        const decode = jwt.verify(token,JWT_SECRET);
        req.APP_DATA = {
            tokenDecode: decode
        };

        next();
    }catch(e){
        failed(res, e, 'failed', 'invalid token');
    }
    
}