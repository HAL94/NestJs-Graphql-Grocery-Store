import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesResolver } from './categories.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './models/category.entity';
import { SubcategoryModule } from 'src/subcategories/subcategory.module';

@Module({
  imports: [TypeOrmModule.forFeature([Category]), SubcategoryModule],
  providers: [CategoriesService, CategoriesResolver]
})
export class CategoriesModule {}
