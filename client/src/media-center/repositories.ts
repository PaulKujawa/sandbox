import { HttpService } from "../lib";

export const PostFileQuery = () => ({
  mutationFn: (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    return HttpService.post<void>(`http://localhost:8080/upload`, formData);
  },
});
