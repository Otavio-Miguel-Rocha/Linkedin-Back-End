import { File } from "src/file/entities/file.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Publication {
    @PrimaryGeneratedColumn("identity")
    id : number;

    @Column({length: 1500})
    description: string;

    @ManyToOne(() => User, user => user.publications, { nullable: false })
    owner: User;

    @OneToMany(() => File, (file) => file.publication, {
        onDelete: "CASCADE"
    })
    attachments: File[]
    
}
