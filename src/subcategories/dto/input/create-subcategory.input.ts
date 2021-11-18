import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsOptional } from "class-validator";
import { CreateCategoryInput } from "src/categories/dto/input/create-category.input";

@InputType()
export class CreateSubcategoryInput {
    @Field({nullable: true})
    @IsOptional()
    id: number;
    
    @Field()
    @IsNotEmpty()
    name: string;
    
    @Field(type => CreateCategoryInput, {nullable: true})
    @IsOptional()
    parent: CreateCategoryInput;
}