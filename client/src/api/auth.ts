import { LoginResponse, RegisterResponse } from "../types/auth";
import { ErrorResponse } from "../types/error";
import api from "./api";

export const login = async (userName: string, password: string): Promise<LoginResponse | ErrorResponse> => {
    try {
        const responseData = await api.post('/auth/login', {
            userName: userName,
            password: password
        });

        if (!responseData) {
            console.log(responseData);
            return { message: 'No response data' };
        }

        const responseObj = responseData.data;
        return responseObj
    } catch (error) {
        console.error(error);
        return { message: 'An error occurred during login' };
    }
}

export const register = async (userName: string, password: string): Promise<RegisterResponse | ErrorResponse> => {
    try {
        const responseData = await api.post('/auth/register', {
            userName,
            password
        });

        if (!responseData) {
            console.log(responseData);
            return { message: 'No response data' };
        }

        const responseObj = responseData.data;
        return responseObj
    } catch (error) {
        console.error(error);
        return { message: 'An error occurred during login' };
    }
}