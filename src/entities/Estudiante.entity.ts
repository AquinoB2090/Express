import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, JoinColumn } from "typeorm";
import { Carrera } from "./Carrera.entity";

@Entity({ name: 'Estudiantes' })
export class Estudiantes {

    @PrimaryGeneratedColumn({ name: 'id_Estudiante' })
    idEstudiante: number;

    @Column({ name: 'nombre_estudiante', nullable: false })
    nombreEstudiante: string;

    @Column({ name: 'direccion', nullable: false })
    direccion: string;

    @Column({ name: 'correo', nullable: false })
    correo: string;

    @Column({ name: 'telefono', nullable: false })
    telefono: string;

    // Relación con la carrera (Muchos estudiantes pueden tener una carrera)
    @ManyToOne(() => Carrera)
    @JoinColumn({ name: 'id_Carrera' }) // Esto crea la columna como FK
    carrera: Carrera;
}