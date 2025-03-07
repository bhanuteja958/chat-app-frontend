import { FC } from "react";
import ChatContainer from "../../components/ChatContainer/ChatContainer";
import CheckAuth from "../../components/CheckAuth/CheckAuth";

const Page: FC<{}> = async () => {
    return (
        <>
            <CheckAuth redirectToLogin={true} />
            <ChatContainer />
        </>
    );
};

export default Page;
