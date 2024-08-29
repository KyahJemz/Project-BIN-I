import EditorParser from './EditorParser';
interface PreviewRendererProps {
	data: any;
}
export default function PreviewRenderer({ data }: PreviewRendererProps) {
	const { convertDataToHtml } = EditorParser();

	let htmlContent;
	try {
		console.log('parsing this data:', data.blocks);
		htmlContent = convertDataToHtml(data.blocks);
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
