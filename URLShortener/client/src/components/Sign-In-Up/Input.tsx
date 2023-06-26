import React, {FC} from 'react';

interface PropType{
    placeholder: string,
    value: string,
    onChange(e: React.ChangeEvent<HTMLInputElement>): void
    fail: string,
    type?: "text" | "password"
}

const Input: FC<PropType> = ({placeholder, value, onChange, fail, type = "text"}) => {
    return (
        <div className={`input ${!!fail.length && "input_fail"}`}>
            <input type={type}
                   placeholder={placeholder}
                   value={value}
                   onChange={onChange}/>
            {!!value.length && <div className={"input_label"}>{placeholder}</div>}
            {!!fail.length && <div className={"input_message"}>{fail}</div>}
        </div>
    );
};

export default Input;