import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";
import { UniqueEmail } from "../validation/uniqueEmail.validator";

export class UpdateUserDto {
    
    @IsNotEmpty({ message: 'O nome não pode ser vazio' })
    @IsOptional()
    name: string;

    @IsEmail(undefined, { message: 'O e-mail informado é inválido' })
    @UniqueEmail({ message: 'Já existe um usuário com este e-mail' })
    @IsOptional()
    email: string;

    @MinLength(6, { message: 'A senha precisa ter pelo menos 6 caracteres' })
    @IsOptional()
    password: string;
}