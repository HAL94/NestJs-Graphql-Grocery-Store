import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsOptional, NotEquals } from "class-validator";

@InputType()
export class UpdateProductInput {
    @Field({nullable: false})
    @IsNotEmpty()
    id: number;
    
    @Field({nullable: true})
    @IsOptional()
    @IsNotEmpty()
    productTitle: string;

    @Field({nullable: true})
    @IsOptional()
    @IsNotEmpty()    
    productImage: string;

    @Field({nullable: true})
    @IsOptional()
    @IsNotEmpty()
    productPrice: number;
    
    @Field({nullable: true})
    @IsOptional()
    @IsNotEmpty()
    productOfferPrice: number;

    @Field({nullable: true})
    @IsOptional()
    @NotEquals(0)
    productCategory: number
    
    @Field({nullable: true})
    @IsOptional()
    @NotEquals(0)
    productSubcategory: number;
 
    @Field({nullable: true})
    @IsOptional()
    @NotEquals(0)
    productSeller: number;
}