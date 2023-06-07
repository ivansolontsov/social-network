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
        <>
            <h1>Social Network</h1>
            <MainPageAuthorized />
        </>
    )

    if (accessToken) {
        const isAuth = await testAuthFetcher(accessToken.value.toString());
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