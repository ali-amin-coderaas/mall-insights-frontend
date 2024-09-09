import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ApiService from "../../api/ApiService";
import { ResponseData } from "../types/responseDataInterfaces";

type UseApiReturn<T> = {
	data: ResponseData<T> | undefined;
	isLoading: boolean;
	error: Error | null;
	totalItems: number;
	currentPage: number;
	pageSize: number;
	searchQuery: string;
	createItem: (data: T) => void;
	updateItem: (id: number, data: T) => void;
	getItemById: (id: number) => Promise<ResponseData<T> | undefined>;
	deleteItem: (id: number) => void;

	setCurrentPage: (page: number) => void;
	setPageSize: (pageSize: number) => void;
	setSearchQuery: (searchQuery: string) => void;
};

function useApi<T>(endpoint: string, enableUseEffect = false): UseApiReturn<T> {
	const [data, setData] = useState<ResponseData<T> | undefined>(undefined);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<Error | null>(null);
	const [totalItems, setTotalItems] = useState(0);
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
		try {
			const response = await apiService.getAll(
				page,
				pageSize,
				searchQuery,
				sortBy,
				order
			);
			setData(response.data);
			setTotalItems(response.data?.pagination?.totalItems || 0);
		} catch (error) {
			setError(error as Error);
		} finally {
			setIsLoading(false);
		}
	};

	const updateItem = async (id: number, data: any) => {
		setIsLoading(true);
		try {
			const updatedData = await apiService.update(id, data);

			return updatedData;
		} catch (error) {
			setError(error as Error);
		} finally {
			setIsLoading(false);
		}
	};

	const createItem = async (data: T) => {
		setIsLoading(true);
		try {
			await apiService.create(data);
			await fetchData(currentPage, pageSize, searchQuery, sortBy, order);
		} catch (error) {
			setError(error as Error);
		} finally {
			setIsLoading(false);
		}
	};

	const getItemById = async (id: number) => {
		setIsLoading(true);
		try {
			const response = await apiService.getById<ResponseData<T>>(id);
			return response.data;
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
