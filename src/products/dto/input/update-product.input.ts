import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, NotEquals } from "class-validator";

@InputType()
export class UpdateProductInput {
    @Field()
    @IsNotEmpty()
    id: number;
    
    @Field({nullable: false})
    @IsNotEmpty()
    productTitle: string;

    @Field({nullable: false})
    @IsNotEmpty()
    @NotEquals(0)
    productImage: string;

    @Field({nullable: false})
    @IsNotEmpty()
    @NotEquals(0)
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