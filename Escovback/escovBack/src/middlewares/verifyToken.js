const jwt = require('jsonwebtoken')

exports.verifyToken = (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(401).send("unauthorized req")
    }
    let token = req.headers.authorization.split(' ')[1]
    // console.log(token);
    if (token == 'null') {
        return res.status(401).send("unauthorized req")
    }
    let payload = jwt.verify(token, process.env.SECRETKEY)
    if (!payload) {
        return res.status(401).send("unauthorized req")
    }
    // console.log("in middleware");
    //console.log(payload.subject);
    console.log("payload"+payload.subject);
    console.log("token"+token)
 
    req.userId = payload.subject;
    req.email = payload.email;
     //console.log(req.userId);
    //console.log(req.email);
    next()
}



function verifyToken(req,res,next){
    let token = req.query.token;
  
   let payload= jwt.verify(token,process.env.TOKEN_SECRET, function(err, tokendata){
    if (!payload) {
        return res.status(401).send("unauthorized req")
    }
      if(tokendata){
        req.userId = payload.subject;
        req.email = payload.email;
        next();
      }
    })
  }