"use client";
import { FC, FormEvent, FormEventHandler } from "react";
import InputWithLabel from "../InputWithLabel/InputWithLabel";
import useForm from "../../hooks/useForm";
import styles from "./LoginForm.module.scss";
import Link from "next/link";

const inputDetails: iInputInfo[] = [
    {
        name: "email",
        type: "email",
        defaultValue: "",
        required: true,
        validations: {
            email: true,
            required: true,
        },
    },
    {
        name: "password",
        type: "password",
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
                    const { name, type } = inputInfo;
                    return (
                        <InputWithLabel
                            label={name}
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
                <Link href={"/"} className={styles.ctaLink}>
                    Register
                </Link>
            </p>
        </div>
    );
};

export default LoginForm;
