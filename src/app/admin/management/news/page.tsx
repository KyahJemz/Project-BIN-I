'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';
import PreviewRenderer from '@/components/EditorJs/PreviewRenderer';

const Editor = dynamic(() => import('@/components/EditorJs/Editor'), {
	ssr: false,
});

export default function EditorPage() {
	return (
		<div className="grid grid-cols-2 gap-2 m-2">
			<div className="col-span-1">
				<h1>Editor</h1>
				<div className="border rounded-md">
					<Editor holder="editorjs-container" />
				</div>
			</div>
			<div className="col-span-1">
				<h1>Preview</h1>
				<div className="border rounded-md">
					<div className="p-16">
						<PreviewRenderer  />
					</div>
				</div>
			</div>
		</div>
	);
}
