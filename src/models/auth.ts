import { createEvent, createStore, sample } from "effector";

export type UserData = { _id: string; email: string };

export const $isSignupModalOpened = createStore(false);
export const $isLoginModalOpened = createStore(false);
export const $userData = createStore<null | UserData>(null);
export const $isAuthenticated = $userData.map((data) => !!data?.email);

export const toggleSignupModal = createEvent<boolean>();
export const toggleLoginModal = createEvent<boolean>();
export const updateUserData = createEvent<Partial<UserData>>();
export const clearUserData = createEvent();

$userData
  .on(updateUserData, (prevState, updatedState) => ({
    ...prevState,
    ...updatedState,
  }))
  .reset(clearUserData);

sample({
  clock: toggleSignupModal,
  target: $isSignupModalOpened,
});

sample({
  clock: toggleLoginModal,
  target: $isLoginModalOpened,
});
