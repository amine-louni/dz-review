import { IsEmail, Length } from "class-validator";
import {
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import crypt from "bcryptjs";
import crypto from "crypto";
import { config } from "dotenv";
import {
  PASSWORD_PIN_EXPIRATION_IN_MINUTES,
  EMAIL_PIN_EXPIRATION_IN_MINUTES,
} from "../constatns";
import EmailSender from "../utils/EmailSender";
import { Business } from "./Business";
import { Review } from "./Review";

config();

/**
 * TODO:
 *
 * User entity should generate random token and pin and asign it to password_reset_[token | pin]
 * when the user try to reset his password
 *
 */

export enum UserRoles {
  ADMIN = "admin",
  EDITOR = "editor",
  User = "user"
}

@Entity("user")
export class User extends BaseEntity {
  @BeforeInsert()
  async on_register() {
    this.password = await crypt.hash(this.password, 12);
    const pin = crypto.randomBytes(4).toString("hex");
    this.emailValidationPin = await crypt.hash(pin, 12);
    this.emailValidationPinExpiresAt = await new Date(
      new Date().getTime() + EMAIL_PIN_EXPIRATION_IN_MINUTES * 60000
    );
    new EmailSender(this, "", pin).sendValidationEmail();
  }

  @PrimaryGeneratedColumn("uuid")
  uuid: string;

  // required fields
  @Length(2, 20)
  @Column("varchar")
  firstName: string;

  @Column("varchar")
  @Length(2, 20)
  lastName: string;

  @Column({
    unique: true
  })
  @Length(3, 20)
  userName: string;

  // Email fields
  @Column({
    type: "varchar",
    unique: true,
  })
  @IsEmail()
  email: string;

  @Column({
    type: "timestamptz",
    nullable: true,
  })
  emailValidateAt: Date | null;

  @Column({
    type: "varchar",
    select: false,
  })
  password: string;

  @Column({
    type: "enum",
    enum: UserRoles,
    default: UserRoles.User
  })
  role: string;

  @Column({
    type: "varchar",
    nullable: true,
    select: false,
  })
  emailValidationPin: string | null;

  @Column({
    type: "timestamptz",
    nullable: true,
    select: false,
  })
  emailValidationPinExpiresAt: Date | null;

  @Column({
    type: "varchar",
    nullable: true,
  })
  phoneNumber: string;

  @Column("date")
  dob: Date;

  @Column({
    type: "text",
    nullable: true,
  })
  bio: string;

  @Column({
    type: "boolean",
    default: true,
  })
  isActive: boolean;

  @Column({
    type: "timestamptz",
    nullable: true,
  })
  id_verified_at: Date | null;

  @Column({
    type: "varchar",
    default: "https://www.gravatar.com/avatar/?s=200&r=pg&d=mp",
  })
  profilePictureUrl: string;

  @Column({
    type: "timestamptz",
    nullable: true,
    select: false,
  })
  passwordChangedAt: Date | null;

  @Column({
    type: "varchar",
    nullable: true,
    select: false,
  })
  passwordResetToken: string | null;

  @Column({
    type: "varchar",
    nullable: true,
    select: false,
  })
  passwordResetPin: string | null;

  @Column({
    type: "timestamptz",
    nullable: true,
    select: false,
  })
  passwordResetPinExpiresAt: Date | null;



  @OneToMany(() => Business, business => business.createdBy, { onDelete: "CASCADE" })
  creations: Business[];


  @OneToMany(() => Review, review => review.createdBy, { onDelete: "CASCADE" })
  reviews: Review[];


  @ManyToMany(() => Business)
  followings: Business[]


  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn({ select: false })
  updatedAt: Date;

  // Helpers
  public async createAndSendPasswordResetPin() {
    try {
      const pin = crypto.randomBytes(4).toString("hex");
      this.passwordResetPin = await crypt.hash(pin, 12);
      this.passwordResetPinExpiresAt = await new Date(
        new Date().getTime() + PASSWORD_PIN_EXPIRATION_IN_MINUTES * 60000
      );
      this.save();
      new EmailSender(this, "", pin).sendPasswordReset();
    } catch (e) {
      this.passwordResetPin = null;
      this.passwordResetPinExpiresAt = null;
    }
  }
}
