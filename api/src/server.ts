import fastify from "fastify";
import { tutorsRoutes } from "./routes/users";
import { schedulesRoutes } from "./routes/schedules";

const app = fastify();

app.register(schedulesRoutes);
app.register(tutorsRoutes);

app.listen({
  port: 3333
})
.then(() => console.log("HTTP Server Running!👌"))