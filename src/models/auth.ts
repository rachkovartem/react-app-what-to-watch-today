import { createEvent, createStore, createEffect, sample } from "effector";
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
  try {
    return await AuthService.checkAuth();
  } catch (e) {
    await AuthService.refresh();
    return await AuthService.checkAuth();
  }
});

export const logoutFx = createEffect(AuthService.logout);

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
