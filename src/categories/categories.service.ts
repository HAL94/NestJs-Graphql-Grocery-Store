import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetCategoryArgs } from './dto/args/get-category.args';
import { CreateCategoryInput } from './dto/input/create-category.input';
import { DeleteCategoryInput } from './dto/input/delete-category.input';
import { Category } from './models/category.entity';
import { Subcategory } from '../subcategories/subcategory.entity';
import { UpdateCategoryInput } from './dto/input/update-category.input';

@Injectable()
export class CategoriesService {
    constructor(@InjectRepository(Category) private readonly categoryRepository: Repository<Category>) {}

    async createCategory(createCategoryInput: CreateCategoryInput)  {
        try {
            const cat: Category = {
                categoryName: createCategoryInput.name
            }

            cat.subcategory = createCategoryInput.subcategories.map((subcat) => {
                const newSubcat = new Subcategory();
                newSubcat.parent = cat;
                newSubcat.subCategoryName = subcat.name
                return newSubcat;
            });
            const result = await this.categoryRepository.save(cat);
            
            console.log('CREATED CATEGORY', result);

            return result;
            
        } catch (error) {
            console.log(error);
            throw new HttpException(`Something Went Wrong: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getCategory(getCategoryArgs: GetCategoryArgs) {
        try {
            const result = await this.categoryRepository.findOne({id: getCategoryArgs.id});
            console.log(result);
            return result;
        } catch (error) {
            console.log(error);
            throw new HttpException(`Something Went Wrong: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getCategories() {
        try {
            const categories = await this.categoryRepository.find();
            // console.log(categories);
            return categories;
        } catch (error) {
            console.log(error);
            throw new HttpException(`Something Went Wrong: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async updateCategory(updateCategoryData: UpdateCategoryInput) {
        try {
            const category = await this.categoryRepository.findOne({id: updateCategoryData.id});
            if (category) {
                category.categoryName = updateCategoryData.name;
                await this.categoryRepository.save(category);
                return category;
            }
            return null;
        } catch (error) {
            console.log(error);
            throw new HttpException(`Something Went Wrong: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async deleteCategory(deleteCategoryInput: DeleteCategoryInput) {
        try {
            const category = await this.categoryRepository.findOne({id: +deleteCategoryInput.id});

            await this.categoryRepository.delete(category);

            return category;
        } catch (error) {
            console.log(error);
            throw new HttpException(`Something Went Wrong: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
