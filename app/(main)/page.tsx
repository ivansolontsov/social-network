import Hero from '@/components/landing/hero/Hero';
import { testAuthFetcher } from '@/modules/Auth/Api'
import { cookies } from 'next/dist/client/components/headers';
import React from 'react'

export default async function Main() {
    const cookiesStore = cookies()
    const accessToken = cookiesStore.get('accessToken');

    const unauthorizedPage = (
        <Hero />
    )

    const authorizedPage = (
        <>Authorized</>
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