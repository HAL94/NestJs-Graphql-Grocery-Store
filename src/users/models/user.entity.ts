import { Field, ObjectType } from "@nestjs/graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity('users')
export class User {
    @Field()
    @PrimaryGeneratedColumn()
    id?: number;

    @Field()
    @Column({nullable: false})
    email: string;

    @Field()
    @Column({nullable: false})
    name: string;

    @Field({ nullable: true })
    @Column({ default: false })
    isSubscribed: boolean;
}