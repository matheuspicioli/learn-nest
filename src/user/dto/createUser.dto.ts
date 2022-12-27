import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";
import { UniqueEmail } from "../validation/uniqueEmail.validator";

export class CreateUserDto {
    
    @IsNotEmpty({ message: 'O nome não pode ser vazio' })
    name: string;

    @IsEmail(undefined, { message: 'O e-mail informado é inválido' })
    @UniqueEmail({ message: 'Já existe um usuário com este e-mail' })
    email: string;

    @MinLength(6, { message: 'A senha precisa ter pelo menos 6 caracteres' })
    password: string;
}