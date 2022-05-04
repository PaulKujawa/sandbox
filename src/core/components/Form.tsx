import React from "react"
import { useGetTodo } from "../hooks";

export const Form = () => {
    const [input, setInput] = React.useState("");
    const { data } = useGetTodo();
    
    return (
        <>
            <input value={input} onChange={(event) => setInput(event.target.value)} />
            <code><pre>{JSON.stringify(data, null, 2)}</pre></code>
        </>
    )
}