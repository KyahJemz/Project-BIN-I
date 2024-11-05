"use client";

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type AccountState = {
  accountData: any;
  setAccountData: (data: any) => void;
};

export const useAccountStore = create<AccountState>()(
  persist(
    (set) => ({
      accountData: null,
      setAccountData: (data) => set({ accountData: data }),
    }),
    {
      name: "account-storage", // Key for localStorage
      getStorage: () => localStorage, // or sessionStorage if preferred
    }
  )
);