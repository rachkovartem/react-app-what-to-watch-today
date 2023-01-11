import { ApolloClient, gql, InMemoryCache } from "@apollo/client";
import env from "./env";

const typeDefs = gql`
  type Film {
    kinopoiskId: Float!
    imdbId: String!
    nameRu: String!
    nameEn: String!
    nameOriginal: String!
    posterUrl: String!
    posterUrlPreview: String!
    coverUrl: String!
    logoUrl: String!
    reviewsCount: Float!
    ratingGoodReview: Float!
    ratingGoodReviewVoteCount: Float!
    ratingKinopoisk: Float!
    ratingKinopoiskVoteCount: Float!
    ratingImdb: Float!
    ratingImdbVoteCount: Float!
    ratingFilmCritics: Float!
    ratingFilmCriticsVoteCount: Float!
    ratingAwait: Float!
    ratingAwaitCount: Float!
    ratingRfCritics: Float!
    ratingRfCriticsVoteCount: Float!
    webUrl: String!
    year: String!
    filmLength: String!
    slogan: String!
    description: String!
    shortDescription: String!
    editorAnnotation: String!
    isTicketsAvailable: Boolean!
    productionStatus: String!
    type: String!
    ratingMpaa: String!
    ratingAgeLimits: String!
    hasImax: String!
    has3D: Boolean!
    lastSync: String!
    startYear: String!
    endYear: String!
    serial: Boolean!
    shortFilm: Boolean!
    completed: Boolean!
  }

  type User {
    _id: String!
    name: String!
    email: String!
    password: String!
    films: [Film!]!
    subscriptions: [User!]!
    subscribers: [User!]!
  }

  type UserOmitPassword {
    _id: String!
    name: String!
    email: String!
    films: [Film!]!
    subscriptions: [User!]!
    subscribers: [User!]!
  }

  type PostContent {
    text: String!
    images: [String!]!
    videos: [String!]!
  }

  type Post {
    _id: String!
    author: User!
    date: String!
    likes: [String!]!
    content: PostContent!
  }

  type Query {
    getFilms: [Film!]!
    getSubscriptions: [User!]!
    getSubscribers: [User!]!
    login(email: String!, password: String!): UserOmitPassword!
    profile: User!
    refresh: String!
    logout: Boolean!
    myPosts: [Post!]!
  }

  type Mutation {
    addFilm(kinopoiskId: Float!): String!
    createSubscription(recipientId: String!): String!
    createUser(
      name: String!
      email: String!
      password: String!
    ): UserOmitPassword!
    createPost(text: String!, images: [String!]!, videos: [String!]!): Post!
    likePost(postId: String!): Post!
    dislikePost(postId: String!): Post!
  }
`;

const apolloClient = new ApolloClient({
  uri: env.API_URL,
  cache: new InMemoryCache(),
  typeDefs,
  credentials: "include",
});

export default apolloClient;
