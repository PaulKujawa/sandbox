import React from "react";
import { getTodo } from "./repositories"

export const useGetTodo = () => {
    const [data, setData] = React.useState<object | null>(null);
    
    React.useEffect(() => {
        getTodo().then(todo => setData(todo))
    }, [])
    
    return { data };
}