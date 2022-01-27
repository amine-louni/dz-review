import { Length } from "class-validator";
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./User";




@Entity("businesses")
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
    created_by: User | null;

    @OneToOne(() => User, user => user.businesses)
    owner: User | null;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

}