type fetchParams = Parameters<typeof fetch>;

// error handling (monitoring and UI alerts) are outside of the HTTP client's concern.
export const HttpClient = {
  get: async <DTO>(input: fetchParams[0]): Promise<DTO> => {
    const response = await fetch(input);

    return response.json();
  },
};
