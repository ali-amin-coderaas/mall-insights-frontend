export const getSeverityForAccountType = (type: any, accountTypes: any[]) => {
	const accountType = accountTypes.find(
		(item: { value: any }) => item.value === type
	);
	return accountType ? accountType.severity : null;
};
