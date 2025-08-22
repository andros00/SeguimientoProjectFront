import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ENDPOINTS } from 'src/app/utils/url/endpoints-url';
import{IProjectParticipantDTO} from 'src/app/core/interfaces/IPojectParticipantDTO'


@Injectable({
  providedIn: 'root'
})
export class ParticipantService {

   private readonly url = `${environment.route}/${ENDPOINTS.V1.PARTICIPANT_URL.PARTICIPANT_PROJECT}`;


  constructor(private http: HttpClient) { }

  getParticipantsByProjectCode(projectCode: string): Observable<IProjectParticipantDTO[]> {
    return this.http.get<IProjectParticipantDTO[]>(`${this.url}/by-project/${projectCode}`);
  }
}
