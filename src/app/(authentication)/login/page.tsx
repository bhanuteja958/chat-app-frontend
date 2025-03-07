import { FC } from "react";
import Header from "../../../components/Header/Header";
import LoginForm from "../../../components/LoginForm/LoginForm";
import CheckAuth from "../../../components/CheckAuth/CheckAuth";

export const metadata = {
    title: "Login",
    description: "",
};

const Page: FC<{}> = () => {
    return (
        <>
            <CheckAuth isAuthRoute={true} />
            <Header isLoginPage={true} />
            <LoginForm />
        </>
    );
};

export default Page;
