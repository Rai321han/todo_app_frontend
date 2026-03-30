import { createContext, useState } from "react";

export const todocontext = createContext()

const TodoProvider = ({children}) => {
    const [filters, setFilters] = useState({
        status: "",
        page: 1
    })

    function handleChangeFilter(name, value) {
        setFilters(prev => {
            return {...prev, [name]: value}
        })
    }

    return (
        <todocontext.Provider value={{filters, handleChangeFilter}}>
            {children}
        </todocontext.Provider>
    )
}

export default TodoProvider