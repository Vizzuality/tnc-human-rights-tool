/**
 * Generated by orval v6.17.0 🍺
 * Do not edit manually.
 * DOCUMENTATION
 * OpenAPI spec version: 1.0.0
 */
import { useQuery, useMutation } from "@tanstack/react-query";
import type {
  UseQueryOptions,
  UseMutationOptions,
  QueryFunction,
  MutationFunction,
  UseQueryResult,
  QueryKey,
} from "@tanstack/react-query";
import type {
  PcbCategoryListResponse,
  Error,
  GetPcbCategoriesParams,
  PcbCategoryResponse,
  PcbCategoryRequest,
  GetPcbCategoriesIdParams,
  PcbCategoryLocalizationResponse,
  PcbCategoryLocalizationRequest,
} from "./strapi.schemas";
import { API } from "../../services/api/index";
import type { ErrorType } from "../../services/api/index";

export const getPcbCategories = (params?: GetPcbCategoriesParams, signal?: AbortSignal) => {
  return API<PcbCategoryListResponse>({ url: `/pcb-categories`, method: "get", params, signal });
};

export const getGetPcbCategoriesQueryKey = (params?: GetPcbCategoriesParams) =>
  [`/pcb-categories`, ...(params ? [params] : [])] as const;

export const getGetPcbCategoriesQueryOptions = <
  TData = Awaited<ReturnType<typeof getPcbCategories>>,
  TError = ErrorType<Error>,
>(
  params?: GetPcbCategoriesParams,
  options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getPcbCategories>>, TError, TData>;
  },
): UseQueryOptions<Awaited<ReturnType<typeof getPcbCategories>>, TError, TData> & {
  queryKey: QueryKey;
} => {
  const { query: queryOptions } = options ?? {};

  const queryKey = queryOptions?.queryKey ?? getGetPcbCategoriesQueryKey(params);

  const queryFn: QueryFunction<Awaited<ReturnType<typeof getPcbCategories>>> = ({ signal }) =>
    getPcbCategories(params, signal);

  return { queryKey, queryFn, ...queryOptions };
};

export type GetPcbCategoriesQueryResult = NonNullable<Awaited<ReturnType<typeof getPcbCategories>>>;
export type GetPcbCategoriesQueryError = ErrorType<Error>;

export const useGetPcbCategories = <
  TData = Awaited<ReturnType<typeof getPcbCategories>>,
  TError = ErrorType<Error>,
>(
  params?: GetPcbCategoriesParams,
  options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getPcbCategories>>, TError, TData>;
  },
): UseQueryResult<TData, TError> & { queryKey: QueryKey } => {
  const queryOptions = getGetPcbCategoriesQueryOptions(params, options);

  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryOptions.queryKey;

  return query;
};

export const postPcbCategories = (pcbCategoryRequest: PcbCategoryRequest) => {
  return API<PcbCategoryResponse>({
    url: `/pcb-categories`,
    method: "post",
    headers: { "Content-Type": "application/json" },
    data: pcbCategoryRequest,
  });
};

export const getPostPcbCategoriesMutationOptions = <
  TError = ErrorType<Error>,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof postPcbCategories>>,
    TError,
    { data: PcbCategoryRequest },
    TContext
  >;
}): UseMutationOptions<
  Awaited<ReturnType<typeof postPcbCategories>>,
  TError,
  { data: PcbCategoryRequest },
  TContext
> => {
  const { mutation: mutationOptions } = options ?? {};

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof postPcbCategories>>,
    { data: PcbCategoryRequest }
  > = (props) => {
    const { data } = props ?? {};

    return postPcbCategories(data);
  };

  return { mutationFn, ...mutationOptions };
};

export type PostPcbCategoriesMutationResult = NonNullable<
  Awaited<ReturnType<typeof postPcbCategories>>
>;
export type PostPcbCategoriesMutationBody = PcbCategoryRequest;
export type PostPcbCategoriesMutationError = ErrorType<Error>;

export const usePostPcbCategories = <TError = ErrorType<Error>, TContext = unknown>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof postPcbCategories>>,
    TError,
    { data: PcbCategoryRequest },
    TContext
  >;
}) => {
  const mutationOptions = getPostPcbCategoriesMutationOptions(options);

  return useMutation(mutationOptions);
};
export const getPcbCategoriesId = (
  id: number,
  params?: GetPcbCategoriesIdParams,
  signal?: AbortSignal,
) => {
  return API<PcbCategoryResponse>({ url: `/pcb-categories/${id}`, method: "get", params, signal });
};

export const getGetPcbCategoriesIdQueryKey = (id: number, params?: GetPcbCategoriesIdParams) =>
  [`/pcb-categories/${id}`, ...(params ? [params] : [])] as const;

export const getGetPcbCategoriesIdQueryOptions = <
  TData = Awaited<ReturnType<typeof getPcbCategoriesId>>,
  TError = ErrorType<Error>,
>(
  id: number,
  params?: GetPcbCategoriesIdParams,
  options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getPcbCategoriesId>>, TError, TData>;
  },
): UseQueryOptions<Awaited<ReturnType<typeof getPcbCategoriesId>>, TError, TData> & {
  queryKey: QueryKey;
} => {
  const { query: queryOptions } = options ?? {};

  const queryKey = queryOptions?.queryKey ?? getGetPcbCategoriesIdQueryKey(id, params);

  const queryFn: QueryFunction<Awaited<ReturnType<typeof getPcbCategoriesId>>> = ({ signal }) =>
    getPcbCategoriesId(id, params, signal);

  return { queryKey, queryFn, enabled: !!id, ...queryOptions };
};

export type GetPcbCategoriesIdQueryResult = NonNullable<
  Awaited<ReturnType<typeof getPcbCategoriesId>>
>;
export type GetPcbCategoriesIdQueryError = ErrorType<Error>;

export const useGetPcbCategoriesId = <
  TData = Awaited<ReturnType<typeof getPcbCategoriesId>>,
  TError = ErrorType<Error>,
>(
  id: number,
  params?: GetPcbCategoriesIdParams,
  options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getPcbCategoriesId>>, TError, TData>;
  },
): UseQueryResult<TData, TError> & { queryKey: QueryKey } => {
  const queryOptions = getGetPcbCategoriesIdQueryOptions(id, params, options);

  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryOptions.queryKey;

  return query;
};

export const putPcbCategoriesId = (id: number, pcbCategoryRequest: PcbCategoryRequest) => {
  return API<PcbCategoryResponse>({
    url: `/pcb-categories/${id}`,
    method: "put",
    headers: { "Content-Type": "application/json" },
    data: pcbCategoryRequest,
  });
};

export const getPutPcbCategoriesIdMutationOptions = <
  TError = ErrorType<Error>,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof putPcbCategoriesId>>,
    TError,
    { id: number; data: PcbCategoryRequest },
    TContext
  >;
}): UseMutationOptions<
  Awaited<ReturnType<typeof putPcbCategoriesId>>,
  TError,
  { id: number; data: PcbCategoryRequest },
  TContext
> => {
  const { mutation: mutationOptions } = options ?? {};

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof putPcbCategoriesId>>,
    { id: number; data: PcbCategoryRequest }
  > = (props) => {
    const { id, data } = props ?? {};

    return putPcbCategoriesId(id, data);
  };

  return { mutationFn, ...mutationOptions };
};

export type PutPcbCategoriesIdMutationResult = NonNullable<
  Awaited<ReturnType<typeof putPcbCategoriesId>>
>;
export type PutPcbCategoriesIdMutationBody = PcbCategoryRequest;
export type PutPcbCategoriesIdMutationError = ErrorType<Error>;

export const usePutPcbCategoriesId = <TError = ErrorType<Error>, TContext = unknown>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof putPcbCategoriesId>>,
    TError,
    { id: number; data: PcbCategoryRequest },
    TContext
  >;
}) => {
  const mutationOptions = getPutPcbCategoriesIdMutationOptions(options);

  return useMutation(mutationOptions);
};
export const deletePcbCategoriesId = (id: number) => {
  return API<number>({ url: `/pcb-categories/${id}`, method: "delete" });
};

export const getDeletePcbCategoriesIdMutationOptions = <
  TError = ErrorType<Error>,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof deletePcbCategoriesId>>,
    TError,
    { id: number },
    TContext
  >;
}): UseMutationOptions<
  Awaited<ReturnType<typeof deletePcbCategoriesId>>,
  TError,
  { id: number },
  TContext
> => {
  const { mutation: mutationOptions } = options ?? {};

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof deletePcbCategoriesId>>,
    { id: number }
  > = (props) => {
    const { id } = props ?? {};

    return deletePcbCategoriesId(id);
  };

  return { mutationFn, ...mutationOptions };
};

export type DeletePcbCategoriesIdMutationResult = NonNullable<
  Awaited<ReturnType<typeof deletePcbCategoriesId>>
>;

export type DeletePcbCategoriesIdMutationError = ErrorType<Error>;

export const useDeletePcbCategoriesId = <TError = ErrorType<Error>, TContext = unknown>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof deletePcbCategoriesId>>,
    TError,
    { id: number },
    TContext
  >;
}) => {
  const mutationOptions = getDeletePcbCategoriesIdMutationOptions(options);

  return useMutation(mutationOptions);
};
export const postPcbCategoriesIdLocalizations = (
  id: number,
  pcbCategoryLocalizationRequest: PcbCategoryLocalizationRequest,
) => {
  return API<PcbCategoryLocalizationResponse>({
    url: `/pcb-categories/${id}/localizations`,
    method: "post",
    headers: { "Content-Type": "application/json" },
    data: pcbCategoryLocalizationRequest,
  });
};

export const getPostPcbCategoriesIdLocalizationsMutationOptions = <
  TError = ErrorType<Error>,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof postPcbCategoriesIdLocalizations>>,
    TError,
    { id: number; data: PcbCategoryLocalizationRequest },
    TContext
  >;
}): UseMutationOptions<
  Awaited<ReturnType<typeof postPcbCategoriesIdLocalizations>>,
  TError,
  { id: number; data: PcbCategoryLocalizationRequest },
  TContext
> => {
  const { mutation: mutationOptions } = options ?? {};

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof postPcbCategoriesIdLocalizations>>,
    { id: number; data: PcbCategoryLocalizationRequest }
  > = (props) => {
    const { id, data } = props ?? {};

    return postPcbCategoriesIdLocalizations(id, data);
  };

  return { mutationFn, ...mutationOptions };
};

export type PostPcbCategoriesIdLocalizationsMutationResult = NonNullable<
  Awaited<ReturnType<typeof postPcbCategoriesIdLocalizations>>
>;
export type PostPcbCategoriesIdLocalizationsMutationBody = PcbCategoryLocalizationRequest;
export type PostPcbCategoriesIdLocalizationsMutationError = ErrorType<Error>;

export const usePostPcbCategoriesIdLocalizations = <
  TError = ErrorType<Error>,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof postPcbCategoriesIdLocalizations>>,
    TError,
    { id: number; data: PcbCategoryLocalizationRequest },
    TContext
  >;
}) => {
  const mutationOptions = getPostPcbCategoriesIdLocalizationsMutationOptions(options);

  return useMutation(mutationOptions);
};
