import { getCookie } from "cookies-next";


export const signInFetcher = async ({ email, password }: { email: string, password: string }): Promise<{ accessToken: string }> => {
    const response = await fetch(`${process.env.APP_BASE_URL}/api/Login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email: email, password: password })
    });
    if (!response.ok) {
        const error = new Error();
        error.message = await response.text()
        throw error
    }
    return response.json()
}

export const signUpFetcher = async ({ email, password, firstName, lastName }: { email: string, password: string, firstName: string, lastName: string }) => {
    const response = await fetch(`${process.env.APP_BASE_URL}/api/User/CreateUser`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email: email, password: password, firstName: firstName, lastName: lastName })
    });
    if (!response.ok) {
        const error = new Error();
        error.message = await response.text()
        throw error
    }
    return response
}

export const testAuthFetcher = async (token?: string): Promise<boolean> => {
    const accessToken = getCookie('accessToken')
    const response = await fetch(`${process.env.APP_BASE_URL}/api/Login/TestAuth`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token ? token : accessToken}`,
        },
    });
    if (!response.ok) {
        return false;
    }
    return true;
}