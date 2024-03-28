import { prismaClient } from "../clients/db";
import { redisClient } from "../clients/redis";
import { GraphqlContext } from "../interfaces";
import UserService from "../services/user";
import { User } from "@prisma/client";

const queries = {
  verifyGoogleToken: async (parent: any, { token }: { token: string }) => {
    const resultToken = await UserService.verifyGoogleAuthToken(token);
    return resultToken;
  },

  getCurrentUser: async (parent: any, args: any, ctx: GraphqlContext) => {
    console.log(ctx);
    const id = ctx.user?.id;
    if (!id) return null;

    const user = await UserService.getUserById(id);

    return user;
  },

  getUserById: async (
    parent: any,
    { id }: { id: string },
    ctx: GraphqlContext
  ) => UserService.getUserById(id),
};

const extraResolvers = {
  User: {
    tweets: (parent: any) =>
      prismaClient.tweet.findMany({
        where: {
          author: {
            id: parent.id,
          },
        },
      }),

    follower: async (parent: User) => {
      const results = await prismaClient.follows.findMany({
        where: { following: { id: parent.id } },
        include: {
          following: true,
          follower: true,
        },
      });
      return results.map((ele) => ele.follower);
    },

    following: async (parent: User) => {
      const results = await prismaClient.follows.findMany({
        where: { follower: { id: parent.id } },
        include: {
          following: true,
          follower: true,
        },
      });
      return results.map((ele) => ele.following);
    },
    recommendedUsers: async (parent: User, _: any, ctx: GraphqlContext) => {
      
      if (!ctx.user || !ctx.user.id) return [];

      //Redis 
      const cachedValue = await redisClient.get(`RECOMMENDED_USERS:${ctx.user.id}`);
      if(cachedValue) return JSON.parse(cachedValue);

      const myFollowings = await prismaClient.follows.findMany({
        where: {
          follower: { id: ctx.user.id },
        },
        include: {
          following: {
            include: {
              follower: {
                include:{
                  following: true,
                  follower: true,
                }
              },
            }
          },
        },
      });

      const users: User[] = [];

      for (const followings of myFollowings) {
        for (const followingOfFollowedUser of followings.following.follower) {
          if (
            followingOfFollowedUser.following.id !== ctx.user.id &&
            myFollowings.findIndex(
              (e) => e?.followerId === followingOfFollowedUser.following.id
            ) < 0
          ) {
            users.push(followingOfFollowedUser.following);
          }
        }
      }

      //Redis
      await redisClient.set(`RECOMMENDED_USERS:${ctx.user.id}`, JSON.stringify(users));

      return users;
    },
  },
};

//Mutations
const mutations = {
  followUser: async (
    parent: any,
    { to }: { to: string },
    ctx: GraphqlContext
  ) => {
    if (!ctx.user || !ctx.user.id) throw new Error("User not authenticated");
    await UserService.followUser(ctx.user.id, to);
    redisClient.del(`RECOMMENDED_USERS:${ctx.user.id}`);
    return true;
  },

  unfollowUser: async (
    parent: any,
    { to }: { to: string },
    ctx: GraphqlContext
  ) => {
    if (!ctx.user || !ctx.user.id) throw new Error("User not authenticated");
    await UserService.unfollowUser(ctx.user.id, to);
    redisClient.del(`RECOMMENDED_USERS:${ctx.user.id}`);
    return true;
  },
};

export const resolver = {
  queries,
  extraResolvers,
  mutations,
};
