import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm"; 
import { Seller } from "./models/seller.entity";

import { CreateSellerInput } from "./dto/input/create-seller-input";
import { GetSellerArgs } from "./dto/args/get-seller.args";
import { DeleteSellerInput } from "./dto/input/delete-seller-input";


@Injectable()
export class SellersService {
    constructor(@InjectRepository(Seller) private readonly sellersRepository: Repository<Seller>) {}

    async createSeller(createSellerInput: CreateSellerInput)  {
        try {
            const seller: Seller = {
                name: createSellerInput.name
            }

            const result = await this.sellersRepository.save(seller);
            
            console.log('CREATED SELLER', result);

            return result;
            
        } catch (error) {
            console.log(error);
            throw new HttpException(`Something Went Wrong: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getSeller(getSellerArgs: GetSellerArgs) {
        try {
            const result = await this.sellersRepository.findOne({id: +getSellerArgs.id});
            console.log(result);
            return result;
        } catch (error) {
            console.log(error);
            throw new HttpException(`Something Went Wrong: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getSellers() {
        try {
            const sellers = await this.sellersRepository.find();
            console.log(sellers);
            return sellers;
        } catch (error) {
            console.log(error);
            throw new HttpException(`Something Went Wrong: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async deleteSeller(deleteSellerInput: DeleteSellerInput) {
        try {
            const seller = await this.sellersRepository.findOne({id: +deleteSellerInput.id});

            await this.sellersRepository.delete(seller);

            return seller;
        } catch (error) {
            console.log(error);
            throw new HttpException(`Something Went Wrong: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}