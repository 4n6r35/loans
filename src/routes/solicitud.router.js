import { Router } from "express";
import { CreateSolicitudController, DowloandSolicitudFile } from "../controller/solicitud.controller.js";

const SolicitudRouter = Router();

SolicitudRouter.post("/loan-create", CreateSolicitudController);

SolicitudRouter.get("/dowloand/:request_number", DowloandSolicitudFile)

export default SolicitudRouter 