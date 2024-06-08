import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { ConnectionStatus } from "../enum/connection-status.enum";

@Entity()
export class Connection {
    @PrimaryColumn({type: "int"})
    @ManyToOne(() => User, {nullable:false})
    user2 : User;

    @PrimaryColumn({type: "int", nullable:false})
    @ManyToOne(() => User, {nullable:false})
    userToConnect : User;

    @Column({type: "enum", enumName: "ConnectionStatus" , nullable: false})
    status : ConnectionStatus;
}
