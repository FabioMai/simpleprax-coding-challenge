import Fastify from "fastify";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import cors from "@fastify/cors";
import type { HelloResponse } from "@full-stack-starter/shared";

const PORT = Number(process.env.PORT) || 8080;
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";

const server = Fastify({ logger: true });

await server.register(cors, {
  origin: FRONTEND_URL,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
});

await server.register(fastifySwagger, {
  openapi: {
    openapi: "3.0.0",
    info: {
      title: "backend swagger",
      description: "documents the backend endpoints",
      version: "0.1.0",
    },
    servers: [
      {
        url: "http://localhost:8080",
        description: "backend",
      },
    ],
  },
});

await server.register(fastifySwaggerUi, {
  routePrefix: "/documentation",
  uiConfig: {
    docExpansion: "full",
    deepLinking: false,
  },
  staticCSP: true,
});

server.get("/api/hello", async (): Promise<HelloResponse> => {
  return { message: "Hello from backend!" };
});

// Start server
await server.listen({ port: PORT, host: "0.0.0.0" });

// Graceful shutdown
const signals: NodeJS.Signals[] = ["SIGINT", "SIGTERM"];
signals.forEach((signal) => {
  process.on(signal, async () => {
    server.log.info(`Received ${signal}, closing server gracefully`);
    await server.close();
    process.exit(0);
  });
});
