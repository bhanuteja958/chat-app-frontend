import { MONTHS } from "./constants";

export const formatDate = (date: Date, format: string) => {
    if (!date) {
        return "";
    }

    const year = new Date(date).getFullYear();
    const month = new Date(date).getMonth();
    const day = new Date(date).getDate();

    switch (format) {
        case "dd mmm yyyy":
            return `${day} ${MONTHS[month].slice(0, 3)} ${year}`;
        default:
            return "";
    }
};

export const debounce = (fn: (...args: any[]) => any, interval: number) => {
    let timeout = null;
    return (...args: any[]) => {
        if (timeout) {
            clearTimeout(timeout);
        }

        timeout = setTimeout(() => {
            fn(...args);
        }, interval);
    };
};
