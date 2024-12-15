import { RequestHandler } from "express";
import CompanyModel, { Company } from "../models/company.model";
import { ObjectId } from "mongoose";
import createError from 'http-errors'

export const newCompany: RequestHandler = async (req, res, next) => {
    try {
        const companyData = req.body;

        const company = new CompanyModel(companyData);
        await company.save();

        res.status(201).json(company)
    } catch (error) {
        next(error)
    }
}

export const companies: RequestHandler = async (req, res, next) => {
    try {
        const companies = await CompanyModel.find();

        res.status(200).json(companies)
    } catch (error) {
        next(error)
    }
}

export const getCompanyById: RequestHandler = async (req, res, next) => {
    try {
        const { companyId } = req.params
        const company = await CompanyModel.findById(companyId);

        if (!company) {
            throw createError.NotFound('company not found')
        }

        res.status(200).json(company)
    } catch (error) {
        next(error)
    }
}

export const updateCompany: RequestHandler = async (req, res, next) => {
    try {
        const { companyId } = req.params
        const companyData = req.body;
        const company = await CompanyModel.findByIdAndUpdate(companyId, companyData, { new: true });

        if (!company) {
            throw createError.NotFound('company not found')
        }
        res.status(200).json(company)
    } catch (error) {
        next(error)
    }
}

export const deleteCompany: RequestHandler = async (req, res, next) => {
    try {
        const { companyId } = req.params
        const company = await CompanyModel.findByIdAndDelete(companyId);

        if (!company) {
            throw createError.NotFound('company not found')
        }

        res.status(204).end();
    } catch (error) {
        next(error)
    }
}

