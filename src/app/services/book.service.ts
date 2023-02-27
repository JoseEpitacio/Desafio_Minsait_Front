import { Injectable } from '@angular/core';
import { Book } from '../models/library';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs/internal/Observable';
import { createBookDTO } from '../models/createBookDTO';
import { AutorBook } from '../models/autorbook';
import { SearchDto } from '../models/searchDto';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private url = "Book";
  constructor(private http: HttpClient) { }
  
 public getBooks() : Observable<Book[]> {
    return this.http.get<Book[]>(`${environment.apiUrl}/${this.url}`);
  }

  public getById(book: Book) : Observable<Book>{
    return this.http.get<Book>(`${environment.apiUrl}/${this.url}/${book.id}`);
  }

  public updateBooks(book: Book) : Observable<Book[]> {
    return this.http.put<Book[]>(`${environment.apiUrl}/${this.url}`,
    book);
  }
 
  public createBooks(book: createBookDTO) : Observable<Book[]> {
    return this.http.post<Book[]>(`${environment.apiUrl}/${this.url}`,
    book);
  }

  public deleteBooks(book: Book) : Observable<Book[]> {
    return this.http.delete<Book[]>(`${environment.apiUrl}/${this.url}/${book.id}`);
  }

  public deleteAutorBook(autorBook: AutorBook) : Observable<Book[]>{
    return this.http.post<Book[]>(`${environment.apiUrl}/${this.url}/${"DeleteAutor"}`, autorBook);
  }

  public getByTitulo(bookToSearch: SearchDto): Observable<Book[]>{
    return this.http.post<Book[]>(`${environment.apiUrl}/${this.url}/${"Search"}`, bookToSearch);
  }

  public getByAutor(autorToSearch: SearchDto): Observable<Book[]>{
    return this.http.post<Book[]>(`${environment.apiUrl}/${this.url}/${"Search/Autor"}`, autorToSearch);
  }

}

