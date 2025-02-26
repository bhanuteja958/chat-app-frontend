import React from "react";
import Header from "../components/Header/Header";
import { Metadata } from "next";
import HeroSection from "../components/HeroSection/HeroSection";

export const metadata: Metadata = {
    title: "Youtalk - Simple, Realiable, Private",
    description:
        "An app to chat with people in a simple, reliable, private way",
};

export default function Page() {
    return (
        <>
            <Header />
            <HeroSection />
        </>
    );
}
