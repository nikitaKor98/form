import { useCallback, useState } from "react";

import { validation } from "../utils/validation";

const fnInitialState = (data: any): { [key: string]: { [key: string]: boolean | string } } => {
    return Object.keys(data).reduce((acc, field) => {

        const initValue = data[field].options && data[field].options.find((item: { [key: string]: boolean }) => item.default === true);

        return {
            ...acc,
            [field]: {
                isValid: initValue ? initValue.default : false,
                message: "Поле не может быть пустым!"
            }
        }
    }, {});
}

export const useValidation = (fields: any, steps: string[]) => {

    const [errors, setErrors] = useState(fnInitialState(fields));

    const validateField = useCallback((value: string, name: string) => {
        const { validation: validationRules } = fields[name];

        const rule = Object.keys(validationRules).find(rule => validation[rule](value, validationRules[rule]).isValid === false);

        if (rule) {
            setErrors({
                ...errors,
                [name]: value.length > 0 ? validation[rule](value, validationRules[rule], name) : validation.required(value)
            });
            return
        };

        setErrors({
            ...errors,
            [name]: validation.required(value)
        });
    }, [fields, validation, setErrors, errors]);

    const validateAllFields = useCallback((): boolean => {
        return steps.every((step) => errors[step].isValid === true);
    }, [steps, errors]);

    return { errors, validateField, validateAllFields }
}