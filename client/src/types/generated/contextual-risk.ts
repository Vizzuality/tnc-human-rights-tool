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
  ContextualRiskListResponse,
  Error,
  GetContextualRisksParams,
  ContextualRiskResponse,
  ContextualRiskRequest,
  GetContextualRisksIdParams,
  ContextualRiskLocalizationResponse,
  ContextualRiskLocalizationRequest,
} from "./strapi.schemas";
import { API } from "../../services/api/index";
import type { ErrorType } from "../../services/api/index";

export const getContextualRisks = (params?: GetContextualRisksParams, signal?: AbortSignal) => {
  return API<ContextualRiskListResponse>({
    url: `/contextual-risks`,
    method: "get",
    params,
    signal,
  });
};

export const getGetContextualRisksQueryKey = (params?: GetContextualRisksParams) =>
  [`/contextual-risks`, ...(params ? [params] : [])] as const;

export const getGetContextualRisksQueryOptions = <
  TData = Awaited<ReturnType<typeof getContextualRisks>>,
  TError = ErrorType<Error>,
>(
  params?: GetContextualRisksParams,
  options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getContextualRisks>>, TError, TData>;
  },
): UseQueryOptions<Awaited<ReturnType<typeof getContextualRisks>>, TError, TData> & {
  queryKey: QueryKey;
} => {
  const { query: queryOptions } = options ?? {};

  const queryKey = queryOptions?.queryKey ?? getGetContextualRisksQueryKey(params);

  const queryFn: QueryFunction<Awaited<ReturnType<typeof getContextualRisks>>> = ({ signal }) =>
    getContextualRisks(params, signal);

  return { queryKey, queryFn, ...queryOptions };
};

export type GetContextualRisksQueryResult = NonNullable<
  Awaited<ReturnType<typeof getContextualRisks>>
>;
export type GetContextualRisksQueryError = ErrorType<Error>;

export const useGetContextualRisks = <
  TData = Awaited<ReturnType<typeof getContextualRisks>>,
  TError = ErrorType<Error>,
>(
  params?: GetContextualRisksParams,
  options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getContextualRisks>>, TError, TData>;
  },
): UseQueryResult<TData, TError> & { queryKey: QueryKey } => {
  const queryOptions = getGetContextualRisksQueryOptions(params, options);

  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryOptions.queryKey;

  return query;
};

export const postContextualRisks = (contextualRiskRequest: ContextualRiskRequest) => {
  return API<ContextualRiskResponse>({
    url: `/contextual-risks`,
    method: "post",
    headers: { "Content-Type": "application/json" },
    data: contextualRiskRequest,
  });
};

export const getPostContextualRisksMutationOptions = <
  TError = ErrorType<Error>,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof postContextualRisks>>,
    TError,
    { data: ContextualRiskRequest },
    TContext
  >;
}): UseMutationOptions<
  Awaited<ReturnType<typeof postContextualRisks>>,
  TError,
  { data: ContextualRiskRequest },
  TContext
> => {
  const { mutation: mutationOptions } = options ?? {};

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof postContextualRisks>>,
    { data: ContextualRiskRequest }
  > = (props) => {
    const { data } = props ?? {};

    return postContextualRisks(data);
  };

  return { mutationFn, ...mutationOptions };
};

export type PostContextualRisksMutationResult = NonNullable<
  Awaited<ReturnType<typeof postContextualRisks>>
>;
export type PostContextualRisksMutationBody = ContextualRiskRequest;
export type PostContextualRisksMutationError = ErrorType<Error>;

export const usePostContextualRisks = <TError = ErrorType<Error>, TContext = unknown>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof postContextualRisks>>,
    TError,
    { data: ContextualRiskRequest },
    TContext
  >;
}) => {
  const mutationOptions = getPostContextualRisksMutationOptions(options);

  return useMutation(mutationOptions);
};
export const getContextualRisksId = (
  id: number,
  params?: GetContextualRisksIdParams,
  signal?: AbortSignal,
) => {
  return API<ContextualRiskResponse>({
    url: `/contextual-risks/${id}`,
    method: "get",
    params,
    signal,
  });
};

export const getGetContextualRisksIdQueryKey = (id: number, params?: GetContextualRisksIdParams) =>
  [`/contextual-risks/${id}`, ...(params ? [params] : [])] as const;

export const getGetContextualRisksIdQueryOptions = <
  TData = Awaited<ReturnType<typeof getContextualRisksId>>,
  TError = ErrorType<Error>,
>(
  id: number,
  params?: GetContextualRisksIdParams,
  options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getContextualRisksId>>, TError, TData>;
  },
): UseQueryOptions<Awaited<ReturnType<typeof getContextualRisksId>>, TError, TData> & {
  queryKey: QueryKey;
} => {
  const { query: queryOptions } = options ?? {};

  const queryKey = queryOptions?.queryKey ?? getGetContextualRisksIdQueryKey(id, params);

  const queryFn: QueryFunction<Awaited<ReturnType<typeof getContextualRisksId>>> = ({ signal }) =>
    getContextualRisksId(id, params, signal);

  return { queryKey, queryFn, enabled: !!id, ...queryOptions };
};

export type GetContextualRisksIdQueryResult = NonNullable<
  Awaited<ReturnType<typeof getContextualRisksId>>
>;
export type GetContextualRisksIdQueryError = ErrorType<Error>;

export const useGetContextualRisksId = <
  TData = Awaited<ReturnType<typeof getContextualRisksId>>,
  TError = ErrorType<Error>,
>(
  id: number,
  params?: GetContextualRisksIdParams,
  options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getContextualRisksId>>, TError, TData>;
  },
): UseQueryResult<TData, TError> & { queryKey: QueryKey } => {
  const queryOptions = getGetContextualRisksIdQueryOptions(id, params, options);

  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryOptions.queryKey;

  return query;
};

export const putContextualRisksId = (id: number, contextualRiskRequest: ContextualRiskRequest) => {
  return API<ContextualRiskResponse>({
    url: `/contextual-risks/${id}`,
    method: "put",
    headers: { "Content-Type": "application/json" },
    data: contextualRiskRequest,
  });
};

export const getPutContextualRisksIdMutationOptions = <
  TError = ErrorType<Error>,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof putContextualRisksId>>,
    TError,
    { id: number; data: ContextualRiskRequest },
    TContext
  >;
}): UseMutationOptions<
  Awaited<ReturnType<typeof putContextualRisksId>>,
  TError,
  { id: number; data: ContextualRiskRequest },
  TContext
> => {
  const { mutation: mutationOptions } = options ?? {};

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof putContextualRisksId>>,
    { id: number; data: ContextualRiskRequest }
  > = (props) => {
    const { id, data } = props ?? {};

    return putContextualRisksId(id, data);
  };

  return { mutationFn, ...mutationOptions };
};

export type PutContextualRisksIdMutationResult = NonNullable<
  Awaited<ReturnType<typeof putContextualRisksId>>
>;
export type PutContextualRisksIdMutationBody = ContextualRiskRequest;
export type PutContextualRisksIdMutationError = ErrorType<Error>;

export const usePutContextualRisksId = <TError = ErrorType<Error>, TContext = unknown>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof putContextualRisksId>>,
    TError,
    { id: number; data: ContextualRiskRequest },
    TContext
  >;
}) => {
  const mutationOptions = getPutContextualRisksIdMutationOptions(options);

  return useMutation(mutationOptions);
};
export const deleteContextualRisksId = (id: number) => {
  return API<number>({ url: `/contextual-risks/${id}`, method: "delete" });
};

export const getDeleteContextualRisksIdMutationOptions = <
  TError = ErrorType<Error>,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof deleteContextualRisksId>>,
    TError,
    { id: number },
    TContext
  >;
}): UseMutationOptions<
  Awaited<ReturnType<typeof deleteContextualRisksId>>,
  TError,
  { id: number },
  TContext
> => {
  const { mutation: mutationOptions } = options ?? {};

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof deleteContextualRisksId>>,
    { id: number }
  > = (props) => {
    const { id } = props ?? {};

    return deleteContextualRisksId(id);
  };

  return { mutationFn, ...mutationOptions };
};

export type DeleteContextualRisksIdMutationResult = NonNullable<
  Awaited<ReturnType<typeof deleteContextualRisksId>>
>;

export type DeleteContextualRisksIdMutationError = ErrorType<Error>;

export const useDeleteContextualRisksId = <
  TError = ErrorType<Error>,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof deleteContextualRisksId>>,
    TError,
    { id: number },
    TContext
  >;
}) => {
  const mutationOptions = getDeleteContextualRisksIdMutationOptions(options);

  return useMutation(mutationOptions);
};
export const postContextualRisksIdLocalizations = (
  id: number,
  contextualRiskLocalizationRequest: ContextualRiskLocalizationRequest,
) => {
  return API<ContextualRiskLocalizationResponse>({
    url: `/contextual-risks/${id}/localizations`,
    method: "post",
    headers: { "Content-Type": "application/json" },
    data: contextualRiskLocalizationRequest,
  });
};

export const getPostContextualRisksIdLocalizationsMutationOptions = <
  TError = ErrorType<Error>,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof postContextualRisksIdLocalizations>>,
    TError,
    { id: number; data: ContextualRiskLocalizationRequest },
    TContext
  >;
}): UseMutationOptions<
  Awaited<ReturnType<typeof postContextualRisksIdLocalizations>>,
  TError,
  { id: number; data: ContextualRiskLocalizationRequest },
  TContext
> => {
  const { mutation: mutationOptions } = options ?? {};

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof postContextualRisksIdLocalizations>>,
    { id: number; data: ContextualRiskLocalizationRequest }
  > = (props) => {
    const { id, data } = props ?? {};

    return postContextualRisksIdLocalizations(id, data);
  };

  return { mutationFn, ...mutationOptions };
};

export type PostContextualRisksIdLocalizationsMutationResult = NonNullable<
  Awaited<ReturnType<typeof postContextualRisksIdLocalizations>>
>;
export type PostContextualRisksIdLocalizationsMutationBody = ContextualRiskLocalizationRequest;
export type PostContextualRisksIdLocalizationsMutationError = ErrorType<Error>;

export const usePostContextualRisksIdLocalizations = <
  TError = ErrorType<Error>,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof postContextualRisksIdLocalizations>>,
    TError,
    { id: number; data: ContextualRiskLocalizationRequest },
    TContext
  >;
}) => {
  const mutationOptions = getPostContextualRisksIdLocalizationsMutationOptions(options);

  return useMutation(mutationOptions);
};
