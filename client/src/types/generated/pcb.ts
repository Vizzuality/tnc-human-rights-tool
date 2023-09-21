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
  PcbListResponse,
  Error,
  GetPcbsParams,
  PcbResponse,
  PcbRequest,
} from "./strapi.schemas";
import { API } from "../../services/api/index";
import type { ErrorType } from "../../services/api/index";

export const getPcbs = (params?: GetPcbsParams, signal?: AbortSignal) => {
  return API<PcbListResponse>({ url: `/pcbs`, method: "get", params, signal });
};

export const getGetPcbsQueryKey = (params?: GetPcbsParams) =>
  [`/pcbs`, ...(params ? [params] : [])] as const;

export const getGetPcbsQueryOptions = <
  TData = Awaited<ReturnType<typeof getPcbs>>,
  TError = ErrorType<Error>,
>(
  params?: GetPcbsParams,
  options?: { query?: UseQueryOptions<Awaited<ReturnType<typeof getPcbs>>, TError, TData> },
): UseQueryOptions<Awaited<ReturnType<typeof getPcbs>>, TError, TData> & { queryKey: QueryKey } => {
  const { query: queryOptions } = options ?? {};

  const queryKey = queryOptions?.queryKey ?? getGetPcbsQueryKey(params);

  const queryFn: QueryFunction<Awaited<ReturnType<typeof getPcbs>>> = ({ signal }) =>
    getPcbs(params, signal);

  return { queryKey, queryFn, ...queryOptions };
};

export type GetPcbsQueryResult = NonNullable<Awaited<ReturnType<typeof getPcbs>>>;
export type GetPcbsQueryError = ErrorType<Error>;

export const useGetPcbs = <TData = Awaited<ReturnType<typeof getPcbs>>, TError = ErrorType<Error>>(
  params?: GetPcbsParams,
  options?: { query?: UseQueryOptions<Awaited<ReturnType<typeof getPcbs>>, TError, TData> },
): UseQueryResult<TData, TError> & { queryKey: QueryKey } => {
  const queryOptions = getGetPcbsQueryOptions(params, options);

  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryOptions.queryKey;

  return query;
};

export const postPcbs = (pcbRequest: PcbRequest) => {
  return API<PcbResponse>({
    url: `/pcbs`,
    method: "post",
    headers: { "Content-Type": "application/json" },
    data: pcbRequest,
  });
};

export const getPostPcbsMutationOptions = <
  TError = ErrorType<Error>,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof postPcbs>>,
    TError,
    { data: PcbRequest },
    TContext
  >;
}): UseMutationOptions<
  Awaited<ReturnType<typeof postPcbs>>,
  TError,
  { data: PcbRequest },
  TContext
> => {
  const { mutation: mutationOptions } = options ?? {};

  const mutationFn: MutationFunction<Awaited<ReturnType<typeof postPcbs>>, { data: PcbRequest }> = (
    props,
  ) => {
    const { data } = props ?? {};

    return postPcbs(data);
  };

  return { mutationFn, ...mutationOptions };
};

export type PostPcbsMutationResult = NonNullable<Awaited<ReturnType<typeof postPcbs>>>;
export type PostPcbsMutationBody = PcbRequest;
export type PostPcbsMutationError = ErrorType<Error>;

export const usePostPcbs = <TError = ErrorType<Error>, TContext = unknown>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof postPcbs>>,
    TError,
    { data: PcbRequest },
    TContext
  >;
}) => {
  const mutationOptions = getPostPcbsMutationOptions(options);

  return useMutation(mutationOptions);
};
export const getPcbsId = (id: number, signal?: AbortSignal) => {
  return API<PcbResponse>({ url: `/pcbs/${id}`, method: "get", signal });
};

export const getGetPcbsIdQueryKey = (id: number) => [`/pcbs/${id}`] as const;

export const getGetPcbsIdQueryOptions = <
  TData = Awaited<ReturnType<typeof getPcbsId>>,
  TError = ErrorType<Error>,
>(
  id: number,
  options?: { query?: UseQueryOptions<Awaited<ReturnType<typeof getPcbsId>>, TError, TData> },
): UseQueryOptions<Awaited<ReturnType<typeof getPcbsId>>, TError, TData> & {
  queryKey: QueryKey;
} => {
  const { query: queryOptions } = options ?? {};

  const queryKey = queryOptions?.queryKey ?? getGetPcbsIdQueryKey(id);

  const queryFn: QueryFunction<Awaited<ReturnType<typeof getPcbsId>>> = ({ signal }) =>
    getPcbsId(id, signal);

  return { queryKey, queryFn, enabled: !!id, ...queryOptions };
};

export type GetPcbsIdQueryResult = NonNullable<Awaited<ReturnType<typeof getPcbsId>>>;
export type GetPcbsIdQueryError = ErrorType<Error>;

export const useGetPcbsId = <
  TData = Awaited<ReturnType<typeof getPcbsId>>,
  TError = ErrorType<Error>,
>(
  id: number,
  options?: { query?: UseQueryOptions<Awaited<ReturnType<typeof getPcbsId>>, TError, TData> },
): UseQueryResult<TData, TError> & { queryKey: QueryKey } => {
  const queryOptions = getGetPcbsIdQueryOptions(id, options);

  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryOptions.queryKey;

  return query;
};

export const putPcbsId = (id: number, pcbRequest: PcbRequest) => {
  return API<PcbResponse>({
    url: `/pcbs/${id}`,
    method: "put",
    headers: { "Content-Type": "application/json" },
    data: pcbRequest,
  });
};

export const getPutPcbsIdMutationOptions = <
  TError = ErrorType<Error>,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof putPcbsId>>,
    TError,
    { id: number; data: PcbRequest },
    TContext
  >;
}): UseMutationOptions<
  Awaited<ReturnType<typeof putPcbsId>>,
  TError,
  { id: number; data: PcbRequest },
  TContext
> => {
  const { mutation: mutationOptions } = options ?? {};

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof putPcbsId>>,
    { id: number; data: PcbRequest }
  > = (props) => {
    const { id, data } = props ?? {};

    return putPcbsId(id, data);
  };

  return { mutationFn, ...mutationOptions };
};

export type PutPcbsIdMutationResult = NonNullable<Awaited<ReturnType<typeof putPcbsId>>>;
export type PutPcbsIdMutationBody = PcbRequest;
export type PutPcbsIdMutationError = ErrorType<Error>;

export const usePutPcbsId = <TError = ErrorType<Error>, TContext = unknown>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof putPcbsId>>,
    TError,
    { id: number; data: PcbRequest },
    TContext
  >;
}) => {
  const mutationOptions = getPutPcbsIdMutationOptions(options);

  return useMutation(mutationOptions);
};
export const deletePcbsId = (id: number) => {
  return API<number>({ url: `/pcbs/${id}`, method: "delete" });
};

export const getDeletePcbsIdMutationOptions = <
  TError = ErrorType<Error>,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof deletePcbsId>>,
    TError,
    { id: number },
    TContext
  >;
}): UseMutationOptions<
  Awaited<ReturnType<typeof deletePcbsId>>,
  TError,
  { id: number },
  TContext
> => {
  const { mutation: mutationOptions } = options ?? {};

  const mutationFn: MutationFunction<Awaited<ReturnType<typeof deletePcbsId>>, { id: number }> = (
    props,
  ) => {
    const { id } = props ?? {};

    return deletePcbsId(id);
  };

  return { mutationFn, ...mutationOptions };
};

export type DeletePcbsIdMutationResult = NonNullable<Awaited<ReturnType<typeof deletePcbsId>>>;

export type DeletePcbsIdMutationError = ErrorType<Error>;

export const useDeletePcbsId = <TError = ErrorType<Error>, TContext = unknown>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof deletePcbsId>>,
    TError,
    { id: number },
    TContext
  >;
}) => {
  const mutationOptions = getDeletePcbsIdMutationOptions(options);

  return useMutation(mutationOptions);
};