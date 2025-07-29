import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { apiClient, apiResponse, apiErrorResponse } from './api-gateway';
import { PostErrorConfig } from './error-config';

/**
 * Creates a set of API hooks for a specific entity
 * @param entityName - The name of the entity (used in API paths and query keys)
 * @param entityNameFormatted - The formatted name for toast messages
 * @param additionalQueriesToInvalidate - Additional query keys to invalidate on mutations
 * @returns Object containing all the CRUD operation hooks for the entity
 */
export function createApiConfig<T>(
  entityName: string,
  entityNameFormatted: string,
  additionalQueriesToInvalidate: string[] = []
) {
  /**
   * Helper function to invalidate both the entity query and any additional queries
   */
  const invalidateQueries = (queryClient: QueryClient) => {
    // Always invalidate the primary entity
    queryClient.invalidateQueries({ queryKey: [entityName] });

    // Invalidate each additional query key if provided
    if (additionalQueriesToInvalidate.length > 0) {
      additionalQueriesToInvalidate.forEach((queryKey) => {
        queryClient.invalidateQueries({ queryKey: [queryKey] });
      });
    }
  };

  // GET all entities
  const useGetAll = (
    queryParams?: Record<string, any>,
    options?: Partial<UseQueryOptions<T[], Error>>
  ) => {
    // Create a stable query key by stringifying the params
    const stableQueryKey = queryParams ? JSON.stringify(queryParams) : 'all';

    return useQuery({
      queryKey: [entityName, stableQueryKey],
      queryFn: async () => {
        try {
          const response = await apiClient.get(`/${entityName}`, {
            params: queryParams,
          });

          return apiResponse(
            response.data,
            `${entityNameFormatted} fetched successfully`
          );
        } catch (error) {
          console.error(`Error fetching ${entityNameFormatted}:`, error);
          throw apiErrorResponse(
            `Failed to fetch ${entityNameFormatted}`,
            error
          );
        }
      },
      ...options,
    });
  };

  // GET entity by ID
  const useGetById = (id: string) => {
    return useQuery({
      queryKey: [entityName, id],
      queryFn: async () => {
        try {
          const { data } = await apiClient.get(`/${entityName}/${id}`);
          return apiResponse(
            data?.data,
            `${entityNameFormatted} fetched successfully`
          );
        } catch (error) {
          console.error(`Error fetching ${entityNameFormatted} by ID:`, error);
          throw apiErrorResponse(
            `Failed to fetch ${entityNameFormatted}`,
            error
          );
        }
      },
      enabled: !!id,
    });
  };

  const useGetByIdWithQueryParams = (
    id: string,
    queryParams?: Record<string, any>,
    options?: Partial<UseQueryOptions<T, Error>>
  ) => {
    // Create a stable query key by stringifying the params
    const stableQueryKey = queryParams ? JSON.stringify(queryParams) : 'single';

    return useQuery({
      queryKey: [entityName, id, stableQueryKey],
      queryFn: async () => {
        try {
          const { data } = await apiClient.get(`/${entityName}/${id}`, {
            params: queryParams,
          });
          return apiResponse(
            data?.data,
            `${entityNameFormatted} fetched successfully`
          );
        } catch (error) {
          console.error(
            `Error fetching ${entityNameFormatted} with query params:`,
            error
          );
          throw apiErrorResponse(
            `Failed to fetch ${entityNameFormatted}`,
            error
          );
        }
      },
      enabled: !!id,
      ...options,
    });
  };

  // CREATE entity
  const useCreate = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: async (entityData: T) => {
        try {
          const response = await apiClient.post(`${entityName}`, entityData);
          return apiResponse(
            response.data,
            `${entityNameFormatted} created successfully`
          );
        } catch (error) {
          console.error(`Error creating ${entityNameFormatted}:`, error);
          throw apiErrorResponse(
            `Failed to create ${entityNameFormatted}`,
            error
          );
        }
      },
      onSuccess: (data: any) => {
        invalidateQueries(queryClient);
        if (entityName !== 'shiftassigned') {
          toast.success(
            data.message || `${entityNameFormatted} Created Successfully`
          );
        }
      },
      onError: (error: any) => {
        const errorMessage = PostErrorConfig({ error, entityNameFormatted });
        toast.error(errorMessage);
      },
      retry: false,
      onMutate: () => {
        toast.dismiss();
      },
    });
  };

  // UPDATE entity
  const useUpdate = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: async ({
        entityData,
        _id,
      }: {
        entityData: T;
        _id: string;
      }) => {
        try {
          const response = await apiClient.patch(
            `${entityName}/${_id}`,
            entityData
          );
          return apiResponse(
            response.data,
            `${entityNameFormatted} updated successfully`
          );
        } catch (error) {
          console.error(`Error updating ${entityNameFormatted}:`, error);
          throw apiErrorResponse(
            `Failed to update ${entityNameFormatted}`,
            error
          );
        }
      },
      onSuccess: (data: any) => {
        invalidateQueries(queryClient);
        toast.success(
          data.message || `${entityNameFormatted} Updated Successfully`
        );
      },
      onError: (error: any) => {
        console.log('Error type:', typeof error);
        console.log('Full error:', error);

        console.log(error?.error, 'errorsssss');

        // Handle string error
        if (typeof error === 'string') {
          toast.error(error);
          return;
        }

        // Handle axios error
        if (error.response?.data) {
          const errorData = error.response.data;
          console.log('Error response data:', errorData);

          // Try to get the duplicate entry message
          if (
            errorData.error &&
            Array.isArray(errorData.error) &&
            errorData.error.length > 0
          ) {
            toast.error(errorData.error[0].message);
            return;
          }

          // Fallback to general message
          if (errorData.message) {
            toast.error(errorData.message);
            return;
          }
        }

        // Direct access attempt if the error might be the response itself
        if (
          error.error &&
          Array.isArray(error.error) &&
          error.error.length > 0
        ) {
          toast.error(error.error[0].message);
          return;
        }

        // Last resort
        toast.error(`Error Updating ${entityNameFormatted}`);
      },
      retry: false,
      onMutate: () => {
        toast.dismiss();
      },
    });
  };

  // DELETE entity
  const useDelete = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: async (id: string) => {
        try {
          const response = await apiClient.delete(`${entityName}?id=[${id}]`);
          return apiResponse(
            response.data,
            `${entityNameFormatted} deleted successfully`
          );
        } catch (error) {
          console.error(`Error deleting ${entityNameFormatted}:`, error);
          throw apiErrorResponse(
            `Failed to delete ${entityNameFormatted}`,
            error
          );
        }
      },
      onSuccess: (data: any) => {
        invalidateQueries(queryClient);
        toast.success(
          data.message || `${entityNameFormatted} Deleted Successfully`
        );
      },
      onError: () => {
        toast.error(`Error Deleting ${entityNameFormatted}`);
      },
    });
  };

  const useDeleteByQuery = (queryParams?: Record<string, any>) => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: async () => {
        try {
          const response = await apiClient.delete(`${entityName}`, {
            params: queryParams,
          });
          return apiResponse(
            response.data,
            `${entityNameFormatted} deleted successfully`
          );
        } catch (error) {
          console.error(
            `Error deleting ${entityNameFormatted} by query:`,
            error
          );
          throw apiErrorResponse(
            `Failed to delete ${entityNameFormatted}`,
            error
          );
        }
      },
      onSuccess: (data: any) => {
        invalidateQueries(queryClient);
        toast.success(
          data.message || `${entityNameFormatted} Deleted Successfully`
        );
      },
      onError: () => {
        toast.error(`Error Deleting ${entityNameFormatted}`);
      },
    });
  };

  const useDeleteWithQuery = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: async (queryParams?: Record<string, any>) => {
        try {
          const response = await apiClient.delete(`${entityName}`, {
            params: queryParams,
          });
          return apiResponse(
            response.data,
            `${entityNameFormatted} deleted successfully`
          );
        } catch (error) {
          console.error(
            `Error deleting ${entityNameFormatted} with query:`,
            error
          );
          throw apiErrorResponse(
            `Failed to delete ${entityNameFormatted}`,
            error
          );
        }
      },
      onSuccess: (data: any) => {
        invalidateQueries(queryClient);
        toast.success(
          data.message || `${entityNameFormatted} Deleted Successfully`
        );
      },
      onError: () => {
        toast.error(`Error Deleting ${entityNameFormatted}`);
      },
    });
  };

  return {
    useGetAll,
    useDeleteByQuery,
    useDeleteWithQuery,
    useGetById,
    useCreate,
    useUpdate,
    useDelete,
    useGetByIdWithQueryParams,
  };
}
