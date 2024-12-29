import { useState, useCallback } from "react";

type ApiState<T> = {
  data: T | null;
  error: string | null;
  pending: boolean;
};

type ApiCall<T> = (...args: any[]) => Promise<T>;

function useApi<T>(apiCall: ApiCall<T>) {
  const [state, setState] = useState<ApiState<T>>({
    data: null,
    error: null,
    pending: true,
  });

  const execute = useCallback(
    async (...args: any[]) => {
      setState({ data: null, error: null, pending: true });
      try {
        const response = await apiCall(...args);
        setState({ data: response, error: null, pending: false });
        return response;
      } catch (err: any) {
        setState({
          data: null,
          error: err.message || "An error occurred",
          pending: false,
        });
        throw err; // Re-throw error if caller needs to handle it
      }
    },
    [apiCall]
  );

  return { ...state, execute };
}

export default useApi;
