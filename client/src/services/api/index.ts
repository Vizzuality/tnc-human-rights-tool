import Axios, { AxiosError, AxiosRequestConfig, InternalAxiosRequestConfig } from "axios";
import { getSession } from "next-auth/react";

import env from "@/env.mjs";

export const AXIOS_INSTANCE = Axios.create({ baseURL: env.NEXT_PUBLIC_API_URL });

export const API = <T>(config: AxiosRequestConfig): Promise<T> => {
  const source = Axios.CancelToken.source();
  const promise = AXIOS_INSTANCE({ ...config, cancelToken: source.token }).then(({ data }) => data);

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  promise.cancel = () => {
    source.cancel("Query was cancelled");
  };

  return promise;
};

AXIOS_INSTANCE.interceptors.request.use(async (request) => {
  await setAxiosAuth(request);
  return request;
});

export async function setAxiosAuth(request: InternalAxiosRequestConfig) {
  if (!AXIOS_INSTANCE.defaults.headers.common.Authorization) {
    const session = await getSession();

    if (session) {
      const Authorization = `Bearer ${session.apiToken}`;

      request.headers.Authorization = Authorization;
      AXIOS_INSTANCE.defaults.headers.common.Authorization = Authorization;
    }
  }
}

export async function deleteAxiosAuth() {
  delete AXIOS_INSTANCE.defaults.headers.common.Authorization;
}

// In some case with react-query and swr you want to be able to override the return error type so you can also do it here like this
export type ErrorType<Error> = AxiosError<Error>;

export default API;
