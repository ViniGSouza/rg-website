import { create } from "zustand";

const useLanguageStore = create((set) => ({
  isPortuguese: true,
  setIsPortuguese: (value) => set({ isPortuguese: value }),
}));

export default useLanguageStore;