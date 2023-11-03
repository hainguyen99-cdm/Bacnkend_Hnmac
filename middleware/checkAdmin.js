const Role = require('../models/enum/role')
const jwt = require('jsonwebtoken')
const {User} =require('./../models/users')

async function checkAdmin(req, res, next) {
    const token = req.header('Authorization'); // Assumption: Token is in the header

    if (token) {
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {
            if (err) {
                console.error(err);
                res.sendStatus(403); // Forbidden
            } else {
                const id = decoded.id;
              
                try {
                    const user = await User.findOne({_id: id});
                    const role = user.role; // Giả sử vai trò của người dùng được lưu trong trường 'role'

                    if (role === 'ADMIN') {      
                        next();
                    } else {
                        console.log("Not permission");
                        res.sendStatus(403); // Forbidden
                    }
                } catch (error) {
                    console.error(error);
                    res.sendStatus(500); // Internal Server Error
                }
            }
        });
    } else {
        res.sendStatus(401); // Unauthorized
    }
}

module.exports = checkAdmin;