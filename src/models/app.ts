import { createEvent, createStore } from "effector";

export const $isDrawerOpened = createStore<boolean>(false);

export const toggleDrawer = createEvent<boolean>();

$isDrawerOpened.on(toggleDrawer, (_, value) => value);
