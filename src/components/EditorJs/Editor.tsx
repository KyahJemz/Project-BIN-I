import React, { useEffect, useRef } from 'react';
import EditorJS, { OutputData } from '@editorjs/editorjs';
import { EDITOR_TOOLS } from './EditorTools';

interface EditorProps {
	data: OutputData; // Typing for the initial data
	onChange: (data: OutputData) => void; // Function called on change
	holder: string; // ID of the holder element
}

const Editor: React.FC<EditorProps> = ({ data, onChange, holder }) => {
	const ref = useRef<EditorJS | null>(null);

	useEffect(() => {
		if (!ref.current) {
			const editor = new EditorJS({
				holder: holder,
				tools: EDITOR_TOOLS,
				data,
				async onChange(api) {
					const outputData = await api.saver.save();
					onChange(outputData);
				},
			});
			ref.current = editor;
		}

		return () => {
			if (ref.current && ref.current.destroy) {
				ref.current.destroy();
			}
		};
	}, [data, onChange, holder]);

	return <div id={holder}></div>;
};

export default Editor;
