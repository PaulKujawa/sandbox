import { useQuery } from "react-query";
import { Todo } from "./entities";

export const useGetTodo = () => {
  return useQuery<Todo>("todos", () =>
    fetch("https://jsonplaceholder.typicode.com/todos/1")
  );
};
