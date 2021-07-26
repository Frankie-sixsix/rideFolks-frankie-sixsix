require('dotenv').config();
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY;

const security = {

    checkjWT: async (req,res,next)=> {
        const token = req.headers['x-access-token'] || req.headers['authorization'];
        if (!!token && token.startsWith('Bearer ')) {
            token = token.slice(7, token.length);
        }
        console.log("toktoken",token);

        if (token) {
            jwt.verify(token, SECRET_KEY, (err, decoded) => {
                if (err) {
                    return res.status(401).json('token_not_valid');
                } else {
                    req.decoded = decoded;
    
                    const expiresIn = 24 * 60 * 60;
                    const newToken  = jwt.sign({
                        last_name: decoded.last_name,
                        first_name: decoded.first_name,
                        id: decoded.id
                    },
                    SECRET_KEY,
                    {
                        expiresIn: expiresIn
                    });

                    
    
                    res.header('Authorization', 'Bearer ' + newToken);
                    next();
                }
            });
        } else {
            return res.status(401).json('token_required');
        }
    }
}

module.exports = security;