import axiosInstance from "../axios/axios"
import { endPoints } from "../endpoints/endpoints"

export const bitcoinListFn = async (APIKey) => {
    const res = await axiosInstance.get(`https://rest.coincap.io/v3/assets`, {
        params: {
            apiKey: APIKey
        }
    })
    console.log(res, "bitcoinList")
    return res.data
}