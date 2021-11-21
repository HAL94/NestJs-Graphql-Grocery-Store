import { Field, ObjectType } from "@nestjs/graphql";
import { Category } from "src/categories/models/category.entity";
import { Seller } from "src/sellers/models/seller.entity";
import { Subcategory } from "src/subcategories/subcategory.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@ObjectType()
@Entity('products')
export class Product {
    @Field()
    @PrimaryGeneratedColumn()
    id?: number;

    @Field({nullable: false})
    @Column({nullable: false})
    productTitle: string;

    @Field({nullable: false})
    @Column({nullable: false})
    productImage: string;

    @Field({nullable: false})
    @Column('double precision',{nullable: false})
    productPrice: number;

    
    @Field({nullable: true})
    @Column('double precision',{nullable: true})
    productOfferPrice: number;

    @Field(type => Category, {nullable: false})
    @ManyToOne(() => Category, cat => cat.products)
    productCategory: Category;

    @Field(type => Subcategory, {nullable: false})
    @ManyToOne(() => Subcategory, subcat => subcat.products, {nullable: false})
    productSubcategory: Subcategory;

    @Field(type => Seller, {nullable: false})
    @ManyToOne(() => Seller, seller => seller.products, {nullable: false})
    productSeller: Seller;

}
