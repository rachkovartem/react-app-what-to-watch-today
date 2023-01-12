import { gql } from "@apollo/client";

export const AuthService = {
  SIGNUP: gql`
    mutation CreateUser($name: String!, $email: String!, $password: String!) {
      createUser(name: $name, email: $email, password: $password) {
        _id
      }
    }
  `,

  LOGIN: gql`
    query Login($email: String!, $password: String!) {
      login(email: $email, password: $password) {
        _id
        email
      }
    }
  `,

  AUTH_CHECK: gql`
    {
      profile {
        name
        email
        _id
      }
    }
  `,

  LOGOUT: gql`
    {
      logout
    }
  `,
};
