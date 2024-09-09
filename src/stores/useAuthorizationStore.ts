import {create} from 'zustand';

type AuthorizationState = {
  authorization: string | null;
  setAuthorization: (token: string) => void;
};

export const useAuthorizationStore = create<AuthorizationState>((set) => ({
  authorization: null,
  setAuthorization: (token) => set({ authorization: token }),
}));