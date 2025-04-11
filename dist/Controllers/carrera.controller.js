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
exports.deleteCarrera = exports.updateCarrera = exports.createCarrera = exports.getCarrera = exports.getCarreras = void 0;
const carrera_service_1 = require("../services/carrera.service");
// OBTENER TODAS LAS CARRERAS
const getCarreras = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const carreras = yield (0, carrera_service_1.srvGetCarrera)();
        res.status(200).json(carreras);
    }
    catch (error) {
        console.log('Error al obtener las carreras' + error);
    }
});
exports.getCarreras = getCarreras;
// OBTENER UNA CARRERA POR ID
const getCarrera = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { idCarrera } = req.params;
        const carrera = yield (0, carrera_service_1.srvGetCarreraByID)(+idCarrera);
        if (!carrera)
            res.status(404).json({ message: 'No se encontró la carrera con ID ' + idCarrera });
        res.status(200).json(carrera);
    }
    catch (error) {
        console.log('Error al obtener la carrera' + error);
    }
});
exports.getCarrera = getCarrera;
// CREAR UNA CARRERA
const createCarrera = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { nombreCarrera } = req.body;
        const carrera = yield (0, carrera_service_1.srvCreateCarrera)(nombreCarrera);
        res.status(201).json(carrera);
    }
    catch (error) {
        console.log('Error al crear la carrera' + error);
    }
});
exports.createCarrera = createCarrera;
// ACTUALIZAR UNA CARRERA
const updateCarrera = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params; // const datos = req.params; // const id = datos.id;
    const { nombreCarrera } = req.body;
    try {
        const carrera = yield (0, carrera_service_1.srvGetCarreraByID)(+id);
        if (!carrera)
            res.status(404).json({ message: 'No se encontró la carrera con ID ' + id });
        const carreraUpdated = yield (0, carrera_service_1.srvCreateCarrera)(nombreCarrera);
        res.status(200).json(carreraUpdated);
    }
    catch (error) {
        console.log('Error al actualizar la carrera' + error);
    }
});
exports.updateCarrera = updateCarrera;
// ELIMINAR UNA CARRERA
const deleteCarrera = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const carrera = yield (0, carrera_service_1.srvGetCarreraByID)(+id);
        if (!carrera)
            res.status(404).json({ message: 'No se encontró la carrera con ID ' + id });
        // eliminar la carrera
        yield (0, carrera_service_1.srvDeleteCarrera)(+id);
        res.status(200).json({ message: 'Carrera eliminada' });
    }
    catch (error) {
        console.log('Error al eliminar la carrera' + error);
    }
});
exports.deleteCarrera = deleteCarrera;
