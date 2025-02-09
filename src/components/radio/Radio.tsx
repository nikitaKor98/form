import { RadioField } from "../../types";

type RadioData = { name: string } & RadioField;

function Radio({ data, values, errors, onChange }: {
    data: RadioData
    values: { [key: string]: string }
    errors: { [key: string]: { [key: string]: boolean | string } }
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
    onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void
}) {

    return (
        <div className="radio-box">
            <h3 className="radio-box__title">{data.name}</h3>
            <div className="radio-group">
                {data.options.map((item) => {
                    return (
                        <div key={item.value} className="radio-group__item">
                            <input
                                type={data.type}
                                name={item.name}
                                value={item.value}
                                id={item.value}
                                checked={values[data.name] === item.value}
                                onChange={onChange}
                            />
                            <label htmlFor={item.value}>{item.name}</label>
                        </div>
                    );
                })}
            </div>
            {errors[data.name] && !errors[data.name].isValid && <span className="radio-box__message">{errors[data.name].message}</span>}
        </div>
    );
}

export default Radio;