import { ChangeEvent, FC, FocusEvent } from "react";
import styles from "./InputWithLabel.module.scss";

interface iInputWithLabelProps {
    label: string;
    value: string;
    type: React.HTMLInputTypeAttribute;
    errorMessage?: string;
    changeHandler: (x: ChangeEvent) => void;
    blurHandler: (x: FocusEvent) => void;
    disabled?: boolean;
}
const InputWithLabel: FC<iInputWithLabelProps> = ({
    label,
    value,
    type,
    errorMessage,
    changeHandler,
    blurHandler,
    disabled,
}) => {
    return (
        <div className={styles.formGroup}>
            <label htmlFor={label} className={styles.label}>
                {label}
            </label>
            <input
                name={label}
                id={label}
                type={type}
                value={value}
                className={`${styles.input} ${errorMessage ? styles.errorInput : ""}`}
                onChange={changeHandler}
                onBlur={(event) => {
                    blurHandler(event);
                }}
                disabled={disabled || false}
            />
            {errorMessage ? (
                <span className={styles.errorMsg}>{errorMessage}</span>
            ) : (
                ""
            )}
        </div>
    );
};

export default InputWithLabel;
