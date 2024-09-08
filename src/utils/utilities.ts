export const formatFullDate = (timestamp) => {
	const date = new Date(timestamp);
	const formattedDate = new Intl.DateTimeFormat('en-US', {
		month: 'short',
		day: '2-digit',
		year: 'numeric',
		hour: 'numeric',
		minute: 'numeric',
		hour12: true,
	}).format(date);

	return formattedDate;
};

export const formatDate = (timestamp) => {
	const date = new Date(timestamp);
	const formattedDate = new Intl.DateTimeFormat('en-US', {
		month: 'short',
		day: '2-digit',
		year: 'numeric',
	}).format(date);

	return formattedDate;
};

export const formatTime = (timestamp) => {
	const date = new Date(timestamp);
	const formattedDate = new Intl.DateTimeFormat('en-US', {
		hour: 'numeric',
		minute: 'numeric',
		hour12: true,
	}).format(date);

	return formattedDate;
};

export function capitalizeFirstLetter(word) {
    if (!word) return ''; 
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}


