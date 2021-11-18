import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Seller } from "./models/seller.entity";
import { SellersResolver } from "./sellers.resolver";
import { SellersService } from "./sellers.service";

@Module({
    imports: [TypeOrmModule.forFeature([Seller])],
    providers: [SellersResolver, SellersService]
})
export class SellersModule {

}