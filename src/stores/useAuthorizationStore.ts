"use client";

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type AuthorizationState = {
  authorization: string | null;
  setAuthorization: (token: string) => void;
};

export const useAuthorizationStore = create<AuthorizationState>()(
  persist(
    (set) => ({
      authorization: null,
      setAuthorization: (token) => set({ authorization: token }),
    }),
    {
      name: "authorization-storage",
      getStorage: () => localStorage,
    }
  )
);