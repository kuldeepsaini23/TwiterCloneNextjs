import { graphql } from "@/gql";

export const getAllTweets = graphql(`#graphql
  query GetAllTweets {
    getAllTweets {
      id
      content
      imageURL
      author {
        id
        firstName
        lastName
        profileImageURL
      }
    }
  }
 `)

 export const getSignedURLForTweetQuery = graphql(`#graphql
  query GetSignedURL($imageType: String!, $imageName: String!) {
  getSignedURLForTweet(imageType: $imageType, imageName: $imageName)
}
 
 `)