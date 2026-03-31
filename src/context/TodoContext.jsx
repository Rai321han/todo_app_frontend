import { useCallback, useMemo, useState } from "react";
import TodoContext from "./todo-context";

const TodoProvider = ({ children }) => {
    const [filters, setFilters] = useState({
        status: "",
        page: 1,
    });

    const handleChangeFilter = useCallback((name, value) => {
        setFilters((prev) => {
            if (name === "status") {
                if (prev.status === value) {
                    return prev;
                }

                return {
                    ...prev,
                    status: value,
                    page: 1,
                };
            }

            if (prev[name] === value) {
                return prev;
            }

            return { ...prev, [name]: value };
        });
    }, []);

    const value = useMemo(
        () => ({ filters, handleChangeFilter }),
        [filters, handleChangeFilter]
    );

    return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};

export default TodoProvider;
