import { getInitialCode } from "@/lib/initialCode";
import { atom } from "nanostores";

const initialCodeMap: { [key: string]: string } = {};

export const inputStore = atom("");
export const formattedStore = atom("");
export const jsonValidStore = atom(true);

export function initializeStores(language: string) {
  if (!initialCodeMap[language]) {
    initialCodeMap[language] = getInitialCode(language);
  }

  const initialCode = initialCodeMap[language];

  inputStore.set(initialCode);
  formattedStore.set(initialCode);
}

export function resetStores() {
  inputStore.set("");
  formattedStore.set("");
  jsonValidStore.set(true);
}
