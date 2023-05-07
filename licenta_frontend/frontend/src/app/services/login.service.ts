import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserDetailsDTO } from '../common/user-details-dto';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private baseUrl = 'http://localhost:8080/user';
  private baseUrlLogin = 'http://localhost:8080/user/login';
  private baseUrlLogout = 'http://localhost:8080/user/logout';

  constructor(private httpClient: HttpClient) { }

  getUser(username: string, password: string): Observable<UserDetailsDTO> {
    const userUrl = `${this.baseUrl}/username/${username}/password/${password}`;
    return this.httpClient.get<UserDetailsDTO>(userUrl);
  }

  getUserName(username: string): Observable<UserDetailsDTO>{
    const userUrl = `${this.baseUrl}/login/${username}`;
    return this.httpClient.get<UserDetailsDTO>(userUrl);
  }

  updateUser(user: UserDetailsDTO): Observable<any>{
    const userUrl = `${this.baseUrlLogin}/${user.id}`;
    return this.httpClient.put<UserDetailsDTO>(userUrl, user);
  }

  updateUserLogout(user: UserDetailsDTO): Observable<any>{
    const userUrl = `${this.baseUrlLogout}/${user.id}`;
    return this.httpClient.put<UserDetailsDTO>(userUrl, user);
  }
  
}
