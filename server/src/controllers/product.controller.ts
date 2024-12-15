import { RequestHandler } from "express";
import ProductModel, { Product } from "../models/product.model";
import createError from 'http-errors'

export const newProduct: RequestHandler = async (req, res, next) => {
    try {
        const productData = req.body;

        const product = new ProductModel(productData);
        await product.save();

        res.status(201).json(product)
    } catch (error) {
        next(error)
    }
}

export const products: RequestHandler = async (req, res, next) => {
    try {
        const products = await ProductModel.find().populate('company');

        res.status(200).json(products)
    } catch (error) {
        next(error)
    }
}

export const getProductById: RequestHandler = async (req, res, next) => {
    try {
        const { productId } = req.params
        const product = await ProductModel.findById(productId).populate('company');

        if (!product) {
            throw createError.NotFound('product not found!')
        }

        res.status(200).json(product)
    } catch (error) {
        next(error)
    }
}

export const updateProduct: RequestHandler = async (req, res, next) => {
    try {
        const { productId } = req.params
        const productData: Product = req.body;
        console.log(productData);

        const product = await ProductModel.findByIdAndUpdate(productId, productData, { new: true });
        if (!product) {
            throw createError.NotFound('product not found!')
        }

        res.status(201).json(product)
    } catch (error) {
        next(error)
    }
}

export const deleteProduct: RequestHandler = async (req, res, next) => {
    try {
        const { productId } = req.params
        const product = await ProductModel.findByIdAndDelete(productId);
        if (!product) {
            throw createError.NotFound('product not found!')
        }

        res.status(201).end()
    } catch (error) {
        next(error)
    }
}