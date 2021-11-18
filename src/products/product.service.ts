import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/categories/models/category.entity';
import { Seller } from 'src/sellers/models/seller.entity';
import { Subcategory } from 'src/subcategories/subcategory.entity';
import { Repository } from 'typeorm';
import { CreateProductInput } from './dto/input/create-product.input';
import { DeleteProductInput } from './dto/input/delete-product.input';
import { UpdateProductInput } from './dto/input/update-product.input';
import { Product } from './product.entity';

@Injectable()
export class ProductService {
    constructor(@InjectRepository(Product) private readonly productRepository: Repository<Product>) {}

    async getProducts() {
        try {
            return this.productRepository.find();
        } catch (error) {
            console.log(error);
            throw new HttpException(`Something Went Wrong: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getProduct(getProductArgs) {
        try {
            return await this.productRepository.findOne({id: getProductArgs.id}, {relations: ['productCategory', 'productSubcategory', 'productSeller']});
        } catch (error) {
            console.log(error);
            throw new HttpException(`Something Went Wrong: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async createProduct(createProductData: CreateProductInput) {
        try {
            const product = new Product();
            product.productTitle = createProductData.productTitle;
            product.productImage = createProductData.productImage;
            product.productPrice = createProductData.productPrice;
            product.productOfferPrice = createProductData.productOfferPrice;

            const productSeller = new Seller();
            productSeller.id = createProductData.productSeller;
            product.productSeller = productSeller;

            const productCategory = new Category();
            productCategory.id = createProductData.productCategory;
            product.productCategory = productCategory;
            
            const productSubcategory = new Subcategory();
            productSubcategory.id = createProductData.productSubcategory;
            product.productSubcategory = productSubcategory;

            await this.productRepository.save(product);

            return product;

        } catch (error) {
            console.log(error);
            throw new HttpException(`Something Went Wrong: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async updateProduct(updateProductData: UpdateProductInput) {
        try {
            const product = await this.productRepository.findOne({id: updateProductData.id}, {relations: ['productSeller', 'productSubcategory', 'productCategory']});
            if (product) {

                product.productTitle = updateProductData.productTitle;
                product.productImage = updateProductData.productImage;
                product.productPrice = updateProductData.productPrice;
                product.productOfferPrice = updateProductData.productOfferPrice;    
                product.productSeller.id = updateProductData.productSeller;
                product.productCategory.id = updateProductData.productCategory;
                product.productSubcategory.id = updateProductData.productSubcategory;

                await this.productRepository.save(product);
    
                return product;
            }

            return new HttpException(`Could not find the product with id: ${updateProductData.id}`,
             HttpStatus.NOT_FOUND);

        } catch (error) {
            console.log(error);
            throw new HttpException(`Something Went Wrong: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async deleteProduct(deleteProductInput: DeleteProductInput) {
        try {
            const product = await this.productRepository.findOne({id: deleteProductInput.id});
            
            await this.productRepository.delete({id: product.id});

            return product;
        } catch (error) {
            console.log(error);
            throw new HttpException(`Something Went Wrong: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
