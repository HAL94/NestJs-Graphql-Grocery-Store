import { Args, Mutation, Resolver, Query } from "@nestjs/graphql";
import { GetSellerArgs } from "./dto/args/get-seller.args";
import { CreateSellerInput } from "./dto/input/create-seller-input";
import { DeleteSellerInput } from "./dto/input/delete-seller-input";
import { Seller } from "./models/seller.entity";
import { SellersService } from "./sellers.service";

@Resolver(() => Seller)
export class SellersResolver {
    constructor(private readonly sellersService: SellersService) {}
    
    @Mutation(() => Seller)
    async createSeller(@Args('createSellerData') createSellerInput: CreateSellerInput): Promise<Seller> {
        return await this.sellersService.createSeller(createSellerInput);
    }

    @Query(() => Seller, { name: 'seller', nullable: true })
    async getSeller(@Args() getSellerArgs: GetSellerArgs) {
        console.log(getSellerArgs);
        return await this.sellersService.getSeller(getSellerArgs);
    }

    @Query(() => [Seller], {name: 'sellers', nullable: 'items'})
    async getSellers(): Promise<Seller[]> {
        return await this.sellersService.getSellers();
    }

    @Mutation(() => Seller)
    async deleteSeller(@Args('deleteSellerData') deleteSellerInput: DeleteSellerInput): Promise<Seller> {
        return await this.sellersService.deleteSeller(deleteSellerInput);
    }


}