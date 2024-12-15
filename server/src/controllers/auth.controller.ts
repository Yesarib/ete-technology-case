import { RequestHandler } from "express"
import User from "../models/user.model"
import createError from 'http-errors'
import { getHashedPassword, isValidPassword } from "../utils/auth.utils"
import { signToken } from "../middlewares/jwt.middleware"

interface LoginRegister {
    userName: string,
    password: string
}

interface AuthResponseBody {
    success: boolean
    token: string
}

export const login: RequestHandler<null, AuthResponseBody, LoginRegister, null> = async (req, res, next) => {
    try {
        const { userName, password } = req.body
        const user = await User.findOne({ userName: userName })

        if (!user) {
            throw createError.NotFound('user not found!')
        }

        const isMatch = await isValidPassword(password, user.password);
        if (!isMatch) {
            throw createError.Unauthorized('username or password is not valid!')
        }

        const token = signToken(String(user._id), user.userName);

        res.status(200).json({ success: true, token })
    } catch (error) {
        next(error)
    }
}

export const register: RequestHandler<null, AuthResponseBody, LoginRegister, null> = async (req, res, next) => {
    try {
        const { userName, password } = req.body
        const user = await User.findOne({ userName: userName })

        if (user) {
            throw createError.Conflict('this username already used!')
        }

        const hashedPassword = await getHashedPassword(password);

        const newUser = new User({ userName: userName, password: hashedPassword });
        await newUser.save();

        const token = signToken(String(newUser._id),newUser.userName);
        res.status(200).json({ success: true, token })
    } catch (error) {
        next(error)
    }
}

