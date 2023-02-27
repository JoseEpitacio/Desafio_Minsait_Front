import { Guid } from 'guid-typescript';

export class BookDTO {
    id?: Guid
    title = "";
    subtitle = "";
    summary = "";
    pages?: number;
    date?: Date;
    editor = "";
    edition?: number;
    autorName = "";
}