const { User } = require('../../models/users')
const ROLE = require('../../models/enum/role')
const bcrypt = require("bcrypt")
const config = require('../../config/config')
const jwt = require('jsonwebtoken')

require('dotenv').config();

let AuthService = {
    registerUser: async function (req) {
        return new Promise(async function (resolve, reject) {
            try {
                const check = await validateBody(req)
                if (check) {
                    return reject(new Error(check))
                }

                const userName = req.body.userName
                const filter = { 'userName': userName }
                const user = await User.findOne(filter, { _id: 0, createdAt: 0, updatedAt: 0, __v: 0 })
                if (user) return reject(new Error("Ten dang nhap da ton tai"))
                const passWord = req.body.passWord
                const name = req.body.name
                // const role = ROLE.ADMIN
                const passwordHash = await createPasswod(passWord)
                await User({
                    userName: userName,
                    passWord: passwordHash,
                    name: name,
                    role: role
                }).save()
                return resolve(true)
            } catch (e) {
                console.log(e)
                reject(new Error("Loi khi tao tai khoan"))
            }
        })
    },
    LoginUser: async function (req) {
        return new Promise(async function (resolve, reject) {
            try {
                const userName = req.body.userName
                const passWord = req.body.passWord
                let user = await getUser(userName)

                if (!user) {
                    return res.status(401).json(new ResponseData(false, "User name do not exist",).toJson())
                }

                const isPassWordValid = await validateUser(passWord, user.passWord)

                if (!isPassWordValid) {
                    return res.status(401).json(new ResponseData(false, "Password incorrect",).toJson())
                }
                const id =user._id.toString()
                const tokens = generateTokens({id,userName})
                const response = await User.findOneAndUpdate({ userName: userName }, { refreshToken: tokens.refreshToken })
                let userInfo = await User.findOne({ _id: user._id }, { passWord: 0, __v: 0, createdAt: 0, updatedAt: 0, refreshToken: 0 })
                return resolve({ userInfo, tokens })
            } catch (e) {
                console.log(e)
                reject(new Error("Loi khi dang nhap"))
            }
        })
    }, LogoutUser: async function (req) {
        return new Promise(async function (resolve, reject) {
            try {
                const userId = req.body.userId
                const response = await User.findOneAndUpdate({ _id: userId }, { refreshToken: null })
                resolve(true)

            } catch (e) {
                console.log(e)
                reject(new Error("Loi logout"))
            }
        })
    },
    Token: async function (req) {
        return new Promise(async function (resolve, reject) {
            try {
                const refreshToken = req.body.refreshToken
                if (!refreshToken) reject(false)
                const user = await User.findOne({ refreshToken: refreshToken })
                if (!user) reject(false)
                jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET)
                const tokens = generateTokens(user._id,user.userName)
                const response = await User.findOneAndUpdate({ userName: user.userName }, { refreshToken: tokens.refreshToken })
                return resolve(tokens)
            } catch (e) {
                console.log(e)
                reject(new Error("Loi Token"))
            }
        })
    }
}
async function getUser(userName) {
    try {
        return new Promise((resolve, reject) => {
            User.findOne({ userName: userName }, (err, data) => {
                if (err) return reject(err)
                return resolve(data)
            })
        })
    } catch (e) {
        console.log(e)
        throw e
    }
}
async function validateBody(req) {
    if (!req.body.userName) return 'Nhap thieu userName'
    if (!req.body.passWord) return 'Nhap thieu userName'
    if (!req.body.name) return 'Nhap thieu userName'
    return null
}
async function createPasswod(passWord) {
    return new Promise(async function (resolve, reject) {
        try {
            const saltRounds = Number.parseInt(config.SALT_ROUNDS)
            const salt = await bcrypt.genSalt(saltRounds)
            const hash = await bcrypt.hash(passWord, salt)
            return resolve(hash)
        } catch (e) {
            return reject(e)
        }
    })
}
function  generateTokens (payload) {
    const { id, username } = payload
    // Create JWT

    const accessToken = jwt.sign(
        { id, username },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: '30m'
        }
    )

    const refreshToken = jwt.sign(
        { id, username },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: '30d'
        }
    )

    return { accessToken, refreshToken }
}
function validateUser(passWord, hash) {
    return new Promise(async function (resolve, reject) {
        bcrypt
            .compare(passWord, hash)
            .then(res => {
                console.log(res)
                return resolve(res) // return true
            })
            .catch(err => reject(err))
    })
}


module.exports = AuthService 