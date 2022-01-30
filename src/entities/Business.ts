import { Length } from "class-validator";
import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Domain } from "./Domain";
import { User } from "./User";




@Entity("businesses")
export class Business extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    uuid: string;

    @Column("varchar")
    @Length(2, 40)
    name: string;

    @Column({
        type: "varchar",
        nullable: true
    })
    about: string;

    @Column({
        type: 'varchar',
        nullable: true,
        unique: true

    })
    email: string;

    @Column("varchar")
    state: string;

    @Column("varchar")
    city: string;

    @Column("varchar")
    googleMapsUrl: string;

    @Column("varchar")
    phone: string;

    @Column({
        type: "varchar",
        nullable: true
    })
    website: string;



    @Column({
        type: 'boolean',
        default: false
    })
    claimedByOwner: string;



    @ManyToMany(() => Domain)
    @JoinTable({
        name: "BusinessesDomains",
        joinColumn: {
            name: 'business',
            referencedColumnName: 'uuid'
        },
        inverseJoinColumn: {
            name: 'domain',
            referencedColumnName: "uuid"
        }
    })
    domains: Domain[]

    @ManyToOne(() => User, user => user.businesses)
    @JoinColumn({
        name: 'createdBy',
    })
    createdBy: User;


    @ManyToOne(() => User, user => user.businesses)
    @JoinColumn({
        name: 'owner',
    })
    owner: User;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

}