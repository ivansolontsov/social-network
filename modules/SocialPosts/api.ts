import { getCookie } from "cookies-next"
import { ISocialPost } from "./type";

export const getAllPostsFetcher = async (): Promise<ISocialPost[]> => {
    const accessToken = getCookie('accessToken');
    const res = await fetch(`${process.env.APP_BASE_URL}/post/GetAll`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${accessToken}`
        },
    })
    if (!res.ok) {
        return []
    }
    return res.json()
}