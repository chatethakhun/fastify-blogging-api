import  { FastifyInstance } from "fastify";
import { uploadHandler } from "./upload.controller";

const uploadRoutes = async (fastify: FastifyInstance) => {
    fastify.post('/upload', uploadHandler)
}

export default uploadRoutes 