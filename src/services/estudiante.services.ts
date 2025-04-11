import { AppDataSource } from "../config/db";
import { Estudiantes } from "../entities/Estudiante.entity";
import { Carrera } from "../entities/Carrera.entity"; // Importa la entidad Carrera

//Crear el repositorio para Estudiantes
const estudianteRepository = AppDataSource.getRepository(Estudiantes);

// C = Create, R = Read, U = Update, D = Delete

// Leer todos los estudiantes
export const srvGetEstudiantes = async () => {
    const estudiantes = await estudianteRepository.find({
        relations: ['carrera'], // Cargar la relación con la carrera
        order: { nombreEstudiante: 'ASC' }
    });
    return estudiantes;
}

// Crear un nuevo estudiante
export const srvCreateEstudiante = async (
    pNombreEstudiante: string,
    pDireccion: string,
    pCorreo: string,
    pTelefono: string,
    pIdCarrera: number // Recibe el ID de la carrera
) => {
    const nuevoEstudiante = new Estudiantes();
    nuevoEstudiante.nombreEstudiante = pNombreEstudiante;
    nuevoEstudiante.direccion = pDireccion;
    nuevoEstudiante.correo = pCorreo;
    nuevoEstudiante.telefono = pTelefono;

    // Buscar la carrera relacionada
    const carreraRepository = AppDataSource.getRepository(Carrera);
    const carrera = await carreraRepository.findOne({ where: { idCarrera: pIdCarrera } });

    if (!carrera) {
        // Manejar el caso en que la carrera no existe
        console.error(`La carrera con ID ${pIdCarrera} no existe.`);
        return null; // O lanzar un error
    }

    nuevoEstudiante.carrera = carrera; // Asignar la carrera al estudiante

    await estudianteRepository.save(nuevoEstudiante);
    return nuevoEstudiante; // Opcional: retornar el estudiante creado
}

// Obtener un estudiante por ID
export const srvGetEstudianteByID = async (pIdEstudiante: number) => {
    const estudiante = await estudianteRepository.findOne({
        where: { idEstudiante: pIdEstudiante },
        relations: ['carrera'] // Cargar la relación con la carrera
    });
    return estudiante;
}

// Actualizar estudiante
export const srvUpdateEstudiante = async (
    pIdEstudiante: number,
    pNombreEstudiante?: string,
    pDireccion?: string,
    pCorreo?: string,
    pTelefono?: string,
    pIdCarrera?: number // Opcional: para actualizar la carrera
) => {
    const estudiante = await estudianteRepository.findOne({
        where: { idEstudiante: pIdEstudiante }
    });

    if (!estudiante) {
        return null;
    }

    if (pNombreEstudiante !== undefined) {
        estudiante.nombreEstudiante = pNombreEstudiante;
    }
    if (pDireccion !== undefined) {
        estudiante.direccion = pDireccion;
    }
    if (pCorreo !== undefined) {
        estudiante.correo = pCorreo;
    }
    if (pTelefono !== undefined) {
        estudiante.telefono = pTelefono;
    }
    if (pIdCarrera !== undefined) {
        // Buscar la nueva carrera relacionada
        const carreraRepository = AppDataSource.getRepository(Carrera);
        const nuevaCarrera = await carreraRepository.findOne({ where: { idCarrera: pIdCarrera } });
        if (!nuevaCarrera) {
            console.error(`La carrera con ID ${pIdCarrera} no existe.`);
            return null; // O lanzar un error
        }
        estudiante.carrera = nuevaCarrera;
    }

    return await estudianteRepository.save(estudiante);
}

// Eliminar estudiante
export const srvDeleteEstudiante = async (pIdEstudiante: number) => {
    const estudiante = await estudianteRepository.findOne({
        where: { idEstudiante: pIdEstudiante }
    });

    if (!estudiante) {
        return null;
    }

    return await estudianteRepository.remove(estudiante);
}