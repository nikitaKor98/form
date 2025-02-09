import { useCallback, useState } from "react";
import { validateFieldValue } from "../utils/validation";

import { Fields, FieldsTypes, RadioField } from "../types";

export const fnInitialState = (data: { [key: string]: Fields }): { [key: string]: { [key: string]: boolean | string } } => {
    return Object.keys(data).reduce((acc, field) => {

        const initValue = data[field].type === FieldsTypes.Radio && (data[field] as RadioField).options.find((item) => item.default === true);

        return {
            ...acc,
            [field]: {
                isValid: initValue ? initValue.default : true,
                message: ""
            }
        }
    }, {});
}

export const useValidation = (fields: { [key: string]: Fields }, steps: string[]) => {

    const [errors, setErrors] = useState(fnInitialState(fields));

    const validateField = useCallback((value: string, name: string): void => {
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