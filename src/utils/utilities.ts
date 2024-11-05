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

export function formatCertificateDate(dateString) {
	const date = new Date(dateString);
  
	const day = date.getDate();
	const month = date.toLocaleString('default', { month: 'long' });
	const year = date.getFullYear();
  
	const daySuffix = (day) => {
	  if (day % 10 === 1 && day !== 11) return `${day}st`;
	  if (day % 10 === 2 && day !== 12) return `${day}nd`;
	  if (day % 10 === 3 && day !== 13) return `${day}rd`;
	  return `${day}th`;
	};
  
	return `${daySuffix(day)} of ${month} ${year}`;
  }


