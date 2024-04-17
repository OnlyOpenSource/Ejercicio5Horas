import { HttpClient, HttpErrorResponse,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
//CatchError: Permite manejar errores en el flujo de datos observable
//Observable: Es un tipo que representa un flujo de datos a lo largo del tiempo
//retry: Permite reintentar una operacion en caso de error
//thowError: es una funcion para emitir errores en un flujo de datos Observable
import { catchError,Observable,retry,throwError } from 'rxjs';
import { Student } from '../models/student.model';
@Injectable({
  providedIn: 'root'
})
export class HttpDataService {

  base_URL = 'http://localhost:3000/students';	//URL base del API donde se gestionan los datos de los estudiantes

  //Inyecta el HttpClient en el servicio para hacer peticiones HTTP
  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
  };

  //Opciones HTTP para manejo de errores que pueden ocurrir durante las peticiones
  handleError(error: HttpErrorResponse){

    if(error.error instanceof ErrorEvent){
      //Manejo de errores al lado del cliente o problemas de red
      console.log('An error occurred:', error.error.message);
    } else {
      console.log(
        //Manejo de errores devueltos por el backend
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    //Devuelven un Observable que emite un mensaje de error
    return throwError(
      'Something bad happened; please try again later.');
  }
  //Metodo para crear un nuevo registro de estudiantes
  createItem(item:any): Observable<Student> {
    return this.http
    .post<Student>(this.base_URL, JSON.stringify(item), this.httpOptions)
      .pipe( retry(2),catchError(this.handleError))
  }

  //Metodo para obtener todos los estudiantes
  getList(): Observable<Student> {
    return this.http
      .get<Student>(this.base_URL)
      .pipe( retry(2),catchError(this.handleError))
  }

  //Metodo para obtener un unico estudiante por su ID
  getItem(id: string): Observable<Student> {
    return this.http
      .get<Student>(this.base_URL + '/' + id)
      .pipe( retry(2),catchError(this.handleError))
  }

  //Metodo para actualizar un estudiante por su ID
  updateItem(id: string, item: any): Observable<Student> {
    return this.http
      .put<Student>(this.base_URL + '/' + id, JSON.stringify(item), this.httpOptions)
      .pipe( retry(2),catchError(this.handleError))
  }

  //Metodo para eliminar un estudiante por su ID
  deleteItem(id: any) {
    return this.http
      .delete<Student>(this.base_URL + '/' + id, this.httpOptions)
      .pipe( retry(2),catchError(this.handleError))
  }

}
