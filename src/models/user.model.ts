import { Entity, Column, OneToMany } from "typeorm";
import { Vehicle } from "./vehicle.model";
import BaseEntity from "./baseEntity";
import { UserType } from "../utils/enums/userType.enum";
import { SpareParts } from "./spareParts.model";


@Entity('users')
export class User extends BaseEntity {

  @Column({type: "text", nullable: false})
  name: string; // can be a person or company name

  @Column({type: "text", nullable: true })
  companyCoordinatorName: string;

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

  @OneToMany(() => SpareParts, spareParts => spareParts.user)
  spareParts: SpareParts[];
}