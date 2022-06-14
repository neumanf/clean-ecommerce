import { Column, Entity, PrimaryGeneratedColumn, Index } from 'typeorm';

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar')
    @Index({ unique: true })
    slug: string;

    @Column('varchar')
    name: string;

    @Column('text')
    description: string;

    @Column('varchar')
    category: string;

    @Column('text')
    imageUrl: string;

    @Column('decimal')
    price: number;
}
