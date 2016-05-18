// This defines what an Tag object will be,
// this will be imported into all the classes that 
// work with tag objects.

export interface Tag {
    id: string,
    createdAt: string,
    updatedAt: string,
    deleted: boolean,
    tag: string
}