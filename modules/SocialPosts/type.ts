
export interface ISocialPost {
    id: number
    title: string
    text: string
    postCreatedDate: string
    author: IAuthor
}

export interface IAuthor {
    id: number
    name: string
    avatar: string
}
