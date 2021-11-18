import { Args, Resolver, Query, ResolveField, Parent } from '@nestjs/graphql';
import { Category } from 'src/categories/models/category.entity';
import { GetSubcategoryArgs } from './dto/args/get-subcategory.args';
import { Subcategory } from './subcategory.entity';
import { SubcategoryService } from './subcategory.service';

@Resolver(of => Subcategory)
export class SubcategoryResolver {
    constructor(private readonly subcategoryService: SubcategoryService) { }
    
    @Query(() => [Subcategory], { name: 'subcategories', nullable: 'items'})
    async getSubcategories(): Promise<Subcategory[]> {
        return await this.subcategoryService.getAllSubcategories();
    }

    @Query(() => Subcategory, { name: 'subcategory', nullable: true })
    async getCategory(@Args() getSubcategoryArgs: GetSubcategoryArgs) {
        console.log(getSubcategoryArgs);
        return await this.subcategoryService.getSubcategory(getSubcategoryArgs);
    }

    @ResolveField('parent', returns => Category)
    async subcategories(@Parent() subCat: Subcategory) {
        return await this.subcategoryService.getSubcatParent(subCat);
    }
}
