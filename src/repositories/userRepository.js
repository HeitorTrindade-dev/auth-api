import { prisma } from "../lib/prisma.js";

export class UserRepository {
  async createUser(email, hashedPassword){
    const user = await prisma.user.create({
      data: {
        email,
        hashedPassword
      }
    });

    return user;
  }

  async getUserByEmail(email){
    const user = await prisma.user.findUnique({
      where: { email }
    });

    return user;
  }
}
