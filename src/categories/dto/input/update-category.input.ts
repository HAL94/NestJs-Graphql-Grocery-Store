import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsOptional } from "class-validator";

@InputType()
export class UpdateCategoryInput {
    @Field()
    @IsNotEmpty()
    id: number;
    
    @Field()
    @IsNotEmpty()
    name: string;
}