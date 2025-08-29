import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IParticipantGroupDTO } from 'src/app/core/interfaces/IParticipantGroupDTO';
import { ENDPOINTS } from 'src/app/utils/url/endpoints-url';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ParticipantGroupService {

private readonly url = `${environment.route}/${ENDPOINTS.V1.GROUP_URL.PARTICIPANT_GROUP}`;


  constructor(private http: HttpClient) { }

  getParticipantGroupByid(id: number): Observable<IParticipantGroupDTO> {
    return this.http.get<IParticipantGroupDTO>(`${this.url}/by-id/${id}`);
  }

  getParticipantGroup(): Observable<IParticipantGroupDTO[]> {
    return this.http.get<IParticipantGroupDTO[]>(`${this.url}`);
  }

}
