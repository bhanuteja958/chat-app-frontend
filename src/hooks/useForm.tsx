import { ChangeEvent, FocusEvent, useState } from "react";

const validateInput = (
    value: string,
    validationKey: string,
    validationValue: any,
): [boolean, string] => {
    let error: string = "";
    let isValid: boolean = true;
    switch (validationKey) {
        case "email":
            const EMAIL_REGEX = /^[\w.%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if (!EMAIL_REGEX.test(value)) {
                error = "Invalid Email";
                isValid = false;
            }
            break;
        case "maxLength":
            if (value.length >= validationValue) {
                error = `Maximum of ${validationValue} characters allowed`;
                isValid = false;
            }
            break;
        case "minLength":
            if (value.length <= validationValue) {
                error = `Minimum of ${validationValue} characters required `;
                isValid = false;
            }
            break;
        case "required":
            if (!value) {
                error = "This field is required";
                isValid = false;
            }
            break;
        default:
            error = "Invalid Value";
            isValid = false;
    }
    return [isValid, error];
};

const useForm = (inputsInfo: iInputInfo[]) => {
    const [values, setValues] = useState<Record<string, any>>(() => {
        const initialValues: Record<string, string> = {};
        inputsInfo.forEach((input: iInputInfo) => {
            initialValues[input.name] = input.defaultValue;
        });
        return initialValues;
    });

    const [errors, setErrors] = useState<Record<string, any>>(() => {
        const initialErrors: Record<string, string> = {};
        inputsInfo.forEach((input: iInputInfo) => {
            initialErrors[input.name] = input.defaultValue;
        });
        return initialErrors;
    });

    const otherInputsInfo: Record<string, any> = {};
    inputsInfo.forEach((input: iInputInfo) => {
        otherInputsInfo[input.name] = {
            required: input.required,
            validations: input.validations,
        };
    });

    const validate = (
        name: string,
        value: string,
        validations: iValidations,
    ) => {
        let executeValidations: boolean = false;
        let isValidInput: boolean = true;
        if (otherInputsInfo[name].required) {
            executeValidations = true;
            if (!value) {
                isValidInput = false;
                setErrors((prevErrors) => {
                    const newErrors = { ...prevErrors };
                    newErrors[name] = `This field is required`;
                    return newErrors;
                });
                return isValidInput;
            }
        } else {
            executeValidations = value ? true : false;
        }

        if (executeValidations) {
            isValidInput = Object.entries(validations).every(
                ([validationKey, validationValue]) => {
                    const [isValid, error]: [boolean, string] = validateInput(
                        value,
                        validationKey,
                        validationValue,
                    );
                    setErrors((prevErrors) => {
                        const newErrors = { ...prevErrors };
                        newErrors[name] = error;
                        return newErrors;
                    });
                    return isValid;
                },
            );
        }

        return isValidInput;
    };

    const validateForm = () => {
        let isValidForm: boolean = true;
        inputsInfo.forEach((input) => {
            const { name } = input;
            const isValidInput: boolean = validate(
                name,
                values[name],
                otherInputsInfo[name].validations,
            );
            isValidForm = isValidForm && isValidInput;
        });
        return isValidForm;
    };

    const changeHandler = (
        event: ChangeEvent<
            HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >,
    ) => {
        const { name, value } = event.target;
        setValues((prevValues) => {
            const newValues = { ...prevValues };
            newValues[name] = value;
            return newValues;
        });
        setErrors((prevErrors) => {
            const newErrors = { ...prevErrors };
            newErrors[name] = "";
            return newErrors;
        });
    };

    const blurHandler = (
        event: FocusEvent<
            HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >,
    ) => {
        const { name, value } = event.target;
        validate(name, value, otherInputsInfo[name].validations);
    };

    return { values, errors, changeHandler, blurHandler, validateForm };
};

export default useForm;
