import { QueryClient } from "react-query";
import { ErrorMonitor } from "./error-monitor";

const onError = (error: any) => {
  ErrorMonitor.logException(error);
};

export const ReactQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      onError,
    },
    mutations: {
      onError,
    },
  },
});
