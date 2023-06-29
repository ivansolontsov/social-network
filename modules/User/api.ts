import { getCookie } from "cookies-next"
import { IUser } from "./type";

export const getUserFetcher = async (): Promise<IUser> => {
    const accessToken = getCookie('accessToken');
    const res = await fetch(`${process.env.APP_BASE_URL}/users/getUser`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${accessToken}`
        }
    })
    if (!res.ok) {
        throw new Error('Error while getting user data')
    }
    return res.json();
}