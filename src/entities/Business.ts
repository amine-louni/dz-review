import { Length } from "class-validator";
import { BaseEntity, Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";




@Entity("Businesses")
export class Business extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    uuid: string;

    @Column("varchar")
    @Length(2, 40)
    name: string;

    @Column({
        type: "text",
        nullable: true
    })
    about: string;

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
        type: "varchar",
        nullable: false
    })
    domains: string;

    @Column({
        type: 'boolean',
        default: false
    })
    claimedByOwner: string;

    @ManyToOne(() => User, user => user.businesses)
    created_by: User;

    @OneToOne(() => User, user => user.businesses)
    owner: User;







}