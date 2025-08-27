import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProjectIFormalDTO } from 'src/app/core/interfaces/IProjectIFormalDTO';
import { ENDPOINTS } from 'src/app/utils/url/endpoints-url';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProjectIformalService {

private readonly url = `${environment.route}/${ENDPOINTS.V1.IFORMAL_URL.PROJECT_IFORMAL_BY_CODE}`;


  constructor(private http: HttpClient) { }

  getProjectIFormalByProjectCode(projectCode: string): Observable<IProjectIFormalDTO[]> {
    return this.http.get<IProjectIFormalDTO[]>(`${this.url}/${projectCode}`);
  }

}
