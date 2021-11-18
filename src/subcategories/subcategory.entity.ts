import { Field, ObjectType } from "@nestjs/graphql";
import { Product } from "src/products/product.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Category } from "../categories/models/category.entity";

@ObjectType()
@Entity('subcategories')
export class Subcategory {
    @Field()
    @PrimaryGeneratedColumn()
    id?: number;

    @Field({ nullable: false})
    @Column('varchar', {length: 100, nullable: false})
    subCategoryName: string;
    
    @ManyToOne(() => Category, cat => cat.subcategory, {onDelete: 'CASCADE'})
    parent?: Category;

    @OneToMany(() => Product, product => product.productSubcategory)
    products?: Product[];

}
