"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.srvDeleteCarrera = exports.srvUpdateCarrera = exports.srvGetCarreraByID = exports.srvCreateCarrera = exports.srvGetCarrera = void 0;
const db_1 = require("../config/db");
const Carrera_entity_1 = require("../entities/Carrera.entity");
//Crear el repositorio 
const carreraRepository = db_1.AppDataSource.getRepository(Carrera_entity_1.Carrera);
// C = Create, R = Read, U = Upada, D = Delete 
// Leer todas las carreras 
const srvGetCarrera = () => __awaiter(void 0, void 0, void 0, function* () {
    //select * from carreras order by id_carrera desc;
    const carreras = yield carreraRepository.find({
        order: { nombreCarrera: 'ASC' }
    });
    return carreras;
});
exports.srvGetCarrera = srvGetCarrera;
//Crear una nueva carrera
const srvCreateCarrera = (pNombreCarrera /*Si son varios campos colocar carrera: Carrera*/) => __awaiter(void 0, void 0, void 0, function* () {
    const nuevaCarrera = new Carrera_entity_1.Carrera();
    nuevaCarrera.nombreCarrera = pNombreCarrera;
    yield carreraRepository.save(nuevaCarrera);
});
exports.srvCreateCarrera = srvCreateCarrera;
//Obtener una carrera 
const srvGetCarreraByID = (pIdCarrera) => __awaiter(void 0, void 0, void 0, function* () {
    const carrera = yield carreraRepository.findOne({
        where: { idCarrera: pIdCarrera }
    });
    return carrera;
});
exports.srvGetCarreraByID = srvGetCarreraByID;
//Actualizar carrera
const srvUpdateCarrera = (pIdCarrera, pNombreCarrera) => __awaiter(void 0, void 0, void 0, function* () {
    //Buscar la carrera
    const carrera = yield carreraRepository.findOne({
        where: { idCarrera: pIdCarrera }
    });
    //Validación
    if (!carrera)
        return null;
    carrera.nombreCarrera = pNombreCarrera;
    return yield carreraRepository.save(carrera);
});
exports.srvUpdateCarrera = srvUpdateCarrera;
//Eliminar carrera
const srvDeleteCarrera = (pIdCarrera) => __awaiter(void 0, void 0, void 0, function* () {
    //Buscar la carrera
    const carrera = yield carreraRepository.findOne({
        where: { idCarrera: pIdCarrera }
    });
    //Validación
    if (!carrera)
        return null;
    return yield carreraRepository.remove(carrera);
});
exports.srvDeleteCarrera = srvDeleteCarrera;
