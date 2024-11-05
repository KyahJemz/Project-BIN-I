"use client";

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type EditorState = {
  editorData: any;
  setEditorData: (data: any) => void;
};

export const useEditorStore = create<EditorState>()(
  persist(
    (set) => ({
      editorData: null,
      setEditorData: (data) => set({ editorData: data }),
    }),
    {
      name: "editor-storage",
      getStorage: () => localStorage,
    }
  )
);