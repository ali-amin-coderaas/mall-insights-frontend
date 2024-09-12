import { UseMutationResult } from "@tanstack/react-query";
import { Data } from "./ApiResponseInterfaces";

export type UseApiResponse<T> = {
	data: Data<T> | undefined;
	isLoading: boolean;
	error: Error | null;
	createItemMutation: UseMutationResult<T, Error, T, unknown>;
	updateItemMutation: UseMutationResult<
		T,
		Error,
		{
			id: number;
			updatedData: T;
		},
		unknown
	>;
	getItemById: (id: number) => {
		item: T | undefined;
		isLoading: boolean;
		error: Error | null;
	};
	deleteItemMutation: UseMutationResult<
		void,
		Error,
		{
			id: number;
		},
		unknown
	>;
	searchQuery: string;
	currentPage: number;
	totalItems: number | undefined;
	pageSize: number;
	setCurrentPage: (page: number) => void;
	setPageSize: (pageSize: number) => void;
	setSearchQuery: (searchQuery: string) => void;
};
