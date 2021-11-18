import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Category } from "../categories/models/category.entity";
import { GetSubcategoryArgs } from "./dto/args/get-subcategory.args";
import { Subcategory } from "./subcategory.entity";



@Injectable()
export class SubcategoryService {
    constructor(@InjectRepository(Subcategory) private readonly subcategoryRepository: Repository<Subcategory>){}

    async getAllSubcategoriesByCat(cat: Category) {
        try {
            return await this.subcategoryRepository.find({'where': {parent: cat}});
        } catch (error) {
            console.log(error);
            throw new HttpException(`Something Went Wrong: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getAllSubcategories() {
        try {
            return await this.subcategoryRepository.find();
        } catch (error) {
            console.log(error);
            throw new HttpException(`Something Went Wrong: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getSubcategory(getSubcategoryArgs: GetSubcategoryArgs) {
        try {
            return await this.subcategoryRepository.findOne({id: getSubcategoryArgs.id});
        } catch (error) {
            console.log(error);
            throw new HttpException(`Something Went Wrong: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    async getSubcatParent(subCat: Subcategory) {
        try {
            const subCategory = await this.subcategoryRepository.findOne({id: subCat.id}, {'relations': ['parent']});
            return subCategory.parent;
        } catch (error) {
            console.log(error);
            throw new HttpException(`Something Went Wrong: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}