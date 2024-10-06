const checkAcessRole = (requiredRole)=>{
    return(req,res,next)=>{

        if(!req.user){
            return res.status(401).json({msg:'No User authenticated found'})
        }

        if(req.user.role!==requiredRole){
            return res.status(401).json({msg:'Access Denied'})
        }
        next()
    }
}

module.exports = checkAcessRole