import { Class } from 'src/class/entities/class.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'name', nullable: false })
    name: string;

    @Column({ name: 'email', nullable: false })
    email: string;

    @Column({ name: 'password', nullable: false })
    password: string;

    @Column({ name: 'type_user', nullable: false })
    typeUser: string;

    @ManyToMany(() => Class)
    @JoinTable()
    classes?: Class[];

}
