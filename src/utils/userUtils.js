import bcrypt from "bcrypt";

export class UserUtils{
    validateCredentials(email,password){
        if(!email || !email.includes('@')){
            throw new Error("Insert an valid email");
        }
        if(!password || password.length < 8){
            throw new Error("The password must have 8 characters");
        }
    }
    async verifyPassword(user,password){
        const isValidPassword = await bcrypt.compare(password, user.hashedPassword);

        if(!isValidPassword){
            throw new Error("Invalid password");
        }

        return isValidPassword;
    }
}
