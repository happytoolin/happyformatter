import { atom } from "nanostores";

export const inputJSONStore = atom(`{
  "greeting": "Welcome to HappyFormatter!",
  "instructions": [
    "Type or paste JSON here",
    "Or choose a sample above",
    "HappyFormatter will format your code"
  ]
}`);

export const formattedJSONStore = atom(`{
  "greeting": "Welcome to HappyFormatter!",
  "instructions": [
    "Type or paste JSON here",
    "Or choose a sample above",
    "HappyFormatter will format your code"
  ]
}`);
