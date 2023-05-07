import { Component, ViewEncapsulation } from '@angular/core';
import { UserDetailsDTO } from './common/user-details-dto';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  title = 'frontend';
  isLoggedIn: boolean = false;
  user: UserDetailsDTO = new UserDetailsDTO();

  constructor(private loginService: LoginService) {
    console.log(this.isLoggedIn);
  }

  logout() {
    this.user.loggedin=false;
    this.loginService.updateUserLogout(this.user).subscribe(
      data => {
        this.user = new UserDetailsDTO();
        window.location.href = 'http://localhost:4200/home';
      }
    );
  }
}
