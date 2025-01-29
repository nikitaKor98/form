interface IValidation {
    [key: string]: (value: string, option?: { [key: string]: any }, name?: string) => ({ [key: string]: boolean | string })
}

export const validation: IValidation = {
    length: (value, option, name) => ({
        isValid: value.length >= option?.min && value.length <= option?.max,
        message: `Длина ${name} должна быть не меннее ${option?.min} и не более ${option?.max}.`
    }),
    regExp: (value, option, name) => ({
        isValid: option?.reg.test(value),
        message: `Проверьте правильность ${name}.`
    }),
    required: (value) => ({
        isValid: value.length > 0,
        message: "Поле не может быть пустым!"
    })
} 