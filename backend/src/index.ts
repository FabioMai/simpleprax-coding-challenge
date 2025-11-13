import Fastify from "fastify";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import cors from "@fastify/cors";
import type { HelloResponse } from "@full-stack-starter/shared";

const server = Fastify({ logger: true });

await server.register(cors, {
  origin: "http://localhost:5173",
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
    tags: [
      { name: "user", description: "User related end-points" },
      { name: "code", description: "Code related end-points" },
    ],
  },
});

await server.register(fastifySwaggerUi, {
  routePrefix: "/documentation",
  uiConfig: {
    docExpansion: "full",
    deepLinking: false,
  },
  uiHooks: {
    onRequest: function (request, reply, next) {
      next();
    },
    preHandler: function (request, reply, next) {
      next();
    },
  },
  staticCSP: true,
  transformStaticCSP: (header) => header,
  transformSpecification: (swaggerObject, request, reply) => {
    return swaggerObject;
  },
  transformSpecificationClone: true,
});

server.get("/api/hello", async (): Promise<HelloResponse> => {
  return { message: "Hello from backend!" };
});

server.listen({ port: 8080 }, (err) => {
  if (err) throw err;
});
