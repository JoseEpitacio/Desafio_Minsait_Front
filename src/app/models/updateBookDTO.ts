import { Guid } from 'guid-typescript';

export class UpdateBookDTO {
    id!: Guid
    title = "";
    subtitle = "";
    summary = "";
    pages?: number;
    date?: Date;
    editor = "";
    edition?: number;
}