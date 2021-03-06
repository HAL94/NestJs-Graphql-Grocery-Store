import { ArgsType, Field } from "@nestjs/graphql";
import { IsNotEmpty } from "class-validator";

@ArgsType()
export class GetSubcategoryArgs {
    @Field()
    @IsNotEmpty()
    id: number;
}