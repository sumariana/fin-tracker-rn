import AsyncStorage from "@react-native-async-storage/async-storage";
import { useBottomSheet } from "../../../tmd/providers/BottomSheetProvider";
import TmdConstants from "../../../tmd/utils/TmdConstants";
import { CountryListResponse, CountryLogin } from "../../models/environment/Country"
import countryClient from "../../utils/network/countryClient";
import StorageKey from "../../utils/StorageKey";
import useBaseService from "../useBaseService"

export default function useEnvService() {
    const { getAPI, postAPI } = useBaseService()
    const { showErrorBS } = useBottomSheet()

    const loginCountryAPI = async () => {
        try {
            const res = await countryClient.post('auth/login', {
                email: TmdConstants.COUNTRY_EMAIL,
                password: TmdConstants.COUNTRY_PASSWORD
            }) as CountryLogin
            AsyncStorage.setItem(StorageKey.COUNTRY_TOKEN,res.accessToken)
        } catch (e) {
            showErrorBS(e)
        }
    }

    const getCountryList = () => {
        return new Promise<CountryListResponse>(async (resolve, reject) => {
            try {
                const res = await countryClient.get(`countries`, {
                    params: {
                        take: 250
                    }
                }) as CountryListResponse
                resolve(res)
            } catch (e) {
                reject(e)
            }
        })
    }

    return {
        getCountryList,
        loginCountryAPI
    }
}