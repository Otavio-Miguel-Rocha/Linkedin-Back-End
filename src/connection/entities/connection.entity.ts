import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToMany, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { ConnectionStatus } from "../enum/connection-status.enum";

@Entity()
export class Connection {
    @PrimaryGeneratedColumn("identity")
    id: number;

    @ManyToOne(() => User, user => user.sentConnections, { nullable: false })
    user1: User;

    @ManyToOne(() => User, user => user.receivedConnections, { nullable: false })
    user2: User;

    @Column({ type: 'enum', enum: ConnectionStatus, default: ConnectionStatus.WAITING })
    status: ConnectionStatus;
}
