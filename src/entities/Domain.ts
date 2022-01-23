import { BaseEntity, Column, CreateDateColumn, Entity, UpdateDateColumn } from "typeorm";


@Entity('Domains')
export class Domain extends BaseEntity {
    @Column('varchar')
    name: string

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}