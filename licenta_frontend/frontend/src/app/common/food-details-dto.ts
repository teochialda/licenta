import { PersonDetailsDTO } from "./person-details-dto";

export class FoodDetailsDTO {
    id: string;
    name: string;
    calories: number;
    person: PersonDetailsDTO;
}
