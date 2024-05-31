import client from "../utils/network/client";
import { AxiosRequestConfig, AxiosRequestHeaders } from "axios";

/**
 * Created by Widiana Putra on 27/06/2022
 * Copyright (c) 2022 - Made with love
 */
export default function useBaseService() {
  const postAPI = async <E>(route: string, body?: any, config?: AxiosRequestConfig) => {
    try {
      return await client.post(route, body, config) as E;
    } catch (e) {
      throw e;
    }
  };
  
  const patchAPI = async <E>(route: string, body?: any, config?: AxiosRequestConfig) => {
    try {
      return await client.patch(route, body, config) as E;
    } catch (e) {
      throw e;
    }
  };

  const putAPI = async <E>(route: string, body?: any, config?: AxiosRequestConfig) => {
    try {
      return await client.put(route, body, config) as E;
    } catch (e) {
      throw e;
    }
  };

  const deleteAPI = async <E>(route: string, data?: AxiosRequestConfig<{}>, headers?: AxiosRequestHeaders) => {
    try {
      return await client.delete(route, {
        data,
        headers,
      }) as E;
    } catch (e) {
      throw e;
    }
  };

  const getAPI = async <E>(route: string, config?: AxiosRequestConfig<any>) => {
    try {
      return await client.get(route, config) as E;
    } catch (e) {
      throw e;
    }
  };

  return {
    postAPI,
    getAPI,
    patchAPI,
    deleteAPI,
    putAPI
  };
}
