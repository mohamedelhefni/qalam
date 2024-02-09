export interface Note {
    title: string, 
    content: string,
    views: number
    created_at: number,
    updated_at: number,
    deleted_at: number | null,
    is_public: boolean,
    createdAt: string,
    updatedAt: string,
}