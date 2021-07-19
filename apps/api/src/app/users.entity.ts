import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  fullname: string;

  @Column()
  role: string;

  @Column()
  is_disabled: boolean;

  @Column()
  is_locked: boolean;
}
