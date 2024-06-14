
import { Connection } from 'src/connection/entities/connection.entity';
import { File } from 'src/file/entities/file.entity';
import { Publication } from 'src/publication/entities/publication.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, OneToOne, ManyToMany, JoinTable } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 50})
    name: string;

    @Column({unique: true})
    email: string;

    @Column()
    password: string;

    @Column({default: true, select: false})
    isActive: boolean;

    @OneToMany(() => Publication, publication => publication.owner)
    publications : Publication[];

    @OneToOne(() => File, { nullable: false })
    photo: File;


    @OneToMany(() => Connection, connection => connection.user1)
    sentConnections: Connection[];

    @OneToMany(() => Connection, connection => connection.user2)
    receivedConnections: Connection[];

}