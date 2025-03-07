import { FC } from "react";
import Header from "../../../components/Header/Header";
import RegisterForm from "../../../components/RegisterForm/RegisterForm";
import CheckAuth from "../../../components/CheckAuth/CheckAuth";

const Page: FC<{}> = () => {
    return (
        <>
            <CheckAuth isAuthRoute={true} />
            <Header />
            <RegisterForm />
        </>
    );
};

export default Page;
