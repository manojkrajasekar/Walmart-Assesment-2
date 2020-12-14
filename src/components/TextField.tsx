import { InputHTMLAttributes } from 'react';

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
}

const TextField: React.FC<TextFieldProps> = ({
    label,
    onChange,
    name,
    value,
    ...props
}) => {
    return (
        <fieldset className="bn flex flex-column pa0 mb4">
            <label className="b mb2">{label}*</label>
            <input
                data-testid="input"
                className="pa2 rounded-2"
                name={name}
                onChange={onChange}
                value={value}
                {...props}
            ></input>
        </fieldset>
    );
};

export default TextField;
