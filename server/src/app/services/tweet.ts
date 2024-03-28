import { prismaClient } from "../clients/db";
import { redisClient } from "../clients/redis";

export interface CreateTweetPayload {
  content: string;
  imageURL?: string;
  userId:string
}


class TweetService {
  public static async createTweet(payload: CreateTweetPayload) {
    const rateLimitFlag = await redisClient.get(`RATE_LIMIT:TWEET:${payload.userId}`);
    if(rateLimitFlag){
      throw new Error("Please Wait...");
    }
    const tweet = await prismaClient.tweet.create({
      data:{
        content: payload.content,
        imageURL: payload.imageURL,
        author: { connect: { id: payload.userId } },
      }
    })
    await redisClient.setex(`RATE_LIMIT:TWEET:${payload.userId}`,10,1);
    redisClient.del("ALL_TWEETS");
    return tweet;
  }

  public static async getAllTweets(){
    const cachedTweets = await redisClient.get("ALL_TWEETS");
    if(cachedTweets){
      return JSON.parse(cachedTweets);
    }
    const tweets =  await prismaClient.tweet.findMany({ orderBy: { createdAt: "desc" } })
    await redisClient.set("ALL_TWEETS", JSON.stringify(tweets));
    return tweets;
  }
}
export default TweetService;