import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CreateUserInput } from "./dto/input/create-user.input";
import { User } from "./models/user.entity";
import { UpdateUserInput } from "./dto/input/update-user.input";
import { GetUserArgs } from "./dto/args/get-user.args";
import { DeleteUserInput } from "./dto/input/delete-user.input";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private readonly usersRepository: Repository<User>) {}

    private users: User[] = [];

    public async createUser(createUserInput: CreateUserInput): Promise<User> {
        try {
            const user: User = {
                isSubscribed: false,
                ...createUserInput
            };
    
            const result = await this.usersRepository.save(user);
            
            console.log('CREATED USERS', result);

            return result;
            
        } catch (error) {
            console.log(error);
            throw new HttpException(`Something Went Wrong: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public async updateUser(updateUserInput: UpdateUserInput): Promise<User> {
        try {
            const user = await this.usersRepository.findOne({id: updateUserInput.id});
            
            user.id = updateUserInput.id;
            user.isSubscribed = updateUserInput.isSubscribed;
            user.name = updateUserInput.name;

            return await this.usersRepository.save(user);
        } catch (error) {
            console.log(error);
            throw new HttpException(`Something Went Wrong: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public async getUser(userArgs: GetUserArgs): Promise<User> {
        try {
            const userToBeFound = new User();
            userToBeFound.id = userArgs.id;
            const user = await this.usersRepository.findOne({});
            console.log(user);
            return user;
        } catch (error) {
            console.log(error);
            throw new HttpException(`Something Went Wrong: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public async getUsers(): Promise<User[]> {
        try {
            
            return await this.usersRepository.find();
        } catch (error) {
            console.log(error);
            throw new HttpException(`Something Went Wrong: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public async deleteUser(deleteUserInput: DeleteUserInput) {
        try {
            const user = await this.usersRepository.findOne({id: deleteUserInput.id});
            await this.usersRepository.delete({id: user.id});
            return user;
        } catch (error) {
            console.log(error);
            throw new HttpException(`Something Went Wrong: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}