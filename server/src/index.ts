import dotenv from 'dotenv'
dotenv.config();
import './config/mongo'
import express, { NextFunction, Request, Response } from 'express'
import bodyParser from 'body-parser';
import createError from 'http-errors'
import routes from './routes';
import cors from 'cors'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get('/check', (req, res) => {
    res.json({ msg: "online" })
})

app.use('/', routes())

// HTTP ERRORS
app.use(async (req, res, next) => {
    next(createError.NotFound());
});

interface CustomError extends Error {
    status?: number;
}

app.use((err:CustomError, req:Request, res:Response, next:NextFunction) => {
    res.status(err.status || 500);
    res.send({
        error: {
            status: err.status || 500,
            message: err.message,
        },
    });
});

const PORT:number = 8080

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);  
})