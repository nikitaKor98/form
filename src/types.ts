export enum FieldsTypes {
    Input = "input",
    Radio = "radio",
    Date = "date"
}

type ValidationEventTypes = "blur" | "change";

type Length = {
    min: number
    max: number
    message?: string
}

type RegExpType = {
    reg: RegExp
    message?: string
}

type Required = {
    isRequired: boolean
    message?: string
}

type ValidationFn = { [key: string]: Length | RegExpType | Required };

export type InputField = {
    type: FieldsTypes.Input
    validateOn?: ValidationEventTypes
    validation?: ValidationFn
}

type Option = {
    name: string
    value: string
    default?: boolean
}

type FieldsOptions = Option[]

export type RadioField = {
    type: FieldsTypes.Radio
    validateOn?: ValidationEventTypes
    validation?: ValidationFn
    options: FieldsOptions
}

type DateField = {
    type: FieldsTypes.Date
    validateOn?: ValidationEventTypes
    validation?: ValidationFn
}

export type Fields = InputField | RadioField | DateField;

export interface Config {
    fields: {
        [key: string]: Fields
    }
    steps: string[][]
}