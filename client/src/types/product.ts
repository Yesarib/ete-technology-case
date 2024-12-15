import { Company } from "./company"

export interface Product {
    _id: string,
    name: string,
    category: string
    amount: number,
    unit: string,
    company: Company,
    createdAt?: Date,
    updatedAt?: Date
}