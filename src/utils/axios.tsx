import { AxiosPromise, AxiosRequestConfig } from "axios";
import axios from "axios";
import { HTTPMethods } from "../api/apiUtils";

export const fetch = (
  endpoint: string,
  method: keyof HTTPMethods,
  payload: object | undefined = undefined,
  fetchConfig?: AxiosRequestConfig
): AxiosPromise => {
  const config: AxiosRequestConfig = {
    method,
    url: `${endpoint}`,
    ...fetchConfig
  };
  if (payload) {
    config.data = payload;
    config.params = payload;
  }
  return axios(config);
};
