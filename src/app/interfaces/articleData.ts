export interface ArticleData {
        
        _id: string,
        title: string,
        author: string,
        date: string,
        coverPhoto: string,
        footer: string,
        content: [
            {
                type: string,
                content: string
            }
        ]
        
}