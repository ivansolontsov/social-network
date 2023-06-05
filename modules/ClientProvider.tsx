"use client";
import React, { useEffect, useState } from "react";
import {
    QueryClient,
    QueryClientProvider,
} from "@tanstack/react-query";

const queryClient = new QueryClient();
function ClientProvider({ children }: { children: React.ReactNode }) {
    const [mounted, setMounted] = useState<boolean>(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null
    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
}

export default ClientProvider;