import { Product } from "../types/product";
import { ErrorResponse } from "../types/error";
import api from "./api";

interface UpdateProduct extends Product {
    selectedCompany: string
}

const newProduct = async (formData: Product): Promise<Product | ErrorResponse> => {
    try {
        const responseData = await api.post('/product', formData);
        if (!responseData) {
            console.log(responseData);
            return { message: 'No response data' };
        }

        const responseObj = responseData.data;

        return responseObj
    } catch (error) {
        console.error(error);
        return { message: 'An error occurred during new Product' };
    }
}

const getProducts = async (): Promise<Product[] | ErrorResponse> => {
    try {
        const responseData = await api.get('/product');
        if (!responseData) {
            console.log(responseData);
            return { message: 'No response data' };
        }

        const responseObj = responseData.data;

        return responseObj
    } catch (error) {
        console.error(error);
        return { message: 'An error occurred during new Product' };
    }
}

const getProductById = async (productId: string): Promise<Product | ErrorResponse> => {
    try {
        const responseData = await api.get(`/Product/${productId}`);
        if (!responseData) {
            console.log(responseData);
            return { message: 'No response data' };
        }

        const responseObj = responseData.data;

        return responseObj
    } catch (error) {
        console.error(error);
        return { message: 'An error occurred during new Product' };
    }
}

const updateProduct = async (productId: string, formData: UpdateProduct): Promise<Product | ErrorResponse> => {
    try {
        const responseData = await api.put(`/product/${productId}`, {
            name: formData.name,
            category: formData.category,
            amount: formData.amount,
            unit: formData.unit,
            company: formData.selectedCompany
        });

        if (!responseData) {
            console.log(responseData);
            return { message: 'No response data' };
        }

        const responseObj = responseData.data;

        return responseObj
    } catch (error) {
        console.error(error);
        return { message: 'An error occurred during new Product' };
    }
}

const deleteProduct = async (productId: string): Promise<number | ErrorResponse> => {
    try {
        const responseData = await api.delete(`/product/${productId}`);
        if (!responseData) {
            console.log(responseData);
            return { message: 'No response data' };
        }
        return responseData.status;
    } catch (error) {
        console.error(error);
        return { message: 'An error occurred during new Product' };
    }
}

export const productService = {
    newProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct
}