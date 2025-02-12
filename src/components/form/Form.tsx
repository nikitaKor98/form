import { useState } from "react";

import { useValidation } from "../../hooks/useValidation";
import { useEvents } from "../../hooks/useEvents";

import Input from "../input/Input";
import Radio from "../radio/Radio";
import Button from "../button/Button";

import { Config, FieldsTypes, RadioField } from "../../types";

type FormProps = {
    config: Config
    onSubmit: (data?: any, setErrors?: any) => Promise<any>
}

function Form({ config: { fields, steps, validateOnNext }, onSubmit }: FormProps) {

    const [page, setPage] = useState(0);

    const { errors, setErrors, validateField, validateAllFields } = useValidation(fields, steps[page]);

    const [values, setValues] = useState(Object.keys(fields).reduce((acc, field) => {

        const initValue = fields[field].type === FieldsTypes.Radio && (fields[field] as RadioField).options.find((item) => item.default === true);

        return {
            ...acc,
            [field]: initValue ? initValue.value : ""
        }
    }, {}));

    const events = useEvents(fields, values, setValues, validateField);

    const handleBack = () => {
        setPage(prev => prev - 1);
    }

    const handleNext = () => {
        if (validateOnNext && !validateAllFields(values)) return;
        else if (!validateAllFields()) return;

        setPage(prev => prev + 1);
    }

    const handleSubmit = () => {

        if (validateAllFields(values)) {

            onSubmit(values).then(err => Object.entries(err).reduce((acc, [field, message]) => {
                return {
                    ...acc,
                    [field]: { isValid: false, message }
                }
            }, {} as any)).then(newErr => {
                setErrors({ ...errors, ...newErr });
                setPage(steps.findIndex(step => step.find((stepName) => newErr[stepName].isValid === false)));
            });
        }
    }

    return (
        <div className="form">
            <div className="form__box">
                {steps[page].map((key: string) => {

                    const clone = { ...fields[key], name: key };

                    if (clone.type === "input") return (
                        <Input
                            key={key}
                            data={clone}
                            values={values}
                            errors={errors}
                            onChange={e => events[key].onChange(e, key)}
                            onBlur={e => events[key].onBlur(e, key)}
                        />
                    );
                    if (clone.type === "radio") return (
                        <Radio
                            key={key}
                            data={clone}
                            values={values}
                            errors={errors}
                            onChange={e => events[key].onChange(e, key)}
                            onBlur={e => events[key].onBlur(e, key)}
                        />
                    );
                })}
                {page !== 0 &&
                    <Button
                        className="form__btn btn"
                        onClick={handleBack}
                    >Back</Button>
                }
                <Button
                    className="form__btn btn"
                    onClick={() => page !== steps.length - 1 ? handleNext() : handleSubmit()}
                >{page >= steps.length - 1 ? "Submit" : "Next"}</Button>
            </div>
        </div>
    );
}

export default Form;