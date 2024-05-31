import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import StorageKey from "../StorageKey";
import axiosRetry from 'axios-retry';

const getLocale = async () => {
    try {
        const locale = await AsyncStorage.getItem(StorageKey.LOCALE);
        return locale ?? "en";
    } catch (e) {
        return "en";
    }
};
const clientVersioning = axios.create({
    baseURL: "https://android.timedoor.biz/api/v1",
    timeout: 3000
});

axiosRetry(clientVersioning, {
    retries: 3, shouldResetTimeout: true, retryDelay: () => {
        return 500;
    },
    retryCondition: ()=> true
});

clientVersioning.interceptors.request.use(
    async (config) => {
        config.headers.Accept = "application/json";
        config.headers.ContentType = "application/json";
        return config;
    },
    (err) => {
        return Promise.reject(err);
    }
);

clientVersioning.interceptors.request.use(
    async (config) => {
        const locale = await getLocale();
        if (locale) {
            config.headers["X-App-Locale"] = locale;
        }

        const printable = `--Request--\nMethod: ${config?.method?.toUpperCase()} \nURL: ${config.baseURL
            }${config.url}\nHeader: ${JSON.stringify(config.headers, null, 2)}\nParams: ${JSON.stringify(
                config.params,
                null,
                2,
            )} \nData: ${JSON.stringify(config.data, null, 2)}`;
        console.log(printable);
        return config;
    },
    (error) => Promise.reject(error),
);

clientVersioning.interceptors.response.use(
    (response) => {
        const printable = `--Response--\nURL: ${response.config.baseURL}${response.config.url}\nStatus: ${response.status} \nResponse: ${JSON.stringify(
            response.data,
            null,
            2,
        )}`;
        console.log(printable);
        return response.data;
    },
    (error) => {
        const err = error.response?.data ?? error;
        return Promise.reject(err);
    },
);

export default clientVersioning;