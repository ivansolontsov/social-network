'use client'

import { testAuthFetcher } from '@/modules/Auth/Api'
import { useQuery } from '@tanstack/react-query'
import { getCookie, getCookies } from 'cookies-next'
import React from 'react'
import { useUsersStore } from '../../store'
import { getUserFetcher } from '../../api'

type Props = {
    children: React.ReactNode
}

const UserAuthWatcher = ({ children }: Props) => {
    const setAuth = useUsersStore((store) => store.setAuth)
    const setUser = useUsersStore((store) => store.setUser)

    useQuery(['testAuth'], () => testAuthFetcher(), {
        enabled: getCookie('accessToken') ? true : false,
        onSuccess: () => {
            setAuth(true)
        },
        onError: () => {
            setAuth(false)
        }
    })

    useQuery(['getUser'], () => getUserFetcher(), {
        enabled: getCookie('accessToken') ? true : false,
        onSuccess: (data) => {
            setUser(data)
        },
        onError: () => {
            setAuth(false)
        }
    })

    return (
        <>
            {children}
        </>
    )
}

export default UserAuthWatcher