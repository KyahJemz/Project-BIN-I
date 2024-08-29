const formatDate = (timestamp) => {
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
