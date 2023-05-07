import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PersonDTO } from '../common/person-dto';
import { Observable } from 'rxjs';
import { PersonDetailsDTO } from '../common/person-details-dto';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  private baseUrl = 'http://localhost:8080/person';

  constructor(private httpClient: HttpClient) { }

  getPerson(id: string): Observable<PersonDetailsDTO> {
    return this.httpClient.get<PersonDetailsDTO>(`${this.baseUrl}/${id}`)
  }

  getPersons(): Observable<PersonDTO[]> {
    return this.httpClient.get<PersonDTO[]>(this.baseUrl);
  }

  getPersonsDetails(): Observable<PersonDetailsDTO[]> {
    return this.httpClient.get<PersonDetailsDTO[]>(`${this.baseUrl}/details`);
  }

  addPerson(person: PersonDetailsDTO): Observable<any> {
    return this.httpClient.post<PersonDetailsDTO>(this.baseUrl, person);
  }

  deletePerson(id: string): Observable<any> {
    return this.httpClient.delete<PersonDetailsDTO>(`${this.baseUrl}/delete/${id}`)
  }

  modifyPerson(person: PersonDetailsDTO): Observable<any> {
    return this.httpClient.post<PersonDetailsDTO>(`${this.baseUrl}/address/${person.id}`, person);
  }

}
