

export interface News {
    mal_id: number,
    url: string,
    title: string,
    date: string,
    author_username: string,
    author_url: string,
    forum_url: string,
    images: {
        jpg: {
            image_url: string
        }
    },
    comments: 0,
    excerpt: "string"
}