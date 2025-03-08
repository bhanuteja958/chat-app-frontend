import { HTMLInputTypeAttribute } from "react";

declare global {
    interface iSVGProps {
        styles?: string;
    }

    interface iInputInfo {
        name: string;
        label: string;
        inputType: string;
        type: HTMLInputTypeAttribute;
        defaultValue: string;
        required: true;
        validations: iValidations;
    }

    interface iValidations {
        email?: boolean;
        maxLength?: number;
        minLength?: number;
        required?: boolean;
    }

    interface iDropdownItem {
        name: string;
        link?: string;
        handler?: (...args: [any]) => any;
    }

    interface iLoginPayload {
        email: string;
        password: string;
    }

    interface iRegisterPayload {
        fullName: string;
        dob: string;
        email: string;
        password: string;
    }

    interface iFriendDetails {
        userId: number;
        profilePic: string;
        fullName: string;
        email: string;
    }

    interface iSocketMessage {
        type: string;
        data: any;
    }
}

export {};
