import { gql } from "@apollo/client";
import apolloClient from "../config/apollo-client";

export const GQL_QUERIES = {
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

  REFRESH: gql`
    query refresh {
      refresh
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

export const AuthService = {
  checkAuth: async () => {
    const result = await apolloClient.query({
      query: GQL_QUERIES.AUTH_CHECK,
    });

    return result?.data?.profile;
  },
  refresh: async () => {
    const result = await apolloClient.query({ query: GQL_QUERIES.REFRESH });
    return result?.data;
  },
  signUp: async (variables: {
    name: string;
    email: string;
    password: string;
  }) => {
    const result = await apolloClient.mutate({
      mutation: GQL_QUERIES.SIGNUP,
      variables,
    });
    return result?.data?.createUser;
  },
  login: async (variables: { email: string; password: string }) => {
    const result = await apolloClient.mutate({
      mutation: GQL_QUERIES.LOGIN,
      variables,
    });
    return result?.data?.login;
  },
  logout: () => apolloClient.query({ query: GQL_QUERIES.LOGOUT }),
};
