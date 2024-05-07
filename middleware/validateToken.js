import AsyncHandler from 'express-async-handler'
import jwt from 'jsonwebtoken'

const validateToken = AsyncHandler(async (req,res,next) => {
    let token ;
    let authHeader = req.headers.Authorization || req.headers.authorization 
    if(authHeader && authHeader.startsWith("Bearer")){
        token = authHeader.split(" ")[1]
        if(!token){
            res.status(401)
            throw new Error ('Token Not provided')
        }
        jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err, decoded) => {
            if(err) {
                res.status(401)
                throw new Error("User is not authorized")
            }
           req.user = decoded.user;
           next()

        })
        
    }

})

export default validateToken