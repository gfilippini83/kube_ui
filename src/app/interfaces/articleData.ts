import { CommentData } from "./comment";

export interface ArticleData {
        
        _id: string,
        title: string,
        author: string,
        date: number,
        coverPhoto: string,
        footer: string,
        rating: number,
        comments: CommentData[],
        content: [
            {
                type: string,
                content: string
            }
        ]
        
}