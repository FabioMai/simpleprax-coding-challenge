import "dotenv/config";
import { PrismaClient } from "../generated/prisma/client.js";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Clear existing data
  await prisma.feedbackEntry.deleteMany();

  // Create 6 example patient reviews for a doctor's office
  const reviews = await prisma.feedbackEntry.createMany({
    data: [
      {
        name: "Sarah Johnson",
        rating: 5,
        comment:
          "Dr. Smith and the entire staff were absolutely wonderful. The office was clean, the wait time was minimal, and I felt truly cared for. Highly recommend!",
      },
      {
        name: "Michael Chen",
        rating: 4,
        comment:
          "Great experience overall. The doctor was very thorough and took time to answer all my questions. Only minor issue was parking, but the medical care was excellent.",
      },
      {
        name: "Emily Rodriguez",
        rating: 5,
        comment:
          "I've been a patient here for 3 years and wouldn't go anywhere else. The staff remembers me by name and the care is consistently top-notch. Dr. Smith is knowledgeable and compassionate.",
      },
      {
        name: "James Williams",
        rating: 3,
        comment:
          "Decent visit. The doctor was professional and diagnosed my issue correctly. However, the front desk seemed a bit disorganized and I had to wait 30 minutes past my appointment time.",
      },
      {
        name: "Lisa Thompson",
        rating: 5,
        comment:
          "Outstanding medical practice! From scheduling to checkout, everything ran smoothly. Dr. Smith explained my treatment plan clearly and followed up personally. This is what healthcare should be!",
      },
      {
        name: "David Martinez",
        rating: 4,
        comment:
          "Very professional and caring staff. The nurse was patient with all my questions, and the doctor provided excellent care. Appointment ran on time and the facility is modern and comfortable.",
      },
    ],
  });

  console.log(`✅ Created ${reviews.count} patient reviews`);
}

main()
  .catch((e) => {
    console.error("❌ Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
