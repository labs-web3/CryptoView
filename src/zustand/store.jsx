import { create } from "zustand";

export const useCryptoStore = create((set) => ({
  cryptos: [],
  setCryptos: (cryptos) => set({ cryptos }),
}));
