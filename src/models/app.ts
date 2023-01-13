import { createEvent, createStore } from "effector";

export const $isDrawerOpened = createStore<boolean>(false);
export const $isAddModalOpened = createStore(false);
export const $isUserProfileOpened = createStore(false);

export const toggleDrawer = createEvent<boolean>();
export const toggleAddModal = createEvent<boolean>();
export const toggleUserProfile = createEvent<boolean>();

$isDrawerOpened.on(toggleDrawer, (_, value) => value);
$isAddModalOpened.on(toggleAddModal, (_, value) => value);
$isUserProfileOpened.on(toggleUserProfile, (_, value) => value);
