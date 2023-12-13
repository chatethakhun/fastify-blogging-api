"use strict";

// Read the .env file.
import * as dotenv from "dotenv";
dotenv.config();

// Require the framework
import Fastify from "fastify";
import routes from "./routes/routes"
import postRoutes from "./post/post.route";
import userRoutes from "./user/user.route";

import { auth } from '../middlewares/auth'

// Instantiate Fastify with some config
const app = Fastify({
  logger: true,
});

// Register your application as a normal plugin.
// app.register(import("../src/app.js"));
// app.addHook("preHandler", auth)
app.register(routes, { prefix: 'api/v1'})
app.register(postRoutes, { prefix: 'api/v1'})
app.register(userRoutes)


app.listen({
  port: 3000,
})

export default async (req: Request, res: Response) => {
    await app.ready();
    app.server.emit('request', req, res);
}