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

export const getUserByIdFetcher = async (id: string): Promise<IUser> => {
    const accessToken = getCookie('accessToken');
    const res = await fetch(`${process.env.APP_BASE_URL}/users/getUserById/${id}`, {
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

export const updateUserBackgroundFetcher = async (formData: FormData) => {
    const accessToken = getCookie('accessToken');
    const res = await fetch(`${process.env.APP_BASE_URL}/users/updateBackground`, {
        method: "POST",
        headers: {
            'Authorization': `Bearer ${accessToken}`
        },
        body: formData
    })
    if (!res.ok) {
        throw new Error('Error while updating background')
    }
    return res;
}

export const updateUserAvatarFetcher = async (formData: FormData) => {
    const accessToken = getCookie('accessToken');
    const res = await fetch(`${process.env.APP_BASE_URL}/users/updateAvatar`, {
        method: "POST",
        headers: {
            'Authorization': `Bearer ${accessToken}`
        },
        body: formData
    })
    if (!res.ok) {
        throw new Error('Error while updating avatar')
    }
    return res;
}