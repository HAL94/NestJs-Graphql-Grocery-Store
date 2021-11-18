import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfigAsync } from './config/typeorm.config';
import { SellersModule } from './sellers/sellers.module';
import { UsersModule } from './users/users.module';
import { CategoriesModule } from './categories/categories.module';
import { SubcategoryModule } from './subcategories/subcategory.module';
import { ProductModule } from './products/product.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync(typeOrmConfigAsync),
    GraphQLModule.forRoot({
      autoSchemaFile: true
    }),
    UsersModule,
    SellersModule,
    ConfigModule.forRoot({ isGlobal: true }),
    CategoriesModule,
    SubcategoryModule,
    ProductModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
