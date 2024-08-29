// @ts-nocheck
import React, { useEffect, useRef } from 'react';
import EditorJS, { EditorConfig } from '@editorjs/editorjs';
import { EDITOR_TOOLS } from './EditorTools';

const Editor = ({ data, onChange, holder }) => {
	const ref = useRef(null);

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
