
import { Max, Min } from "class-validator";
import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Business } from "./Business";
import { User } from "./User";


@Entity('review')
export class Review extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    uuid: string;

    @Column('text')
    text: string


    @Column({
        type: 'numeric',
        default: 0
    })
    @Min(1)
    @Max(5)
    stars: number

    @ManyToOne(() => User, user => user.reviews)
    @JoinColumn({
        name: 'createdBy',
    })
    createdBy: User;


    @ManyToOne(() => Business, business => business.reviews)
    @JoinColumn({
        name: 'business',
    })
    business: Business;



    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}