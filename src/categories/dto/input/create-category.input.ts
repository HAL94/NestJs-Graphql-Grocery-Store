import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsOptional } from "class-validator";
import { CreateSubcategoryInput } from "src/subcategories/dto/input/create-subcategory.input";

@InputType()
export class CreateCategoryInput {
    @Field()
    @IsNotEmpty()
    name: string;

    @Field(type => [CreateSubcategoryInput])
    @IsOptional()
    subcategories: CreateSubcategoryInput[];
    
}