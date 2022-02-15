import { Length } from "class-validator";
import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Domain } from "./Domain";
import { Review } from "./Review";
import { User } from "./User";




@Entity("business")
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

    @Column({
        type: 'simple-array',
        default: []
    })
    media: [string];



    @ManyToMany(() => Domain, { onDelete: "CASCADE" })
    @JoinTable({
        name: "business_domain",
        joinColumn: {
            name: 'businessesId',
            referencedColumnName: 'uuid'
        },
        inverseJoinColumn: {
            name: 'domainsId',
            referencedColumnName: "uuid"
        }
    })
    domains: Domain[]

    @ManyToMany(() => User, { onDelete: "CASCADE" })
    @JoinTable({
        name: "business_followers",
        joinColumn: {
            name: 'businessId',
            referencedColumnName: 'uuid'
        },
        inverseJoinColumn: {
            name: 'userId',
            referencedColumnName: "uuid"
        }
    })
    followers: User[]

    @ManyToOne(() => User, user => user.creations)
    @JoinColumn({
        name: 'createdById',
    })
    createdBy: User;

    @OneToMany(() => Review, review => review.business, { onDelete: "CASCADE" })
    reviews: Review[];




    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

}