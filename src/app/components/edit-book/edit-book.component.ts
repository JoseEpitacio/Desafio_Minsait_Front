
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Autor } from 'src/app/models/autor';
import { AutorBook } from 'src/app/models/autorbook';
import { Book } from 'src/app/models/library';
import { AutorService } from 'src/app/services/autor.service';
import { BookService } from 'src/app/services/book.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.scss']
})
export class EditBookComponent implements OnInit {
  @Input() book?: Book;
  @Input() autor?: Autor;
  @Output() updateTable = new EventEmitter<Book[]>();
  @Output() updateBookForm = new EventEmitter<Book>();

  bookForm: FormGroup;
  autorForm: FormGroup;
  editAutorForm: FormGroup;
  reFalse: boolean = false;
  editFalse: boolean = false;
  
  constructor(private bookService: BookService, private autorService: AutorService, private fb: FormBuilder) {
      this.bookForm = this.fb.group({
      title: ['', [Validators.required]],
      subtitle: [''],
      summary: [''],
      pages: [Number, [Validators.required]],
      date: [Date, [Validators.required]],
      editor: ['', [Validators.required]],
      edition: [Number]
  })

      this.autorForm = this.fb.group({
        name: ['', Validators.required]
      })

      this.editAutorForm = this.fb.group({
        name: ['', [Validators.required]]
      })
  }

  ngOnInit(): void {
  }

  updateBook() {
    const data = {
      id: this.book!.id,
    ...this.bookForm.value
    }; 

    if (this.bookForm.valid)
      this.bookService.updateBooks(data).subscribe((result: Book[]) => {this.updateTable.emit(result)}, error => alert("Verifique os campos e tente novamente!"));
    else
      alert("Preencha os campos obrigatórios");
  }

  deleteAutor(autor: Autor, book: Book){
    let deleteAutorBook = new AutorBook
    deleteAutorBook.autorId = autor.id.toString();
    deleteAutorBook.bookId = book.id.toString();

    this.bookService.deleteAutorBook(deleteAutorBook).subscribe((result: Book[]) => {
      this.updateTable.emit(result)
      if(this.book != null)
        this.bookService.getById(this.book).subscribe((result: Book) => this.updateBookForm.emit(this.book = result))
    });
  }

  createNewAutor(){
    const data = {
      bookId: this.book!.id.toString(),
      ...this.autorForm.value
    }

    if (this.autorForm.valid){
      this.autorService.createAutorBook(data).subscribe((result: Book[]) => {
        this.updateTable.emit(result)
        if(this.book != null)
          this.bookService.getById(this.book).subscribe((result: Book) => this.updateBookForm.emit(this.book = result))
      });
    }else
      alert("Preencha os campos obrigatórios");

    this.reFalse = false;
  }

  newAutor() {
    this.reFalse = true;
    this.editFalse = false;
  }

  updateAutor(){
    const data = {
      id: this.autor!.id.toString(),
      ...this.editAutorForm.value
    }

    if (this.editAutorForm.valid){
      this.autorService.putAutor(data).subscribe((result: Book[]) => {
      this.updateTable.emit(result)
        if(this.book != null)
          this.bookService.getById(this.book).subscribe((result: Book) => this.updateBookForm.emit(this.book = result))
      });
      this.editFalse = false;
    }else
      alert('Preencha os campos obrigatórios');
  }

  editAutor(autor: Autor) {
    this.editFalse = true;
    this.reFalse = false;
    this.autor = autor;
  }
}