import { Blob } from "buffer";
import { Publication } from "src/publication/entities/publication.entity";
import { Column, Entity, IsNull, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class File {
    @PrimaryGeneratedColumn("identity")
    id: number;

    @Column({ type: 'blob' })
    file: Buffer;

    @Column({length: 30})
    filename: string;

    @Column({ length: 35})
    type: string

    @ManyToOne(() => Publication, publication => publication.attachments)
    publication: Publication;
}
