
export interface Book {
    id: string;
    name: string;
    author: string;
    coverImage: string;
    description: string;
    authorImage?: string;
  }
  
  export interface Author {
    id: string;
    name: string;
    image: string;
    books: string[];
  }
  