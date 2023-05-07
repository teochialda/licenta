import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { PersonDetailsDTO } from 'src/app/common/person-details-dto';
import { PersonDTO } from 'src/app/common/person-dto';
import { UserDetailsDTO } from 'src/app/common/user-details-dto';
import { PersonService } from 'src/app/services/person.service';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit {

  firstPerson: PersonDetailsDTO = new PersonDetailsDTO();
  persons: PersonDTO[] = [];
  persons1: PersonDTO[] = [];
  personsDetails: PersonDetailsDTO[] = [];
  index: number = 0;
  addPersonFormGroup!: FormGroup;
  modifyPersonFormGroup!: FormGroup;
  addUserFormGroup!: FormGroup;
  modifyId!: string;
  personM!: PersonDetailsDTO;
  personM1!: PersonDetailsDTO;
  user: UserDetailsDTO = new UserDetailsDTO();

  constructor(private personService: PersonService, private route: ActivatedRoute, private formBuilder: FormBuilder, private router: Router,
    private appComponent: AppComponent) { }

  ngOnInit(): void {
    this.user = this.appComponent.user;
    this.route.paramMap.subscribe(() => {
      this.personService.getPersons().subscribe(data => {
        console.log(data);
        this.persons1 = data;
        console.log(this.persons1);
      });
      this.personService.getPersonsDetails().subscribe(data => {
        console.log(data);
        this.personsDetails = data;
        if (this.user.role == 'USER') {
          for(let tempPerson of data) {
            if (tempPerson.user.id == this.user.id) {
              for (let temp of this.persons1) {
                if (temp.id == tempPerson.id) {
                  this.persons = [];
                  this.persons.push(temp);
                }
              }
            }
          }
        } else {
          this.persons = this.persons1;
        }
      });
    });
    console.log(this.persons);
    this.addPersonFormGroup = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(2)]),
      address: new FormControl('', [Validators.required, Validators.minLength(2)]),
      age: new FormControl('', [Validators.required, Validators.minLength(2), Validators.min(1), Validators.max(99)])
    });
    this.modifyPersonFormGroup = new FormGroup({
      nameM: new FormControl('', [Validators.minLength(2)]),
      addressM: new FormControl('', [Validators.minLength(2)]),
      ageM: new FormControl('', [Validators.minLength(2), Validators.min(1), Validators.max(99)])
    });
    this.addUserFormGroup = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.minLength(2)]),
      password: new FormControl('', [Validators.required, Validators.minLength(2)]),
      role: new FormControl('', [Validators.required])
    });
  }

  addPersonJr() {
    this.firstPerson.id = crypto.randomUUID();
    this.firstPerson.name = this.name.value;
    this.firstPerson.address = this.address.value;
    this.firstPerson.age = this.age.value;
  }

  addPerson() {
    const personDetails = new PersonDetailsDTO();
    personDetails.id = this.firstPerson.id ;
    personDetails.name = this.firstPerson.name;
    personDetails.address = this.firstPerson.address;
    personDetails.age = this.firstPerson.age;
    const userDetails = new UserDetailsDTO();
    userDetails.id = crypto.randomUUID();
    userDetails.username = this.username.value;
    userDetails.password = this.password.value;
    userDetails.role= this.role!.value;
    personDetails.user = userDetails;
    console.log(personDetails);
    this.personService.addPerson(personDetails).subscribe(data => {
      console.log(data);
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate(['/person']);
    });
  }

  saveModifyId(id: string) {
    this.modifyId = id;
    console.log(this.modifyId);
    for (let tempPerson of this.personsDetails) {
      if (tempPerson.id == this.modifyId) {
        this.personM1 = tempPerson;
        console.log("NUMAIPOT");
      }
    }
  }

  modifyPerson() {
    this.personService.getPerson(this.modifyId).subscribe(data => {
      this.personM = data;
      if (this.nameM.value) {
        this.personM.name = this.nameM.value;
      }
      if (this.addressM.value) {
        this.personM.address = this.addressM.value;
      }
      if (this.ageM.value) {
        this.personM.age = this.ageM.value;
      }
      this.personService.modifyPerson(this.personM).subscribe(data => {
        console.log(data);
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate(['/person']);
      });
    });
  }

  deletePerson(id: string) {
    console.log(id);
    this.personService.deletePerson(id).subscribe(data => {
      console.log(data);
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate(['/person']);
    });
  }

  get name() {
    return this.addPersonFormGroup.get('name');
  }

  get address() {
    return this.addPersonFormGroup.get('address');
  }

  get age() {
    return this.addPersonFormGroup.get('age');
  }

  get nameM() {
    return this.modifyPersonFormGroup.get('nameM');
  }

  get addressM() {
    return this.modifyPersonFormGroup.get('addressM');
  }

  get ageM() {
    return this.modifyPersonFormGroup.get('ageM');
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

}
