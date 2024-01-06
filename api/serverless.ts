"use strict";

// Read the .env file.
import * as dotenv from "dotenv";
dotenv.config();

// Require the framework
import Fastify from "fastify";
import routes from "./routes/routes"
import postRoutes from "./post/post.route";
import userRoutes from "./user/user.route";
import uploadRoutes from './upload/upload.route'

import fastifyJWT from "@fastify/jwt"
import fastifyCors from "@fastify/cors"
import fastifyFormbody from "@fastify/formbody";
import fastifyMultipart from "@fastify/multipart";
// Instantiate Fastify with some config

const app = Fastify({
  logger: true,
});

app.register(fastifyFormbody)
app.register(fastifyMultipart, {
  limits: {
    files: 1
  }
})


app.register(fastifyCors, {
  origin: '*',
});
if (!!process.env.JOSE_SECRET) {
  app.register(import('@fastify/jwt'), {
    secret: process.env.JOSE_SECRET,
  });
}

// Register your application as a normal plugin.
// app.register(import("../src/app.js"));
// app.addHook("preHandler", auth)
app.register(routes, { prefix: 'api/v1' })
app.register(postRoutes, { prefix: 'api/v1' })
app.register(uploadRoutes, { prefix: 'api/v1'})
app.register(userRoutes)


app.listen({
  port: 3000,
})

export default async (req: Request, res: Response) => {
  await app.ready();
  app.server.emit('request', req, res);
}