import { gql } from "@apollo/client";


export const SIGNUP_USER = gql`
mutation SignupUser($userNew: UserInput!) {
    signupUser(userNew: $userNew) {
      id
      email
      firstName
      lastName
    }
  }
`

export const SIGNIN_USER = gql`
mutation SigninUser($userSignin: UserSigninInput) {
    signinUser(userSignin: $userSignin) {
      token
    }
  }
`

export const SEND_MSG = gql`
mutation Mutation($text: String!, $receiverId: Int!) {
  createMassage(text: $text, receiverId: $receiverId) {
    text
    senderId
    receiverId
    id
    createdAt
  }
} 
`