import moment from "moment";

export const timeFromNow = (time: string): string =>
    moment(time).startOf("hour").fromNow();

export const getShortenString = (string: string): string => {
    if(string.length > 30) {
        return string.substring(0, 30) + "...";
    }

    return string;
};

export const getDataFromQueryUrl = (query: string) => {
    type DataType = { [key: string]: string };

    return query
        .slice(1)
        .split("&")
        .map((query: string) => query.split("="))
        .reduce((acc, curr) => {
            acc[curr[0]] = curr[1]; return acc;
        }, {} as DataType)
}