
export interface ISocialPost {
    id: string
    postTitle: string
    postText: string
    postCreatedDate: string
    likes: ILike[]
    author: IAuthor
}

export interface ILike {
    id: string
    user: IUser
}

export interface IUser {
    id: string
    firstName: string
    lastName: string
}

export interface IAuthor {
    id: string
    firstName: string
    lastName: string
}