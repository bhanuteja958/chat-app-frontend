import { FC } from "react";
import ChatEntityList from "../../components/ChatEntityList/ChatEntityList";
import ConversationInterface from "../../components/ConversationInterface/ConversationInterface";

const Page: FC<{}> = () => {
    return (
        <ConversationInterface name="Alex" onlineStatus="true" userPic={null} />
    );
};

export default Page;
