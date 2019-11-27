import { IAuthor } from "./AuthorInterfaces";

export interface IBook {
  id: string;
  name: string;
  genre: string;
  author: IAuthor;
}

export interface StateBook {
  name: string;
  genre: string;
  authorId: string;
}

export interface PropBook {
  data: any;
}
