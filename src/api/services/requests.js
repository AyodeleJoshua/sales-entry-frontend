import { getRequest } from "../apiCall";

export const getHeader = () => getRequest({ url: "/header" });

export const getDetailData = () => getRequest({ url: "/detail" });


