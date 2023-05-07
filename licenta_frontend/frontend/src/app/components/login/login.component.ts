import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { UserDetailsDTO } from 'src/app/common/user-details-dto';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: UserDetailsDTO = new UserDetailsDTO();
  loginFormGroup: FormGroup;
  errorMessage = 'Invalid Credentials.';
  successMessage = 'Login Successful.';
  invalidLogin = false;
  loginSuccess = false;

  constructor(private loginService: LoginService, private route: ActivatedRoute, private router: Router, private appComponet: AppComponent) { }

  ngOnInit(): void {
    this.loginFormGroup = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.minLength(2)]),
      password: new FormControl('', [Validators.required, Validators.minLength(2)])
    });
  }

  onSubmit() {
    this.loginService.getUserName(this.loginFormGroup.controls?.['username'].value).subscribe(
      data => {
        this.user = data;
        if (this.loginFormGroup.controls?.['password'].value == this.user.password) {
          this.invalidLogin = false;
          this.loginSuccess = true;
          this.successMessage = 'Login Successful.';
          this.user.loggedin = true;
          this.loginService.updateUser(this.user).subscribe(
            data => {
              this.user = data;
              this.appComponet.user = this.user;
              setTimeout(() => {
                console.log(this.appComponet.user.username + " " + this.appComponet.user.password + " " + this.appComponet.user.loggedin);
                this.appComponet.isLoggedIn = true;
                this.router.routeReuseStrategy.shouldReuseRoute = () => false;
                this.router.onSameUrlNavigation = 'reload';
                this.router.navigate(['/home']);
              }, 2000);
            }
          );
        } else {
          this.invalidLogin = true;
          this.loginSuccess = false;
        }
      }
    );
  }

  get username() {
    return this.loginFormGroup.get('username');
  }

  get password() {
    return this.loginFormGroup.get('password');
  }

}
