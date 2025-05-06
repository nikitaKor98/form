import { InputField } from "../../types";

type InputData = { name: string } & InputField;

interface InputProps {
    data: InputData
    values: { [key: string]: string }
    errors: { [key: string]: { [key: string]: boolean | string } }
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
    onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void
}

function Input({ data, values, errors, onChange, onBlur }: InputProps) {
    return (
        <div className={"input-box"}>
            <h3 className="input-box__title">{data.name}</h3>
            <input
                className="input-box__field"
                value={values[data.name]}
                onChange={onChange}
                onBlur={onBlur}
                type={data.type || ""}
            />
            {errors[data.name] && !errors[data.name].isValid && <span className="input-box__message">{errors[data.name].message}</span>}
        </div>
    );
}

export default Input;