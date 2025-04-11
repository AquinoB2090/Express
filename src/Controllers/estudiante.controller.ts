import { Request, Response } from "express";
import { 
    srvCreateEstudiante,
    srvGetEstudiantes,
    srvGetEstudianteByID,
    srvUpdateEstudiante,
    srvDeleteEstudiante
} from "../services/estudiante.services";
import { EstudianteDTO } from "../interfaces/EstudianteDTO";

// OBTENER TODOS LOS ESTUDIANTES
export const getEstudiantes = async (req: Request, res: Response) => {
    try {
        const estudiantes = await srvGetEstudiantes();
        res.status(200).json(estudiantes);
    } catch (error) {
        console.error('Error al obtener los estudiantes:', error);
        res.status(500).json({ message: 'Error al obtener los estudiantes' });
    }
}

// OBTENER UN ESTUDIANTE POR ID
export const getEstudiante = async (req: Request, res: Response) => {
    try {
        const { idEstudiante } = req.params;
        const estudiante = await srvGetEstudianteByID(+idEstudiante);

        if (!estudiante) {
            return res.status(404).json({ message: `No se encontró el estudiante con ID ${idEstudiante}` });
        }
        res.status(200).json(estudiante);
    } catch (error) {
        console.error('Error al obtener el estudiante:', error);
        res.status(500).json({ message: 'Error al obtener el estudiante' });
    }
}

// CREAR UN ESTUDIANTE
export const createEstudiante = async (req: Request, res: Response) => {
    try {
        const data: EstudianteDTO = req.body;
        const estudiante = await srvCreateEstudiante(data);
        res.status(201).json(estudiante);
    } catch (error) {
        console.error('Error al crear el estudiante:', error);
        res.status(500).json({ message: 'Error al crear el estudiante' });
    }
}

// ACTUALIZAR UN ESTUDIANTE
export const updateEstudiante = async (req: Request, res: Response) => {
    const { idEstudiante } = req.params;
    const data: EstudianteDTO = req.body;

    try {
        const estudiante = await srvGetEstudianteByID(+idEstudiante);

        if (!estudiante) {
            return res.status(404).json({ message: `No se encontró el estudiante con ID ${idEstudiante}` });
        }

        const estudianteUpdated = await srvUpdateEstudiante(+idEstudiante, data);
        res.status(200).json(estudianteUpdated);
    } catch (error) {
        console.error('Error al actualizar el estudiante:', error);
        res.status(500).json({ message: 'Error al actualizar el estudiante' });
    }
}

// ELIMINAR UN ESTUDIANTE
export const deleteEstudiante = async (req: Request, res: Response) => {
    const { idEstudiante } = req.params;

    try {
        const estudiante = await srvGetEstudianteByID(+idEstudiante);

        if (!estudiante) {
            return res.status(404).json({ message: `No se encontró el estudiante con ID ${idEstudiante}` });
        }

        await srvDeleteEstudiante(+idEstudiante);
        res.status(200).json({ message: 'Estudiante eliminado' });
    } catch (error) {
        console.error('Error al eliminar el estudiante:', error);
        res.status(500).json({ message: 'Error al eliminar el estudiante' });
    }
}
