type fetchParams = Parameters<typeof fetch>;
const wait = (ms = 3000) => new Promise((r) => setTimeout(r, ms));

export const HttpService = {
  get: async <DTO>(input: fetchParams[0]): Promise<DTO> => {
    const response = await fetch(input);
    const json = await response.json();

    await wait();

    return json as DTO;
  },
  getBlob: async (input: fetchParams[0]) => {
    const response = await fetch(input);
    const blob = await response.blob();

    await wait();

    return URL.createObjectURL(blob);
  },
};
