import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/categories/models/category.entity';
import { Seller } from 'src/sellers/models/seller.entity';
import { Subcategory } from 'src/subcategories/subcategory.entity';
import { getConnection, Repository } from 'typeorm';
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

            const productSeller = await getConnection().manager.findOne(Seller, {id: createProductData.productSeller}); 
            if (!productSeller) {
                throw new HttpException(`Product seller 'Id' not recognized`, HttpStatus.BAD_REQUEST);
            }
            
            product.productSeller = productSeller;

            const productCategory = await getConnection().manager.findOne(Category, {id: createProductData.productCategory}, {relations: ['subcategory']});            
            if (!productCategory) {
                throw new HttpException(`Product category 'Id' not recognized`, HttpStatus.BAD_REQUEST);
            }
            product.productCategory = productCategory;
            
            const productSubcategory = productCategory.subcategory.find(subcat => subcat.id === createProductData.productSubcategory);
            
            if (!productSubcategory) {
                throw new HttpException(`Product subcateogry with id '${createProductData.productSubcategory}' is not a child of the product category with id '${createProductData.productCategory}' `, HttpStatus.BAD_REQUEST);
            }

            product.productSubcategory = productSubcategory;

            await this.productRepository.save(product);

            return product;

        } catch (error) {
            console.log(error);
            throw new HttpException(`Something Went Wrong: ${error.message}`, HttpStatus[String(error.status)]);
        }
    }

    async updateProduct(updateProductData: UpdateProductInput) {
        try {
            const product = await this.productRepository.findOne({id: updateProductData.id}, {relations: ['productSeller', 'productSubcategory', 'productCategory']});
            console.log('fetched product');
            if (product) {
                if (updateProductData.productSubcategory && !updateProductData.productCategory) {
                    throw new HttpException(`Please specifiy the 'productCategory' field`, HttpStatus.BAD_REQUEST);
                }
                
                if (!updateProductData.productSubcategory && updateProductData.productCategory) {
                    throw new HttpException(`Please specifiy the 'productSubcategory' field`, HttpStatus.BAD_REQUEST);
                }
                
                product.productTitle = updateProductData.productTitle ? updateProductData.productTitle : product.productTitle;
                product.productImage = updateProductData.productImage ? updateProductData.productImage : product.productImage;
                product.productPrice = updateProductData.productPrice ? updateProductData.productPrice : product.productPrice;
                product.productOfferPrice = updateProductData.productOfferPrice ? updateProductData.productOfferPrice : product.productOfferPrice;

                product.productSeller = updateProductData.productSeller ? await getConnection().manager.findOne(Seller, {id: updateProductData.productSeller}) : product.productSeller;
                
                

                if (updateProductData.productCategory) {
                    const catId = updateProductData.productCategory ? updateProductData.productCategory : product.productCategory.id;
                    const category = await getConnection().manager.findOne(Category, {id: catId}, {relations: ["subcategory"]});
                    product.productCategory = category;

                    if (updateProductData.productSubcategory) {
                        const subcatId = updateProductData.productSubcategory ? updateProductData.productSubcategory : product.productSubcategory.id;
                        const subcat = category.subcategory.find((subCat: Subcategory) => subCat.id === subcatId);
                        if (subcat) {
                            product.productSubcategory = subcat;
                        } else {
                            throw new HttpException(`Could not link subcategory with id: '${subcatId}' in a non-related category`, HttpStatus.BAD_REQUEST);
                        }
                    }

                }

                await this.productRepository.save(product);
    
                return product;
            }

            return new Error(`Could not find the product with id: ${updateProductData.id}`);

        } catch (error) {
            console.log(error.status);
            throw new HttpException(`Something Went Wrong: ${error.message}`, HttpStatus[String(error.status)]);
        }
    }

    async deleteProduct(deleteProductInput: DeleteProductInput) {
        try {
            const product = await this.productRepository.findOne({id: deleteProductInput.id}, {'relations': ['productSeller', 'productCategory', 'productSubcategory']});
            
            await this.productRepository.delete({id: product.id});

            return product;
        } catch (error) {
            console.log(error);
            throw new HttpException(`Something Went Wrong: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
