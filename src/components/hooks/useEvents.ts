

export const useEvents = (fields: any, values: any, setValues: any, validateField: any): {
    [key: string]: {
        [key: string]: (e?: React.ChangeEvent<HTMLInputElement> | React.FocusEvent<HTMLInputElement>, key?: string) => void
    }
} => {

    const onChange = (e: React.ChangeEvent<HTMLInputElement>, key: string): void => {
        if (fields[key].validateOn === "change" || !fields[key].validateOn) validateField(e.target.value, key);
        setValues({ ...values, [key]: e.target.value });
    }

    const onBlur = (e: React.ChangeEvent<HTMLInputElement>, key: string): void => {
        if (fields[key].validateOn === "blur" || !fields[key].validateOn) validateField(e.target.value, key);
    }

    const events = Object.keys(fields).reduce((acc, field) => {
        return {
            ...acc,
            [field]: {
                onChange,
                onBlur
            }
        }
    }, {});

    return events;
}