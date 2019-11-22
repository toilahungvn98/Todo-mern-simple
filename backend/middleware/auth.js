const config = require('config');
const jwt = require('jsonwebtoken');


const secretKey = config.get('secretOrKey');


const auth = (req, res , next) => {
  //get the token from the header if present
    const token = req.headers["x-access-token"] || req.headers["authorization"];

    if(!token) {
        return res.status(401).json({ authFail : 'Access denied'});
        
    }
    
    try {
        //verify token
        const decoded = jwt.verify(token,secretKey);
        //add user from payload
        req.user = decoded;
        next();
    } catch (err) {
        res.status(400).json({ authFail : 'Token is inValid'});
    }

}

module.exports = auth;