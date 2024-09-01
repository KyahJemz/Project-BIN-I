import {create} from 'zustand';

type AccountState = {
  accountData: any;
  setEditorData: (data: any) => void;
};

export const useEditorStore = create<AccountState>((set) => ({
  accountData: null,
  setEditorData: (data) => set({ accountData: data }),
}));