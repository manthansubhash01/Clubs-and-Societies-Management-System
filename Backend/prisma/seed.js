import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting to seed gallery...");

  try {
    // Get all clubs
    const clubs = await prisma.club.findMany();
    
    if (clubs.length === 0) {
      console.log("⚠️ No clubs found. Please create clubs first.");
      return;
    }

    console.log(`📸 Found ${clubs.length} clubs. Adding gallery images...`);

    // Define gallery images for each club
    const galleryData = {
      1: [ // First club
        {
          url: "https://images.unsplash.com/photo-1508700929628-666bc8bd84ea?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          text: "Students collaborating on project",
        },
        {
          url: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&q=80",
          text: "Cultural event celebration",
        },
        {
          url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",
          text: "Workshop session in progress",
        },
        {
          url: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=800&q=80",
          text: "Student meetup gathering",
        },
        {
          url: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=800&q=80",
          text: "Group discussion session",
        },
        {
          url: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80",
          text: "Team activity event",
        },
        {
          url: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&q=80",
          text: "Community gathering",
        },
        {
          url: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80",
          text: "Presentation session",
        },
      ],
      2: [ // Second club
        {
          url: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&q=80",
          text: "Social event gathering",
        },
        {
          url: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=800&q=80",
          text: "Study group session",
        },
        {
          url: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80",
          text: "Team meeting discussion",
        },
        {
          url: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&q=80",
          text: "Sports tournament",
        },
        {
          url: "https://images.unsplash.com/photo-1761901219072-491a18f3ccd7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          text: "Tech Workshop 2024",
        },
        {
          url: "https://images.unsplash.com/photo-1695771079040-ef65e928944b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          text: "Annual event highlight",
        },
      ],
      3: [ // Third club (if exists)
        {
          url: "https://images.unsplash.com/photo-1731160352698-cb7e2f142d7a?q=80&w=2960&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          text: "Large gathering event",
        },
        {
          url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80",
          text: "Workshop in action",
        },
      ],
    };

    // Seed gallery for each club
    for (const club of clubs) {
      const images = galleryData[club.id] || []; // Get images for this club, or empty array
      
      if (images.length === 0) {
        console.log(`⏭️ Skipping club ${club.id} - no images defined`);
        continue;
      }

      // Check if gallery already exists for this club
      const existingGallery = await prisma.gallery.findMany({
        where: { club_id: club.id },
      });

      if (existingGallery.length > 0) {
        console.log(`⚠️ Gallery already exists for club ${club.id}. Skipping...`);
        continue;
      }

      // Create gallery entries
      for (const image of images) {
        await prisma.gallery.create({
          data: {
            url: image.url,
            text: image.text,
            club_id: club.id,
          },
        });
      }

      console.log(`✅ Added ${images.length} gallery images for club ${club.id}`);
    }

    console.log("🎉 Gallery seeding completed successfully!");
  } catch (error) {
    console.error("❌ Error seeding gallery:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

main();
