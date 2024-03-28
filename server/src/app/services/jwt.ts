import { User } from "@prisma/client";
import { prismaClient } from "../clients/db";
import JWT from "jsonwebtoken";
import { JWTUser } from "../interfaces";

class JWTService {
  public static generateToken(user: User) {
    const paylaod: JWTUser = {
      id: user?.id,
      email: user?.email,
    };

    const token = JWT.sign(paylaod, process.env.JWT_SECRET as string);
    return token;
  }

  public static decodeToken(token: string) {
    try {
      const decoded = JWT.verify(
        token,
        process.env.JWT_SECRET as string
      ) as JWTUser;
      return decoded;
    } catch (error) {
      return null;
    }
  }
}

export default JWTService;
