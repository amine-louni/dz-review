import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity('domains')
export class Domain extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    uuid: string;

    @Column('varchar')
    name: string

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}