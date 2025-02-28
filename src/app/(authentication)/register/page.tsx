import { FC } from "react";
import Header from "../../../components/Header/Header";
import RegisterForm from "../../../components/RegisterForm/RegisterForm";

const Page: FC<{}> = () => {
    return (
        <>
            <Header />
            <RegisterForm />
        </>
    );
};

export default Page;
