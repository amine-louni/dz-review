import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity('domains')
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

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}