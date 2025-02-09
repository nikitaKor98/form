import { validateFieldValue } from "./validation";

describe("validateFieldValue", () => {

    it("pass valid value no rules", () => {
        const fields = {
            fieldName: {
                validation: {}
            }
        };

        const fieldName = "fieldName";
        const value = "abc";
        const result = validateFieldValue(fields, fieldName, value);

        expect(result).toEqual({
            isValid: true,
            message: ""
        });
    });

    it("pass valid value one rule", () => {
        const fields = {
            fieldName: {
                validation: {
                    required: { isRequired: true }
                }
            }
        };

        const fieldName = "fieldName";
        const value = "abc";
        const result = validateFieldValue(fields, fieldName, value);

        expect(result).toEqual({
            isValid: true,
            message: ""
        });
    });

    it("pass valid value multiple rules", () => {
        const fields = {
            fieldName: {
                validation: {
                    required: { isRequired: true },
                    length: {
                        min: 1,
                        max: 10
                    }
                }
            }
        };
        const fieldName = "fieldName";
        const value = "abc";

        const result = validateFieldValue(fields, fieldName, value);

        expect(result).toEqual({
            isValid: true,
            message: ""
        });
    });

    it("validate field in order", () => {
        const fields = {
            fieldName: {
                validation: {
                    required: { isRequired: true },
                    length: {
                        min: 6,
                        max: 12
                    },
                    regExp: { reg: /^\d+/ }
                }
            }
        };

        const fieldName = "fieldName";

        expect(validateFieldValue(fields, fieldName, '')).toEqual({
            isValid: false,
            message: "Поле не может быть пустым!"
        });

        expect(validateFieldValue(fields, fieldName, "abc")).toEqual({
            isValid: false,
            message: "Длина undefined должна быть не меннее 6 и не более 12."
        });

        expect(validateFieldValue(fields, fieldName, "a1b2c3")).toEqual({
            isValid: false,
            message: "Проверьте правильность undefined."
        });
    });

    it("validate field without field config", () => {
        const fields = {
            fieldName: {
                validation: {
                    required: { isRequired: true }
                }
            }
        }
        const fieldName = "randomfieldName";

        expect(validateFieldValue(fields, fieldName, "")).toEqual({
            isValid: true,
            message: ""
        });
    });
});