import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty } from "class-validator";

@InputType()
export class CreateSellerInput {
    @Field()
    @IsNotEmpty()
    name: string;
}