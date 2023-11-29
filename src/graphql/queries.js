import { gql } from "@apollo/client";


export const GET_USERS = gql`
query GetUsers {
  users {
    lastName
    firstName
    id
  }
}
`

export const GET_MESSAGES = gql`
query MassagesByUser($receiverId: Int!) {
    massagesByUser(receiverId: $receiverId) {
      text
      senderId
      receiverId
      id
      createdAt
    }
  }
`