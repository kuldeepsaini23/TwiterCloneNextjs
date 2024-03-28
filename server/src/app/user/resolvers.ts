import axios from "axios";
import { prismaClient } from "../clients/db";
import JWTService from "../services/jwt";
import { GraphqlContext } from "../interfaces";

interface GoogleTokenResult {
  iss?: string;
  azp?: string;
  aud?: string;
  sub?: string;
  email: string;
  email_verified: string;
  nbf?: number;
  name?: string;
  picture?: string;
  given_name: string;
  family_name?: string;
  locale: string;
  iat?: number;
  exp?: number;
  jti?: string;
  alg?: string;
  kid?: string;
  typ?: string;
}

const queries = {
  verifyGoogleToken: async (parent: any, { token }: { token: string }) => {
    const googleToken = token;
    const googleOauth = new URL("https://oauth2.googleapis.com/tokeninfo");
    googleOauth.searchParams.set("id_token", googleToken);

    const { data } = await axios.get<GoogleTokenResult>(
      googleOauth.toString(),
      {
        responseType: "json",
      }
    );

    // Check for user in our database
    const user = await prismaClient.user.findUnique({
      where: {
        email: data.email,
      },
    });

    // if user doesnot exist then create user
    if(!user){
      await prismaClient.user.create({
        data:{
          email: data.email,
          firstName: data.given_name,
          lastName: data.family_name,
          profileImageURL: data.picture,
        }
      })
    }

    const userInDb = await prismaClient.user.findUnique({
      where:{
        email:data.email
      }
    })
    if(!userInDb) throw new Error("User not found")

    const userToken = JWTService.generateToken(userInDb)
    return userToken;
  },

  getCurrentUser: async (parent: any, args: any, ctx: GraphqlContext) => {
    console.log(ctx);
    const id = ctx.user?.id;
    if(!id) return null;

    const user = await prismaClient.user.findUnique({
      where:{
        id
      }
    })

    return user;
  }
};

export const resolver = {
  queries,
};
