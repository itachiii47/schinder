import format from "date-fns/format";

export function numberWithComma(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function formatDate(date, dateFormat = "dd eee yyyy") {
    return format(date, dateFormat);
}
export function formatEndDate(date, dateFormat = "dd MMM yyyy") {
    return format(date, dateFormat);
}
export function inputFormatDate(date, dateFormat = "yyyy-MM-dd") {
    return format(date, dateFormat);
}

const exportObject = {
    formatEndDate,
    numberWithComma,
    formatDate,
    inputFormatDate
};

export default exportObject;
