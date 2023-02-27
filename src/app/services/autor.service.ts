import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { Autor } from '../models/autor';
import { createAutorDTO } from '../models/createAutorDTO';
import { Book } from '../models/library';

@Injectable({
  providedIn: 'root'
})
export class AutorService {
  private url = "Autor"

  constructor(private http: HttpClient) {}
  
  public getAutor() : Observable<Book[]> {
    return this.http.get<Book[]>(`${environment.apiUrl}/${this.url}`);
  }
  
  public postAutor(autor: createAutorDTO) : Observable<Book[]> {
    return this.http.post<Book[]>(`${environment.apiUrl}/${this.url}`,
    autor);
  }

  public putAutor(autor: Autor) : Observable<Book[]> {
    return this.http.put<Book[]>(`${environment.apiUrl}/${this.url}`,
    autor);
  }

  public deleteAutor(autor: Autor) : Observable<Book[]> {
    return this.http.delete<Book[]>(`${environment.apiUrl}/${this.url}/${autor.id}`);
  }
  
  public createAutorBook(createAutorDTO: createAutorDTO) : Observable<Book[]> {
    return this.http.post<Book[]>(`${environment.apiUrl}/${this.url}`, createAutorDTO);
  }
}
