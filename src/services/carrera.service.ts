import { AppDataSource } from "../config/db";
import { Carrera } from "../entities/Carrera.entity";

//Crear el repositorio 
const carreraRepository = AppDataSource.getRepository(Carrera);

// C = Create, R = Read, U = Upada, D = Delete 

// Leer todas las carreras 
export const srvGetCarrera = async () => {

    //select * from carreras order by id_carrera desc;
    const carreras = await carreraRepository.find({
        order: {nombreCarrera: 'ASC'} 
    });
    return carreras;
}

//Crear una nueva carrera
export const srvCreateCarrera = async( pNombreCarrera: string /*Si son varios campos colocar carrera: Carrera*/ ) => {
    const nuevaCarrera = new Carrera();
    nuevaCarrera.nombreCarrera = pNombreCarrera;
    await carreraRepository.save(nuevaCarrera);
}

//Obtener una carrera 
export const srvGetCarreraByID = async (pIdCarrera: number) => {
    const carrera = await carreraRepository.findOne({
        where: {idCarrera: pIdCarrera}
    })
    return carrera;
}

//Actualizar carrera
export const srvUpdateCarrera = async(pIdCarrera: number, pNombreCarrera: string)=> {

    //Buscar la carrera
    const carrera = await carreraRepository.findOne({
        where: { idCarrera: pIdCarrera }
    });

    //Validación
    if(!carrera) return null;
    carrera.nombreCarrera = pNombreCarrera;
    return await carreraRepository.save(carrera);
}

//Eliminar carrera
export const srvDeleteCarrera = async (pIdCarrera: number) => {

    //Buscar la carrera
    const carrera = await carreraRepository.findOne({
        where: {idCarrera: pIdCarrera}
    });

    //Validación
    if(!carrera) return null;
    return await carreraRepository.remove(carrera);
}