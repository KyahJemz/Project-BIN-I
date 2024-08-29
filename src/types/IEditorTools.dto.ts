import { OutputData } from '@editorjs/editorjs';

export interface IEditorTools {
	data: OutputData; // Typing for the initial data
	onChange: (data: OutputData) => void; // Function called on change
	holder: string; // ID of the holder element
}
