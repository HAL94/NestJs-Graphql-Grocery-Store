import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty } from "class-validator";

@InputType()
export class DeleteSellerInput {
    @Field()
    @IsNotEmpty()    
    id: number;
}