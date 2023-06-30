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

export const getPostsByUserIdFetcher = async (id: string): Promise<ISocialPost[]> => {
    const accessToken = getCookie('accessToken');
    const res = await fetch(`${process.env.APP_BASE_URL}/post/getPostsByUserId/${id}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    })
    if (!res.ok) {
        return []
    }
    return res.json()
}

export const createPostFetcher = async (formData: FormData) => {
    const accessToken = getCookie('accessToken');
    const res = await fetch(`${process.env.APP_BASE_URL}/post/createPost`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${accessToken}`
        },
        body: formData
    })
}