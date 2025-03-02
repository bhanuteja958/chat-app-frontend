"use client";
import { FC, ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface iPortalProps {
    children: ReactNode;
}

const Portal: FC<iPortalProps> = ({ children }) => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        return () => {
            setMounted(false);
        };
    });

    return mounted ? createPortal(children, document.body) : null;
};

export default Portal;
