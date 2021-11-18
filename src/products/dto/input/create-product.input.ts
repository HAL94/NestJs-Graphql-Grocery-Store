import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, NotEquals } from "class-validator";

@InputType()
export class CreateProductInput {
    @Field({nullable: false})
    @IsNotEmpty()
    productTitle: string;

    @Field({nullable: false})
    @IsNotEmpty()
    productImage: string;

    @Field({nullable: false})
    @IsNotEmpty()
    productPrice: number;
 
    @Field({nullable: false})
    @IsNotEmpty()
    productOfferPrice: number;

    @Field({nullable: false})
    @IsNotEmpty()
    @NotEquals(0)
    productCategory: number
    
    @Field({nullable: false})
    @IsNotEmpty()
    @NotEquals(0)
    productSubcategory: number;
 
    @Field({nullable: false})
    @IsNotEmpty()
    @NotEquals(0)
    productSeller: number;    
}