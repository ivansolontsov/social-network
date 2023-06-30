'use client'

import { SocialPostsList } from "@/modules/SocialPosts/SocialPostsList/SocialPostsList";
import { getAllPostsFetcher } from "@/modules/SocialPosts/api";
import { useQuery } from "@tanstack/react-query";

export default function Main() {
    const { data, isLoading } = useQuery(['getAllPosts'], () => getAllPostsFetcher())

    return (
        <SocialPostsList posts={data} isLoading={isLoading} />
    )
}