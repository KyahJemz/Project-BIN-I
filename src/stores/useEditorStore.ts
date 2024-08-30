import {create} from 'zustand';

type EditorState = {
  editorData: any;
  setEditorData: (data: any) => void;
};

export const useEditorStore = create<EditorState>((set) => ({
  editorData: null,
  setEditorData: (data) => set({ editorData: data }),
}));