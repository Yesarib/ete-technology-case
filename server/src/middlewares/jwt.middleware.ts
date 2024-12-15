import { NextFunction, Request, Response } from 'express';
import JWT, { JwtPayload } from 'jsonwebtoken';
import createError from 'http-errors';

export const signToken = (userId:string, userName: string): string => {
    const payload = { userName }
    const secret = "someSecretKeys"
    const options = {
        expiresIn: '4h',
        issuer: 'pickurpage.com',
        audience: userId
    };

    const token = JWT.sign(payload,secret,options);

    return token
}

export const verifyToken = (req:Request, res:Response, next:NextFunction): void => {
    if (!req.headers['authorization']) return next(createError.Unauthorized());

    const authHeader = req.headers['authorization']
    const bearerToken = authHeader.split(' ');
    const token = bearerToken[1];
    const secret = "someSecretKeys"

    JWT.verify(token,secret, (err,payload) => {
        if(err) {
            const message = err.name === 'JsonWebTokenError' ? 'Unauthorized' : err.message;
            return next(createError.Unauthorized(message));
        }
        (req as any).payload = payload
        next()
    })
}