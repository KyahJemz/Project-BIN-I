"use client";

import {create} from 'zustand';

type UserState = {
  userData: any;
  setUserData: (data: any) => void;
};

export const useUserStore = create<UserState>((set) => ({
  userData: null,
  setUserData: (data) => set({ userData: data }),
}));