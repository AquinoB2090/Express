import { Router} from 'express';
import { getCarreras, getCarrera, createCarrera, updateCarrera, deleteCarrera } from '../Controllers/carrera.controller';

const router = Router();

router.get('/', getCarreras);
router.get('/:id', getCarrera);
router.post('/', createCarrera);
router.put('/:id', updateCarrera);
router.delete('/:id', deleteCarrera)

export default router;
