"use client";
import { FC, FormEvent, useEffect } from "react";
import InputWithLabel from "../InputWithLabel/InputWithLabel";
import useForm from "../../hooks/useForm";
import styles from "./LoginForm.module.scss";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../state/store";
import { login } from "../../state/slices/userSlice";
import DotsLoader from "../DotsLoader/DotsLoader";
import { useRouter } from "next/navigation";

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
    const router = useRouter();

    const authLoading = useSelector(
        (state: RootState) => state.user.authLoading,
    );
    const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
    const dispatch: AppDispatch = useDispatch();

    const handleLogin = () => {
        const isValidForm = validateForm();
        if (isValidForm) {
            const payload: iLoginPayload = {
                email: values["email"],
                password: values["password"],
            };
            dispatch(login(payload));
        }
    };

    useEffect(() => {
        if (isLoggedIn) {
            router.replace("/chat");
        }
    }, []);

    useEffect(() => {
        if (isLoggedIn) {
            router.replace("/chat");
        }
    }, [isLoggedIn]);

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
                <button
                    type="submit"
                    className={styles.loginBtn}
                    disabled={authLoading}
                >
                    {authLoading ? <DotsLoader /> : "Login"}
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
