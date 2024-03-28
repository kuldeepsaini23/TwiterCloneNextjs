import { Tweet } from "@prisma/client";
import { prismaClient } from "../clients/db";
import { GraphqlContext } from "../interfaces";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import UserService from "../services/user";
import TweetService, { CreateTweetPayload } from "../services/tweet";
// import {
//   S3Client,
//   PutObjectCommand,
// } from "@aws-sdk/client-s3";
// import { getSignedUrl } from "@aws-sdk/s3-request-presigner";


const mutations = {
  createTweet: async (
    parent: any,
    { payload }: { payload: CreateTweetPayload },
    ctx: GraphqlContext
  ) => {
    if (!ctx.user) throw new Error("You are not authenticated");
    const tweet = await TweetService.createTweet({
      ...payload,
      userId: ctx.user.id,
    })

    return tweet;
  },
};

const extraResolvers = {
  Tweet: {
    author: (parent: Tweet) => {
      return UserService.getUserById(parent.authorId);
    },
  },
};

//Making an s3 client
const s3Client = new S3Client({
  region: process.env.S3_REGION as string,
  credentials: {
    accessKeyId: process.env.S3_ACCESS_Id as string,
    secretAccessKey: process.env.S3_ACCESS_KEY as string,
  },
});

const queries = {
  getAllTweets: () =>
    TweetService.getAllTweets(),
  getSignedURLForTweet: async (
    parent: any,
    { imageType, imageName }: { imageType: string; imageName: string },
    ctx: GraphqlContext 
  ) => {
    if (!ctx.user || !ctx.user.id) throw new Error("Unauthenticated");
    const allowedImageTypes = ["jpeg", "jpg", "png", "webp"];
    if (!allowedImageTypes.includes(imageType))
      throw new Error("Invalid image type");

    const putObjectCommand = new PutObjectCommand({
      Bucket: process.env.S3_BUCKET_NAME as string,
      Key: `/uploads/${
        ctx.user.id
      }/tweets/${imageName}-${Date.now()}.${imageType}`,
    });

    const signedURL = await getSignedUrl(s3Client, putObjectCommand);

    return signedURL;
  },
};

export const resolvers = {
  mutations,
  queries,
  extraResolvers,
};
