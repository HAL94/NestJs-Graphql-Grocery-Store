import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { CategoriesService } from './categories.service';
import { GetCategoryArgs } from './dto/args/get-category.args';
import { CreateCategoryInput } from './dto/input/create-category.input';
import { DeleteCategoryInput } from './dto/input/delete-category.input';
import { Category } from './models/category.entity';
import { Subcategory } from '../subcategories/subcategory.entity';
import { SubcategoryService } from 'src/subcategories/subcategory.service';
import { UpdateCategoryInput } from './dto/input/update-category.input';

@Resolver(of => Category)
export class CategoriesResolver {
    constructor(private readonly categoriesService: CategoriesService,
        private readonly subcategoryService: SubcategoryService) {}
    
    @Mutation(() => Category)
    async createCategory(@Args('createCategoryData') createCategoryData: CreateCategoryInput): Promise<Category> {
        return await this.categoriesService.createCategory(createCategoryData);
    }
    
    @Mutation(() => Category)
    async updateCategory(@Args('updateCategoryData') updateCategoryData: UpdateCategoryInput) {
        return await this.categoriesService.updateCategory(updateCategoryData);
    }


    @Query(() => Category, { name: 'category', nullable: true })
    async getCategory(@Args() getCategoryArgs: GetCategoryArgs) {
        console.log(getCategoryArgs);
        return await this.categoriesService.getCategory(getCategoryArgs);
    }

    @Query(() => [Category], {name: 'categories', nullable: 'items'})
    async getCategories(): Promise<Category[]> {
        return await this.categoriesService.getCategories();
    }

    @Mutation(() => Category)
    async deleteCategory(@Args('deleteCategoryData') deleteSellerInput: DeleteCategoryInput): Promise<Category> {
        return await this.categoriesService.deleteCategory(deleteSellerInput);
    }

    @ResolveField('subcategories', returns => [Subcategory])
    async subcategories(@Parent() cat: Category) {
        return await this.subcategoryService.getAllSubcategoriesByCat(cat);
    }

}
