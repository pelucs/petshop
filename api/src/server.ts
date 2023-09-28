import fastify from "fastify";
import { fastifyCors } from "@fastify/cors";

import { authRoutes } from "./routes/auth";
import { schedulesRoutes } from "./routes/schedules";
import jwt from "@fastify/jwt";

const app = fastify();

app.register(fastifyCors, {
  origin: '*'
});

app.register(jwt, {
  secret: "petshop"
})

app.register(schedulesRoutes);
app.register(authRoutes);

app.listen({
  port: 3333
})
.then(() => console.log("HTTP Server Running!👌"))