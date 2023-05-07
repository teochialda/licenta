import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { UserDetailsDTO } from 'src/app/common/user-details-dto';
import { UserDTO } from 'src/app/common/user-dto';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  users: UserDTO[] = [];
  users1: UserDTO[] = [];
  usersDetails: UserDetailsDTO[] = [];
  index: number = 0;
  addUserFormGroup: FormGroup;
  modifyUserFormGroup: FormGroup;
  modifyId: string;
  userM: UserDetailsDTO;
  userM1: UserDetailsDTO;
  user: UserDetailsDTO = new UserDetailsDTO();

  constructor(private userService: UserService, private route: ActivatedRoute, private formBuilder: FormBuilder, private router: Router, private appComponent: AppComponent) { }

  ngOnInit(): void {
    this.user = this.appComponent.user;
    this.route.paramMap.subscribe(() => {
      this.userService.getUsers().subscribe(data => {
        console.log(data);
        this.users1 = data;
        console.log(this.users1);
      });
      this.userService.getUsersDetails().subscribe( data => {
        console.log(data);
        this.usersDetails = data;
        if (this.user.role == 'USER') {
          for(let tempUser of data) {
            if (tempUser.id == this.user.id) {
              for (let temp of this.users1) {
                if (temp.id == tempUser.id) {
                  this.users = [];
                  this.users.push(temp);
                }
              }
            }
          }
        } else {
          this.users = this.users1;
        }
      });
    });
    console.log(this.users);
    this.addUserFormGroup = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.minLength(2)]),
      password: new FormControl('', [Validators.required, Validators.minLength(2)]),
      role: new FormControl('', [Validators.required])
    });
    this.modifyUserFormGroup = new FormGroup({
      usernameM: new FormControl('', [Validators.minLength(2)]),
      passwordM: new FormControl('', [Validators.minLength(2)]),
      roleM: new FormControl('', [Validators.minLength(2)])
    });
  }

  addUser() {
    const userDetails = new UserDetailsDTO();
    userDetails.id = crypto.randomUUID();
    userDetails.username = this.username.value;
    userDetails.password = this.password.value;
    userDetails.role= this.role!.value;
    console.log(userDetails);
    this.userService.addUser(userDetails).subscribe(data => {
      console.log(data);
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate(['/user']);
    });
  }

  saveModifyId(id: string) {
    this.modifyId = id;
    console.log(this.modifyId);
    for (let tempUser of this.usersDetails) {
      if (tempUser.id == this.modifyId) {
        this.userM1 = tempUser;
        console.log("NUMAIPOT");
      }
    }
  }

  modifyUser() {
    this.userService.getUser(this.modifyId).subscribe(data => {
      this.userM = data;
      if (this.usernameM.value) {
        this.userM.username = this.usernameM.value;
      }
      if (this.passwordM.value) {
        this.userM.password = this.passwordM.value;
      }
      if (this.roleM.value) {
        this.userM.role = this.roleM.value;
      }
      this.userService.modifyUser(this.userM).subscribe(data => {
        console.log(data);
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate(['/user']);
      });
    });
  }

  deleteUser(id: string) {
    console.log(id);
    
  }

  get username() {
    return this.addUserFormGroup.get('username');
  }

  get password() {
    return this.addUserFormGroup.get('password');
  }

  get role() {
    return this.addUserFormGroup.get('role');
  }

  get usernameM() {
    return this.modifyUserFormGroup.get('usernameM');
  }

  get passwordM() {
    return this.modifyUserFormGroup.get('passwordM');
  }

  get roleM() {
    return this.modifyUserFormGroup.get('roleM');
  }
}
 