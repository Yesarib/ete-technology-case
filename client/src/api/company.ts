import { Company } from "../types/company";
import { ErrorResponse } from "../types/error";
import api from "./api";

const newCompany = async (formData: Company): Promise<Company | ErrorResponse> => {
    try {
        const responseData = await api.post('/company', formData);
        if (!responseData) {
            console.log(responseData);
            return { message: 'No response data' };
        }

        const responseObj = responseData.data;

        return responseObj
    } catch (error) {
        console.error(error);
        return { message: 'An error occurred during new company' };
    }
}

const getCompanies = async (): Promise<Company[] | ErrorResponse> => {
    try {
        const responseData = await api.get('/company');
        if (!responseData) {
            console.log(responseData);
            return { message: 'No response data' };
        }

        const responseObj = responseData.data;

        return responseObj
    } catch (error) {
        console.error(error);
        return { message: 'An error occurred during new company' };
    }
}

const getCompanyById = async (companyId: string): Promise<Company | ErrorResponse> => {
    try {
        const responseData = await api.get(`/company/${companyId}`);
        if (!responseData) {
            console.log(responseData);
            return { message: 'No response data' };
        }

        const responseObj = responseData.data;

        return responseObj
    } catch (error) {
        console.error(error);
        return { message: 'An error occurred during new company' };
    }
}

const updateCompany = async (companyId: string, formData: Company): Promise<Company | ErrorResponse> => {
    try {
        const responseData = await api.put(`/company/${companyId}`, formData);
        if (!responseData) {
            console.log(responseData);
            return { message: 'No response data' };
        }

        const responseObj = responseData.data;

        return responseObj
    } catch (error) {
        console.error(error);
        return { message: 'An error occurred during new company' };
    }
}

const deleteCompany = async (companyId: string): Promise<number | ErrorResponse> => {
    try {
        const responseData = await api.delete(`/company/${companyId}`);
        if (!responseData) {
            console.log(responseData);
            return { message: 'No response data' };
        }
        return responseData.status;
    } catch (error) {
        console.error(error);
        return { message: 'An error occurred during new company' };
    }
} 

export const companyService = {
    newCompany,
    getCompanies,
    getCompanyById,
    updateCompany,
    deleteCompany
}