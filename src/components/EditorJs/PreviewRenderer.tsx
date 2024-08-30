import EditorParser from './EditorParser';
import { useEditorStore } from '@/stores/useEditorStore';
interface PreviewRendererProps {
	data: any;
}
export default function PreviewRenderer() {
	const { convertDataToHtml } = EditorParser();
	const { editorData } = useEditorStore();

	let htmlContent;
	try {
		console.log('parsing this data:', editorData.blocks);
		htmlContent = convertDataToHtml(editorData.blocks);
	} catch (error) {
		console.error('Error parsing EditorJS data:', error);
		htmlContent = '<p>Error rendering content</p>';
	}

	return (
		<div className="prose max-w-full">
			<div dangerouslySetInnerHTML={{ __html: htmlContent }} />
		</div>
	);
}
