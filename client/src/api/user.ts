import { ErrorResponse } from "../types/error";
import { User } from "../types/user";
import api from "./api";

export const getUserById = async (userId: string): Promise<User | ErrorResponse> => {
    try {
        const responseData = await api.get(`/user/${userId}`);
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