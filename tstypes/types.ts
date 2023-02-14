// export type User = {
//     id: number,
//     name: string
// }
export type User = {
    id: number,
    name: string,
    password: string,
    email: string
}
// export interface UserConstructor {
//     new(): User;
//     new(user: User): User;
//     new(id: number, name: string)
// }
// export declare var User: UserConstructor

export type Stamp = {
    id?: number
    title: string,
    content: string,
    createdAt: Date | string,
    authorId: number
}
// export type Stamp = {
//     title: string,
//     content: string,
//     createdAt: Date,
// }