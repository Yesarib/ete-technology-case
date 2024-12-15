import { ObjectId, Schema, model } from 'mongoose';

export interface Product {
    name: string,
    category: string
    amount: number,
    unit: string,
    company: ObjectId
}

const productSchema = new Schema<Product>({
    name: { type: String, required: true },
    category: { type: String, required: true },
    amount: { type: Number, required: true },
    unit: { type: String, required: true },
    company: { type: Schema.Types.ObjectId, ref: 'Company', required: true },
}, { timestamps: true })

const ProductModel = model('Product', productSchema)
export default ProductModel;