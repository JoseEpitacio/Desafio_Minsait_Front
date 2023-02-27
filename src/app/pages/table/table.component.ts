import { Component, OnInit, EventEmitter, Output, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BookDTO } from 'src/app/models/bookDTO';
import { Book } from 'src/app/models/library';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  @Output() updateTable = new EventEmitter<Book[]>();
  @Output() updateSearched = new EventEmitter<boolean>();
  books: Book[] = [];
  booksToEdit?: Book;
  booksToCreate?: BookDTO;
  searchForm: FormGroup;
  dialogTitle = 'Titulo';
  isDialogVisible: boolean = false;
  isDialogVisibleEdit: boolean = false;
  checkbox1 = false;
  checkbox2 = false;
  searched = false;

  constructor(private bookService : BookService, private fb: FormBuilder) {
    this.searchForm = this.fb.group({
      toSearch: ['', [Validators.required]]
    })
  }
  
  ngOnInit() {
    this.bookService.getBooks().subscribe((result: Book[]) => (this.books = result));
  }

  search() {
    if(this.searchForm.valid){
      if(this.checkbox1)
        this.bookService.getByTitulo(this.searchForm.value).subscribe((books: Book[]) => {this.updateTable.emit(this.books = books)
        this.updateSearched.emit(this.searched = true);
        }, error => this.books = []);
      else if(this.checkbox2)
        this.bookService.getByAutor(this.searchForm.value).subscribe((books: Book[]) => {this.updateTable.emit(this.books = books)
        this.updateSearched.emit(this.searched = true);
        }, error => this.books = []);
    }else{
      alert("É necessário informar um Livro!");
    }
  }

  uncheckBox2() {
    if (this.checkbox1)
      this.checkbox2 = false;
  }

  uncheckBox1() {
    if (this.checkbox2)
      this.checkbox1 = false;
  }

  dialogClosed() {
    this.isDialogVisible = false;
  }

  dialogEditClosed() {
    this.isDialogVisibleEdit = false;
  }

  createBook(){
    this.booksToCreate = new BookDTO();
    this.isDialogVisible = true;
    this.dialogTitle = 'Criar'
  }

  editBook(book: Book){
    this.booksToEdit = book;
    this.isDialogVisibleEdit = true;
    this.dialogTitle = 'Editar';
  }

  deleteBook(book: Book){
    this.bookService.deleteBooks(book).subscribe((books: Book[]) => this.updateTable.emit(books));
  }

  newCreated(event: Book[]) {
    this.updateTable.emit(this.books = event);
  }

}
