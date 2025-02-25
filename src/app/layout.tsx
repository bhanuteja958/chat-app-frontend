import React from "react";
import { Alfa_Slab_One, Poppins } from "next/font/google";
import "./styles/global.scss";

const alfaSlabOne = Alfa_Slab_One({
    subsets: ["latin"],
    weight: ["400"],
    variable: "--font-alfa",
});
const poppins = Poppins({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
    variable: "--font-poppins",
});

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html
            lang="en"
            className={`${alfaSlabOne.variable} ${poppins.variable}`}
        >
            <body>{children}</body>
        </html>
    );
}
