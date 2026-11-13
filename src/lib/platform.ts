import { Capacitor } from "@capacitor/core";

/** true dentro do app Capacitor (Android/iOS); false no site e no PWA. */
export const isNative = Capacitor.isNativePlatform();

/** Endereço público do jogo (no app, `window.location` é https://localhost). */
export const SITE_URL = "https://alphabet-critter-keys.ksepisteme.com.br/";
