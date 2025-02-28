"use client";
import { FC, FormEvent, FormEventHandler } from "react";
import InputWithLabel from "../InputWithLabel/InputWithLabel";
import useForm from "../../hooks/useForm";
import styles from "./LoginForm.module.scss";
import Link from "next/link";

const inputDetails: iInputInfo[] = [
    {
        name: "email",
        label: "Email",
        type: "email",
        inputType: "input",
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

const LoginForm: FC<{}> = () => {
    const { values, errors, changeHandler, blurHandler, validateForm } =
        useForm(inputDetails);

    const handleLogin = () => {
        validateForm();
    };
    return (
        <div className={styles.loginFormContainer}>
            <form
                className={styles.loginForm}
                onSubmit={(event: FormEvent) => {
                    event.preventDefault();
                    handleLogin();
                }}
            >
                {inputDetails.map((inputInfo) => {
                    const { name, label, type } = inputInfo;
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
                })}
                <button type="submit" className={styles.loginBtn}>
                    Login
                </button>
            </form>
            <p className={styles.registerCta}>
                Don't have an account?{" "}
                <Link href={"/register"} className={styles.ctaLink}>
                    Register
                </Link>
            </p>
        </div>
    );
};

export default LoginForm;
