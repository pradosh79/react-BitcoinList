import axiosInstance from "../axios/axios"
import { endPoints } from "../endpoints/endpoints"

export const bitcoinListFn = async () => {
    const res = await axiosInstance.get(endPoints.cms.bitcoinList)
    console.log(res, "bitcoinList")
    return res.data
}