
import { File } from 'src/file/entities/file.entity';
import { Publication } from 'src/publication/entities/publication.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, OneToOne, ManyToMany, JoinTable } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn("identity")
    id: number;

    @Column({length: 50})
    name: string;

    @Column({unique: true})
    email: string;

    @Column({select: false})
    password: string;

    @Column({default: true, select: false})
    isActive: boolean;

    @OneToMany(() => Publication, publication => publication.owner)
    publications : Publication[];

    @OneToOne(() => File, { nullable: false })
    photo: File;

}