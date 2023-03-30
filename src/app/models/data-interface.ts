export interface DocumentModel {
    id: string;
    name: string;
    text: string;
    annotations: Annotation[];
    image?: File;
}

export interface Annotation {
    id: string;
    text: string;
    page: number;
    x: number;
    y: number;
}
