import { RequestHandler } from "express";
import User, { IUser } from "../models/user.model";
import createError from 'http-errors'

export const getUserById: RequestHandler = async (req, res, next) => {
    try {
        const { userId } = req.params
        const user = await User.findById(userId);

        if(!user) {
            throw createError.NotFound('user not found!')
        }

        res.status(200).json(user)
    } catch (error) {
        next(error)
    }
}