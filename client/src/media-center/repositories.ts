import { HttpService } from "../lib";

export const GetFilesQuery = () => ({
  queryKey: ["files"],
  queryFn: () => HttpService.get<string[]>(`http://localhost:8080/files`),
});

export const PostFileQuery = () => ({
  mutationFn: (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    return HttpService.post<void>(`http://localhost:8080/file`, formData);
  },
});
