import {
	useMutation,
	UseMutationResult,
	useQuery,
	useQueryClient,
} from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import ApiService from "../../api/ApiService";
import { Data } from "../types/ApiResponseInterfaces";

// Define a type for the API response
type UseApiResponse<T> = {
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
			queryClient.invalidateQueries({ queryKey: ["data"] });
		},
	});

	const getItemById = (id: number) => {
		const { data, isLoading, error } = useQuery<T>({
			queryKey: ["data", id],
			queryFn: () => apiService.getById(id),
		});

		return { item: data, isLoading, error };
	};

	const deleteItemMutation = useMutation<void, Error, { id: number }>({
		mutationFn: (x) => {
			return apiService.softDelete(x.id);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["data"] });
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
