export const formatTimeStamp = (timestamp: string | number | Date) => {
	const date = new Date(timestamp);
	return date.toLocaleDateString();
};
