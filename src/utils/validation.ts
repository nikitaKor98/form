interface IValidation {
    [key: string]: (value: string, option?: { [key: string]: any }, name?: string) => ({ isValid: boolean; message: string })
}

const validationMap: IValidation = {
    length: (value, option, name) => ({
        isValid: value.length >= option?.min && value.length <= option?.max,
        message: `Длина ${name} должна быть не меннее ${option?.min} и не более ${option?.max}.`
    }),
    regExp: (value, option, name) => ({
        isValid: option?.reg.test(value),
        message: `Проверьте правильность ${name}.`
    }),
    required: (value, option = {}) => ({
        isValid: !option.isRequired || value.length > 0,
        message: "Поле не может быть пустым!"
    })
}

const getFirstErrorMessage = (validationRules: any, value: string) => {
    const firstError = Object.entries(validationRules)
        .map(([ruleName, rule]) => validationMap[ruleName](value, rule as any))
        .find(({ isValid }) => !isValid);

    return firstError;
}

export const validateFieldValue = (fields: any, fieldName: string, value: string) => {
    const { validation: validationRules } = fields[fieldName] || {};

    const errorMessage = validationRules && getFirstErrorMessage(validationRules, value);

    if (!errorMessage) return {
        isValid: true,
        message: ""
    }

    return errorMessage;
}