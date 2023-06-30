
export interface ISocialPost {
    id: number
    text: string
    image: string
    postCreatedDate: string
    author: IAuthor
    likes: []
}

export interface IAuthor {
    id: number
    name: string
    avatar: string
}
