import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserDetailsDTO } from '../common/user-details-dto';
import { UserDTO } from '../common/user-dto';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = 'http://localhost:8080/user';

  constructor(private httpClient: HttpClient) { }

  getUser(id: string): Observable<UserDetailsDTO> {
    return this.httpClient.get<UserDetailsDTO>(`${this.baseUrl}/${id}`)
  }

  getUsers(): Observable<UserDTO[]> {
    return this.httpClient.get<UserDTO[]>(this.baseUrl);
  }

  getUsersDetails(): Observable<UserDetailsDTO[]> {
    return this.httpClient.get<UserDetailsDTO[]>(`${this.baseUrl}/details`);
  }

  addUser(user: UserDetailsDTO): Observable<any> {
    return this.httpClient.post<UserDetailsDTO>(this.baseUrl, user);
  }

  deleteUser(id: string): Observable<any> {
    return this.httpClient.delete<UserDetailsDTO>(`${this.baseUrl}/delete/${id}`)
  }

  modifyUser(user: UserDetailsDTO): Observable<any> {
    return this.httpClient.post<UserDetailsDTO>(`${this.baseUrl}/password/${user.id}`, user);
  }

}
