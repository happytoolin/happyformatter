import { createStore } from "zustand/vanilla";

// Define the types for the state
interface CodePlaygroundState {
  input: string;
  output: string;
  setInput: (input: string) => void;
  setOutput: (output: string) => void;
}

// Define the types for the state
const store = createStore<CodePlaygroundState>((set) => ({
  input: "",
  output: "",
  setInput: (input) => set({ input }),
  setOutput: (output) => set({ output }),
}));

export default store;
