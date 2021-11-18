import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsOptional } from "class-validator";

@InputType()
export class UpdateUserInput {
    @Field()
    @IsNotEmpty()
    id: number;
    
    @Field()
    @IsOptional()
    @IsNotEmpty()
    name: string;

    @Field({ nullable: true})
    @IsOptional()
    isSubscribed?: boolean;




}