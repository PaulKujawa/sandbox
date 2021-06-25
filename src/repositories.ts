export const getTodo = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/todos/1");
  return response.json();
};
