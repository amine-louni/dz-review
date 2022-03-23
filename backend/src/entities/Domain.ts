import { BaseEntity, Column, CreateDateColumn, Entity, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Business } from "./Business";


@Entity('domain')
export class Domain extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    uuid: string;

    @Column('varchar')
    name: string

    @Column({
        type: "boolean",
        default: false
    })
    archived: boolean

    @ManyToMany(() => Business)
    businesses: Business[]


    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}