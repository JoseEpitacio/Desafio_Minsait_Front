import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Book } from 'src/app/models/library';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() updateTable = new EventEmitter<Book[]>();
  books: Book[] = [];
  searchForm: FormGroup;

  constructor(private fb: FormBuilder, private bookService: BookService) {
    this.searchForm = this.fb.group({
      toSearch: ['', [Validators.required]]
    })
  }

  ngOnInit(): void {
  }

}
