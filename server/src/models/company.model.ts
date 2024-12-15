import { Schema, model } from 'mongoose';

export interface Company {
    name: string,
    legalNumber: number,
    country: string,
    website: string
}

const companySchema = new Schema<Company>({
    name: { type: String, required: true, },
    legalNumber: { type: Number, required: true },
    country: { type: String, required: true, },
    website: { type: String, required: true, },
}, { timestamps: true })

const CompanyModel = model('Company', companySchema)
export default CompanyModel