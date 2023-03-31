
export interface DocumentModel {
    id: string;
    name: string;
    pages: PageModel[];
    annotations: AnnotationModel[];
}

export interface PageModel {
    src: string;
}

export interface AnnotationModel {
    id: string;
    type: 'text' | 'image'
    text?: string;
    image?: string;
    page: number;
    x: number;
    y: number;
}
