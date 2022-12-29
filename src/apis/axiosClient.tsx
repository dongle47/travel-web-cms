import axios from "axios";
import queryString from "query-string";

const baseURL = "https://travel-api.huytx.com/stag/";

export const axiosClient = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  //   paramsSerializer: (params) => queryString.stringify(params),
  paramsSerializer: {
    encode: (param): string => queryString.stringify(param),
  },
});
