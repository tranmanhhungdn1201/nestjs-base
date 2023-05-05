import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { ContactInfo } from "./contact-info.entity";
import { Meeting } from "./metting.entity";
import { Task } from "./task.entity";

@Entity()
export class Employee {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToOne(() => Employee, employee => employee.directReports, {onDelete: 'SET NULL'})
    manager: Employee;

    @OneToMany(() => Employee, employee => employee.manager, {eager: true})
    directReports: Employee[];

    @OneToOne(() => ContactInfo, contactInfo => contactInfo.employee)
    contactInfo: ContactInfo
    
    @OneToMany(() => Task, task => task.employee)
    tasks: Task[]

    @ManyToMany(() =>  Meeting, meeting => meeting.attendees)
    @JoinTable()
    meetings: Meeting[]
}