import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ENDPOINTS } from 'src/app/utils/url/endpoints-url';
import { IProject } from 'src/app/core/interfaces/IProject';
import { GenericResponse } from 'src/app/core/interfaces/genericResponseDTO';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  //private readonly url = `${environment.route}/${ENDPOINTS.V1.PROJECT_URL.FILTER}`;
  private readonly url = 'http://localhost:8081/siiu-seguimproyectos-back/proyectos';

  constructor(private http: HttpClient) { }

  consultarProyectos(proyecto: IProject): Observable<IProject[]> {
  return this.http
    .post<GenericResponse<IProject[]>>(`${this.url}/consultar`, proyecto)
    .pipe(
      map((res) => {
        console.log('****Respuesta backend:', res);
        return res.data || [];
      })
    );
}


}
