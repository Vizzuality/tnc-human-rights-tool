/**
 * Generated by orval v6.17.0 🍺
 * Do not edit manually.
 * DOCUMENTATION
 * OpenAPI spec version: 1.0.0
 */
import {
  useQuery,
  useInfiniteQuery,
  useMutation
} from '@tanstack/react-query'
import type {
  UseQueryOptions,
  UseInfiniteQueryOptions,
  UseMutationOptions,
  QueryFunction,
  MutationFunction,
  UseQueryResult,
  UseInfiniteQueryResult,
  QueryKey
} from '@tanstack/react-query'
import type {
  ProjectListResponse,
  Error,
  GetProjectsParams,
  ProjectResponse,
  ProjectRequest
} from './strapi.schemas'
import { API } from '../../services/api/index';
import type { ErrorType } from '../../services/api/index';



export const getProjects = (
    params?: GetProjectsParams,
 signal?: AbortSignal
) => {
      return API<ProjectListResponse>(
      {url: `/projects`, method: 'get',
        params, signal
    },
      );
    }
  

export const getGetProjectsQueryKey = (params?: GetProjectsParams,) => [`/projects`, ...(params ? [params]: [])] as const;
  

    
export const getGetProjectsInfiniteQueryOptions = <TData = Awaited<ReturnType<typeof getProjects>>, TError = ErrorType<Error>>(params?: GetProjectsParams, options?: { query?:UseInfiniteQueryOptions<Awaited<ReturnType<typeof getProjects>>, TError, TData>, }
): UseInfiniteQueryOptions<Awaited<ReturnType<typeof getProjects>>, TError, TData> & { queryKey: QueryKey } => {
const {query: queryOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetProjectsQueryKey(params);

  
  
    const queryFn: QueryFunction<Awaited<ReturnType<typeof getProjects>>> = ({ signal, pageParam }) => getProjects({ 'pagination[page]': pageParam, ...params }, signal);
    
      
      
   return  { queryKey, queryFn,   staleTime: 10000,  ...queryOptions}}

export type GetProjectsInfiniteQueryResult = NonNullable<Awaited<ReturnType<typeof getProjects>>>
export type GetProjectsInfiniteQueryError = ErrorType<Error>

export const useGetProjectsInfinite = <TData = Awaited<ReturnType<typeof getProjects>>, TError = ErrorType<Error>>(
 params?: GetProjectsParams, options?: { query?:UseInfiniteQueryOptions<Awaited<ReturnType<typeof getProjects>>, TError, TData>, }

  ):  UseInfiniteQueryResult<TData, TError> & { queryKey: QueryKey } => {

  const queryOptions = getGetProjectsInfiniteQueryOptions(params,options)

  const query = useInfiniteQuery(queryOptions) as  UseInfiniteQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryOptions.queryKey ;

  return query;
}

export const getGetProjectsQueryOptions = <TData = Awaited<ReturnType<typeof getProjects>>, TError = ErrorType<Error>>(params?: GetProjectsParams, options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof getProjects>>, TError, TData>, }
): UseQueryOptions<Awaited<ReturnType<typeof getProjects>>, TError, TData> & { queryKey: QueryKey } => {
const {query: queryOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetProjectsQueryKey(params);

  
  
    const queryFn: QueryFunction<Awaited<ReturnType<typeof getProjects>>> = ({ signal }) => getProjects(params, signal);
    
      
      
   return  { queryKey, queryFn,   staleTime: 10000,  ...queryOptions}}

export type GetProjectsQueryResult = NonNullable<Awaited<ReturnType<typeof getProjects>>>
export type GetProjectsQueryError = ErrorType<Error>

export const useGetProjects = <TData = Awaited<ReturnType<typeof getProjects>>, TError = ErrorType<Error>>(
 params?: GetProjectsParams, options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof getProjects>>, TError, TData>, }

  ):  UseQueryResult<TData, TError> & { queryKey: QueryKey } => {

  const queryOptions = getGetProjectsQueryOptions(params,options)

  const query = useQuery(queryOptions) as  UseQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryOptions.queryKey ;

  return query;
}

export const postProjects = (
    projectRequest: ProjectRequest,
 ) => {
      return API<ProjectResponse>(
      {url: `/projects`, method: 'post',
      headers: {'Content-Type': 'application/json', },
      data: projectRequest
    },
      );
    }
  


export const getPostProjectsMutationOptions = <TError = ErrorType<Error>,
    
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof postProjects>>, TError,{data: ProjectRequest}, TContext>, }
): UseMutationOptions<Awaited<ReturnType<typeof postProjects>>, TError,{data: ProjectRequest}, TContext> => {
 const {mutation: mutationOptions} = options ?? {};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof postProjects>>, {data: ProjectRequest}> = (props) => {
          const {data} = props ?? {};

          return  postProjects(data,)
        }

        

 
   return  { mutationFn, ...mutationOptions }}

    export type PostProjectsMutationResult = NonNullable<Awaited<ReturnType<typeof postProjects>>>
    export type PostProjectsMutationBody = ProjectRequest
    export type PostProjectsMutationError = ErrorType<Error>

    export const usePostProjects = <TError = ErrorType<Error>,
    
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof postProjects>>, TError,{data: ProjectRequest}, TContext>, }
) => {
    
      const mutationOptions = getPostProjectsMutationOptions(options);
     
      return useMutation(mutationOptions);
    }
    export const getProjectsId = (
    id: number,
 signal?: AbortSignal
) => {
      return API<ProjectResponse>(
      {url: `/projects/${id}`, method: 'get', signal
    },
      );
    }
  

export const getGetProjectsIdQueryKey = (id: number,) => [`/projects/${id}`] as const;
  

    
export const getGetProjectsIdQueryOptions = <TData = Awaited<ReturnType<typeof getProjectsId>>, TError = ErrorType<Error>>(id: number, options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof getProjectsId>>, TError, TData>, }
): UseQueryOptions<Awaited<ReturnType<typeof getProjectsId>>, TError, TData> & { queryKey: QueryKey } => {
const {query: queryOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetProjectsIdQueryKey(id);

  
  
    const queryFn: QueryFunction<Awaited<ReturnType<typeof getProjectsId>>> = ({ signal }) => getProjectsId(id, signal);
    
      
      
   return  { queryKey, queryFn, enabled: !!(id),  staleTime: 10000,  ...queryOptions}}

export type GetProjectsIdQueryResult = NonNullable<Awaited<ReturnType<typeof getProjectsId>>>
export type GetProjectsIdQueryError = ErrorType<Error>

export const useGetProjectsId = <TData = Awaited<ReturnType<typeof getProjectsId>>, TError = ErrorType<Error>>(
 id: number, options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof getProjectsId>>, TError, TData>, }

  ):  UseQueryResult<TData, TError> & { queryKey: QueryKey } => {

  const queryOptions = getGetProjectsIdQueryOptions(id,options)

  const query = useQuery(queryOptions) as  UseQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryOptions.queryKey ;

  return query;
}

export const putProjectsId = (
    id: number,
    projectRequest: ProjectRequest,
 ) => {
      return API<ProjectResponse>(
      {url: `/projects/${id}`, method: 'put',
      headers: {'Content-Type': 'application/json', },
      data: projectRequest
    },
      );
    }
  


export const getPutProjectsIdMutationOptions = <TError = ErrorType<Error>,
    
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof putProjectsId>>, TError,{id: number;data: ProjectRequest}, TContext>, }
): UseMutationOptions<Awaited<ReturnType<typeof putProjectsId>>, TError,{id: number;data: ProjectRequest}, TContext> => {
 const {mutation: mutationOptions} = options ?? {};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof putProjectsId>>, {id: number;data: ProjectRequest}> = (props) => {
          const {id,data} = props ?? {};

          return  putProjectsId(id,data,)
        }

        

 
   return  { mutationFn, ...mutationOptions }}

    export type PutProjectsIdMutationResult = NonNullable<Awaited<ReturnType<typeof putProjectsId>>>
    export type PutProjectsIdMutationBody = ProjectRequest
    export type PutProjectsIdMutationError = ErrorType<Error>

    export const usePutProjectsId = <TError = ErrorType<Error>,
    
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof putProjectsId>>, TError,{id: number;data: ProjectRequest}, TContext>, }
) => {
    
      const mutationOptions = getPutProjectsIdMutationOptions(options);
     
      return useMutation(mutationOptions);
    }
    export const deleteProjectsId = (
    id: number,
 ) => {
      return API<number>(
      {url: `/projects/${id}`, method: 'delete'
    },
      );
    }
  


export const getDeleteProjectsIdMutationOptions = <TError = ErrorType<Error>,
    
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof deleteProjectsId>>, TError,{id: number}, TContext>, }
): UseMutationOptions<Awaited<ReturnType<typeof deleteProjectsId>>, TError,{id: number}, TContext> => {
 const {mutation: mutationOptions} = options ?? {};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof deleteProjectsId>>, {id: number}> = (props) => {
          const {id} = props ?? {};

          return  deleteProjectsId(id,)
        }

        

 
   return  { mutationFn, ...mutationOptions }}

    export type DeleteProjectsIdMutationResult = NonNullable<Awaited<ReturnType<typeof deleteProjectsId>>>
    
    export type DeleteProjectsIdMutationError = ErrorType<Error>

    export const useDeleteProjectsId = <TError = ErrorType<Error>,
    
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof deleteProjectsId>>, TError,{id: number}, TContext>, }
) => {
    
      const mutationOptions = getDeleteProjectsIdMutationOptions(options);
     
      return useMutation(mutationOptions);
    }
    