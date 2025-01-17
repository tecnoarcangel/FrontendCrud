import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Empleado } from '../Interfaces/empleado';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  private endpoint:string = environment.endPoint;
  private apiUrl:string = this.endpoint + "empleado/";

  constructor(private http:HttpClient) { }

  getList():Observable<Empleado[]>{
    return this.http.get<Empleado[]>(`${this.apiUrl}lista`);
  }

  add(modelo:Empleado):Observable<Empleado[]>{
    return this.http.post<Empleado[]>(`${this.apiUrl}guardar`,modelo);
  }

  update(id:number,modelo:Empleado):Observable<Empleado[]>{
    return this.http.put<Empleado[]>(`${this.apiUrl}actualizar/${id}`,modelo);
  }

  delete(id:number):Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}eliminar/${id}`);
  }
  
}
