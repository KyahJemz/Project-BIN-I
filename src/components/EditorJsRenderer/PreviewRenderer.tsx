import { useEditorStore } from '@/stores/useEditorStore';
import EditorParser from '../EditorJsParser/EditorParser';
interface PreviewRendererProps {
	data: any;
}
export default function PreviewRenderer(data: PreviewRendererProps | null = null) {
	const { convertDataToHtml } = EditorParser();
	const { editorData } = useEditorStore();

	let htmlContent;
	try {
		console.log('parsing this data:', data?.data ?? editorData.blocks);
		htmlContent = convertDataToHtml(data?.data ?? editorData.blocks);
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
