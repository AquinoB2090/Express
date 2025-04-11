import { Estudiantes } from "../entities/Estudiante.entity";
import { AppDataSource } from "../config/db";
import { Carrera } from "../entities/Carrera.entity";
import { EstudianteDTO } from "../interfaces/EstudianteDTO";

const estudiantesRepository = AppDataSource.getRepository(Estudiantes);
const carreraRepository = AppDataSource.getRepository(Carrera);

// Obtener todos los estudiantes
export const srvGetEstudiantes = async (): Promise<Estudiantes[]> => {
    return estudiantesRepository.find({ relations: ['carrera'] });
}

// Obtener un estudiante por ID
export const srvGetEstudianteByID = async (id: number): Promise<Estudiantes | null> => {
    return estudiantesRepository.findOne({ where: { idEstudiante: id }, relations: ['carrera'] });
}

// Crear un nuevo estudiante
export const srvCreateEstudiante = async (data: EstudianteDTO): Promise<Estudiantes> => {
    const carrera = await carreraRepository.findOneBy({ idCarrera: data.idCarrera });
    if (!carrera) {
        throw new Error("Carrera no encontrada");
    }

    const nuevoEstudiante = new Estudiantes();
    nuevoEstudiante.nombreEstudiante = data.nombreEstudiante;
    nuevoEstudiante.direccion = data.direccion;
    nuevoEstudiante.correo = data.correo;
    nuevoEstudiante.telefono = data.telefono;
    nuevoEstudiante.carrera = carrera;

    return estudiantesRepository.save(nuevoEstudiante);
}

// Actualizar un estudiante
export const srvUpdateEstudiante = async (idEstudiante: number, data: EstudianteDTO): Promise<Estudiantes> => {
    const estudiante = await estudiantesRepository.findOne({ where: { idEstudiante }, relations: ['carrera'] });
    if (!estudiante) {
        throw new Error("Estudiante no encontrado");
    }

    const carrera = await carreraRepository.findOneBy({ idCarrera: data.idCarrera });
    if (!carrera) {
        throw new Error("Carrera no encontrada");
    }

    estudiante.nombreEstudiante = data.nombreEstudiante;
    estudiante.direccion = data.direccion;
    estudiante.correo = data.correo;
    estudiante.telefono = data.telefono;
    estudiante.carrera = carrera;

    return estudiantesRepository.save(estudiante);
}

// Eliminar un estudiante
export const srvDeleteEstudiante = async (idEstudiante: number): Promise<Estudiantes> => {
    const estudiante = await estudiantesRepository.findOne({ where: { idEstudiante } });
    if (!estudiante) {
        throw new Error("Estudiante no encontrado");
    }

    return estudiantesRepository.remove(estudiante);
}
