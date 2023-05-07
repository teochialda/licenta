import { UserDetailsDTO } from "./user-details-dto";

export class PersonDetailsDTO {
    id: string;
    name: string;
    address: string;
    age: number;
    user: UserDetailsDTO;
}
