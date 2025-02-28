import { FC, KeyboardEvent } from "react";
import DatePicker from "react-datepicker";
import styles from "./DateInput.module.scss";
import "react-datepicker/dist/react-datepicker.css";

interface iDateInputProps {
    name: string;
    label: string;
    value: Date;
    changeHandler: (x: Date) => void;
    errorMessage: string;
}

const DateInput: FC<iDateInputProps> = ({
    name,
    label,
    value,
    changeHandler,
    errorMessage,
}) => {
    return (
        <div className={styles.formGroup}>
            <label htmlFor={name} className={styles.inputLabel}>
                {label}
            </label>
            <DatePicker
                selected={value}
                onChange={changeHandler}
                className={`${styles.dateInput}  ${errorMessage ? styles.errorInput : ""}`}
                showYearDropdown
                scrollableYearDropdown
                yearDropdownItemNumber={100}
                maxDate={new Date()}
                dateFormat={"dd MMM yyyy"}
                onKeyDown={(event: KeyboardEvent<HTMLInputElement>) =>
                    event.preventDefault()
                }
            />
            {errorMessage ? (
                <p className={styles.errorMsg}>{errorMessage}</p>
            ) : (
                ""
            )}
        </div>
    );
};

export default DateInput;
