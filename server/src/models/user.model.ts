import { Schema, model } from 'mongoose';

export interface IUser {
    userName:string
    password:string
}

const userSchema = new Schema<IUser>({
    userName: { type: String, required: true, unique: true },
    password: { type: String, required: true },    
}, { timestamps: true })


const User = model('User', userSchema);
export default User;