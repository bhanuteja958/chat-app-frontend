import React, { FC } from "react";
import Header from "../components/Header/Header";
import { Metadata } from "next";
import HeroSection from "../components/HeroSection/HeroSection";
import CheckAuth from "../components/CheckAuth/CheckAuth";

export const metadata: Metadata = {
    title: "Youtalk - Simple, Realiable, Private",
    description:
        "An app to chat with people in a simple, reliable, private way",
};

const Page: FC<{}> = () => {
    return (
        <>
            <CheckAuth />
            <Header />
            <HeroSection />
        </>
    );
};

export default Page;
