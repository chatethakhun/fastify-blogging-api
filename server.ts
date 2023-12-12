import Fastify from "fastify";
import { PrismaClient } from "@prisma/client";
import routes from "./app/v1/routes";
import * as dotenv from "dotenv";
dotenv.config();


const fastify = Fastify()

fastify.register(routes, { prefix: 'api/v1' });


(async () => {
  await fastify.listen({
    port: 8080,
    host: "0.0.0.0",
  });
})();