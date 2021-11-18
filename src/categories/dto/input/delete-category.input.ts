import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty } from "class-validator";

@InputType()
export class DeleteCategoryInput {
    @Field()
    @IsNotEmpty()    
    id: number;
}