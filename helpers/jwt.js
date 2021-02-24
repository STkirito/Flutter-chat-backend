const jwt = require('jsonwebtoken');



const generarJWT  = (uid) => {
    return new Promise((resolve,reject)=>{
        const payload = { uid };
        jwt.sign(payload,process.env.JWT_KEY,{
        expiresIn:'24h'
        },(err,token)=>{
            if(err) {
                //nos ese pudo crear el token
                reject('No se pudo generar el JWT')
            }else{
                //TOKENT
                resolve(token);
            }
        })
    });
}

module.exports = {
    generarJWT
}