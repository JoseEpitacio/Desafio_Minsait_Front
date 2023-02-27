import { Guid } from "guid-typescript";
import { Book } from "./library";

export class Autor{
    id!: Guid;
    name = "";
    books?: Array<Book>;
}