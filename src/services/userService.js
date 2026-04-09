import { UserRepository } from "../repositories/userRepository.js";
import { UserUtils } from "../utils/userUtils.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const userRepository = new UserRepository();
const userUtils = new UserUtils();

export class UserService{
    async createUser(email, password){
        userUtils.validateCredentials(email,password);

        const existingUser = await userRepository.getUserByEmail(email);

        if(existingUser){
            throw new Error("This email already exists in the database");
        }

        const hashedPassword = await bcrypt.hash(password,10);
        
        const newUser = await userRepository.createUser(email,hashedPassword);

        return newUser;
    }

    async login(email,password){
        userUtils.validateCredentials(email,password);

        const user = await userRepository.getUserByEmail(email);

        if(!user){
            throw new Error("Invalid email");
        }

        await userUtils.verifyPassword(user,password);

        if(!process.env.JWT_SECRET){
            throw new Error("JWT_SECRET is not configured");
        }

        const token = jwt.sign(
            { userId: user.id },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        return token;
    }
}
