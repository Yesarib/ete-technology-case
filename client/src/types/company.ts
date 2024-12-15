export interface Company {
    _id: string
    name: string,
    legalNumber: number,
    country: string,
    website: string,
    createdAt?: Date,
    updatedAt?: Date
}