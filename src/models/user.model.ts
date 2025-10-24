import { Entity, Column, OneToMany } from "typeorm";
import { Vehicle } from "./vehicle.model";
import BaseEntity from "./baseEntity";
import { UserType } from "../utils/enums/userType.enum";


@Entity('users')
export class User extends BaseEntity {

  @Column({type: "text", nullable: false})
  name: string; // can be a person or company name

  @Column({type: "text", unique: true })
  email: string;

  @Column({type: "text", nullable: true })
  password: string;

  @Column({type: "text", nullable: true })
  phone: string;

  @Column({ type: "enum", enum: UserType })
  userType: UserType;

  @OneToMany(() => Vehicle, vehicle => vehicle.user)
  vehicles: Vehicle[];
}