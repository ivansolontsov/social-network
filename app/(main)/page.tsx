import MainPageAuthorized from '@/components/MainPageAuthorized/MainPageAuthorized';
import MainPageUnauthorized from '@/components/MainPageUnauthorized/MainPageUnauthorized';
import { testAuthFetcher } from '@/modules/Auth/Api'
import { cookies } from 'next/dist/client/components/headers';
import React from 'react'

export default async function Main() {
    const cookiesStore = cookies()
    const accessToken = cookiesStore.get('accessToken');

    const unauthorizedPage = (
        <MainPageUnauthorized />
    )

    const authorizedPage = (
        <MainPageAuthorized />
    )

    if (accessToken) {
        const isAuth = await testAuthFetcher(accessToken.value.toString());
        console.log(isAuth)
        if (isAuth) {
            return authorizedPage
        } else {
            return unauthorizedPage
        }
    }
    if (!accessToken) {
        return unauthorizedPage;
    }
}