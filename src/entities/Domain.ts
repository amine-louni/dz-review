import { BaseEntity, Column, Entity } from "typeorm";


@Entity('Domains')
export class Domain extends BaseEntity {
    @Column('varchar')
    name: string
}