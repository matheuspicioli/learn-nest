import { Injectable } from "@nestjs/common";
import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { UserRepository } from "../user.repository";

@Injectable()
@ValidatorConstraint({ async: true })
export class UniqueEmailValidator implements ValidatorConstraintInterface {

    constructor(private userRepository: UserRepository) {}

    async validate(value: any, validationArguments?: ValidationArguments): Promise<boolean> {
        const exists = await this.userRepository.exists(value);
        return !exists;
    }
}

export const UniqueEmail = (options: ValidationOptions) => {
    return (object: Object, prop: string) => {
        registerDecorator({
            target: object.constructor,
            propertyName: prop,
            options,
            constraints: [],
            validator: UniqueEmailValidator
        });
    }
}