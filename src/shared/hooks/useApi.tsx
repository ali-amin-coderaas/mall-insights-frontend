import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import ApiService from "../../api/ApiService";
import { Data } from "../types/ApiResponseInterfaces";
import { UseApiResponse } from "./types/useApiInterfaces";

// Define a type for the API response

function useApi<T>(endpoint: string): UseApiResponse<T> {
	const [searchParams, setSearchParams] = useSearchParams();
	const queryClient = useQueryClient();

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

	const queryKey = [
		endpoint,
		currentPage,
		pageSize,
		searchQuery,
		sortBy,
		order,
	];
	const queryFn = () =>
		apiService.getAll<T>(currentPage, pageSize, searchQuery, sortBy, order);

	const { data, isLoading, error } = useQuery<Data<T>>({
		queryKey,
		queryFn,
	});

	const totalItems = data?.pagination?.totalItems;

	// Mutations
	const createItemMutation = useMutation<T, Error, T>({
		mutationFn: (newData: T) => apiService.create(newData),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [endpoint] });
		},
	});

	const updateItemMutation = useMutation<
		T,
		Error,
		{ id: number; updatedData: T }
	>({
		mutationFn: (x) => apiService.update(x.id, x.updatedData),

		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [endpoint] });
		},
	});

	const getItemById = (id: number) => {
		const { data, isLoading, error } = useQuery<T>({
			queryKey: [endpoint, id],
			queryFn: () => apiService.getById(id),
		});

		return { item: data, isLoading, error };
	};

	const deleteItemMutation = useMutation<void, Error, { id: number }>({
		mutationFn: async (x) => {
			console.log("aaaa");
			return await apiService.softDelete(x.id);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [endpoint] });
		},
	});

	return {
		data,
		isLoading,
		error,
		createItemMutation,
		updateItemMutation,
		getItemById,
		deleteItemMutation,
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
