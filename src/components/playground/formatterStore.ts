import { getInitialCode } from "@/lib/initialCode";
import { create } from "zustand";

interface FormatterState {
  code: string;
  language: string;
  setCode: (code: string) => void;
  setLanguage: (language: string) => void;
  initializeCode: (language: string) => void;
}

export const useFormatterStore = create<FormatterState>((set, get) => ({
  code: "",
  language: "",

  setCode: (code: string) => set({ code }),

  setLanguage: (language: string) => set({ language }),

  initializeCode: (language: string) => {
    const initialCode = getInitialCode(language);
    set({ code: initialCode, language });
  },
}));
