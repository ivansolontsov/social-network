"use client";
import React, { useEffect, useState } from "react";
import {
    QueryClient,
    QueryClientProvider,
} from "@tanstack/react-query";
import UserAuthWatcher from "./User/components/UserAuthWatcher/UserAuthWatcher";

const queryClient = new QueryClient();
function ClientProvider({ children }: { children: React.ReactNode }) {
    const [mounted, setMounted] = useState<boolean>(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null
    return (
        <QueryClientProvider client={queryClient}>
            <UserAuthWatcher>
                {children}
            </UserAuthWatcher>
        </QueryClientProvider>
    );
}

export default ClientProvider;