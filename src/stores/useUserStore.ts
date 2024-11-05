"use client";

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type UserState = {
  userData: any;
  setUserData: (data: any) => void;
};

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      userData: null,
      setUserData: (data) => set({ userData: data }),
    }),
    {
      name: "user-storage",
      getStorage: () => localStorage,
    }
  )
);