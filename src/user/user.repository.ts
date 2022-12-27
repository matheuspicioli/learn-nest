import { Injectable } from "@nestjs/common";
import { UserEntity } from "./user.entity";

@Injectable()
export class UserRepository {
    private users: UserEntity[] = [];
    
    async createUser(user: UserEntity) {
        this.users.push(user);
    }

    async list(): Promise<UserEntity[]> {
        return this.users;
    }

    async exists(email: string): Promise<boolean> {
        const user = this.users.find(
            user => user.email === email
        );

        return user !== undefined;
    }

    async update(id: string, data: Partial<UserEntity>): Promise<UserEntity> {
        const user = this.find(id);

        Object.entries(data).forEach(([key, value]) => {
            if (key === 'id') {
                return;
            }

            user[key] = value;
        });

        return user;
    }

    async remove(id: string): Promise<void> {
        const userFinded = this.find(id);
        this.users = this.users.filter(user => user.id !== userFinded.id);

        return;
    }

    private find(id: string): UserEntity {
        const find = this.users.find(user => user.id === id);

        if (!find) {
            throw new Error('User not found');
        }

        return find;
    }
}