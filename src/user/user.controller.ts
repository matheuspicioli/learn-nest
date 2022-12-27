import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { CreateUserDto } from "./dto/createUser.dto";
import { UserEntity } from "./user.entity";
import { UserRepository } from "./user.repository";
import { v4 as uuid } from 'uuid';
import { ListUserDto } from "./dto/listUser.dto";
import { UpdateUserDto } from "./dto/updateUser.dto";

@Controller('/users')
export class UserController {
    constructor(private userRepository: UserRepository) {}

    @Post()
    async create(@Body() data: CreateUserDto) {
        const user = new UserEntity();
        user.email = data.email;
        user.password = data.password;
        user.name = data.name;
        user.id = uuid();

        this.userRepository.createUser(user);
        return { user: new ListUserDto(user.id, user.name) };
    }

    @Get()
    async list() {
        const rawUsers = await this.userRepository.list();
        const users = rawUsers.map(user => new ListUserDto(user.id, user.name));
        return users;
    }

    @Put('/:id')
    async update(@Param('id') id: string, @Body() data: UpdateUserDto) {
        const updatedUser = await this.userRepository.update(id, data);

        return {
            user: updatedUser,
        }
    }

    @Delete('/:id')
    async delete(@Param('id') id: string) {
        const removed = await this.userRepository.remove(id);

        return {
            user: removed
        };
    }
}