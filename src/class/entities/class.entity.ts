import { User } from 'src/user/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Class {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100 })
    teacher: string;

    @Column({ length: 100 })
    matter: string;
    
    @Column()
    date: Date;

    @Column({length: 20})
    shift: string;

}
