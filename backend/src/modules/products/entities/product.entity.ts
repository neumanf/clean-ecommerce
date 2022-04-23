import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

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
