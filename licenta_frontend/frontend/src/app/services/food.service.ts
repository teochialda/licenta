import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FoodDetailsDTO } from '../common/food-details-dto';
import { FoodDTO } from '../common/food-dto';

@Injectable({
    providedIn: 'root'
})
export class FoodService {

    private baseUrl = 'http://localhost:8080/food';

    constructor(private httpClient: HttpClient) {}

    getFood(id: string): Observable<FoodDetailsDTO> {
        return this.httpClient.get<FoodDetailsDTO>(`${this.baseUrl}/${id}`);
    }

    getFoods(): Observable<FoodDTO[]> {
        return this.httpClient.get<FoodDTO[]>(this.baseUrl);
    }

    getFoodDetails(): Observable<FoodDetailsDTO[]> {
        return this.httpClient.get<FoodDetailsDTO[]>(`${this.baseUrl}/details`);
    }

    addFood(food: FoodDetailsDTO): Observable<any> {
        return this.httpClient.post<FoodDetailsDTO>(this.baseUrl, food);
    }

    deleteFood(id: string): Observable<any> {
        return this.httpClient.delete<FoodDetailsDTO>(`${this.baseUrl}/delete/${id}`)
    }
    
    modifyFood(food: FoodDetailsDTO): Observable<any> {
        return this.httpClient.post<FoodDetailsDTO>(`${this.baseUrl}/address/${food.id}`, food);
    }

}
