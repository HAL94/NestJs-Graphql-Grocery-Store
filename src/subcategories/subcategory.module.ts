import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subcategory } from './subcategory.entity';
import { SubcategoryResolver } from './subcategory.resolver';
import { SubcategoryService } from './subcategory.service';

@Module({
  imports: [TypeOrmModule.forFeature([Subcategory])],
  providers: [SubcategoryService, SubcategoryResolver],
  exports: [SubcategoryService]
})
export class SubcategoryModule {}
