
export interface ISocialPost {
    id: number
    text: string
    image: string
    postCreatedDate: string
    author: IAuthor
    likes: number
    isLiked: boolean
}

export interface ILikes {
    postId: number
    userId: number
}

export interface IAuthor {
    id: number
    name: string
    avatar: string
}
