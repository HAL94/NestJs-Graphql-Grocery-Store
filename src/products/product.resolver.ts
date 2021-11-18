import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GetProductArgs } from './dto/args/get-product.args';
import { CreateProductInput } from './dto/input/create-product.input';
import { DeleteProductInput } from './dto/input/delete-product.input';
import { UpdateProductInput } from './dto/input/update-product.input';
import { Product } from './product.entity';
import { ProductService } from './product.service';

@Resolver(of => Product)
export class ProductResolver {
    constructor(private readonly productService: ProductService) {}
    
    @Mutation(() => Product)
    async createProduct(@Args('createProductData') createProductData: CreateProductInput): Promise<Product> {
        return await this.productService.createProduct(createProductData);
    }

    @Mutation(() => Product)
    async updateProduct(@Args('updateProductData') updateProductData: UpdateProductInput) {
        return await this.productService.updateProduct(updateProductData);
    }


    @Query(() => Product, { name: 'product', nullable: true })
    async getProduct(@Args() getProductArgs: GetProductArgs) {
        console.log(getProductArgs);
        return await this.productService.getProduct(getProductArgs);
    }

    @Query(() => [Product], {name: 'products', nullable: 'items'})
    async getProducts(): Promise<Product[]> {
        return await this.productService.getProducts();
    }

    @Mutation(() => Product)
    async deleteProduct(@Args('deleteProductData') deleteProductInput: DeleteProductInput): Promise<Product> {
        return await this.productService.deleteProduct(deleteProductInput);
    }

}
