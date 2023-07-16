type fetchParams = Parameters<typeof fetch>;
const wait = (ms = 1000) => new Promise((r) => setTimeout(r, ms));

export class HttpService {
  static async get<TData>(input: fetchParams[0]): Promise<TData> {
    const response = await fetch(input);
    const json = await response.json();

    await wait();

    return json;
  }

  static async post<TData>(
    input: fetchParams[0],
    body: BodyInit
  ): Promise<TData> {
    const isFormData = body instanceof FormData;

    const response = await fetch(input, {
      method: "POST",
      body: isFormData ? body : JSON.stringify(body),
      headers: isFormData ? undefined : { "Content-Type": "application/json" },
    });

    const json = await response.json();

    await wait();

    return json;
  }
}
