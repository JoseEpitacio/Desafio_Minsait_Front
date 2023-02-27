import { Guid } from "guid-typescript";
import { Autor } from "./autor";

export class Book {
    id!: Guid;
    title = "";
    subtitle = "";
    summary = "";
    pages?: number;
    date?: Date;
    editor = "";
    edition?: number;
    autors?: Array<Autor>;
}