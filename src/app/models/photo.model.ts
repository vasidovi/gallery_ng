export interface IPhoto {
    id: number;
    name: string;
    tags: object[];
    catalogs: string[];
    description: string;
    file: string;
    imageFormat: string;
    date: Date;
}
