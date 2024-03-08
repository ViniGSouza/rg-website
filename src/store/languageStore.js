import { create } from "zustand";

const useLanguageStore = create((set) => ({
  isPortuguese: navigator.language === "pt-BR" ? true : false,
  setIsPortuguese: (value) => set({ isPortuguese: value }),
}));

export default useLanguageStore;