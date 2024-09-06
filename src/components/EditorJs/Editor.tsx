import React, { useEffect, useRef } from "react";
import EditorJS from "@editorjs/editorjs";
import { EDITOR_TOOLS } from "./EditorTools";
import { useEditorStore } from '@/stores/useEditorStore';

type EditorProps = {
  holder: string;
  content?: any;
  refreshTrigger?: any;
};

export default function Editor({ holder, content, refreshTrigger }: EditorProps) {
  const ref = useRef<EditorJS | null>(null);
  const { editorData, setEditorData } = useEditorStore();

  useEffect(() => {
    if (!ref.current) {
      console.log("data to display in editor: ", editorData);
      const editor = new EditorJS({
        holder: holder,
        tools: EDITOR_TOOLS,
        data: content ?? editorData,
        async onChange(api) {
          const data = await api.saver.save();
          setEditorData(data);
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
  }, [refreshTrigger]);

  return <div id={holder} className="prose max-w-full" />;
}