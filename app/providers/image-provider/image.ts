// This defines what an Image object will be,
// this will be imported into all the classes that 
// work with image objects.

export interface Image {
    id: string,
    createdAt: string,
    updatedAt: string,
    deleted: boolean,
    imageUrl: string,
    title: string,
    usersId: string
}