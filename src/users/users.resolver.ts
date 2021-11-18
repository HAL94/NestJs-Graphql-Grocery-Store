import { Resolver, Query, Args, Mutation} from "@nestjs/graphql";
import { GetUserArgs } from "./dto/args/get-user.args";
import { CreateUserInput } from "./dto/input/create-user.input";
import { DeleteUserInput } from "./dto/input/delete-user.input";
import { UpdateUserInput } from "./dto/input/update-user.input";
import { User } from "./models/user.entity";
import { UsersService } from "./users.service";

@Resolver(() => User)
export class UsersResolver {
    
    constructor(private readonly usersService: UsersService) {}

    @Query(() => User, { name: 'user', nullable: true })
    async getUser(@Args() getUserArgs: GetUserArgs): Promise<User> {
        return await this.usersService.getUser(getUserArgs);
    }

    @Query(() => [User], {name: 'users', nullable: 'items'})
    async getUsers(): Promise<User[]> {
        return await this.usersService.getUsers();
    }

    @Mutation(() => User)
    async createUser(@Args('createUserData') createUserInput: CreateUserInput): Promise<User> {
        return await this.usersService.createUser(createUserInput);
    }

    @Mutation(() => User)
    async updateUser(@Args('updateUserData') updateUserInput: UpdateUserInput): Promise<User> {
        return await this.usersService.updateUser(updateUserInput);
    }

    @Mutation(() => User)
    async deleteUser(@Args('deleteUserData') deleteUserInput: DeleteUserInput): Promise<User> {
        return await this.usersService.deleteUser(deleteUserInput);
    }
}