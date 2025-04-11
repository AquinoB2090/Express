import { Router } from 'express';
import { 
    getCarreras, 
    getCarrera, 
    createCarrera, 
    updateCarrera, 
    deleteCarrera 
} from '../Controllers/carrera.controller';
import { 
    getEstudiantes, 
    getEstudiante, 
    createEstudiante, 
    updateEstudiante, 
    deleteEstudiante 
} from '../Controllers/estudiante.controller';

const router = Router();

// Rutas de Carreras
router.get('/carreras', getCarreras); // Obtener todas las carreras
router.get('/carreras/:id', getCarrera); // Obtener una carrera por ID
router.post('/carreras', createCarrera); // Crear una nueva carrera
router.put('/carreras/:id', updateCarrera); // Actualizar una carrera por ID
router.delete('/carreras/:id', deleteCarrera); // Eliminar una carrera por ID

// Rutas de Estudiantes
router.get('/estudiantes', getEstudiantes); // Obtener todos los estudiantes
router.post('/estudiantes', createEstudiante); // Crear un nuevo estudiante

export default router;
