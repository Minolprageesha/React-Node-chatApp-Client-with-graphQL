import { gql } from "@apollo/client";


export const MSG_SUB = gql`
subscription Subscription {
    messageAdded {
      text
      senderId
      receiverId
      id
      createdAt
    }
  }
`
