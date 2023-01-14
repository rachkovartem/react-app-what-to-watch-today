import { createEvent, createStore, createEffect, sample } from "effector";
import apolloClient from "../config/apollo-client";
import { AuthService } from "../services/AuthService";

export type UserData = { _id: string; email: string };

export const $isSignupModalOpened = createStore(false);
export const $isLoginModalOpened = createStore(false);
export const $userData = createStore<null | UserData>(null);
export const $isAuthenticated = $userData.map((data) => !!data?.email);

export const toggleSignupModal = createEvent<boolean>();
export const toggleLoginModal = createEvent<boolean>();
export const updateUserData = createEvent<Partial<UserData>>();
export const clearUserData = createEvent();

export const checkAuthFx = createEffect(async () => {
  const result = await apolloClient.query({
    query: AuthService.AUTH_CHECK,
  });
  return result?.data?.profile;
});

export const logoutFx = createEffect(async () =>
  apolloClient.query({ query: AuthService.LOGOUT })
);

$userData
  .on(updateUserData, (prevState, updatedState) => ({
    ...prevState,
    ...updatedState,
  }))
  .on(checkAuthFx.doneData, (_, data) => data)
  .reset(clearUserData);

sample({
  clock: toggleSignupModal,
  target: $isSignupModalOpened,
});

sample({
  clock: toggleLoginModal,
  target: $isLoginModalOpened,
});
