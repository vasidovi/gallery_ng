export interface IPhoto {
    id: number;
    name: string;
    tags: string[];
    catalogs: string[];
    description: string;
    file: string;
    imageFormat: string;
    date: Date;
}
