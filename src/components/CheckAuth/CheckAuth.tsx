"use client";
import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../state/store";
import { userInfo } from "../../state/slices/userSlice";
import { useRouter } from "next/navigation";

interface iCheckAuthProps {
    isAuthRoute?: boolean;
    redirectToLogin?: boolean;
}

const CheckAuth: FC<iCheckAuthProps> = ({
    isAuthRoute = false,
    redirectToLogin = false,
}) => {
    const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
    const userDetails = useSelector(
        (state: RootState) => state.user.userDetails,
    );
    const dispatch: AppDispatch = useDispatch();
    const router = useRouter();

    const checkAuthentication = async () => {
        await dispatch(userInfo());
    };

    useEffect(() => {
        if (!isLoggedIn || Object.keys(userDetails).length === 0) {
            checkAuthentication();
        } else {
            router.replace("/chat");
        }
    }, []);

    useEffect(() => {
        if (isLoggedIn && isAuthRoute) {
            router.replace("/chat");
            return;
        }

        if (!isLoggedIn && redirectToLogin) {
            router.replace("/login");
        }
    }, [isLoggedIn]);

    return null;
};

export default CheckAuth;
