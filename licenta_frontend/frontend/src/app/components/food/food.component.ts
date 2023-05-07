import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { data } from 'jquery';
import { VirtualTimeScheduler } from 'rxjs';
import { AppComponent } from 'src/app/app.component';
import { FoodDetailsDTO } from 'src/app/common/food-details-dto';
import { FoodDTO } from 'src/app/common/food-dto';
import { PersonDetailsDTO } from 'src/app/common/person-details-dto';
import { UserDetailsDTO } from 'src/app/common/user-details-dto';
import { FoodService } from 'src/app/services/food.service';
import { PersonService } from 'src/app/services/person.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.css']
})
export class FoodComponent implements OnInit {

  foods: FoodDTO[] = [];
  foods1: FoodDTO[] = [];
  firstFood: FoodDetailsDTO = new FoodDetailsDTO();
  foodsDetails: FoodDetailsDTO[] = [];
  personsDetails: PersonDetailsDTO[] = [];
  index: number = 0;
  indexPers: number = 0;
  addFoodFormGroup: FormGroup;
  modifyFoodFormGroup: FormGroup;
  modifyId: string;
  foodM: FoodDetailsDTO;
  foodM1: FoodDetailsDTO;
  selectedPerson: number;
  user: UserDetailsDTO = new UserDetailsDTO();

  constructor(private foodService: FoodService, private personService: PersonService, private route: ActivatedRoute, private formBuilder: FormBuilder, private router: Router,
    private appComponent: AppComponent) { }

  ngOnInit(): void {
    this.user = this.appComponent.user
    this.route.paramMap.subscribe(() => {
      this.foodService.getFoods().subscribe(data => {
        console.log(data);
        this.foods1 = data;
        console.log(this.foods1);
      });
      this.foodService.getFoodDetails().subscribe(data => {
        console.log(data);
        this.foodsDetails = data;
        if (this.user.role == 'USER') {
          for (let tempFood of data) {
            if (tempFood.person.user.id == this.user.id) {
              for (let temp of this.foods1) {
                if (temp.id == tempFood.id) {
                  this.foods.push(temp);
                }
              }
            }
          }
        } else {
          this.foods = this.foods1;
        }
      });
      this.personService.getPersonsDetails().subscribe(data => {
        console.log("heeere"+data.at(0).name);
        this.personsDetails = data;
      });
    });
    console.log(this.foods);
    this.addFoodFormGroup = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(2)]),
      calories: new FormControl('', [Validators.required, Validators.minLength(2), Validators.min(1), Validators.max(1000)])
    });
    this.modifyFoodFormGroup = new FormGroup({
      nameM: new FormControl('', [Validators.required, Validators.minLength(2)]),
      caloriesM: new FormControl('', [Validators.required, Validators.minLength(2), Validators.min(1), Validators.max(1000)])
    })
  }

  onSelected(value: string): void {
    this.selectedPerson = +value;
    console.log(this.selectedPerson);
  }

  addFoodJr() {
    this.firstFood.id = crypto.randomUUID();
    this.firstFood.name = this.name.value;
    this.firstFood.calories = this.calories.value;
  }

  addFood() {
    const foodDetails = new FoodDetailsDTO();
    foodDetails.id = this.firstFood.id;
    foodDetails.name = this.firstFood.name;
    foodDetails.calories = this.firstFood.calories;
    let personFood = this.personsDetails.at(this.selectedPerson -1);
    foodDetails.person = personFood;
    console.log(foodDetails);
    this.foodService.addFood(foodDetails).subscribe(data => {
      console.log(data);
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate(['/food']);
    })
  }

  saveModifyId(id: string) {
    this.modifyId = id;
    console.log(this.modifyId);
    for (let tempFood of this.foodsDetails) {
      if (tempFood.id == this.modifyId) {
        this.foodM1 = tempFood;
        console.log("Valeleu");
      }
    }
  }

  modifyFood() {
    this.foodService.getFood(this.modifyId).subscribe(data => {
      this.foodM = data;
      if (this.nameM.value) {
        this.foodM.name = this.nameM.value;
      }
      if (this.caloriesM.value) {
        this.foodM.calories = this.caloriesM.value;
      }
      this.foodService.modifyFood(this.foodM).subscribe(data => {
        console.log(data);
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate(['/food']);
      })
    })
  }

  deleteFood(id: string) {
    console.log(id);
    this.foodService.deleteFood(id).subscribe(data => {
      console.log(data);
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate(['/food']);
    })
  }

  get name() {
    return this.addFoodFormGroup.get('name');
  }

  get calories() {
    return this.addFoodFormGroup.get('calories');
  }

  get nameM() {
    return this.modifyFoodFormGroup.get("nameM");
  }

  get caloriesM() {
    return this.modifyFoodFormGroup.get('caloriesM');
  }
}
