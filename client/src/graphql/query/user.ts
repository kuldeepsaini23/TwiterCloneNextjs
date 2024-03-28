import { graphql } from "../../gql";

export const verifyUserGoogleTokenQuery = graphql(`#graphql
  query verifyUserGoogleToken($token: String!) {
    verifyGoogleToken(token: $token)
  }
`);

export const getCurrentUserQuery = graphql(`#graphql
  query GetCurrentUser {
    getCurrentUser {
      id
      email
      firstName
      lastName
      profileImageURL
      recommendedUsers{
        id
        firstName
        lastName
        profileImageURL
      }
      follower{
        id
        firstName
        lastName
        profileImageURL
      }
      following{
        id
        firstName
        lastName
        profileImageURL
      }
      tweets {
        id
        content
        author {
          id
          firstName
          lastName
          profileImageURL
        }
      }
    }
  }
`);

export const getUserByIdQuery = graphql(`#graphql
  query GetUserById($id: String!) {
    getUserById(id: $id) {
      id
      firstName
      lastName
      profileImageURL
      recommendedUsers{
        id
        firstName
        lastName
        profileImageURL
      }
      follower{
        firstName
        lastName
        profileImageURL
      }
      following{
        firstName
        lastName
        profileImageURL
      }
      tweets {
        content
        id
        author {
          id
          firstName
          lastName
          profileImageURL
        }
      }
    }
  }
`);
