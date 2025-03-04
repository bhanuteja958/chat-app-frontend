"use client";
import { FC, FormEvent, useEffect } from "react";
import InputWithLabel from "../InputWithLabel/InputWithLabel";
import useForm from "../../hooks/useForm";
import styles from "./RegisterForm.module.scss";
import Link from "next/link";
import DateInput from "../DateInput/DateInput";
import { formatDate } from "../../common/helper";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../state/store";
import { register } from "../../state/slices/userSlice";
import { useRouter } from "next/navigation";
import DotsLoader from "../DotsLoader/DotsLoader";
import { PayloadAction } from "@reduxjs/toolkit";

const inputDetails: iInputInfo[] = [
    {
        name: "fullName",
        label: "Full Name",
        inputType: "input",
        type: "text",
        defaultValue: "",
        required: true,
        validations: {
            maxLength: 40,
            minLength: 3,
        },
    },
    {
        name: "dateOfBirth",
        label: "Date of Birth",
        inputType: "date",
        type: "text",
        defaultValue: formatDate(new Date(), "dd mmm yyyy"),
        required: true,
        validations: {},
    },
    {
        name: "email",
        label: "Email",
        inputType: "input",
        type: "email",
        defaultValue: "",
        required: true,
        validations: {
            email: true,
        },
    },
    {
        name: "password",
        label: "Password",
        type: "password",
        inputType: "input",
        defaultValue: "",
        required: true,
        validations: {
            minLength: 7,
            maxLength: 30,
        },
    },
];

const RegisterForm: FC<{}> = () => {
    const {
        values,
        errors,
        dateChangeHandler,
        changeHandler,
        blurHandler,
        validateForm,
    } = useForm(inputDetails);
    const router = useRouter();

    const authLoading = useSelector(
        (state: RootState) => state.user.authLoading,
    );
    const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
    const dispatch: AppDispatch = useDispatch();

    const handleRegister = async () => {
        const isValidForm: boolean = validateForm();
        if (isValidForm) {
            const { email, password, fullName, dateOfBirth } = values;
            const payload: iRegisterPayload = {
                dob: dateOfBirth,
                email,
                password,
                fullName,
            };
            const res: PayloadAction<any> = await dispatch(register(payload));
            if (res.payload.success) {
                router.replace("/login");
            }
        }
    };

    useEffect(() => {
        if (isLoggedIn) {
            router.replace("/chat");
        }
    }, []);
    return (
        <div className={styles.registerFormContainer}>
            <form
                className={styles.registerForm}
                onSubmit={(event: FormEvent) => {
                    event.preventDefault();
                    handleRegister();
                }}
            >
                {inputDetails.map((inputInfo) => {
                    const { name, label, type, inputType } = inputInfo;
                    switch (inputType) {
                        case "input":
                            return (
                                <InputWithLabel
                                    name={name}
                                    label={label}
                                    value={values[name]}
                                    type={type}
                                    changeHandler={changeHandler}
                                    blurHandler={blurHandler}
                                    errorMessage={errors[name]}
                                    key={name}
                                />
                            );
                        case "date":
                            return (
                                <DateInput
                                    name={name}
                                    label={label}
                                    value={values[name]}
                                    changeHandler={(date) => {
                                        dateChangeHandler(name, date);
                                    }}
                                    key={name}
                                    errorMessage={errors[name]}
                                />
                            );
                    }
                })}
                <button type="submit" className={styles.registerBtn}>
                    {authLoading ? <DotsLoader /> : "Register"}
                </button>
            </form>
            <p className={styles.loginCta}>
                Already have an account?{" "}
                <Link href="/login" className={styles.ctaLink}>
                    Login
                </Link>
            </p>
        </div>
    );
};

export default RegisterForm;
