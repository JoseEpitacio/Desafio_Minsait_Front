import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BookDTO } from 'src/app/models/bookDTO';
import { BookService } from 'src/app/services/book.service';
import { Autor } from 'src/app/models/autor';
import { Book } from 'src/app/models/library';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-book',
  templateUrl: './create-book.component.html',
  styleUrls: ['./create-book.component.scss']
})
export class CreateBookComponent implements OnInit {
  @Input() book?: BookDTO
  @Output() updateTable = new EventEmitter<Book[]>();
  @Output() close = new EventEmitter<void>();
  createdBook!: Book;
  createdAutor!: Autor;
  bookForm: FormGroup;
  alertP: boolean = false;

  constructor(private bookService: BookService, private fb: FormBuilder) {
      this.bookForm = this.fb.group({
      title: ['', [Validators.required]],
      subtitle: [''],
      summary: [''],
      pages: [Number, [Validators.required]],
      date: [Date, [Validators.required]],
      editor: ['', [Validators.required]],
      edition: [Number],
      autorName: ['', [Validators.required]]
   })
  }
  ngOnInit(): void {}

  createAutorBook(){
    if(this.bookForm.valid){
      this.bookService.createBooks(this.bookForm.value).subscribe((result: Book[]) => {(this.updateTable.emit(result))
      this.close.emit();
      }, error => alert('Verifique os campos e tente novamente!'));
    } else{
      this.alertP = true;
    }
      
  }
}
