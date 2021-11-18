import { ArgsType, Field } from "@nestjs/graphql";
import { IsNotEmpty } from "class-validator";

@ArgsType()
export class GetSellerArgs {
    @Field()
    @IsNotEmpty()
    id: number;
}