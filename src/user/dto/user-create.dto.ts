import { IsString } from "class-validator";

export class UserCreateDTO {

    @IsString()
    name: string;

    @IsString()
    email: string;

    @IsString()
    password: string;

    typeUser: string;
}
