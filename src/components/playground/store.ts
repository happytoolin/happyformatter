import { create } from "zustand";

// Define the types for the state
interface CodePlaygroundState {
  input: string;
  output: string;
  setInput: (input: string) => void;
  setOutput: (output: string) => void;
}

// Create the Zustand store with typed state and actions
const useCodePlaygroundStore = create<CodePlaygroundState>((set) => ({
  input: "",
  output: "",
  setInput: (input: string) => set({ input }),
  setOutput: (output: string) => set({ output }),
}));

export default useCodePlaygroundStore;
