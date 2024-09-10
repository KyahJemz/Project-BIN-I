"use client";

import {create} from 'zustand';

type AccountState = {
  accountData: any;
  setAccountData: (data: any) => void;
};

export const useAccountStore = create<AccountState>((set) => ({
  accountData: null,
  setAccountData: (data) => set({ accountData: data }),
}));