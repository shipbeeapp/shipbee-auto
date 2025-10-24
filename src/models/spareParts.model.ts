import { Entity, Column, ManyToOne, OneToMany, JoinColumn } from "typeorm";
import { User } from "./user.model";
import { Listing } from "./listing.model";
import BaseEntity from "./baseEntity";

@Entity("spare_parts")
export class SpareParts extends BaseEntity {

  @ManyToOne(() => User, user => user.spareParts, { onDelete: "CASCADE" })
  @JoinColumn({ name: "userId" })
  user: User;

  @Column({type: "text", nullable: true})
  brand: string;

  @Column({ type: "jsonb", nullable: true })
  models: string[]; // e.g. ["Toyota Corolla 2018", "Honda Civic 2020"]

  @Column({type: "text", nullable: true})
  partCategory: string;

  @Column({type: "text", nullable: true})
  preferredOEM: string;

  @Column({type: "text", nullable: true})
  alternativeOEMs: string;

  @Column({type: "text", nullable: true})
  recommendChannels: string;

  @Column({type: "text", nullable: true})
  priority: string;

  @Column({type: "text", nullable: true})
  notes: string;

  @Column({type: "int", nullable: true})
  quantity: number;

  @Column({type: "text", nullable: true})
  leadTime: string;

  @Column({type: "text", nullable: true})
  partNumber: string;

  @Column({type: "text", nullable: true })
  images: string; // comma-separated URLs

  @OneToMany(() => Listing, listing => listing.sparePart)
  listings: Listing[];
}