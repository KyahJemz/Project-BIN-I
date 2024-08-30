import React, { useEffect, useRef } from "react";
import EditorJS, { OutputData } from "@editorjs/editorjs";
import { EDITOR_TOOLS } from "./EditorTools";
import { useEditorStore } from '@/stores/useEditorStore';

type EditorProps = {
  holder: string;
};

export default function Editor({ holder }: EditorProps) {
  const ref = useRef<EditorJS | null>(null);
  const { editorData, setEditorData } = useEditorStore();

  useEffect(() => {
    if (!ref.current) {
      const editor = new EditorJS({
        holder: holder,
        tools: EDITOR_TOOLS,
        data: editorData,  // Use Zustand's state
        async onChange(api) {
          const data = await api.saver.save();
          setEditorData(data);  // Update Zustand's state
        },
      });
      ref.current = editor;
    }

    return () => {
      if (ref.current && ref.current.destroy) {
        ref.current.destroy();
        ref.current = null;
      }
    };
  }, []);

  return <div id={holder} className="prose max-w-full" />;
}