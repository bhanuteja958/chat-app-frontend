import { months } from "./constants";

export const formatDate = (date: Date, format: string) => {
    if (!date) {
        return "";
    }

    const year = new Date(date).getFullYear();
    const month = new Date(date).getMonth();
    const day = new Date(date).getDate();

    switch (format) {
        case "dd mmm yyyy":
            return `${day} ${months[month].slice(0, 3)} ${year}`;
        default:
            return "";
    }
};
