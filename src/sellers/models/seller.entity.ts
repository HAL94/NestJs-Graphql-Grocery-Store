import { Field, ObjectType } from "@nestjs/graphql";
import { Product } from "src/products/product.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity('sellers')
export class Seller {
    @Field()
    @PrimaryGeneratedColumn()
    id?: number;

    @Field({ nullable: false})
    @Column('varchar', {length: 100, nullable: false})
    name: string;

    @OneToMany(() => Product, product => product.productSeller)
    products?: Product[];
}

