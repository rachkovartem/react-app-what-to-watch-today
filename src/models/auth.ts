import { createEvent, createStore, sample } from "effector";

export type UserData = { _id: string; email: string };

export const $isSignupModalOpened = createStore(false);
export const $userData = createStore<null | UserData>(null);
export const $isAuthenticated = $userData.map((data) => !!data?.email);

export const toggleSignupModal = createEvent<boolean>();
export const updateUserData = createEvent<Partial<UserData>>();

$userData.on(updateUserData, (prevState, updatedState) => ({
  ...prevState,
  ...updatedState,
}));

sample({
  clock: toggleSignupModal,
  target: $isSignupModalOpened,
});
