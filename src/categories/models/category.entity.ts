import { Field, ObjectType } from "@nestjs/graphql";
import { Product } from "src/products/product.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Subcategory } from "../../subcategories/subcategory.entity";

@ObjectType()
@Entity('categories')
export class Category {
    @Field()
    @PrimaryGeneratedColumn()
    id?: number;

    @Field({ nullable: false})
    @Column('varchar', {length: 100, nullable: false})
    categoryName: string;
    
    @Field(type => [Subcategory], {nullable: true})
    @OneToMany(() => Subcategory, subCat => subCat.parent, {cascade: true})
    subcategory?: Subcategory[];

    @OneToMany(() => Product, product => product.productCategory)
    products?: Product[];

}
