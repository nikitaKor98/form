import { useState } from "react"

export const useInput = (initialValue: any) => {
    
    const [value, setValue] = useState(initialValue);

    const onChange = (value: any) => {
        setValue(value);
    }

    return { value, onChange };
}