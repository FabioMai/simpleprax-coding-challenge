import "dotenv/config";
import Fastify from "fastify";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import cors from "@fastify/cors";
import { PrismaClient } from "../generated/prisma/client.js";
import type {
  FeedbackListResponse,
  CreateFeedbackRequest,
  FeedbackEntry,
  FeedbackStatsResponse,
} from "@full-stack-starter/shared";

const PORT = Number(process.env.PORT) || 8080;
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";

const server = Fastify({ logger: true });
const prisma = new PrismaClient();

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

server.get("/api/feedback", async (): Promise<FeedbackListResponse> => {
  const entries = await prisma.feedbackEntry.findMany({
    orderBy: {
      id: "asc",
    },
  });

  const data = entries.map((entry) => ({
    ...entry,
    createdAt: entry.createdAt.toISOString(),
  }));

  return { data };
});

server.post<{ Body: CreateFeedbackRequest }>(
  "/api/feedback",
  async (request): Promise<FeedbackEntry> => {
    const { name, rating, comment } = request.body;

    if (rating < 1 || rating > 5) {
      throw new Error("Rating must be between 1 and 5");
    }

    const feedback = await prisma.feedbackEntry.create({
      data: {
        name,
        rating,
        comment,
      },
    });

    return {
      ...feedback,
      createdAt: feedback.createdAt.toISOString(),
    };
  }
);

server.get("/api/feedback/stats", async (): Promise<FeedbackStatsResponse> => {
  const totalFeedback = await prisma.feedbackEntry.count();

  const avgResult = await prisma.feedbackEntry.aggregate({
    _avg: {
      rating: true,
    },
  });

  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

  const feedbackThisWeek = await prisma.feedbackEntry.count({
    where: {
      createdAt: {
        gte: oneWeekAgo,
      },
    },
  });

  return {
    averageRating: avgResult._avg.rating ?? 0,
    feedbackThisWeek,
    totalFeedback,
  };
});

await server.listen({ port: PORT, host: "0.0.0.0" });

const signals: NodeJS.Signals[] = ["SIGINT", "SIGTERM"];
signals.forEach((signal) => {
  process.on(signal, async () => {
    server.log.info(`Received ${signal}, closing server`);
    await prisma.$disconnect();
    await server.close();
    process.exit(0);
  });
});
