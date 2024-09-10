import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ApiService from "../../api/ApiService";
import { Data } from "../types/ApiResponseInterfaces";

// Define a type for the API response
type UseApiResponse<T> = {
	data: Data<T> | undefined;
	isLoading: boolean;
	error: Error | null;
	createItem: (data: T) => Promise<T | undefined>;
	updateItem: (id: number, data: T) => Promise<T | undefined>;
	getItemById: (id: number) => Promise<T | undefined>;
	deleteItem: (id: number) => Promise<void>;
	searchQuery: string;
	currentPage: number;
	totalItems: number | undefined;
	pageSize: number;
	setCurrentPage: (page: number) => void;
	setPageSize: (pageSize: number) => void;
	setSearchQuery: (searchQuery: string) => void;
};

function useApi<T>(
	endpoint: string,
	enableUseEffect = false
): UseApiResponse<T> {
	const [data, setData] = useState<Data<T> | undefined>(undefined);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<Error | null>(null);
	const [totalItems, setTotalItems] = useState<number | undefined>(undefined);
	const [searchParams, setSearchParams] = useSearchParams();

	const apiService = new ApiService(endpoint);

	const currentPage = parseInt(searchParams.get("page") || "1", 10);
	const pageSize = parseInt(searchParams.get("pageSize") || "10", 10);
	const searchQuery = searchParams.get("q") || "";
	const sortBy = searchParams.get("sortBy") || "createdAt";
	const order = searchParams.get("order") || "desc";

	const updateURLParams = (field: string, value: string | number) => {
		setSearchParams((curr) => {
			curr.set(field, value.toString());
			return curr;
		});
	};

	const fetchData = async (
		page = currentPage,
		pageSize: number,
		searchQuery: string,
		sortBy: string,
		order: string
	) => {
		setIsLoading(true);
		setError(null); // Reset error state before fetching

		try {
			const response = await apiService.getAll<T>(
				page,
				pageSize,
				searchQuery,
				sortBy,
				order
			);
			setData(response);
			setTotalItems(response.pagination?.totalItems);
		} catch (error) {
			setError(error as Error);
		} finally {
			setIsLoading(false);
		}
	};

	const updateItem = async (id: number, data: T) => {
		setIsLoading(true);
		try {
			const updatedItem = await apiService.update(id, data);
			await fetchData(currentPage, pageSize, searchQuery, sortBy, order);
			return updatedItem;
		} catch (error) {
			setError(error as Error);
		} finally {
			setIsLoading(false);
		}
	};

	const createItem = async (data: T) => {
		setIsLoading(true);
		try {
			const response = await apiService.create(data);
			await fetchData(currentPage, pageSize, searchQuery, sortBy, order);
			return response;
		} catch (error) {
			setError(error as Error);
		} finally {
			setIsLoading(false);
		}
	};

	const getItemById = async (id: number) => {
		setIsLoading(true);
		try {
			const item = await apiService.getById<T>(id);
			return item;
		} catch (error) {
			setError(error as Error);
		} finally {
			setIsLoading(false);
		}
	};

	const deleteItem = async (id: number) => {
		setIsLoading(true);
		try {
			await apiService.softDelete(id);
		} catch (error) {
			setError(error as Error);
		} finally {
			setIsLoading(false);
		}
	};

	if (enableUseEffect) {
		useEffect(() => {
			fetchData(currentPage, pageSize, searchQuery, sortBy, order);
		}, [currentPage, pageSize, searchQuery, sortBy, order]);
	}

	return {
		data,
		isLoading,
		error,
		createItem,
		updateItem,
		getItemById,
		deleteItem,
		searchQuery,
		currentPage,
		totalItems,
		pageSize,
		setCurrentPage: (page: number) => updateURLParams("page", page),
		setPageSize: (pageSize: number) => updateURLParams("pageSize", pageSize),
		setSearchQuery: (searchQuery: string) => updateURLParams("q", searchQuery),
	};
}

export default useApi;
