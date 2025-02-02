import { useCallback, useState } from "react";
import { validateFieldValue } from "../utils/validation";

export const fnInitialState = (data: any): { [key: string]: { [key: string]: boolean | string } } => {
    return Object.keys(data).reduce((acc, field) => {

        const initValue = data[field].options && data[field].options.find((item: { [key: string]: boolean }) => item.default === true);

        return {
            ...acc,
            [field]: {
                isValid: initValue ? initValue.default : true,
                message: ""
            }
        }
    }, {});
}

export const useValidation = (fields: any, steps: string[]) => {

    const [errors, setErrors] = useState(fnInitialState(fields));

    const validateField = useCallback((value: string, name: string) => {
        const validationResult = validateFieldValue(fields, name, value);

        setErrors({
            ...errors,
            [name]: validationResult
        });
    }, [fields, setErrors, errors]);

    const validateAllFields = useCallback((): boolean => {
        return steps.every((step) => errors[step].isValid === true);
    }, [steps, errors]);

    return { errors, validateField, validateAllFields }
}