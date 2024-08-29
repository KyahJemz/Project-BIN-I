'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';
import PreviewRenderer from '@/components/EditorJs/PreviewRenderer';

// Dynamically load the Editor component, ensuring it's only rendered on the client side.
const Editor = dynamic(() => import('@/components/EditorJs/Editor'), {
	ssr: false,
});

export default function EditorPage() {
	const [data, setData] = useState<any>(null); // Use `any` for initial testing
	return (
		<div className="grid grid-cols-2 gap-2 m-2">
			<div className="col-span-1">
				<h1>Editor</h1>
				<div className="border rounded-md">
					<Editor
						data={data}
						onChange={setData}
						holder="editorjs-container"
					/>
				</div>
			</div>
			<div className="col-span-1">
				<h1>Preview</h1>
				<div className="border rounded-md">
					<div className="p-16">
						{data ? (
							<PreviewRenderer data={data} />
						) : (
							<p>No data available</p>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
