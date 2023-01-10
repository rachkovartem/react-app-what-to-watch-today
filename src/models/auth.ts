import { createEvent, createStore, sample } from "effector";

export const $isAuthenticated = createStore(false);
export const $isSignupModalOpened = createStore(false);

export const toggleSignupModal = createEvent<boolean>();

sample({
  clock: toggleSignupModal,
  target: $isSignupModalOpened,
});
