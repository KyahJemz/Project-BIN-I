'use client';

import PreviewRenderer from '@/components/EditorJs/PreviewRenderer';
import {
	useCreateAnnouncementHook,
	useGetAllAnnouncementsHook,
	useGetAnnouncementByIdHook,
	useUpdateAnnouncementHook,
	useDeleteAnnouncementHook,
} from '@/hooks/announcements.hooks';
import { useEditorStore } from '@/stores/useEditorStore';
import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';

const Editor = dynamic(() => import('@/components/EditorJs/Editor'), {
	ssr: false,
});


const AnnouncementsManagement = () => {

	const {
		createAnnouncement,
		isLoading: isCreating,
		error: createError,
		response: createResponse,
	} = useCreateAnnouncementHook();
	const {
		getAllAnnouncements,
		isLoading: isGettingAll,
		error: getAllError,
		response: getAllResponse,
	} = useGetAllAnnouncementsHook();
	const {
		getAnnouncementById,
		isLoading: isGettingById,
		error: getByIdError,
		response: getByIdResponse,
	} = useGetAnnouncementByIdHook();
	const {
		updateAnnouncement,
		isLoading: isUpdating,
		error: updateError,
		response: updateResponse,
	} = useUpdateAnnouncementHook();
	const {
		deleteAnnouncement,
		isLoading: isDeleting,
		error: deleteError,
		response: deleteResponse,
	} = useDeleteAnnouncementHook();

	const [announcementData, setAnnouncementData] = useState({
		title: '',
		author: '',
		content: '',
		image: '',
	});
	const [announcementId, setAnnouncementId] = useState('');
	const [updateAnnouncementData, setUpdateAnnouncementData] = useState({ ...announcementData });
	const { editorData, setEditorData } = useEditorStore();

	useEffect(() => {
		if (editorData) {
		  setAnnouncementData(prevData => ({ ...prevData, content: JSON.stringify(editorData) }));
		}
	  }, [editorData]);


	  
	// const onUpdateHandler = () => {
	// 	setAnnouncementData({ ...announcementData, content: editorData })
	// };

	// const onCreateHandler = () => {
	// 	setAnnouncementData({ ...announcementData, content: editorData })
	// 	createAnnouncement(announcementData);
	// 	setEditorData(null);
	// };

	return (
		<div>
			<br />
			<br />
			<h2>Create Announcement</h2>
			<input
				type="text"
				placeholder="Title"
				value={announcementData.title}
				onChange={(e) =>
					setAnnouncementData({ ...announcementData, title: e.target.value })
				}
			/>
			<input
				type="text"
				placeholder="Author"
				value={announcementData.author}
				onChange={(e) =>
					setAnnouncementData({ ...announcementData, author: e.target.value })
				}
			/>
			<div className="col-span-1">
				<h1>Editor</h1>
				<div className="border rounded-md">
					<Editor holder="editorjs-container"/>
				</div>
			</div>
			<input
				type="text"
				placeholder="Image URL"
				value={announcementData.image}
				onChange={(e) =>
					setAnnouncementData({ ...announcementData, image: e.target.value })
				}
			/>
			<button
				onClick={() => createAnnouncement(announcementData)}
				disabled={isCreating}
			>
				{isCreating ? 'Creating...' : 'Create Announcement'}
			</button>
			{createError && <p>Error: {createError}</p>}
			{createResponse && <p>Announcement created successfully!</p>}

			<br />
			<br />
			<h2>Get Announcement By ID</h2>
			<input
				type="text"
				placeholder="Announcement ID"
				value={announcementId}
				onChange={(e) => setAnnouncementId(e.target.value)}
			/>
			<button
				onClick={() => getAnnouncementById(announcementId)}
				disabled={isGettingById}
			>
				{isGettingById ? 'Getting Announcement...' : 'Get Announcement'}
			</button>
			{getByIdError && <p>Error: {getByIdError}</p>}
			{getByIdResponse && (
				<>
					<p>Announcement Data: {JSON.stringify(getByIdResponse)}</p>
					<div className="col-span-1">
					<h1>Preview</h1>
					<div className="border rounded-md">
						<div className="p-16">
							{console.log('parsing this ssssssss:', JSON.parse(getByIdResponse.content).blocks)}
							<PreviewRenderer data={JSON.parse(getByIdResponse.content).blocks}/>
						</div>
					</div>
					</div>
				</>
			)}

			<br />
			<br />
			<h2>Get All Announcements</h2>
			<button onClick={getAllAnnouncements} disabled={isGettingAll}>
				{isGettingAll ? 'Getting Announcements...' : 'Get All Announcements'}
			</button>
			{getAllError && <p>Error: {getAllError}</p>}
			{getAllResponse && (
				<p>All Announcements: {JSON.stringify(getAllResponse)}</p>
			)}

			<br />
			<br />
			<h2>Update Announcement</h2>
			<input
				type="text"
				placeholder="Announcement ID"
				value={announcementId}
				onChange={(e) => setAnnouncementId(e.target.value)}
			/>
			<input
				type="text"
				placeholder="Title"
				value={updateAnnouncementData.title}
				onChange={(e) =>
					setUpdateAnnouncementData({ ...updateAnnouncementData, title: e.target.value })
				}
			/>
			<input
				type="text"
				placeholder="Author"
				value={updateAnnouncementData.author}
				onChange={(e) =>
					setUpdateAnnouncementData({ ...updateAnnouncementData, author: e.target.value })
				}
			/>
			<textarea
				placeholder="Content"
				value={updateAnnouncementData.content}
				onChange={(e) =>
					setUpdateAnnouncementData({ ...updateAnnouncementData, content: e.target.value })
				}
			/>
			<input
				type="text"
				placeholder="Image URL"
				value={updateAnnouncementData.image}
				onChange={(e) =>
					setUpdateAnnouncementData({ ...updateAnnouncementData, image: e.target.value })
				}
			/>
			<button
				onClick={() => updateAnnouncement(announcementId, updateAnnouncementData)}
				disabled={isUpdating}
			>
				{isUpdating ? 'Updating...' : 'Update Announcement'}
			</button>
			{updateError && <p>Error: {updateError}</p>}
			{updateResponse && <p>Announcement updated successfully!</p>}

			<br />
			<br />
			<h2>Delete Announcement</h2>
			<input
				type="text"
				placeholder="Announcement ID"
				value={announcementId}
				onChange={(e) => setAnnouncementId(e.target.value)}
			/>
			<button
				onClick={() => deleteAnnouncement(announcementId)}
				disabled={isDeleting}
			>
				{isDeleting ? 'Deleting...' : 'Delete Announcement'}
			</button>
			{deleteError && <p>Error: {deleteError}</p>}
			{deleteResponse && <p>Announcement deleted successfully!</p>}
		</div>
	);
};

export default AnnouncementsManagement;