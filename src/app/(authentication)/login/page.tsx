import { FC } from "react";
import Header from "../../../components/Header/Header";
import LoginForm from "../../../components/LoginForm/LoginForm";

export const metadata = {
    title: "Login",
    description: "",
};

const Page: FC<{}> = () => {
    return (
        <>
            <Header isLoginPage={true} />
            <LoginForm />
        </>
    );
};

export default Page;
