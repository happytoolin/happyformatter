import { atom } from "nanostores";

export const inputStore = atom(`{
  "greeting": "Welcome to HappyFormatter!",
  "instructions": [
    "Type or paste JSON here",
    "Or choose a sample above",
    "HappyFormatter will format your code"
  ]
}`);

export const formattedStore = atom(`{
  "greeting": "Welcome to HappyFormatter!",
  "instructions": [
    "Type or paste JSON here",
    "Or choose a sample above",
    "HappyFormatter will format your code"
  ]
}`);

export const jsonValidStore = atom(true);
