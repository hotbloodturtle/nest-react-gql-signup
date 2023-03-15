type CustomClient<T> = (data: {
  url: string;
  method: "get" | "post" | "put" | "delete" | "patch";
  params?: Record<string, any>;
  headers?: Record<string, any>;
  data?: BodyType<unknown>;
  signal?: AbortSignal;
}) => Promise<T>;

export const useCustomClient = <T>(): CustomClient<T> => {
  return async ({ url, method, params, data }) => {
    const response = await fetch(
      import.meta.env.BASE_URL + url + "?" + new URLSearchParams(params),
      {
        method,
        credentials: "include",
        headers: {
          ...data?.headers,
          "Content-Type": "application/json",
        },
        ...(data ? { body: JSON.stringify(data) } : {}),
      }
    );

    const responseJson = await response.json();

    if (!response.ok) {
      throw responseJson;
    }

    return responseJson;
  };
};

export default useCustomClient;

export type ErrorType<ErrorData> = ErrorData;

export type BodyType<BodyData> = BodyData & { headers?: any };
